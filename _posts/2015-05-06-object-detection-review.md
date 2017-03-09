---
layout: post
title: "目标检测简要综述"
date: 2015-05-06
desc: "Object detection survey"
keywords: "object detection"
categories: [research]
tags: [survey]
icon: fa-book
---

目标检测(Object Detection)是计算机视觉领域中一个基础性的研究课题,主要包含两类不同的检测任务：目标实例检测(Instance Object Detection)和目标类别检测(Generic Object Detection).

### 研究和实际意义 ###

第一类检测任务的目标是识别并定位输入图像中已知特定的某个或多个物体,例如一辆特定的汽车.这类任务可认为是特定物体的样本集和待检测输入图像中特定物体间的匹配问题,样本集和待检测输入图像中的目标的差异主要源自成像条件的变化.第二类检测任务关注分类并定位预定义类别涵盖的所有可能个体,例如车辆检测、行人检测.与目标实例检测任务相比,目标类别检测更具挑战性.因为真实世界中很多不同类别间物体的视觉差异是很小的,而且同一类物体间的差异不仅受成像条件变化的影响,还受物体物理属性变化的影响,例如,在生物学上花是极为多样的,个体间的颜色、纹理和形状是千变万化的.在真实场景中目标通常只占据整个场景的小部分而且可能被其它物体遮挡,或者场景中伴随出现视觉上相似的背景结构,这些情形的出现也对目标检测任务构成极大的挑战.

总之,目标检测任务可分为两个关键的子任务：目标分类和目标定位.目标分类任务负责判断输入图像中是否有感兴趣类别的物体出现,输出一系列带分数的标签表明感兴趣类别的物体出现在输入图像的可能性.目标定位任务负责确定输入图像中感兴趣类别的物体的位置和范围,输出物体的包围盒,或物体中心,或物体的闭合边界等,通常方形包围盒是最常用的选择.

目标检测是大量高级视觉任务的必备前提,包括活动或事件识别、场景内容理解等.而且目标检测也被应用到很多实际任务,例如[智能视频监控](#1)[1],基于内容的[图像检索](#2)[2],[机器人导航](#3)[3]和[增强现实](#4)[4]等.目标检测对计算机视觉领域和实际应用具有重要意义,在过去几十年里激励大批研究人员密切关注并投入研究.而且随着强劲的机器学习理论和特征分析技术的发展,近十几年目标检测课题相关的研究活动有增无减,每年都有最新的研究成果和实际应用发表和公布.尽管如此,当前方法的检测准确率仍然较低而不能应用于实际通用的检测任务.因此,目标检测还远未被完美解决,仍旧是重要的挑战性的研究课题.

### 研究工作综述 ###
目前不管是目标实例检测还是目标类别检测课题,都存在着大量研究工作.

#### 目标实例检测 ####
对于目标实例检测,根据物体实例表观特征的判别性可以进一步细分为无纹理目标实例检测和纹理目标实例检测.真实世界中大量人造物体是无纹理或少纹理的,例如杯子,手机等.对于无纹理或少纹理的物体,视觉特征不能稳定可靠地被提取到,它们难以被识别和检测.由于没有稳定的判别力强的特征点,无纹理或少纹理目标的判别性主要由目标的轮廓和形状决定.当目标纹理丰富时,目标实例上能够提取稳定丰富的特征点和相应的特征描述子,纹理物体可以基于这些特征点和特征描述子被准确识别和检测.[SIFT](#5)[5]、其它判别性特征描述子[PCA-SIFT](#6)[6]、[SURF](#7)[7]等的发展对纹理物体的识别和检测产生了重大影响.SIFT提取多尺度空间上高斯差分图的极值点作为特征点,并在每个特征点的邻域内计算梯度方向直方图作为特征描述子.SIFT特征具有尺度不变性,并且对图像旋转和光照变化也有较强的鲁棒性,应用于富纹理物体检测有较好效果.由于无纹理物体上较难提取稳定的判别力强的特征点,上文描述的基于特征点的物体实例检测方法并不适用于无纹理物体实例检测.无纹理物体主要是由它的轮廓结构定义.大部分无纹理物体实例检测是基于模板匹配方式的.早期的[模板匹配方法](#8)[8]和它的[扩展](#9)[9]使用Chamfer距离度量模板和输入图像轮廓之间的差异.距离通过距离变换有效地计算,但是这种方法对外点极为敏感.另一种二值图像的距离度量方式是[Hausdorff距离](#10)[10],它易受遮挡和复杂背景的影响.所有这些方法使用的二值图像是通过[边缘提取算法](#11)[11]得到的, 因此它们对光照变化和噪声极为敏感.[Hinterstoisser a](#12)[12][Hinterstoisser b](#13)[13]为了避免上述算法的缺陷,提出使用图像梯度而不是图像轮廓作为匹配的特征.[Hinterstoisser a](#12)[12][Hinterstoisser b](#13)[13]相继提出了两种基于图像梯度方向作为特征的使用模板匹配技术的无纹理物体检测算法,它们提出了新颖的图像梯度方向特征的二进制表示方式,能够在背景复杂环境下实时检测多类无纹理物体.然而,这两种方法并未显式地考虑物体边缘轮廓的连通性约束,在复杂背景下易与相似形状的背景产生混淆,因此具有一定的误检率.后续工作[Rios-Cabrera a](#14)[14][Rios-Cabrera b](#15)[15]通过机器学习改进模板上特征的判别性,来提高检测准确率.为了强化边缘连通性的约束,[Hsiao c](#16)[16]提出一种新的形状匹配算法,该算法通过在图像梯度上构建一张图模型,能够显式地获得轮廓连通性约束.算法通过迭代优化,为每个像素计算匹配到目标形状的概率.该方法能够提高检测准确率,但是不能实时处理视频或图像序列.文献[12-16](#12)逐步完善了基于图像梯度的无纹理物体实例检测算法,然而所有算法都没能解决遮挡对检测准确率造成衰减的问题.遮挡在计算机视觉领域各个课题中都是比较棘手的问题.[Hsiao d](#17)[17]提出了针对任意视点情况下物体检测的遮挡模型,它利用场景中物件尺寸的统计信息和目标物体自身的尺寸,为物体建立遮挡模型和遮挡条件模型.针对特定环境建立的遮挡模型能较好的建模遮挡,提高物体检测准确率.然而,针对每个特殊场景建立遮挡模型较为繁琐复杂,不具普适性.关于遮挡模型的建立是浅尝辄止,建立新的更为普适的模型仍非常困难.另一方面,为了增加检测的鲁棒性,多模态的数据使用也越来越被关注, [18-19](#18)使用深度信息提取物体的表面法向用于匹配,增加了检测算法的鲁棒性.文献[20](#20)详细分析了目标实例检测中的各种亟待解决的问题,并提出了一定的解决方案.

#### 目标类别检测 ####
对于目标类别检测,相关研究工作一直是计算机视觉的研究热点.特殊类别的目标检测,例如人脸和行人,检测技术已经较为成熟.[Viola](#21)[21]提出基于AdaBoost算法框架,使用Haar-like小波特征分类,然后采用滑动窗口搜索策略实现准确有效地定位.它是第一种能实时处理并给出很好检测率的物体类别检测算法,主要应用于人脸检测.[Dalal](#22)[22] 提出使用图像局部梯度方向直方图（HOG）作为特征,利用支持向量机（SVM）作为分类器进行行人检测.更为普遍的目标检测工作关注自然图像中一般类别的检测.自然界的大部分物体具有运动能力,会发生非刚体形变,为此[Felzenszwalb](#23)[23]提出了目标类别检测最具影响力的方法之一多尺度形变部件模型（DPM）,继承了使用HOG特征和SVM分类器的优点.DPM目标检测器由一个根滤波器和一些部件滤波器组成,组件间的形变通过隐变量进行推理.由于目标模板分辨率固定,算法采用滑动窗口策略在不同尺度和宽高比图像上搜索目标.后续工作采用不同策略加速了DPM的穷尽搜索策略.[Malisiewicz](#24)[24]提出一种简单高效的集成学习算法用于目标类别检测,该方法分别为每个正样本训练一个使用HOG特征的线性SVM,通过集成每个样本的线性SVM结果达到优良的泛化性能.[Ren](#25)[25]认为先前基于HOG特征的检测方法中HOG特征是人为设计的,判别能力弱且不直观,为此提出一种基于稀疏表达学习理论的稀疏编码直方图特征（HSC）,并用HSC代替DPM目标检测算法中HOG特征,检测准确率高于原方法.[Wang](#26)[26]为去除DPM模型需要人为指定组件个数及组件间关系和穷尽搜索的限制,提出了一种新的特征表达方式Regionlets,采用选择性搜索策略对每个候选检测包围盒进行多种区域特征的集成级联式分类.Regionlets保留了目标的空间结构关系,灵活地描述目标,包括发生形变的目标.2012年前,目标检测中分类任务的框架就是使用人为设计的特征训练浅层分类器完成分类任务,最佳算法是基于DPM框架的各种改进算法.2012年,[Krizhevsky](#27)[27]提出基于深度学习理论的深度卷积神经网（DCNN）的图像分类算法,使图像分类的准确率大幅提升,同时也带动了目标检测准确率的提升.[Szegedy](#28)[28]将目标检测问题看做目标mask的回归问题,使用DCNN作为回归器预测输入图像中目标的mask.[Erhan](#29)[29]使用DCNN对目标的包围盒进行回归预测,并给出每个包围盒包含类别无关对象的置信度.[Sermanet](#30)[30]提出一种DCNN框架OverFeat,集成了识别、定位和检测任务,为分类训练一个CNN,为每个类训练一个定位用CNN.OverFeat对输入图像采用滑动窗口策略用分类模型确定每个窗口中目标的类别,然后使用对应类别的的定位模型预测目标的包围盒,根据分类分数为每个类选出候选包围盒进行合并,得到最终的检测结果.与OverFeat不同,[R-CNN](#31)[31]采用选择性搜索策略而不是滑动窗口来提高检测效率.R-CNN利用选择性搜索方法在输入图像上选择若干候选包围盒,对每个包围盒利用CNN提取特征,输入到为每个类训练好的SVM分类器,得到包围盒属于每个类的分数.最后,R-CNN使用非极大值抑制方法（NMS）舍弃部分包围盒,得到检测结果.上述方法使用的DCNN结构基本源自Krizhevsky的7层网络结构设计,为了提高DCNN的分类和检测准确率,[Simonyan](#32)[32]和[Szegedy](#33)[33]设计了层数22层的深度卷积神经网络,采用的检测框架都类似R-CNN.目前,深度卷积神经网络是多个目标类别检测数据集上的state of the art.

#### 挑战 ####
不管是对目标实例检测或者目标类别检测,当前目标检测仍存在着挑战,总体来说,挑战性主要体现在以下两个方面：鲁棒性和计算复杂性.

目标检测的鲁棒性主要由类内表观差异和类间表观差异影响,大的类内表观差异和小的类间表观差异通常会导致目标检测方法的鲁棒性降低.类内表观差异是指同类不同个体间的变化,例如,马的不同个体在颜色、纹理、形状、姿态等方面存在差异.由于光照、背景、姿态、视点的变化和遮挡的影响,即使同一匹马在不同的图像中看起来也会非常不同,使得构建具备泛化能力的表观模型极为困难.

目标检测的计算复杂性主要源自待检测目标类别的数量、类别表观描述子的维度、大量有标签数据的获取.真实世界中物体类别数量成百上千并且表观描述子是高维度的,大量充足的有标签数据的获取极为耗时耗力,因此目标检测的计算机复杂性较高,设计高效的目标检测算法至关重要.当前部分工作提出了新的特征匹配方法和定位策略.[Dean](#34)[34]提出使用局部敏感哈希方法代替匹配中卷积核和图像间的点乘操作,可以提速近20倍.另一类计算复杂性研究方向关注如何减少目标检测时的搜索空间,这类方法统称为选择性搜索策略（Selective Search）或对象性估计（Objectess Estimation）.它们的核心思想是一张图像中并不是每个子窗口都包含有类别无关的对象,仅有少量候选窗口是目标检测时有意义的候选窗口.[选择性搜索方法](#35)[35]和[BING方法](#36)[36]是较为常用的候选窗口生成方法.

除此之外,人工标注大量目标类别检测数据是极为耗时耗力的工作,现今最为常用的目标类别检测数据集有[ImageNet](#37)[37]、[PASCAL VOC](#38)[38]、[SUN](#39)[39]和[Microsoft COCO](#40)[40]等.因此目标检测面临的两大挑战依没变,高准确率高效率的目标检测算法的设计依旧是有意义的开放性问题.

### Reference ###

<a id="1"></a>
[1] Aggarwal J K, Ryoo M S. Human activity analysis: A review[J]. ACM Computing Surveys (CSUR), 2011, 43(3): 16.<br>
<a id="2"></a>
[2] Datta R, Joshi D, Li J, et al. Image retrieval: Ideas, influences, and trends of the new age[J]. ACM Computing Surveys (CSUR), 2008, 40(2): 5.<br>
<a id="3"></a>
[3] Krüger V, Kragic D, Ude A, et al. The meaning of action: a review on action recognition and mapping[J]. Advanced Robotics, 2007, 21(13): 1473-1501.<br>
<a id="4"></a>
[4] Palmese M, Trucco A. From 3-D sonar images to augmented reality models for objects buried on the seafloor[J]. Instrumentation and Measurement, IEEE Transactions on, 2008, 57(4): 820-828.<br>
<a id="5"></a>
[5] Lowe D G. Distinctive image features from scale-invariant keypoints[J]. International journal of computer vision, 2004, 60(2): 91-110.<br>
<a id="6"></a>
[6] Ke Y, Sukthankar R. PCA-SIFT: A more distinctive representation for local image descriptors[C]//Computer Vision and Pattern Recognition, 2004. CVPR 2004.<br> Proceedings of the 2004 IEEE Computer Society Conference on. IEEE, 2004, 2: II-506-II-513 Vol. 2.<br>
<a id="7"></a>
[7] Bay H, Tuytelaars T, Van Gool L. Surf: Speeded up robust features[M]//Computer Vision–ECCV 2006. Springer Berlin Heidelberg, 2006: 404-417.<br>
<a id="8"></a>
[8] Olson C F, Huttenlocher D P. Automatic target recognition by matching oriented edge pixels[J]. Image Processing, IEEE Transactions on, 1997, 6(1): 103-113.<br>
<a id="9"></a>
[9] Gavrila D M, Philomin V. Real-time object detection for “smart” vehicles[C]//Computer Vision, 1999. The Proceedings of the Seventh IEEE International Conference on. IEEE, 1999, 1: 87-93.<br>
<a id="10"></a>
[10] Rucklidge W J. Efficiently locating objects using the Hausdorff distance[J]. International Journal of computer vision, 1997, 24(3): 251-270.<br>
<a id="11"></a>
[11] Canny J. A computational approach to edge detection[J]. Pattern Analysis and Machine Intelligence, IEEE Transactions on, 1986 (6): 679-698.<br>
<a id="12"></a>
[12] Hinterstoisser S, Lepetit V, Ilic S, et al. Dominant orientation templates for real-time detection of texture-less objects[C]//Computer Vision and Pattern Recognition (CVPR), 2010 IEEE Conference on. IEEE, 2010: 2257-2264.<br>
<a id="13"></a>
[13] Hinterstoisser S, Cagniart C, Ilic S, et al. Gradient response maps for real-time detection of textureless objects[J]. Pattern Analysis and Machine Intelligence, IEEE Transactions on, 2012, 34(5): 876-888.<br>
<a id="14"></a>
[14] Rios-Cabrera R, Tuytelaars T. Discriminatively Trained Templates for 3D Object Detection: A Real Time Scalable Approach[C]//Computer Vision (ICCV), 2013 IEEE International Conference on. IEEE, 2013: 2048-2055.<br>
<a id="15"></a>
[15] Rios-Cabrera R, Tuytelaars T. Boosting masked dominant orientation templates for efficient object detection[J]. Computer Vision and Image Understanding, 2014, 120: 103-116.<br>
<a id="16"></a>
[16] Hsiao E, Hebert M. Gradient Networks: Explicit Shape Matching Without Extracting Edges[C]//AAAI. 2013.<br>
<a id="17"></a>
[17] Hsiao E, Hebert M. Occlusion reasoning for object detection under arbitrary viewpoint[C]//Computer Vision and Pattern Recognition (CVPR), 2012 IEEE Conference on. IEEE, 2012: 3146-3153.<br>
<a id="18"></a>
[18] Hinterstoisser S, Holzer S, Cagniart C, et al. Multimodal templates for real-time detection of texture-less objects in heavily cluttered scenes[C]//Computer Vision (ICCV), 2011 IEEE International Conference on. IEEE, 2011: 858-865.<br>
<a id="19"></a>
[19] Hinterstoisser S, Lepetit V, Ilic S, et al. Model based training, detection and pose estimation of texture-less 3D objects in heavily cluttered scenes[M]//Computer Vision–ACCV 2012. Springer Berlin Heidelberg, 2013: 548-562.<br>
<a id="20"></a>
[20] Hsiao E. Addressing ambiguity in object instance detection. Doctoral dissertation, tech. report CMU-RI-TR-13-16, Carnegie Mellon University, 2013.<br>
<a id="21"></a>
[21] Viola P, Jones M. Rapid object detection using a boosted cascade of simple features[C]//Computer Vision and Pattern Recognition, 2001. CVPR 2001. Proceedings of the 2001 IEEE Computer Society Conference on. IEEE, 2001, 1: I-511-I-518 vol. 1.<br>
<a id="22"></a>
[22] Dalal N, Triggs B. Histograms of oriented gradients for human detection[C]//Computer Vision and Pattern Recognition, 2005. CVPR 2005. IEEE Computer Society Conference on. IEEE, 2005, 1: 886-893.<br>
<a id="23"></a>
[23] Felzenszwalb P F, Girshick R B, McAllester D, et al. Object detection with discriminatively trained part-based models[J]. Pattern Analysis and Machine Intelligence, IEEE Transactions on, 2010, 32(9): 1627-1645.<br>
<a id="24"></a>
[24] Malisiewicz T, Gupta A, Efros A A. Ensemble of exemplar-svms for object detection and beyond[C]//Computer Vision (ICCV), 2011 IEEE International Conference on. IEEE, 2011: 89-96.<br>
<a id="25"></a>
[25] Ren X, Ramanan D. Histograms of sparse codes for object detection[C]//Computer Vision and Pattern Recognition (CVPR), 2013 IEEE Conference on. IEEE, 2013: 3246-3253.<br>
<a id="26"></a>
[26] Wang X, Yang M, Zhu S, et al. Regionlets for generic object detection[C]//Computer Vision (ICCV), 2013 IEEE International Conference on. IEEE, 2013: 17-24.<br>
<a id="27"></a>
[27] Krizhevsky A, Sutskever I, Hinton G E. Imagenet classification with deep convolutional neural networks[C]//Advances in neural information processing systems. 2012: 1097-1105.<br>
<a id="28"></a>
[28] Szegedy C, Toshev A, Erhan D. Deep neural networks for object detection[C]//Advances in Neural Information Processing Systems. 2013: 2553-2561.<br>
<a id="29"></a>
[29] Erhan D, Szegedy C, Toshev A, et al. Scalable Object Detection using Deep Neural Networks[J]. arXiv preprint arXiv:1312.2249, 2013.<br>
<a id="30"></a>
[30] Sermanet P, Eigen D, Zhang X, et al. Overfeat: Integrated recognition, localization and detection using convolutional networks[J]. arXiv preprint arXiv:1312.6229, 2013.<br>
<a id="31"></a>
[31] Girshick R, Donahue J, Darrell T, et al. Rich feature hierarchies for accurate object detection and semantic segmentation[J]. arXiv preprint arXiv:1311.2524, 2013.<br>
<a id="32"></a>
[32] Simonyan K, Zisserman A. Very Deep Convolutional Networks for Large-Scale Image Recognition[J]. arXiv preprint arXiv:1409.1556, 2014.<br>
<a id="33"></a>
[33] Szegedy C, Liu W, Jia Y, et al. Going deeper with convolutions[J]. arXiv preprint arXiv:1409.4842, 2014.<br>
<a id="34"></a>
[34] Dean T, Ruzon M A, Segal M, et al. Fast, accurate detection of 100,000 object classes on a single machine[C]//Computer Vision and Pattern Recognition (CVPR), 2013 IEEE Conference on. IEEE, 2013: 1814-1821.<br>
<a id="35"></a>
[35] Van de Sande K E A, Uijlings J R R, Gevers T, et al. Segmentation as selective search for object recognition[C]//Computer Vision (ICCV), 2011 IEEE International Conference on. IEEE, 2011: 1879-1886.<br>
<a id="36"></a>
[36] Cheng M M, Zhang Z, Lin W Y, et al. BING: Binarized normed gradients for objectness estimation at 300fps[C]//IEEE CVPR. 2014.<br>
<a id="37"></a>
[37] ImageNet. http://image-net.org/.<br>
<a id="38"></a>
[38] PASCAL VOC. http://pascallin.ecs.soton.ac.uk/challenges/VOC/.<br>
<a id="39"></a>
[39] SUN. http://groups.csail.mit.edu/vision/SUN/.<br>
<a id="40"></a>
[40] Microsoft COCO. http://mscoco.org/.<br>