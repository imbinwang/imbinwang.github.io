---
layout: post
title: "Caffe源码解析之Blob"
date: 2015-06-28
desc: "Blob of Caffe code"
keywords: "Caffe, Blob"
categories: [research]
tags: [Caffe]
icon: fa-book
---

Blob作为Caffe的四大模块之一，负责完成CPU/GPU存储申请、同步和数据持久化映射。Caffe内部数据存储和通讯都是通过Blob来完成，Blob提供统一的存储操作接口，可用来保存训练数据、模型参数等。

### 模块说明 ###
Blob是一个N维连续数组。批处理图像数据时通常使用4维Blob，Blob的维度可以表示为(N, K, H, W)，每个维度的意思分别是：

- N: 数据的个数，例如SGD时一次mini-batch的图像个数。
- K: 如果是图像，可以理解为通道数量；如果是网络中间结果，就是feature map的数量。
- H, W： 如果是图像数据，可以理解为图像的高度和宽度；如果是参数数据，可以理解为滤波核的高度和宽度。

Blob中数据是row-major存储的，W是变化最快的维度，例如在(n, k, h, w)处的数据，其物理偏移量计算方式为

$$((n \ast K + k) \ast H + h) \ast W + w$$

Caffe中通常只使用4维Blob完成图像应用，但是Blob完全可以合理地被用来存储任何数据，例如，

- 1000幅640\*480 RGBD图像数据，其Blob形状为(1000, 4, 480, 640)。
- 96个大小11\*11的滤波核，处理16通道的输入数据，其参数Blob的形状为(96，16，11，11)。
- 1000个输出，1024个输入的全连接层，其参数Blob的形状为(1000，1024)。

对于自定义数据，通常需要我们自己准备数据处理工具，编写自定义的data layer。一旦数据准备完毕，剩下的工作交给layers模块来完成。

### 实现细节 ###
Blob内部其实包含两个存储对象`data_`和`diff_`，前者存储前向传递的数据，后者存储反向传递的梯度。在*blob.hpp*中定义了Blob的**成员变量**，

```c
protected:
  shared_ptr<SyncedMemory> data_;
  shared_ptr<SyncedMemory> diff_;
  vector<int> shape_;
  int count_;
  int capacity_;
```

其中，shape是Blob维度参数，count表示Blob存储的元素个数（shape_所有元素乘积），capacity_表示当前Blob的元素个数（控制动态分配），*SyncedMemory*类封装了CPU/GPU内存申请、同步和释放（Blob不关心具体细节）。粗略看下*syncedmem.hpp*中的细节，

```c
private:
  void to_cpu(); //数据由显存同步到内存
  void to_gpu(); //数据由内存同步到显存
  void* cpu_ptr_; //内存指针
  void* gpu_ptr_; //显存指针
  size_t size_; //数据大小
  SyncedHead head_; //当前数据状态，UNINITIALIZED, HEAD_AT_CPU, HEAD_AT_GPU, SYNCED
  bool own_cpu_data_; //是否分配了内存空间
```

看完数据，再来看看Blob的核心功能，首先是Blob的**构造函数**

```c
Blob()
       : data_(), diff_(), count_(0), capacity_(0) {}

  /// @brief Deprecated; use <code>Blob(const vector<int>& shape)</code>.
  explicit Blob(const int num, const int channels, const int height,
      const int width);
  explicit Blob(const vector<int>& shape);
```

默认构造函数完成最基本的初始化，两个显示构造函数会调用`Reshape`函数完成`data_`和`diff_`的共享内存对象SyncedMemory的申请，

```c
// in blob.cpp
// 完成blob形状shape_的记录，大小count_的计算，合适大小capacity_存储的申请
template <typename Dtype>
void Blob<Dtype>::Reshape(const vector<int>& shape) {
  CHECK_LE(shape.size(), kMaxBlobAxes);
  count_ = 1;
  shape_.resize(shape.size());
  for (int i = 0; i < shape.size(); ++i) {
    CHECK_GE(shape[i], 0);
    count_ *= shape[i];
    shape_[i] = shape[i];
  }
  if (count_ > capacity_) {
    capacity_ = count_;
    data_.reset(new SyncedMemory(capacity_ * sizeof(Dtype))); // 只是构造了SyncedMemory对象，并未真正分配内存和显存
    diff_.reset(new SyncedMemory(capacity_ * sizeof(Dtype))); // 真正分配是在第一次访问数据时
  }
}
```

接下来是Blob的**数据访问函数**,

```c
// in blob.hpp
const Dtype* cpu_data() const;
const Dtype* gpu_data() const;
Dtype* mutable_cpu_data();
Dtype* mutable_gpu_data();
```

Blob定义了两种数据访问方式：const方式只读，不允许改写数据；mutable方式可改写数据（对`diff_`的访问也是类似的）。以`cpu_data()`为例，看看数据访问是怎样完成的，

```c
// in blob.cpp
template <typename Dtype>
const Dtype* Blob<Dtype>::cpu_data() const {
  CHECK(data_);
  return (const Dtype*)data_->cpu_data(); // 调用SyncedMemory的数据访问函数cpu_data()
}
```

```c
// in syncedmem.cpp
const void* SyncedMemory::cpu_data() {
  to_cpu(); // 首先完成数据同步，第一次访问时会申请存储空间
  return (const void*)cpu_ptr_;
}
```

Blob想要访问`data_`数据，由于Blob不关心细节，它会调用SyncedMemory的数据访问函数`cpu_data()`，由SyncedMemory的函数`cpu_data()`完成数据的同步并返回数据指针。

Blob中存储了网络的中间处理结果和网络的参数，这些数据最终是要被存储到磁盘或从磁盘读入内存的，最后来看Blob的数据持久化函数是如何完成数据读写磁盘的。还记得之前提到过的Google Protocol Buffers吗？对就是借助这个数据序列化和持久化库来完成的。在Caffe的源码文件中有一个文件*caffe.proto*，其中与Blob相关的有`BlobShape`、`BlobProto`、`BlobProtoVector`，`BlobShape`与`shape_`对应，`BlobProto`是`Blob`序列化对象，

```c
// Specifies the shape (dimensions) of a Blob.
message BlobShape {
  repeated int64 dim = 1 [packed = true];
}

message BlobProto {
  optional BlobShape shape = 7;
  repeated float data = 5 [packed = true];
  repeated float diff = 6 [packed = true];

  // 4D dimensions -- deprecated.  Use "shape" instead.
  optional int32 num = 1 [default = 0];
  optional int32 channels = 2 [default = 0];
  optional int32 height = 3 [default = 0];
  optional int32 width = 4 [default = 0];
}

// The BlobProtoVector is simply a way to pass multiple blobproto instances
// around.
message BlobProtoVector {
  repeated BlobProto blobs = 1;
}
```

Blob的**序列化函数**:

```c
//in blob.hpp
void FromProto(const BlobProto& proto, bool reshape = true);
void ToProto(BlobProto* proto, bool write_diff = false) const;
```

`ToProto`将Blob的`shape_`,`data_`,`diff_`分别copy到BlobProto的`shape`,`data`,`diff`,完成序列化。`FromProto`将BlobProto的`shape`,`data`,`diff`分别copy到Blob的`shape_`,`data_`,`diff_`,完成数据解析。最后**数据持久化函数**由Protocol Buffers的工具实现，详见*io.hpp*,

```c
// in io.hpp
bool ReadProtoFromTextFile(const char* filename, Message* proto);
bool ReadProtoFromBinaryFile(const char* filename, Message* proto);
void WriteProtoToTextFile(const Message& proto, const char* filename);
void WriteProtoToBinaryFile(const Message& proto, const char* filename);
```

其中，数据可以text和binary两种格式被持久化。

*P.S.* Blob还有一个**参数更新函数**也很重要`Update`, 它会被网络中存储参数的Blob调用，完成梯度下降过程中的参数更新，

```c
// in blob.cpp
template <typename Dtype>
void Blob<Dtype>::Update() {
  // We will perform update based on where the data is located.
  switch (data_->head()) {
  case SyncedMemory::HEAD_AT_CPU:
    // perform computation on CPU
	// 参数更新，新参数（data_） = 原参数(data_) - 梯度(diff_)
    caffe_axpy<Dtype>(count_, Dtype(-1),
        static_cast<const Dtype*>(diff_->cpu_data()),
        static_cast<Dtype*>(data_->mutable_cpu_data()));
    break;
  case SyncedMemory::HEAD_AT_GPU:
  case SyncedMemory::SYNCED:
#ifndef CPU_ONLY
    // perform computation on GPU
    caffe_gpu_axpy<Dtype>(count_, Dtype(-1),
        static_cast<const Dtype*>(diff_->gpu_data()),
        static_cast<Dtype*>(data_->mutable_gpu_data()));
#else
    NO_GPU;
#endif
    break;
  default:
    LOG(FATAL) << "Syncedmem not initialized.";
  }
}
```

其中核心操作就是，

$$ data_{k+1} = data_{k} - diff $$

### 总结 ###
Caffe中Blob封装了各种存储相关的操作，包括内存显存分配、同步、数据访问、数据读写磁盘等。它将作为基本数据模块被包含到Layer和Net中，后面将分析他们是如何被Layer和Net使用的。