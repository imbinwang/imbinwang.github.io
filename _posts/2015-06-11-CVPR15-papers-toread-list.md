---
layout: post
title: CVPR15 Papers To-Read List (Updating)
---

CVPR15会议论文正式在[官网](http://www.pamitc.org/cvpr15/program.php)公布,今年共录用了602篇论文（录用率28.4%），其中有71篇oral文章（3.3%）。

<!--more-->

官方根据topic大致划分了以下7个session：

* [Session 1A](#s1a): 
	* CNN Architectures
	* Depth and 3D Surfaces
* Session 1B: 
	* Discovery and Dense Correspondences
	* 3D Shape: Matching, Recognition, Reconstruction
* Session 2A:
	* Images and Language
	* Multiple View Geometry
* Session 2B:
	* Segmentation in Images and Video
	* 3D Models and Images
* Session 3A:
	* Action and Event Recognition
	* Computational Photography
* Session 3B:
	* Learning and Matching Local Features
	* Image and Video Processing and Restoration
* Plenary Session:
	* Invited Speaker: Yann LeCun - What's Wrong with Deep Learning?
	* Invited Speaker: Jack L. Gallant - Reverse Engineering the Human Visual System

<a id="s1a"></a>

### Session 1A ###

#### CNN Architectures, Depth and 3D Surfaces ###
1. **Going Deeper With Convolutions (oral)**
	* 作者：Christian Szegedy(Google), Yangqing Jia(Google)
    * 摘要：本文提出一种针对计算机视觉的高效深度神经网络结构“Inception”，通过改进神经网络的结构达到不增加计算资源需求的前提下提高网络的深度。
	* 关键词：深度学习，卷积神经网络
2. Propagated Image Filtering
	* 作者：Jen-Hao Rick Chang(CMU)
    * 摘要：本文提出一种新颖的保留上下文信息的图像滤波器“propagation filter”，集合了“bilateral filter”和“geodesic filter”的优势，并进一步提高图像滤波结果的质量。
	* 关键词：图像滤波
3. Web Scale Photo Hash Clustering on A single Machine
	* 作者：Yunchao Gong(Facebook)
    * 摘要：本文提出一种大规模图像集聚类算法，首先将图像表示为“相似性保留二进制编码”，接下来改进kmeans实现二进制编码的聚类（Bkmeans）,聚类中心可以用来加速多索引的哈希表查找。
	* 关键词：哈希编码，图像聚类
4. Expanding Object Detector's Horizon: Incremental Learning framework for Object Detection in Videos
	* 作者：Alina Kuznetsova(Leibniz University Hannover)
    * 摘要：本文提出一种增量式学习方法，可以将从静态图像集学习到目标检测器迁移到无标签视频集。
	* 关键词：迁移学习，在线学习
5. Supervised Discrete Hashing
	* 作者：Fumin Shen(University of Electronic Science and Technology of China)
    * 摘要：本文提出一种有监督哈希编码学习框架，旨在直接产生二进制哈希编码同时考虑离散约束，整个框架学习编码映射函数和最优线性分类器。
	* 关键词：哈希编码，离散优化
6. What do 15,000 Object Categories Tell Us About Classifying and Localizing Actions?
	* 作者：Mihir Jain(University of Amsterdam)
    * 摘要：本文提出一种猜想并验证：视频中物体类别识别有助于视频中的动作识别。基于CNN该方法计算每一帧上15K类物体出现的概率，物体运动轨迹作为动作的描述特征。
	* 关键词：动作识别，卷积神经网络，迁移学习
7. Landmarks-Based Kernelized Subspace Alignment for Unsupervised Domain Adaptation
	* 作者：Rahaf Aljundi(LaHC)
    * 摘要：本文提出一种领域自适应算法（迁移学习），源领域数据点集和目标数据点集来自不同的分布函数，该方法通过选择选择标志性数据点，然后利用高斯核函数将两类点集非线性映射到同一（由标志性数据点张成的）空间，最后使用线性变换对齐源数据和目标数据空间。
	* 关键词：迁移学习，子空间
8. Blur Kernel Estimation Using Normalized Color-Line Prior
	* 作者：Wei-Sheng Lai(National Taiwan University)
    * 摘要：本文提出一种单图模糊核估计算法，采用归一化颜色线（Normalized Color-line）先验恢复出图像锐利的边缘同时不改变边缘结构，不增强噪声。
	* 关键词：图像滤波，图像去噪
9. A Light Transport Model for Mitigating Multipath Interference in Time-of-Flight Sensors
	* 作者：Nikhil Naik(MIT Media Lab)
    * 摘要：本文为Time-of-flight传感器深度测量提出一种多传播路径推理方法。由于凹面或子表面散射等原因，TOF传感器发出一次信号后，同一传感单元会接收到多个反射信号，该方法利用光学电子学方面的修改为传感器推测最优的信号传播路径。（--！原理一点没看懂）
	* 关键词：TOF传感器，深度图修复
10. Traditional Saliency Reloaded: A Good Old Model in New Shape
	* 作者：Simone Frintrop(University of Bonn, Germany)
    * 摘要：本文基于传统的生物学启发的显著性模型提出重要的改进方法，引入成对图像金字塔来计算高斯差分。该方法结构一致快速地计算像素级别的显著性。
	* 关键词：图像显著性
11. Automatic Construction Of Robust Spherical Harmonic Subspaces
	* 作者：Patrick Snape(Imperial College London)
    * 摘要：本文提出一种使用阴影线索从大量未标定图像集恢复三维形状的算法，利用图像数据的低维子空间性质和光度立体视觉。
	* 关键词：形状重建，光度立体视觉
12. Leveraging Stereo Matching With Learning-Based Confidence Measures
	* 作者：Min-Gyu Park(Gwangju Institute of Science and Technology, South Korea)
    * 摘要：放弃。
	* 关键词：立体匹配
13. Saliency Detection via Cellular Automata 
	* 作者：Yao Qin(Dalian University of Technology)
    * 摘要：利用细胞自动机作为传播机制检测显著性对象。
	* 关键词：图像显著性
14. Efficient Sparse-to-Dense Optical Flow Estimation Using a Learned Basis and Layers
	* 作者：Jonas Wulff(Max Planck Institute for Intelligent Systems, Germany)
    * 摘要：图像块上的快速光流估计，利用PCA学习到的线性空间上的光流场基，然后分块重建光流场。
	* 关键词：光流
15. Learning Multiple Visual Tasks While Discovering Their Structure
	* 作者：Carlo Ciliberto(Istituto Italiano di Tecnologia)
    * 摘要：多任务间知识结构未知情况下，利用矩阵再生核学习并利用多任务间的稀疏关联性。（太理论了：O）
	* 关键词：多任务学习
16. Projection Metric Learning on Grassmann Manifold With Application to Video Based Face Recognition
	* 作者：Zhiwu Huang(Chinese Academy of Sciences)
    * 摘要：放弃，太理论，被专有名词吓到了 ：D。
	* 关键词：度量学习，人脸识别
17. Structural Sparse Tracking
	* 作者：Tianzhu Zhang(Chinese Academy of Sciences)
    * 摘要：粒子滤波框架下候选粒子可以被字典全局稀疏表达，或局部稀疏表达，或结构性稀疏表达。本文提出结构性稀疏表达，将原有最小化$l_1$改变为$l_{2,1}$最小化，完成目标跟踪问题。
	* 关键词：目标跟踪，稀疏表达
18. Data-Driven Depth Map Refinement via Multi-Scale Sparse Representation
	* 作者：Hyeokhyen Kwon(KAIST)
    * 摘要：基于多尺度稀疏表达的深度图修复。
	* 关键词：深度图修复，稀疏表达
19. Uncalibrated Photometric Stereo Based on Elevation Angle Recovery From BRDF Symmetry of Isotropic Materials
	* 作者：Feng Lu(The University of Tokyo, Japan)
    * 摘要：放弃，光照估计。
	* 关键词：光度立体视觉
20. Attributes and Categories for Generic Instance Search From One Example
	* 作者：Ran Tao(University of Amsterdam)
    * 摘要：放弃。
	* 关键词：物体实例搜索
21. Heat Diffusion Over Weighted Manifolds: A New Descriptor for Textured 3D Non-Rigid Shapes
	* 作者：Mostafa Abdelrahman(Assiut University)
    * 摘要：本文提出一种新的有纹理3D非刚体形状描述子（Weighted Heat Kernel Signature）。算法细节不知所云。
	* 关键词：形状描述子，形状匹配和检索
22. A Dynamic Programming Approach for Fast and Robust Object Pose Recognition From Range Images
	* 作者：Christopher Zach(Toshiba Research Europe Ltd)
    * 摘要：深度图上的物体识别和姿态估计。算法细节不知所云。
	* 关键词：姿态估计，深度图
23. Beyond Gaussian Pyramid: Multi-Skip Feature Stacking for Action Recognition
	* 作者：Zhenzhong Lan(CMU)
    * 摘要：本文提出一种视频特征增强技术MIFS（Multi-skip Feature Stacking），堆叠不同帧率下抽取的视频特征，与其他传统方法的不同之处在于其不是指抽取单一尺度下的视频特征，而是采用跳帧的方式抽取不同帧率下的视频特征。
	* 关键词：视频特征描述子，动作识别
24. A Geodesic-Preserving Method for Image Warping
	* 作者：Dongping Li(Zhejiang University)
    * 摘要：通过图像变形得到的全景图或广角图像会保直线，而本文提出一种保测地线的图像变形方法。
	* 关键词：图像变形
25. Shape Driven Kernel Adaptation in Convolutional Neural Network for Robust Facial Traits Recognition
	* 作者：Shaoxin Li(Chinese Academy of Sciences)
    * 摘要：本文显示地向CNN架构中注入手工设计的形状信息（卷积核）来达到学习不变特征的目的，虽然更深更大的卷积神经网络能学到这些形状信息，作者觉得结合具体的领域知识可以避免使用更深更大的网络。
	* 关键词：卷积神经网络，人脸特征点识别
26. From Categories to Subcategories: Large-Scale Image Classification With Partial Class Label Refinement
	* 作者：Marko Ristin(ETH Zurich)
    * 摘要：放弃。
	* 关键词：卷积神经网络
27. Combination Features and Models for Human Detection
	* 作者：Yunsheng Jiang(Peking University)
    * 摘要：为了提高行人检测的泛化性能，本文集成了多个特征:颜色直方图（HOC）,条形特征（HOB）和梯度直方图（HOG）。
	* 关键词：行人检测，多特征集成
28. **Improving Object Detection With Deep Convolutional Networks via Bayesian Optimization and Structured Prediction (oral)**
	* 作者：Yuting Zhang(Zhejiang University)
    * 摘要：提升目标检测算法RCNN。
	* 关键词：目标检测
29. A Metric Parametrization for Trifocal Tensors With Non-Colinear Pinholes
	* 作者：Spyridon Leonardos(University of Pennsylvania)
    * 摘要：放弃。
	* 关键词：三视图几何
30. An Efficient Volumetric Framework for Shape Tracking (**oral**)
	* 作者：Benjamin Allain(Grenoble Universities, France)
    * 摘要：放弃。
	* 关键词：3D体素化表示，形状跟踪
31. Structured Sparse Subspace Clustering: A Unified Optimization Framework
	* 作者：Chun-Guang Li(Beijing University of Posts and Telecommunications)
    * 摘要：放弃。
	* 关键词：子空间聚类，结构稀疏
32. Delving Into Egocentric Actions
	* 作者：Yin Li(Beijing University of Posts and Telecommunications)
    * 摘要：放弃。
	* 关键词：第一人称视频动作识别
33. Latent Trees for Estimating Intensity of Facial Action Units
	* 作者：Sebastian Kaltwang(Imperial College London)
    * 摘要：放弃。
	* 关键词：图模型，人脸动作单元强度估计
34. Robust Regression on Image Manifolds for Ordered Label Denoising
	* 作者：Hui Wu(University of North Carolina at Charlotte)
    * 摘要：在通过众包或多传感器方式采集有标签大规模数据集时，标签的精度往往并非完美。本文提出一种基于Hessian正则化和$l_{1}$损失最小化的标签去噪方法。
	* 关键词：低秩近似
35. Privacy Preserving Optics for Miniature Vision Sensors 
	* 作者：Francesco Pittaluga(University of Florida)
    * 摘要：新的微缩视觉传感器，在捕获时加密，而不像传统传感器捕获原始信息后再加密。
	* 关键词：隐私保留传感器
36. **Deep Transfer Metric Learning**
	* 作者：Junlin Hu(Nanyang Technological University, Singapore)
    * 摘要：本文提出一种基于深度神经网络的迁移度量学习方法，能够类内样本的紧致性和类间样本的可分性。
	* 关键词：度量学习，迁移学习，深度神经网络
37. Small-Variance Nonparametric Clustering on the Hypersphere (**oral**)
	* 作者：Julian Straub(CSAIL, MIT)
	* 摘要：放弃。
	* 关键词：聚类
38. **DynamicFusion: Reconstruction and Tracking of Non-Rigid Scenes in Real-Time (oral & Best Paper Award)**
	* 作者：Richard Newcombe(University of Washington)
	* 摘要：KinectFusion加强版，增加动态场景实时重建的功能。
	* 关键词：3D扫描，实时3D重建
39. **Reliable Patch Trackers: Robust Visual Tracking by Exploiting Reliable Patches**
	* 作者：Yang Li(Zhejiang University)
	* 摘要：传统的跟踪算法中目标都是用bounding box表示，其中包含了背景信息，会退化跟踪算法的性能。本文提出一种新颖的基于图像块的跟踪算法，旨在识别和利用目标内部可靠的利于跟踪的图像块。
	* 关键词：目标跟踪
40. Predicting Eye Fixations Using Convolutional Neural Networks
	* 作者：Nian Liu(Northwestern Polytechnical University)
	* 摘要：利用CNN预测眼注视点。
	* 关键词：卷积神经网络，图像显著性
41. Kernel Fusion for Better Image Deblurring
	* 作者：Long Mai(Portland State University)
	* 摘要：放弃。
	* 关键词：图像去噪
42. Direction Matters: Depth Estimation With a Surface Normal Classifier
	* 作者：Christian Hane(ETH, Zurich)
	* 摘要：放弃。
	* 关键词：单图深度估计
43. **Modeling Local and Global Deformations in Deep Learning: Epitomic Convolution, Multiple Instance Learning, and Sliding Window Detection (oral)**
44. Grasp Type Revisited: A Modern Perspective on a Classical Feature for Vision
45. Learning Hypergraph-Regularized Attribute Predictors
46. A Coarse-to-Fine Model for 3D Pose Estimation and Sub-Category Recognition
47. **Deep Neural Networks Are Easily Fooled: High Confidence Predictions for Unrecognizable Images (oral)**
48. **Deformable Part Models are Convolutional Neural Networks**
49. **Hypercolumns for Object Segmentation and Fine-Grained Localization (oral)**
50. Mapping Visual Features to Semantic Profiles for Retrieval in Medical Imaging
51. Event-Driven Stereo Matching for Real-Time 3D Panoramic Vision
52. Graph-Based Simplex Method for Pairwise Energy Minimization With Binary Variables
53. Image Denoising via Adaptive Soft-Thresholding Based on Non-Local Samples
54. **3D Scanning Deformable Objects With a Single RGBD Sensor (oral)**
55. Nested Motion Descriptors
56. Efficient Minimal-Surface Regularization of Perspective Depth Maps in Variational Stereo
57. Maximum Persistency via Iterative Relaxed Inference With Graphical Models
58. **Deep Hierarchical Parsing for Semantic Segmentation**
59. Designing Deep Networks for Surface Normal Estimation
60. Layered RGBD Scene Flow Estimation
61. Hashing with Binary Autoencoders
62. SUN RGB-D: A RGB-D Scene Understanding Benchmark Suite (**oral**)
63. Collaborative Feature Learning From Social Media
64. Diversity-Induced Multi-View Subspace Clustering
65. Building a Bird Recognition App and Large Scale Dataset With Citizen Scientists: The Fine Print in Fine-Grained Dataset Collection
66. Early Burst Detection for Memory-Efficient Image Retrieval
67. Indoor Scene Structure Analysis for Single Image Depth Estimation
68. Light Field Layer Matting
69. Depth Camera Tracking With Contour Cues
70. Radial Distortion Homography
71. Efficient Object Localization Using Convolutional Networks
72. Just Noticeable Defocus Blur Detection and Estimation
73. How Do We Use Our Hands? Discovering a Diverse Set of Common Grasps
74. Rotating Your Face Using Multi-Task Deep Neural Network
75. **Is Object Localization for Free? - Weakly-Supervised Learning With Convolutional Neural Networks**
76. Super-Resolution Person Re-Identification With Semi-Coupled Low-Rank Discriminant Dictionary Learning
77. Dual Domain Filters Based Texture and Structure Preserving Image Non-Blind Deconvolution
78. Region-Based Temporally Consistent Video Post-Processing
79. Global Refinement of Random Forest
80. **Adaptive Region Pooling for Object Detection**
81. Discriminative and Consistent Similarities in Instance-Level Multiple Instance Learning
82. MUlti-Store Tracker (MUSTer): A Cognitive Psychology Inspired Approach to Object Tracking
83. Finding Action Tubes
84. Learning a Convolutional Neural Network for Non-Uniform Motion Blur Removal
85. Complexity-Adaptive Distance Metric for Object Proposals Generation 
86. High-Fidelity Pose and Expression Normalization for Face Recognition in the Wild
87. Transformation of Markov Random Fields for Marginal Distribution Estimation
88. Sparse Convolutional Neural Networks
89. FaceNet: A Unified Embedding for Face Recognition and Clustering
90. Cascaded Hand Pose Regression
91. **Cross-Scene Crowd Counting via Deep Convolutional Neural Networks**
92. The Application of Two-Level Attention Models in Deep Convolutional Neural Network for Fine-Grained Image Classification
93. **End-to-End Integration of a Convolution Network, Deformable Parts Model and Non-Maximum Suppression**
94. A Mixed Bag of Emotions: Model, Predict, and Transfer Emotion Distributions
95. Neuroaesthetics in Fashion: Modeling the Perception of Fashionability
96. **Part-Based Modelling of Compound Scenes From Images (oral)**
97. Efficient Parallel Optimization for Potts Energy With Hierarchical Fusion
98. Pooled Motion Features for First-Person Videos
99. Functional Correspondence by Matrix Completion
100. Elastic-Net Regularization of Singular Values for Robust Subspace Learning
101. Hardware Compliant Approximate Image Codes
102. Photometric Refinement of Depth Maps for Multi-Albedo Objects
103. Predicting the Future Behavior of a Time-Varying Probability Distribution
104. **Classifier Based Graph Construction for Video Segmentation**
105. ActivityNet: A Large-Scale Video Benchmark for Human Activity Understanding
106. Mid-Level Deep Pattern Mining
107. Prediction of Search Targets From Fixations in Open-World Settings
108. **Understanding Image Representations by Measuring Their Equivariance and Equivalence (oral)**
109. Effective Learning-Based Illuminant Estimation Using Simple Features
110. PAIGE: PAirwise Image Geometry Encoding for Improved Efficiency in Structure-From-Motion
111. Dense, Accurate Optical Flow Estimation With Piecewise Parametric Model
112. Single-Image Estimation of the Camera Response Function in Near-Lighting
113. Multispectral Pedestrian Detection: Benchmark Dataset and Baseline
114. A Low-Dimensional Step Pattern Analysis Algorithm With Application to Multimodal Retinal Image Registration
115. Bilinear Heterogeneous Information Machine for RGB-D Action Recognition
116. MRF Optimization by Graph Approximation
117. SALICON: Saliency in Context
118. **Weakly Supervised Object Detection With Convex Clustering**
119. Interleaved Text/Image Deep Mining on a Very Large-Scale Radiology Database
120. Learning Semantic Relationships for Better Action Retrieval in Images
121. Hierarchical Recurrent Neural Network for Skeleton Based Action Recognition