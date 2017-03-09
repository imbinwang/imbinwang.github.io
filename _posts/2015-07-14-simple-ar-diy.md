---
layout: post
title: ARToolKit增强现实实践文档
comments: true
---

前言：
这是为[山东大学“可视计算”暑期学校](http://irc.cs.sdu.edu.cn/html/2015/SummerSchool-2015_0601/95.html) "Programming Practices in Augmented Reality" AR编程实践写的参考教程。鉴于本人在Windows系统下工作，整个文档偏重描述Windows系统下的整个DIY流程。请至[simpleARDIY Github](https://github.com/imbinwang/simpleARDIY)下载相关代码和文档。

增强现实技术，是一种将真实世界信息和虚拟世界信息集成的新技术，它获取现实世界的数据(可以是图像、文字，地理位置等等)，然后把计算机虚拟的数据与现实世界的数据叠加之后再呈现给用户。[ARToolKit](http://www.artoolkit.org/)是一个开源增强现实(Augmented Reality, AR)软件库，用来快速构建增强现实应用。

<!--more-->

### ARToolKit安装配置 ###
ARToolKit提供了多个平台下预编译的SDK，从[官网下载页面](http://www.artoolkit.org/download-artoolkit-sdk)获取安装文件。（愿意尝试的同学可以从[ARToolKit Github](https://github.com/artoolkit/artoolkit5)下载源码，参考[Building ARToolKit from Source](http://www.artoolkit.org/documentation/doku.php?id=8_Advanced_Topics:build_artoolkit)自己编译ARToolKit。）

**Windows**

- 运行ARToolKit安装文件，按照提示安装完毕
- 增加ARTOOLKIT5_ROOT\bin到系统环境变量PATH

![path1](/public/images/2015-7-14-simple-ar-diy/1.png)
![path2](/public/images/2015-7-14-simple-ar-diy/2.png)

**Linux / MAC OS X**

- 在终端命令行解压文件包

```
tar xzvf ARToolKit5-bin-*.tar.gz
```

- 设置环境变量

```
// Example assumes ARToolKit is in ~/SDKs/
cd ~/SDKs/ARToolKit5/
./share/artoolkit5-setenv
```

**验证安装**

安装完毕后，运行ARTOOLKIT5_ROOT\bin目录下的示例程序，例如simpleLite.exe。

### 相机标定 ###
ARToolKit软件库中默认使用的相机参数包含在相机参数文件camera_para.dat中，每次AR应用启动时读取参数文件camera_para.dat，此参数适用于多数应用，但是为了获得更好的精度，通常每个不同的相机需要单独标定。

ARToolKit软件库的相机标定工具calib_camera.exe位于ARTOOLKIT5_ROOT\bin目录，标定用的棋盘格文件ARTOOLKIT5_ROOT\doc\patterns\Calibration_chessboard_(A4).pdf需提前打印到A4纸，粘贴在卡片或者板子上（使其保持平整）。

**标定步骤**

- Windows

```
calib_camera.exe
```

- Linux / MAC OS X

```
./calib_camera
```

- 此时，命令行终端会显示默认的参数设置。一般情况下，使用默认参数即可，若想修改参数，请输入帮助选项`calib_camera --help`查看帮助提示。

```
CHESSBOARD_CORNER_NUM_X = 7
CHESSBOARD_CORNER_NUM_Y = 5
CHESSBOARD_PATTERN_WIDTH = 30.000000
CALIB_IMAGE_NUM = 10
Video parameter:
Using default video config.
Image size (x,y) = (640,480)
```

- 此时相机启动，用相机拍摄棋盘格，当相机拍摄到所有棋盘格内角点时，角点记号X呈红色，成功的标定画面如下图a；当相机找不到棋盘格的全部角点时，角点记号X呈绿色，如下图b，

![cb](/public/images/2015-7-14-simple-ar-diy/3.png)

- 当相机捕获的图像中内角点全部呈红色时，按下键盘空格键，捕获当前帧。为了取得更好的标定效果，相机应从多个不同角度拍摄棋盘格，

![cb_multi](/public/images/2015-7-14-simple-ar-diy/4.png)

- 一旦所有的标定图像（默认10张）被获取，标定数据会输出到命令行终端并提示键入参数文件名

![cb_filename](/public/images/2015-7-14-simple-ar-diy/5.png)

- 若标定数据良好，每张图片的标定误差应小于1像素，若误差超过2像素，应重新标定。
键入文件名，例如camera_para.dat，回车，保存相机参数。

**使用相机参数**

暂时将相机参数文件保存在某个地方，后面的应用会用到此参数文件。

### 标记的设计和训练 ###
ARToolKit能够识别正方形标记（Square Marker）并在视频序列中对其进行跟踪，这是所谓的传统模板标记跟踪技术。标记往往是由用户创建或者打印出来的图案。ARToolKit软件库ARTOOLKIT5_ROOT\doc\patterns目录下提供了一些可以直接使用的预先设计好的标记，例如Hiro_pattern_with_border.pdf展示的Hiro标记，

![mk_hiro](/public/images/2015-7-14-simple-ar-diy/6.png)

将这些标记文件打印出来，粘贴在卡片或者板子上（使其保持平整）。

**设计新标记**

除了直接ARToolKit软件库提供的标记，我们也可以设计自己喜欢的标记，但是定制标记必须满足以下要求：

1. 必须是方形的；
2. 必须有连续的边界颜色（通常是指全黑或者全白），且其周围的背景需为对比色（通常指边界颜色的相反颜色，比如全白或者全黑）。默认情况下，边界的宽度是标记长度的25%；
3. 边界内部的标记图像不能满足旋转对称性（即不能有偶次序的旋转对称），边界内部的图像可以是白色、黑色或者其它颜色。

**设计过程**

可以通过编辑ARToolKit软件库提供的模板文件ARTOOLKIT5_ROOT\doc\patterns\Blank_pattern.png来创建新的标记。标记可以是任意大小的，在增强现实应用中使用标记的时，可以通过编辑配置文件指定标记相应的大小。

![mk_irc](/public/images/2015-7-14-simple-ar-diy/7.png)

自定义的标记如上图所示，标记内部50%的区域被认为是标记图像。标记图像可以是彩色的、黑底白画或者白底黑画，而且可以延伸到边界区域。需要注意的是，超过标记内部50%的标记图像会被ARToolKit所忽略；因此，不要让标记图像超出边界太多，否则当相机角度倾斜较大时ARToolKit识别不出该标记。

另外一种更简单的创建标记的方式可以参考[Julian Looser’s web-based marker generator](http://www.roarmot.co.nz/ar/)。

**训练新标记**

一旦设计好新标记（上面的IRC标记，从[这里下载](http://pan.baidu.com/s/1c0hOEJI)），将其打印出来。接下来ARToolKit需要“训练”新标记以让其了解该标记的外形。训练过程的输出的一个图案文件，该文件包含了描述标记图像的数据。图案文件使得ARToolKit能够从场景中识别出想要跟踪的标记。例如，在ARToolKit软件库中可以找到Hiro标记的图案文件ARTOOLKIT5_ROOT\bin\Data\patt.hiro。

ARToolKit软件库的标记训练工具mk_patt.exe位于ARTOOLKIT5_ROOT\bin目录。

**训练过程**

- 打开终端提示符/命令行提示符窗口，Linux或者OS X系统输入./mk_patt，windows系统输入mk_patt.exe，会看到类似如下的提示

![mk_camera_para](/public/images/2015-7-14-simple-ar-diy/8.png)

- 输入相机标定过程中保存的相机参数文件路径，回车。此时，相机获取到视频画面，

![mk_video](/public/images/2015-7-14-simple-ar-diy/9.png)

- 将相机对准标记，使得标记在屏幕上显示为正方形，而且尽可能大。如果ARToolKit识别出了标记，它会在标记周围画上红色或者绿色的方框线。旋转标记使得方框红色的角位于标记的左上角，并单击左键确认。此时，标记训练完成，终端提示符/命令行提示符窗口会提示键入图案文件名，

![mk_filename](/public/images/2015-7-14-simple-ar-diy/10.png)

- 输入你的图案文件的名字（通常以“patt.name”为命名），例如patt.irc，并回车保存。如果你不想保存该文件，直接按回车来启动视频重新训练，或者单击鼠标右键退出程序。一般在训练自定义标记时，需要指定一些参数。运行`mk_patt --help`，可以查看修改默认设置的帮助提示。

**使用新标记**

暂时将图案文件保存在某个地方，后面的应用会用到此参数文件。

### simpleARDIY - First Sample ###
simpleARDIY 是一个简单的ARToolKit实践工程，代码和数据请从[simpleARDIY Github](https://github.com/imbinwang/simpleARDIY)下载。

![code_download](/public/images/2015-7-14-simple-ar-diy/12.png)

下面详细介绍DIY流程（Windows VS2013下）：

1. 将DATA目录下的camera_para.dat替换为上面相机标定过程中暂存的相机参数文件，将patt.irc替换为训练好的新标记的图案参数文件，同时修改simpleARDIY.cpp中相应参数文件的路径
	
   ```c
   // You need to change these pathes to your own data
   static GLMmodel *gObj = NULL;
   static const float markerSize = 40.0f; // size of marker, in mm unit, change it for your marker
   static char glutGamemode[32]; 
   static char cparam_name[] = "Data/camera_para.dat"; // camera parameters file, change it for your camera
   static char vconf[] = ""; // default
   static char patt_name[] = "Data/patt.irc"; // marker parameter file, change it for your marker
   static char obj_name[] = "Data/bunny.obj"; // model file which will showed on marker, change it for your model(obj format)
   ```

2. 在VS2013中创建新工程
	- File -> New -> Project
	- Win32 Console Application
	- 工程命名为SimpleARDIY
	- OK, Empty Project
3. 将下载的代码文件和数据拷贝到工程目录
4. 配置项目属性（新建属性页方式，也可以选择你习惯的方式，只要能让工程找到ARToolkit的头文件和库文件）
	* Property Manager -> SimpleARDIY -> Debug|Win32, 右键Add New Property Sheet，命名ARToolKit5_debug.props
	* 双击ARToolKit5_debug.props，编辑当前属性页，将ARToolKit5头文件目录ARTOOLKIT5_ROOT\include添加到Additional Include Directories
	- 将ARToolKit5的库文件目录ARTOOLKIT5_ROOT\lib\win32-i386添加到Additional Library Directories
	* Configuration Properties -> Linker -> input, 将Additional Dependencies设置为`ARd.lib;ARICPd.lib;ARgsub_lited.lib;ARvideod.lib;`
	* Property Manager -> SimpleARDIY -> Release|Win32, 右键Add New Property Sheet，命名ARToolKit5_release.props, 参考上面属性页编辑流程，有一点不同是Release下将Additional Dependencies设置为`AR.lib;ARICP.lib;ARgsub_lite.lib;ARvideo.lib;`
5. 将GLM.h添加至head files， 将GLM.cpp和simpleARDIY.cpp添加至source files
6. Build，OK
	- build过程中提示如果提示glut相关错误，说明系统未安装glut库。请至[glut主页](https://www.opengl.org/resources/libraries/glut/glutdlls37beta.zip)下载glutdlls37beta.zip。解压文件，将glut.h复制到VS安装目录下的VC\include\GL文件夹(若无GL文件夹，新建之)，将glut.lib和glut32.lib复制到VS安装目录下的VC\lib文件夹, 将glut.dll和glut32.dll复制到Windows\System32和Windows\SysWOW64文件夹。
	- build过程中提示如果提示`sprintf, strcpy, strcat`相关错误，请右键工程 -> Properties -> Configuration Properties -> C/C++ -> Preprocessor -> Preprocessor Definitions，将宏`_CRT_SECURE_NO_WARNINGS;`添加到Preprocessor Definitions。

最后，将标记置于相机镜头下，运行效果如图

![mk_result](/public/images/2015-7-14-simple-ar-diy/11.png)

### DIY – Open minds and Have Fun ###
以simpleARDIY工程为基础，发挥你的创意，构建你自己的增强现实应用。
See these demo videos:

- [ARToolKit技术制作的坦克部队](http://v.youku.com/v_show/id_XMTYzMDkwNjQ=.html?from=s1.8-1-1.2&qq-pf-to=pcqq.c2c)
- [ARToolKit增强现实游戏演示](http://v.youku.com/v_show/id_XMTAxNTE2NjQ0.html?from=s1.8-1-1.2)

Open minds and Have Fun :-)

#### Reference ####
[1] http://www.artoolkit.org/documentation/ <br/>
[2] http://www.hitl.washington.edu/artoolkit/documentation/ <br/>
[3] https://github.com/artoolkit/artoolkit5
