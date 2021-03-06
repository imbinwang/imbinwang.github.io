---
layout: post
title: Data Augmentation in Deep Learning
comments: true

layout: post
title: "Data Augmentation in Deep Learning"
date: 2015-04-22
desc: "Data Augmentation in Deep Learning"
keywords: "data augmentation, deep learning"
categories: [research]
tags: [deep learning]
icon: fa-book
---

Deep Learning的一个核心思想是其学习过程是end-to-end的, 即输入数据通过深度学习模型映射直接输出学习目标, 自动学习逐层非线性的特征表达. 要实现这个目的, 输入数据的质量是一个至关重要的因素. 由于深度学习模型的参数维度较高, 为了避免过拟合，通常要求输入数据的量必须充足. 在Deep Learning实践中不少经验被总结并被广泛应用. 本文关注并记录计算机视觉任务(图像相关)中这类**数据增强**的经验(Generally it's known as **data augmentation**- a deep learning trick).

### 数据增强变换(Data Augmentation Transformation) ###

数据增强是任务相关的, 不同的任务背景下可以通过使用以下一种或组合多种数据增强变换来增加输入数据的量.

#### 位置(Shift) ###

在图像平面上对图像以一定方式进行平移. 可以采用随机或人为定义的方式指定平移范围和平移步长, 沿水平或竖直方向进行平移. 改变图像内容的位置.

#### 尺度(Scale) ###

对图像按照指定的尺度因子, 进行放大或缩小. 另一种思路是参照SIFT特征提取思想, 利用指定的尺度因子对图像滤波构造尺度空间. 改变图像内容的大小或模糊程度.

#### 旋转/反射(Rotation/reflection)

在图像平面按照指定的角度旋转图像, 或水平或竖直翻转图像. 改变图像内容的朝向.

#### 颜色(Color)

在训练集像素值的RGB颜色空间进行PCA, 得到RGB空间的3个主方向向量,3个特征值,$p_1, p_2, p_3,\lambda_1, \lambda_2, \lambda_3$. 对每幅图像的每个像素$I_{xy}=[I_{xy}^{R},I_{xy}^{G},I_{xy}^{B}]^{T}$进行加上如下的变化:

$$[p_{1}, p_{2}, p_{3}][\alpha_{1}\lambda_{1},\alpha_{2}\lambda_{2},\alpha_{3}\lambda_{3}]^{T}$$

其中$\alpha_{i}$是满足0均值方差为0.1的随机变量. 增加颜色变化.

#### 对比度(Contrast)

在图像的HSV颜色空间，改变饱和度S和V亮度分量，保持色调H不变。 对每个像素的S和V分量进行指数运算(指数因子在0.25到4之间). 增加光照变化.

#### 遮挡(Occlusion)

在图像平面随机产生遮挡Rectangle, 清空遮挡区域内图像内容. 遮挡可以看作结构性噪声.

#### 噪声(Noise)

对图像的每个像素RGB进行随机扰动, 常用的噪声模式是椒盐噪声和高斯噪声.

> 见多识广, 以不变应万变.


大概是我认为Deep Learning中采用Data Augmentation的主要原因, 对数据增加各种类型的变化以期待网络学习到各种不变的特征.