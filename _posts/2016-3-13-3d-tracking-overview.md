---
layout: post
title: 基于视觉的三维目标跟踪简要综述
comments: true
---

基于视频图像的三维目标跟踪一直是计算机视觉的重要组成部分，是智能视频监控、机器人、增强现实，人机交互等方面的关键技术二维目标跟踪旨在从视频或图像序列中计算目标物体的位置、形状或区域等信息。与二维目标跟踪主要计算目标物体在图像平面的投影信息不同，三维目标跟踪需要连续估计物体相对于相机的空间关系（旋转和位置）。作为计算机视觉领域的研究热点，根据目标物体的类型（刚体，非刚体和连接体），相机或物体的自由度和应用场景，已有大量研究工作发表[Lepetit2005]。

<!--more-->

根据目标物体的物理属性的差异，三维目标跟踪算法的复杂程度往往不同。对于非刚体[Pilet2008, Salzmann2008, Murphy-Chutorian2009]、连接体[Erol2007, Tang2014, Michel2015]，三维目标跟踪算法涉及大量姿态参数的计算，而且应用场景特定，本文主要关注刚体的三维跟踪，即计算目标物体相对相机旋转和位置6自由度姿态参数。

常见的刚体的三维跟踪算法主要解决两个问题：三维物体或三维平面上的点与图像上点的对应（3D-2D correspondence），准确的姿态求解和优化。对于第二个问题，根据不同的姿态描述（欧拉角，四元数或李代数）[Lepetit2005]，目前主要通过Livenberge-Marquardt（LM）算法或李代数的方法求解，这两种方法在实际应用中都可以较好地得到物体的姿态。因此三维目标跟踪的主要问题集中在如何鲁棒地寻找三维物体上的点在图像上的对应位置（3D-2D correspondence）。根据不同应用场景的需求，三维目标跟踪又可以分为基于标志物的三维跟踪[Kato1999]，基于特征的三维跟踪[Vacchetti2004, Hinterstoisser2007, Kim2010]和基于模型的三维跟踪[Harris2002, Drummond2002, Prisacariu2012, Seo2014]。

基于标志物的三维目标跟踪通过使用预先设计好的标志物，可以快速准确计算真实标志物和图像标志物的点对应关系，进而准确获得物体的三维姿态。尽管基于标志物的三维目标跟踪比较简单，也比较鲁棒，但由于其需要在场景中增加额外的标志物，同时要求标志物在整个跟踪过程中可见，从而限制了其应用场景，因此从物体本身提取的特征进行三维跟踪是更为自然的形式。

基于特征的三维目标跟踪是三维跟踪最重要的一种方式，常用的有基于模板以及基于特征点的跟踪方式。基于模板的方式直接把物体的原始像素作为特征，通过Lucas-Kanade算法进行模板之间的准确匹配来求得目标的三维姿态，虽然基于模板的方式可以得到准确的姿态信息，但由于直接采用物体的像素值作为特征，因此不能很好的处理遮挡、光照变化等情况，所以目前基于特征的三维跟踪更多的采用的基于特征点的跟踪方式。图像特征点是图像中的局部特征，常用的有SIFT，SURF，FAST等。其中SIFT特征由于其具有尺度和旋转不变性，因此广泛应用于特征跟踪领域。尽管基于特征点的三维目标跟踪可以鲁棒地跟踪物体，但由于需要提取物体的特征点，因此基于特征的跟踪只能应用于纹理信息丰富的物体。对于纹理不丰富或无纹理的物体，基于特征点的跟踪方法失效。为了解决无纹理物体的三维跟踪，研究人员提出了基于三维模型的三维跟踪方式。

基于模型的三维跟踪[Harris2002, Drummond2002, Prisacariu2012, Seo2014]主要针对无纹理或纹理信息较少的物体。由于缺乏纹理信息，因此基于模型的跟踪需要预先建模物体的三维模型，所幸目前三维模型的获取已经比较便捷，比如使用Kinect Fusion[Izadi2011]或通过Maya、3D Max建模等，因此目前此类方法被广泛研究。早在20世纪80年代，Harris等人[Harris1990]就提出了经典的RAPiD方法，通过对齐三维物体的边缘信息计算物体的姿态，随后多种算法基于此框架进行了改进，包括基于多边假设的方法[Vacchetti2004, Wust2005]， 和基于多姿态假设的方法[Klein2006, Brown2012]等。然而这类方法在复杂环境下几乎不能稳定工作。复杂环境下，物体在图像上的轮廓边或环境中的嘈杂的背景边缘融为一体，难以正确分辨。针对复杂环境下的无纹理三维目标跟踪，Seo等[Seo2014]通过直方图建模的方式寻找三维物体上的点在图像上的对应位置，进而进行物体跟踪。他们的方法在计算对应点时独立考虑每一个点，忽略邻域点之间的依赖关系，对于几何机构复杂的物体容易跟踪失败。Wang等[Wang2015]通过建立邻近候选对应点之间的约束关系，构建了一个有向无环图，然后通过动态规划求解三维目标物体在图像上的对应点，最后通过LM算法求解获得物体的姿态。2012年以来，深度学习技术在计算机视觉多个领域取得了突破性进展，例如图像识别[Krizhevsky2012]，目标检测[Girshick2015, Ren2015]和图像分割[Long2015]等。基于深度神经网络分层的特征学习和强大的映射表达能力，Crivellaro等[Crivellaro2015]将刚体分成多个子部件，为每个子部件定义三维控制点，然后利用卷积神经网预测控制点在图像上的投影点的位置。在得到3D-2D Correspondences后，利用鲁棒地优化算法求解物体的姿态参数。

#### Reference ####

- Vincent Lepetit, Pascal Fua, Monocular Model-Based 3D Tracking of Rigid Objects: A Survey. Foundations and Trends in Computer Graphics and Vision 1(1), 2005
- Julien Pilet, Vincent Lepetit, Pascal Fua, Fast Non-Rigid Surface Detection, Registration and Realistic Augmentation. International Journal of Computer Vision 76(2): 109-122, 2008
- Mathieu Salzmann, Francesc Moreno-Noguer, Vincent Lepetit, Pascal Fua, Closed-Form Solution to Non-rigid 3D Surface Registration. ECCV (4): 581-594, 2008
- Erik Murphy-Chutorian, Mohan M. Trivedi, Head Pose Estimation in Computer Vision: A Survey. IEEE Trans. Pattern Anal. Mach. Intell. 31(4): 607-626, 2009
- Ali Erol, George Bebis, Mircea Nicolescu, Richard D. Boyle, Xander Twombly, Vision-based hand pose estimation: A review. Computer Vision and Image Understanding 108(1-2): 52-73, 2007
- Danhang Tang, Hyung Jin Chang, Alykhan Tejani, Tae-Kyun Kim, Latent Regression Forest: Structured Estimation of 3D Articulated Hand Posture. CVPR: 3786-3793, 2014
- Frank Michel, Alexander Krull, Eric Brachmann, Michael. Y. Yang, Stefan Gumhold, Carsten Rother, Pose Estimation of Kinematic Chain Instances via Object Coordinate Regression. BMVC 2015.
- H. Kato, M. Billinghurst, Marker tracking and hmd calibration for a video-based augmented reality conference system. IEEE and ACM International Symposium on Mixed and Augmented Reality, pp.85-94, 1999.
- L. Vacchetti, V. Lepetit, P. Fua, stable real-time 3d tracking using online and offline information. IEEE Transactions on Pattern Analysis and Machine Intelligence, 26(10):1385-1391, 2004.
- S. Hinterstoisser, S. Benhimane, N. Navab, N3m: natural 3d markers for real-time object detection and pose estimation. ICCV, 1-7, 2007.
- K. Kim, V. Lepetit, W. Woo, Scalable real-time planar targets tracking for digilog books, The Visual Computer, 26(6-8):1145-1154, 2010.
- C. Harris, C. Stennett, Rapid: A video-rate object tracker. BMVC, 73-77, 1990.
- T. Drummond, R. Cipolla, Real-time visual tracking of complex structures. IEEE Transactions on Pattern Analysis and Machine Intelligence, 24(7):932-946, 2002.
- B. Seo, H. Park, J. Park, S. Hinterstoisser, S. Llic, Optimal local searching for fast and robust texture-less 3d object tracking in highly cluttered backgrounds. IEEE Transactions on Visualization and Computer Graphics, 20(1):99-110, 2014.
- V. A. Prisacariu, I. D. Reid, Pwp3d: Real-time segmentation and tracking of 3d objects. International Journal of Computer Vision, 98(3):335-354, 2012.
- S. Izadi, D. Kim and O. Hilliges, et. al, Kinectfusion: Real-time 3d reconstruction and interaction using a moving depth camera. ACM Symposium on User Interface Software and Technology, 2011.
- H. Wust, F. Vial, D. Stricker, Adaptive line tracking with multiple hypotheses for augmented reality, 62-69, 2005.
- L. Vacchetti, V. Lepetit, P. Fua, Combing edge and texture information for real-time accurate 3d camera tracking. IEEE and ACM International Symposium on Mixed and Augmented Reality, 48-56, 2004.
- G. Klein, D. Murray, Full-3d edge tracking with a particle filter. BMVC, 114:1-10, 2006.
- J. Brown, D. Capson, A framework for 3d model based visual tracking using a gpu-accelerated particle filter. IEEE Transactions on Visualization and Computer Graphics, 18(1):68-80, 2012.
- G. Wang, B. Wang, F. Zhong, X. Qin, B. Chen, Global optimal searching for textureless 3d object tracking. The Visual Computer, 31(6-8): 979-988, 2015.
- A. Krizhevsky, I. Sutskever, and G. E. Hinton, Imagenet classification with deep convolutional neural networks. Advances in Neural Information Processing Systems, 1097–1105, 2012.
- R. Girshick, Fast R-CNN, International Conference on Computer Vision, 2015.
- S. Ren, K. He, R. Girshick, J. Sun, Faster R-CNN: Towards real-time object detection with region proposal networks. Neural Information Processing Systems, 2015.
- J. Long, E. Shelhamer, and T. Darrell, Fully convolutional networks for semantic segmentation. IEEE Conference on Computer Vision and Pattern Recognition, 2015.
- A. Crivellaro, M. Rad, Y. Verdie, et al. A novel representation of parts for accurate 3d object detection and tracking in monocular images. IEEE International Conference on Computer Vision, 4391-4399, 2015.
