---
layout: post
title: "Caffe的Win64+VS2013编译"
date: 2015-04-21
desc: "Caffe complile in Windows64 and VS2013"
keywords: "Caffe, Windows64, VS2013"
categories: [research]
tags: [Caffe, deep learning]
icon: fa-book
---

[BVLC](http://caffe.berkeleyvision.org/)提供的开源库[Caffe](https://github.com/BVLC/caffe)是Linux平台下非常流行的深度学习代码框架, 其作者在[installation instruction](http://caffe.berkeleyvision.org/installation.html)中 详细介绍了Ubuntu, OS X, RHEL/CentOS/Fedora平台下的编译流程, but windows. 本文旨在介绍如何将Caffe从Linux平台移植到Windows平台, 英文详细流程的介绍请参考[NEIL SHAO](https://initialneil.wordpress.com/2015/01/11/build-caffe-in-windows-with-visual-studio-2013-cuda-6-5-opencv-2-4-9/)的博客.

### 编译环境和第三方库 ###

* Windows X64 + VS2013
* [Opencv2.4.9](https://sourceforge.net/projects/opencvlibrary/files/opencv-win/2.4.9/opencv-2.4.9.exe/download)
* [Cuda6.5](https://developer.nvidia.com/cuda-toolkit-65)
* [Boost1.56.0](http://sourceforge.net/projects/boost/files/boost-binaries/1.56.0/boost_1_56_0-msvc-12.0-64.exe/download)
* 3rd Party: OpenBLAS + GFlags + Glog + Protobuf + LevelDB + HDF5 + LMDB.所有的第三方库位于目录3rparty下. 如果你的编译环境是Win64+VS2013, 可以直接下载预编译好的[3rparty](https://drive.google.com/open?id=0B_jVFXVqliWYODhnTG1JUkNyRXM&authuser=0)

### 步骤 ###

1. 下载最新[Caffe's Github](https://github.com/BVLC/caffe)源码（master分支), 代码根目录为*CAFFE_ROOT*
2. 在VS2013中创建新工程 
	* File -> New -> Project
	* Win32 Console Application
	* 工程目录为Caffe根目录, 命名*Caffe*
	* OK
	* Empty project
3. 将目标平台从Win32改成X64
	* Build -> Configuration Manager -> Active solution platform -> new -> x64 -> OK
4. Caffe根目录下生成了空工程*Caffe*, 先编译小部分\*.cpp文件, 逐步解决文件之间的依赖关系
	* 将*CAFFE_ROOT/src/caffe*下的所有\*.cpp文件添加到VS的*Source Files*
5. 配置项目属性
	* Property Manager中配置Debug\|x64和Release\|x64相应属性, Configuration Properties -> General, 将Output Directory设置成*../bin*
	* Configuration Properties -> C/C++ -> General, 将Additional Include Directories设置为<br>*../include;../src;../3dparty/include;../3dparty/include/openblas;<br>../3dparty/include/hdf5;../3dparty/include/lmdb;*
	* Configuration Properties -> Linker -> General, 将Additional Library Directories设置为*../3rdparty/lib*
	* Configuration Properties -> Linker -> input, 将Additional Dependencies设置为<br>**Debug\|x64**: <br>*gflagsd.lib;libglog.lib;libopenblas.dll.a;libprotobufd.lib;libprotoc.lib;<br>leveldbd.lib;lmdbd.lib;libhdf5_D.lib;libhdf5_hl_D.lib;Shlwapi.lib*; <br>**Release\|x64**:<br> *gflags.lib;libglog.lib;libopenblas.dll.a;libprotobuf.lib;libprotoc.lib;<br>leveldb.lib;lmdb.lib;libhdf5.lib;libhdf5_hl.lib;Shlwapi.lib*;
	* 确保在配置过程选中了*Inherit from parent or project defaults*
6. 配置Opencv, Cuda, Boost库（新建属性页）
	* 右键Property Manager选择Debug\|x64和Release\|x64, Add New Property Sheet
	* 在新的属性页中, 将Opencv,Cuda,Boost的头文件目录*xx/include*添加到Additional Include Directories
	* 将Opencv,Cuda,Boost的头文件目录*xx/lib*添加到Additional Library Directories
	* Configuration Properties -> Linker -> input, 将Additional Dependencies设置为<br>**Debug\|x64**:<br> *cudart.lib;cuda.lib;nppi.lib;cufft.lib;cublas.lib;curand.lib;<br>opencv_core249d.lib;opencv_calib3d249d.lib;opencv_contrib249d.lib;<br>opencv_flann249d.lib;opencv_highgui249d.lib;opencv_imgproc249d.lib;<br>opencv_legacy249d.lib;opencv_ml249d.lib;opencv_gpu249d.lib;<br>opencv_objdetect249d.lib;opencv_photo249d.lib;opencv_features2d249d.lib;<br>opencv_nonfree249d.lib;opencv_stitching249d.lib;opencv_video249d.lib;<br>opencv_videostab249d.lib*;<br> **Release\|x64**:<br> *cudart.lib;cuda.lib;nppi.lib;cufft.lib;cublas.lib;curand.lib;<br>opencv_core249.lib;opencv_flann249.lib;opencv_imgproc249.lib;<br>opencv_highgui249.lib;opencv_legacy249.lib;opencv_video249.lib;<br>opencv_ml249.lib;opencv_calib3d249.lib;<br>opencv_objdetect249.lib;opencv_stitching249.lib;opencv_gpu249.lib;<br>opencv_nonfree249.lib;opencv_features2d249.lib*;
	* 设置Cuda编译选项
		- Configuration Properties -> CUDA C/C++ -> Common, 将CUDA Runtime设置为*Shared/dynamic CUDA runtime library*, 将Target Machine Platform设置为*64-bit*
7. 开始编译*common.cpp*修正从Linux平台向Windows移植过程中的bug
    * 增加 `#include <process.h>`,修正`getpid`调用错误, 这类错误主要是由于POSIX标准下的函数API与MSVC的规范不一致造成
    * 将*_CRT_SECURE_NO_WARNINGS;_SCL_SECURE_NO_WARNINGS;*添加到Configuration Properties -> C/C++ -> Preprocessor -> Preprocessor Definitions, 修正`fopen_s`导致错误（VS2013安全性提高了）
    * 在`getpid`代码处作如下修改	   	
      
      ```c
	  // port for Win32
	  #ifndef _MSC_VER
	  pid = getpid();
	  #else
	  pid = _getpid();
	  ```

8. 编译*blob.cpp*
	* 下载[GeneratePB.bat](https://drive.google.com/open?id=0B_jVFXVqliWYODhnTG1JUkNyRXM&authuser=0), 将其拷贝至*CAFFE_ROOT/scripts*,编辑*CAFFE_ROOT/scripts/GeneratePB.bat*中相关路径, 使其能定位到*CAFFE_ROOT/3rdparty/bin/protoc.exe*
	* 增加命令行代码到Configuration Properties -> Build Events -> Pre-Build Event -> Command Line`../scripts/GeneratePB.bat`
	* Build *Caffe*项目, *CAFFE_ROOT/src/caffe/proto*目录下会生成两个文件*caffe.pb.h*和*caffe.pb.cc*
	* 再次编译*blob.cpp*无错误
9. 编译*net.cpp*
	* 将`#include <mkstemp.h>`增加到*io.hpp*, 修正`close`错误

      ```c
      // port for win32
      #ifndef _MSC_VER
      close(fd);
      #else
      _close(fd);
      ```
	* 修正*io.hpp*中的`mkdtemp`错误

	  ```c
	  // port for Win32
	  #ifndef _MSC_VER
	  char* mkdtemp_result = mkdtemp(temp_dirname_cstr);
	  #else
	  errno_t mkdtemp_result = _mktemp_s(temp_dirname_cstr, sizeof(temp_dirname_cstr));
	  #endif
	  ```

10. 编译*solver.cpp*
	* 将以下代码加到*solver.cpp*
		
	  ```c
	  // port for Win32
	  #ifdef _MSC_VER
	  #define snprintf sprintf_s
	  #endif
	  ```

11. 编译CAFFE_ROOT/src/layers目录下的文件
	* PROJECT -> Build Dependencies -> Build Customization, 开启CUDA6.5(.targets, .props)
	* 将一个*\*.cu*文件加到Source Files, 右击*\*.cu* -> Properties -> General, 将Item type设置为*CUDA C/C++*
	* 将*bnll_layer.cu*中的`const float kBNLL_THRESHOLD = 50.;` 改为`#define kBNLL_THRESHOLD 50.0`, cuda device函数不能直接访问host常量
	* 编译目录下所有文件
12. 编译CAFFE_ROOT/src/util目录下的文件
	* 将*io.cpp*中`ReadProtoFromBinaryFile`函数参数从`O_RDONLY`改为`O_RDONLY | O_BINARY`
	* 将下面的代码加到*io.cpp*, 修正POSIX错误（注意在同一文件下有多种使用`open`和`close`的方式, 在`ReadFileToDatum`函数前需要`undef`）
		
      ```c
	  // port for Win32
	  #ifdef _MSC_VER
	  #define open _open
	  #define close _close
	  #endif
	  ...
	  #ifdef open
	  #undef open
	  #endif
	  #ifdef close
	  #undef close
	  #endif	
      ```
	* 将下面的代码加到*math_functions.cpp*, 修正`__builtin_popcount`和`__builtin_popcountl`错误
		
      ```c
      #define __builtin_popcount __popcnt
      #define __builtin_popcountl __popcnt
      ```
	* 将下面的代码加到*db.cpp*, 修正POSIX `mkdir`错误
		
	  ```c
	  // port for win32
	  #ifdef _MSC_VER
	  #include <direct.h>
	  #endif
	  ...
	  // port for win32
	  #ifdef _MSC_VER
	  CHECK_EQ(_mkdir(source.c_str()), 0) << "mkdir " << source << "failed";
	  #else
	  CHECK_EQ(mkdir(source.c_str(), 0744), 0) << "mkdir " << source << "failed";
	  #endif
	  ```

13. 编译*CAFFE_ROOT/toots/caffe.cpp*
14. Build整个项目, 在*CAFFE_ROOT/bin*目录下生成caffe.exe
15. OK!


###  Minist Example


1. 将下面的代码加到*convert_mnist_data.cpp*, 修正POSIX `mkdir`错误
	
   ```c
   // port for Win32
   #ifdef _MSC_VER
   #include <direct.h>
   #define snprintf sprintf_s
   #endif
   ...
   #ifndef _MSC_VER
   CHECK_EQ(mkdir(db_path, 0744), 0) << "mkdir " << db_path << "failed";
   #else
   CHECK_EQ(_mkdir(db_path), 0) << "mkdir " << db_path << "failed";
   #endif
   ```

2. 将指针变量`db, mdb_env, mdb_txn`初始化为`NULL`


###  cuDNN加速（可选）


1. 将*USE_CUDNN*加到属性管理中的Preprocessor开启cuDNN加速（当前Caffe只支持cuDNN v1, CUDA属性设置中Code Generation至少为*compute\_30,sm\_30*）
2. 很多GPU计算能力和架构达不到*compute\_30,sm\_30*, 可以暂不考虑cuDNN加速