---
layout: post
title: "Deep Learning Trends for Computer Vision"
date: 2016-03-13
desc: "Deep Learning Trends for Computer Vision"
keywords: "deep learning, computer vision"
categories: [research]
tags: [deep learning, computer vision, survey]
icon: fa-book
---
深度学习是近年来人工智能领域取得的重要突破。深度学习的本质是通过多层非线性变换从大数据中自动学习不同抽象层次的特征，从而替代手工设计。深层的结构使深度学习具有极强的表达能力和学习能力，尤其擅长提取复杂的全局特征和上下文信息，而这是浅层模型难以做到的。2006年，欣顿[Hinton2006]提出了深度学习。2012年，欣顿的研究小组采用深度学习赢得了ImageNet[Deng2009]图像分类比赛的冠军[Krizhevsky2012]，震惊了计算机界，引发了深度学习的热潮。谷歌、微软、脸谱和百度等互联网公司也投入大量精力研究深度学习技术，构建了相应的数据处理平台。现有的深度学习模型属于神经网络，试图通过模拟大脑认知的机理解决各种机器学习问题。近几年深度学习与计算机视觉的结合使得识别类视觉任务有了重大的突破，而其他的如三维类视觉任务近些年也日趋成熟。计算机视觉的应用前景是十分广泛的，对未来产生的影响也可能是革命性的，计算机视觉和深度学习将会是信息时代下一个大事件。

通过增加网络结构的深度，并提出新的训练优化算法，深度学习的特征学习和表达能力不断增强。2012年欣顿的研究小组利用卷积网络AlexNet[Krizhevsky2012] 把ImageNet ILSVRC图像分类任务的错误率降到了15.315%，AlexNet使用7层网络结构。在ImageNet ILSVRC2014比赛中，获胜者GooLeNet[Szegedy2015]将错误率降到了6.656%。GooLeNet突出的特点是大大增加了卷积网络的深度，超过了20层。深层的网络结构给预测误差的反向传播带了困难，预测误差是从最顶层传到底层的，传到底层的误差很小，难以驱动底层参数的更新。GooLeNet采取的策略是将监督信号直接加到多个中间层，这意味着中间层和底层的特征表示也要能够对训练数据进行准确分类。在最新一届ImageNet ILSVRC 2015比赛中，微软研究院团队摘得了ImageNet的桂冠，他们使用了一个深层残差系统[He2015]来指导神经网络结构的设计，图像识别任务的错误率已经低至3.57%。目前普遍使用的神经网络层级能够达到20到30层，在此次挑战赛中该团队应用的神经网络系统实现了152层，过去设计和训练这种很深的神经网络根本不可想象。微软通过使用深度残差网络，可以在不需要时跳过某些层级，而需要用到时又可以重新拾回，其中最重要的突破在于残差学习重构了学习的过程，并重新定向了深层神经网络中的信息流，很好地解决了此前深层神经网络层级与准确度之间的矛盾。

计算机视觉问题通常包含多个任务，同时解决多任务往往能取得更优的效果，目标检测任务就包含目标识别和目标定位两个任务。多任务神经网络理论上可以得到更加具有表现力的特征，同时也能使各个任务不用单独训练网络参数而共享网络参数。2013年，ImageNet ILSVRC比赛的组织者增加了物体检测的任务，要求在4万张互联网图片中检测200类物体。比赛获胜者使用的是手动设计的特征，平均物体检测率只有22.581%。在ILSVRC 2014中，深度学习将平均物体检测率提高到了43.933%。后续较有影响力的工作包括R-CNN [Girshick2014], Fast R-CNN[Girshick2015], Faster R-CNN [Ren2015]等。R-CNN首次提出了被广泛采用的基于深度学习的物体检测流程，并首先采用非深度学习方法提出候选区域，利用深度卷积网络从候选区域提取特征，然后利用支持向量机等线性分类器基于特征将区域分为物体和背景。Fast R-CNN, Faster R-CNN进一步在改进R-CNN的网络结构，将候选检测区域的提取和分类统一到了单一的卷积网络架构，并利用多任务学习机制完成网络参数的学习，同时提升了物体检测的效率和准确度。

在计算机视觉的不同领域，深度学习技术和领域知识的融合为视觉感知任务提供了新的思路。深度模型一个重要优点是从像素级原始数据到抽象的语义概念逐层提取信息，这使得它在提取图像的全局特征和上下文信息方面具有突出的优势，为解决逐像素标记任务（例如图像分割）带来了 突破。全卷积网络[Long2015]接受任意大小的图像作为输入，推理计算对应大小的输出，完成端到端、像素到像素的预测任务。CRFasRNN[Zheng2015]和DeepLab-CRF-Attention[Chen2015]利用全卷积网络预测分割置信图，然后将将概率图模型以全连接条件随机场（Fully Connected Conditional Random Field）或再现神经网络（Recurrent Neural Network）的形式融合到网络结构中，优化分割置信图。

近些年深度学习技术在三维类视觉任务也日趋成熟。Wu等[Wu2015]提出使用深度置信网络（DBN）将三维形状表示成三维体素上的概率分布，用于三维物体识别。 Song等[Song 2016]利用三维卷积网络处理三维体素数据，完成三维体素空间的物体检测。Crivellaro等[Crivellaro2015]将刚体分成多个子部件，为每个子部件定义三维控制点，然后利用卷积神经网预测控制点在图像上的投影点的位置。在得到3D-2D Correspondences后，利用鲁棒地优化算法求解物体的姿态参数。


#### Reference ####

- [Hinton2006] G. E. Hinton, R. R. Salakhutdinov, Reducing the dimensionality of data with neural networks. Science, Vol. 313. no. 5786, pp. 504 - 507, 2006.
- [Deng2009] J. Deng, W. Dong, R. Socher, and et al., Imagenet: A large-scale hierarchical image database. IEEE International Conference on Computer Vision and Pattern Recognition, 2009.
- [Krizhevsky2012] A. Krizhevsky, L. Sutskever, and G. E. Hinton. Imagenet classification with deep convolutional neural networks. Neural Information Processing Systems, 2012.
- [Szegedy2015] C. Szegedy, W. Liu, Y. Jia, et al., Going deeper with convolutions. IEEE Conference on Computer Vision and Pattern Recognition: 1-9, 2015.
- [He2015] K. He, X. Zhang, S. Ren, J. Sun, Deep residual learning for image recognition. CoRR abs/1512.03385 , 2015.
- [Girshick2014] R. Girshick, J. Donahue, T. Darrell, J. Malik, Rich feature hierarchies for accurate object detection and semantic segmentation, IEEE Conference on Computer Vision and Pattern Recognition: 580–587, 2014.
- [Girshick2015]R. Girshick, Fast R-CNN, International Conference on Computer Vision (ICCV), 2015.
- [Ren2015]S. Ren, K. He, R. Girshick, and J. Sun, Faster R-CNN: Towards real-time object detection with region proposal networks, Neural Information Processing Systems (NIPS), 2015.
- [Long2015] J. Long, E. Shelhamer, T. Darrell, Fully convolutional networks for semantic segmentation, IEEE Conference on Computer Vision and Pattern Recognition, 2015.
- [Zheng2015] S. Zheng, S. Jayasumana, B Romera-Paredes and et al., Conditional random fields as recurrent neural networks. International Conference on Computer Vision (ICCV), 2015.
- [Chen2015] L-C. Chen, Y. Yang, J. Wang, and et al., Attention to scale: scale-aware semantic image segmentation. Arxiv, 2015.
- [wu2015] Z. Wu, S. Song, A. Khosla, F. Yu, et al., 3D ShapeNets: A deep representation for volumetric shape modeling. IEEE Conference on Computer Vision and Pattern Recognition, 2015.
- [Song2016] S. Song, J. Xiao, Deep sliding shapes for amodal 3d object detection in RGB-D Images. IEEE Conference on Computer Vision and Pattern Recognition, 2016.
- [Crivellaro2015] A. Crivellaro, M. Rad, Y. Verdie, et al. A novel representation of parts for accurate 3d object detection and tracking in monocular images. IEEE International Conference on Computer Vision, 4391-4399, 2015.
