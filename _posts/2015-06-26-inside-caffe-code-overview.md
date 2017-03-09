---
layout: post
title: "Caffe源码解析之overview"
date: 2015-06-26
desc: "overview of Caffe code"
keywords: "Caffe, overview"
categories: [research]
tags: [Caffe]
icon: fa-book
---

深度学习（特别是卷积网络）的流行，很大程度上归功于日渐成熟的开源框架，例如[cuda-convnet2](https://code.google.com/p/cuda-convnet2/), [Theano](http://deeplearning.net/software/theano/), [Torch](http://torch.ch/)和本文关注的[Caffe](http://caffe.berkeleyvision.org/)。Caffe是一个深度学习框架，设计简洁，模块化，速度快，有活跃的开源社区支持，适合深度学习拥趸快速入门。 在本文和后面的文章中，我会记录阅读Caffe源码的过程和思考。查看[Caffe源码](https://github.com/BVLC/caffe).

### 设计理念 ###
Caffe主页上这样阐述它的设计哲学：

- Expression: models and optimizations are defined as plaintext schemas instead of code. 网络的结构和参数通过[Google Protocal Buffers](https://developers.google.com/protocol-buffers/?hl=zh-cn)文本化描述。Caffe框架中使用Protocal Buffers完成内存对象和序列化磁盘文件的持久化映射，网络结构和参数定义加载、网络训练参数的定义加载、训练好的网络模型的保存加载和网络训练中间状态的保存加载等都由Protocal Buffers完成。
- Speed: for research and industry alike speed is crucial for state-of-the-art models and massive data. Caffe同时有GPU和CPU实现，使用连续数据存储（Blob存储4维数据-tensor），使用blas和cuDNN加速运算。
- Modularity: new tasks and settings require flexibility and extension. Caffe是非常模块化的，可能这和神经网络本身就比较模块化相关。Caffe的4个主要模块: Solver, Net, Layer, Blob。
- Openness: scientific and applied progress call for common code, reference models, and reproducibility. Caffe训练好的模型参数保存下来进行分发, 网络模型参数以二进制的Protocal Buffers格式存储。
- Community: academic research, startup prototypes, and industrial applications all share strength by joint discussion and development in a BSD-2 project. Caffe遵循开源协议[BSD-2](http://opensource.org/licenses/BSD-2-Clause)，便于学术共享和商用。

### 基本架构 ###
Caffe重视模块化设计，因为神经网络本质上是有相互连接的网络层构成，网络处理的数据块可以在网络层间前向和反向传递。接下来看看Caffe中的4大模块：

- Blob: 是Caffe的数据表示，隐藏了CPU/GPU存储申请和同步的细节（此功能由SyncedMemory实现），用来存储网络层间传递的数据以及学习到的网络参数。
- Layer: 是网络的基本结构单元，负责完成Blob中存储数据的前向和反向传递。
- Net: 是Caffe的神经网络表示，负责将网络中的各个Layers串联起来，构成有向无环图。
- Solver: 是Caffe神经网络优化的求解器，监控网络参数的更新，前向后向数据生成，协调神经网络的训练和测试，比如使用什么梯度下降算法以及具体参数设置，同时负责保存和恢复训练状态以及存储网络参数。

这4个模块的层次和复杂性从低到高，贯穿整个Caffe框架。刚开始阅读Caffe源码时，我觉得按照这个bottom-up的顺序比较好。

### 理论知识学习 ###
熟悉神经网络和深度学习的基础理论能很大程度帮助理解Caffe源码。网络上有很多相关的优秀教程，我整理并推荐以下：

1. [Neural Networks and Deep Learning](http://neuralnetworksanddeeplearning.com/index.html): 免费在线的入门教材，作者文风简洁，以非常直观方式讲解了神经网络的构建和训练，并分析网络训练中的难点，例如梯度弥散等。
2. [Stanford CS231n Convolutional Neural Networks for Visual Recognition](http://cs231n.github.io/): Stanford计算机课程,涉及卷积网络的方方面面，由Fei-Fei Li教授和大牛Andrej Karpathy出品，课程质量就不必多说 :-)
3. [Notes on Convolutional Neural Networks](http://cogprints.org/5869/1/cnn_tutorial.pdf): 卷积神经网络反向传播求导推导。
4. [神经网络简史](http://blog.sina.com.cn/s/blog_71329a960102v1eo.html): 神经网络科普文，看神经网络的落落起起。有人的地方就有江湖，有江湖就有恩怨 ⊙﹏⊙。
5. [LeCun、Bengio和Hinton的联合深度学习综述](http://www.csdn.net/article/2015-06-01/2824811)： 三位深度学习大牛Yann LeCun、Yoshua Bengio和Geoffrey Hinton在深度学习领域的地位无人不知，了解他们眼中的深度学习最新进展。
6. [从特征描述符到深度学习：计算机视觉发展20年](http://ylzhao.blogspot.tw/2015/04/blog-post.html): 从计算机视觉的视角看深度学习是如何成功席卷这个领域的。

### 后续 ###
本文在对Caffe源码解读前给出了对Caffe的简要总览，接下来我会详细记录4大模块的阅读思考。

#### Reference ####
[1] Caffe Tutorial: http://caffe.berkeleyvision.org/tutorial/ <br>
[2] dirlt.com caffe: http://dirlt.com/caffe.html