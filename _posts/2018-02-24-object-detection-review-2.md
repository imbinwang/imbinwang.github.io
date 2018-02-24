---
layout: post
title: "二维三维目标检测简要综述"
date: 2018-02-24
desc: "2D 3D Object detection survey"
keywords: "object detection"
categories: [research]
tags: [survey]
icon: fa-book
---

目标检测是计算机视觉领域中一个基础性的研究课题，其任务就是定位和分类图像中的多个物体。图像中的目标可能出现在任何位置，目标的形态可能存在各种各样的变化，图像的背景千差万别等，这些因素导致目标检测并不是一个容易解决的任务。在过去三四年里，得益于深度学习和大量标注数据，目标检测领域进展非常迅速，解决方案从非深度学习方法切换到了深度学习这样一个新的范式。从2014年开始，目标检测取得了巨大突破，涌现了两类经典的算法框架：以R-CNN为代表的结合region proposal和CNN(卷积神经网络)分类的目标检测框架(R-CNN[Girshick2014], SPP-NET[He2014], Fast R-CNN[Girshick2015], Faster R-CNN[Ren2015], Mask R-CNN[He2017])；以YOLO为代表的将定位分类问题转换为回归问题的目标检测框架(YOLO[Redmon2016], SSD[Liu2016])。第一类算法框架融合了region proposal和CNN，使端到端的网络进行目标检测实际可行，无论速度还是精度都有了很大提高，然而region proposal提取和分类的计算量仍旧较大，此类算法仍无法达到实时目标检测的要求。第二类基于位置回归的方法直接在图像的多个位置上回归出目标位置和类别，加快了检测速度，使目标检测在实际应用中成为可能。关于行人，车辆等物体的目标检测已被实际应用于安防监控，自动驾驶，增强现实等领域。2017年6月，谷歌公司发布其基于TensorFlow的目标检测应用程序接口(TensorFlow Object Detection API)，经过优化和简化的模型可以实时运行在移动智能设备上[Huang2017]。

工业界特别是制造行业，尤为关注无纹理三维物体的检测和姿态估计，对其的研究成果广泛应用于自动化，增强现实和机器人等领域。与二维目标检测相比，三维物体姿态检测和姿态估计更具挑战性，它不仅关注目标在图像平面的位置，还关心其中真实空间中的位置和姿态。在2014年之前，三维物体姿态检测和姿态估计主要基于手工设计特征和模板匹配的方法[Hinterstoisser2010, Hinterstoisser2012, Hinterstoisser2012]。此类方法采用滑动窗口方式进行搜索，并且估计的姿态来自离散采样的模板，因此在速度和精度上都亟待提高。随着无纹理三维物体姿态标注数据集[Brachmann2014, Tejani2014, Doumanoglou2016, Hodan2017]的发展，基于学习的方法逐渐成为主流，比如随机深林方法[Brachmann2014, Tejani2014, Doumanoglou2016], 卷积神经网络方法[Krull2015, Kehl2016, Kehl2017]
。此类方法在二维位置和三维位姿估计精度上要优于传统基于模板匹配的方法，但是还不能完全达到实时应用要求。

#### Reference ####

- [Girshick2014] R. Girshick, J. Donahue, T. Darrell, J. Malik. Rich Feature Hierarchies for Accurate Object Detection and Semantic Segmentation. IEEE Conference on Computer Vision and Pattern Recognition (CVPR), 2014
- [He2014] K. He, X. Zhang, S. Ren, J. Sun. Spatial Pyramid Pooling in Deep Convolutional Networks for Visual Recognition. European Conference on Computer Vision (ECCV), 2014
- [Girshick2015] R. Girshick. Fast R-CNN. IEEE International Conference on Computer Vision (ICCV), 2015
- [Ren2015] S. Ren, K. He, R. Girshick, J. Sun. Faster R-CNN: Towards Real-Time Object Detection with Region Proposal Networks. Neural Information Processing Systems (NIPS), 2015
- [He2017] K. He, G. Gkioxari, P. Dollár, and R. Girshick. Mask R-CNN. IEEE International Conference on Computer Vision (ICCV), 2017
- [Redmon2016] J. Redmon, S. Divvala, R. Girshick, A. Farhadi. You Only Look Once: Unified, Real-Time Object Detection. IEEE Conference on Computer Vision and Pattern Recognition (CVPR), 2016
- [Liu2016] W. Liu, D. Anguelov, D. Erhan, C. Szegedy, S. Reed, C. Fu, A. Berg. SSD: Single Shot MultiBox Detector. European Conference on Computer Vision (ECCV), 2016
- [Huang2017] J. Huang, V. Rathod, C. Sun, M. Zhu, A. Korattikara, A. Fathi, I. Fischer, Z. Wojna, Y. Song, S. Guadarrama, K. Murphy. Speed/accuracy Trade-offs for Modern Convolutional Object Detectors. IEEE Conference on Computer Vision and Pattern Recognition (CVPR), 2017
- [Hinterstoisser2010] S. Hinterstoisser, V. Lepetit, S. Ilic, P Fua, N Navab. Dominant Orientation Templates for Real-time Detection of Texture-less Objects. IEEE Conference on Computer Vision and Pattern Recognition (CVPR), 2010
- [Hinterstoisser2012] S. Hinterstoisser, C. Cagniart, S. Ilic, P. Sturm, N. Navab, P. Fua, V. Lepetit. Gradient Response Maps for Real-time Detection of Textureless Objects. IEEE Transactions on Pattern Analysis and Machine Intelligence, Vol.34, No.5, pp. 876-888 (2012).
- [Hinterstoisser2012] S. Hinterstoisser, V. Lepetit, S. Ilic, S. Holzer, G. Bradski, K. Konolige, N. Navab. Model Based Training, Detection and Pose Estimation of Texture-less 3D Objects in Heavily Cluttered Scenes. Asian Conference on Computer Vision (ACCV), 2012
- [Brachmann2014] E. Brachmann, A. Krull, F. Michel, S. Gumhold, J. Shotton, C. Rother. Learning 6D Object Pose Estimation Using 3D Object Coordinates. European Conference on Computer Vision (ECCV), 2014
- [Tejani2014] A. Tejani, D. Tang, R. Kouskouridas, T. Kim. Latent-Class Hough Forests for 3D Object Detection and Pose Estimation. European Conference on Computer Vision (ECCV), 2014
- [Doumanoglou2016] A. Doumanoglou, R. Kouskouridas, S. Malassiotis, T. Kim. Recovering 6D Object Pose and Predicting Next-Best-View in the Crowd. IEEE Conference on Computer Vision and Pattern Recognition (CVPR), 2016
- [Hodan2017] T. Hodan, P. Haluza, S. Obdrzalek, J. Matas, M. Lourakis, X. Zabulis. T-LESS: An RGB-D Dataset for 6D Pose Estimation of Texture-less Objects. IEEE Winter Conference on Applications of Computer Vision (WACV), 2017,
- [Krull2015] A. Krull, E. Brachmann, F. Michel, M. Yang, S. Gumhold, C. Rother. Learning Analysis-by-Synthesis for 6D Pose Estimation in RGB-D Images. IEEE International Conference on Computer Vision (ICCV), 2015
- [Kehl2016] W. Kehl, F. Milletari, F. Tombari, N. Navab. Deep Learning of Local RGB-D Patches for 3D Object Detection and 6D Pose Estimation. European Conference on Computer Vision (ECCV), 2016
- [Kehl2017] W. Kehl, F. Manhardt, F. Tombari, S. Ilic, N. Navab. SSD-6D: Making RGB-Based 3D Detection and 6D Pose Estimation Great Again. IEEE International Conference on Computer Vision (ICCV), 2017
