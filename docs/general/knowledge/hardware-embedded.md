<script setup lang="ts">
import QuestionBank from '../../.vitepress/theme/QuestionBank.vue'
import questionBank from '../../data/question-banks/hardware.json'

function questionsFor(keys: string[]) {
  const selected = new Set(keys)
  return questionBank.questions
    .filter((question) => selected.has(`${question.exam}-${question.question_no}`))
    .sort((a, b) =>
      b.exam.localeCompare(a.exam) ||
      b.question_no - a.question_no ||
      a.part_no - b.part_no
    )
}

const pipelineQuestions = questionsFor(['201711-1', '201611-4'])
const memoryQuestions = questionsFor(['202505-16', '201611-1', '201411-5'])
const ioQuestions = questionsFor(['202311-14', '201711-2'])
const busQuestions = questionsFor(['201811-8', '201511-9'])
const instructionQuestions = questionsFor(['202605-49', '202605-66', '201711-3'])
const cpuQuestions = questionsFor(['201811-10'])
const crcQuestions = questionsFor(['201811-11'])
</script>

# 计算机组成原理

本页依据项目教材第 2 章“计算机硬件”，结合分类真题第 5 章中非嵌入式内容整理，共<strong>14 道真题</strong>、14 条分值记录，重点覆盖处理器、存储器、总线、输入输出、指令系统和数据校验。

| 复习分类 | 真题数量 | 主要内容 |
| --- | ---: | --- |
| 计算机组成 | 14 题 | 流水线、存储器、总线、CPU、I/O、DMA、指令系统、CRC |

## 1. 先建立计算机硬件地图

教材从冯·诺依曼计算机结构出发，把计算机硬件概括为运算器、控制器、存储器、输入设备和输出设备。现实系统中，控制单元和运算单元通常集成为处理器；输入输出设备则通过总线、接口和外部设备与处理器及存储器连接。

可以用下面这条链路定位题目：

```text
处理器：取指令、译码、控制、运算
存储器：保存指令、数据和运行状态
总线：在部件之间传输数据、地址和控制信息
接口与外设：连接外部设备，完成输入输出
```

处理器相关真题常落在三组概念上：

- <strong>通用处理器</strong>：关注指令集、主频、寄存器、缓存和执行效率。
- <strong>专用处理器</strong>：GPU 面向大规模并行计算，DSP 面向实时数字信号处理，NPU 面向神经网络计算。
- <strong>嵌入式处理器</strong>：MPU、MCU、DSP、SoC 根据集成程度、运算特点和应用场景区分。

不要把“芯片”“处理器”“SoC”当成同义词。SoC 是把处理器、存储器、I/O 接口和专用 IP 等关键部件集成到单一芯片上的系统级方案，不只是一个 CPU 核心。

## 2. 流水线与 CPU 性能

### 4.1 流水线三条公式

流水线把一条指令的执行过程拆成多个阶段，让不同指令在不同阶段重叠执行。计算题先找出<strong>最长阶段</strong>，它决定流水线周期。

```text
流水线周期 Tc = max(t1, t2, ..., tk)
单条指令总时间 T1 = t1 + t2 + ... + tk
n 条指令总时间 T = T1 + (n - 1) × Tc
吞吐率 TP = n / T
最大吞吐率 TPmax = 1 / Tc
加速比 S = n × T1 / T
```

做题顺序固定为：先求最长段得到 Tc，再求第一条指令的完整时间 T1，最后代入总时间、吞吐率或加速比公式。不能把所有阶段时间都当成流水线周期，也不能直接用“级数”代替实际加速比。

### 4.2 CPU 主频

```text
主频 = 外频 × 倍频
1 GHz = 1000 MHz
```

例如外频为 200 MHz、倍频为 13 时，主频为 2600 MHz，即 2.6 GHz。主频只是性能参考指标，题目若问计算结果，先按公式换算；不要把外频、倍频和主频混为一个概念。

<details>
<summary>相关真题：流水线 2 题、CPU 性能参数 1 题</summary>

<QuestionBank :questions="pipelineQuestions" compact />
<QuestionBank :questions="cpuQuestions" compact />

</details>

## 5. 存储器：类型与层次

### 5.1 ROM 类型

| 类型 | 编程与擦除特点 |
| --- | --- |
| 掩膜 ROM | 出厂时由厂商完成编程，用户不能修改 |
| PROM | 用户可编程一次，写入后不能再次修改 |
| EPROM | 可用紫外线擦除，再重新编程 |
| EEPROM | 用电信号擦除和重新编程，可多次写入 |
| Flash | 在 EEPROM 等基础上发展而来，常用于嵌入式设备和移动存储 |

题目问“一次可编程只读存储器”，直接定位 PROM；看到“紫外线擦除”定位 EPROM；看到“电擦除”定位 EEPROM。

### 5.2 分级存储体系

计算机同时追求速度、容量和成本是不现实的，因此采用分级存储，在不同层级之间取得平衡。按考试常用的访问速度排序：

```text
寄存器组 → Cache → 主存 → 外存
速度递减，容量递增，单位成本通常递减
```

寄存器组位于处理器内部，存取速度最快但容量最小；Cache 用来缓解处理器和主存之间的速度差异；主存通常采用 DRAM；外存容量大、掉电后可保持数据，但访问速度较慢。教材还将缓存按物理位置区分为片上缓存和片外缓存。

分级存储的<strong>主要目的</strong>是解决存储器速度、容量和价格三者之间的矛盾，不是专门用于提高外设访问效率，也不是主要用于纠错。外设访问效率主要联系缓冲、DMA 和通道；读写可靠性主要联系校验和纠错技术。

<details>
<summary>相关真题：存储器 1 题、存储器系统 2 题</summary>

<QuestionBank :questions="memoryQuestions" compact />

</details>

## 6. 总线、I/O 与 DMA

### 6.1 总线与串行通信

教材按总线位置将其分为内总线、系统总线和外部总线；按传输形式可分为并行总线和串行总线。串行总线以位为单位依次传输数据，常见协议包括 USB、SATA、CAN、RS-232、RS-485 和以太网等。

按通信方向判断：

| 模式 | 能力 |
| --- | --- |
| 单工 | 只能沿一个方向传输 |
| 半双工 | 可以双向传输，但同一时刻只能一个方向传输 |
| 全双工 | 可以同时进行两个方向的传输 |

半双工不是单向传输；“双向”也不等于“同时双向”。这是总线题最常见的概念陷阱。

### 6.2 通道与 DMA

| 技术 | 核心动作 | 题目关键词 |
| --- | --- | --- |
| 通道 | 执行通道程序，独立管理 I/O 操作 | 提高 CPU、主存和 I/O 之间的并行程度 |
| DMA | 在主存与外设之间建立直接数据通路 | 绕过 CPU 的频繁中转 |

通道更像一个能够执行 I/O 程序的专用控制器；DMA 更强调数据传输路径。看到“执行通道程序”，选通道；看到“主存与外设之间直接数据通路”，选 DMA。

<details>
<summary>相关真题：总线 2 题、输入输出与 DMA 2 题</summary>

<QuestionBank :questions="busQuestions" compact />
<QuestionBank :questions="ioQuestions" compact />

</details>

## 7. 指令系统与编译过程

### 7.1 RISC 与 CISC

| 对比项 | RISC | CISC |
| --- | --- | --- |
| 指令 | 种类较少、功能相对简单 | 种类多、单条指令功能较强 |
| 长度 | 通常较固定 | 长度和格式更灵活 |
| 寻址方式 | 较少、较简单 | 丰富、较复杂 |
| 寄存器 | 通常较多，减少访存 | 相对强调复杂指令和多种寻址 |
| 译码 | 常采用硬布线逻辑 | 控制逻辑相对复杂 |

题目问“RISC 的特点不包括什么”时，看到<strong>寻址方式尽量丰富、指令功能尽可能强</strong>，应判断为 CISC 的特点。

### 7.2 编译器负责什么

编译器的核心任务是把源程序翻译为中间代码或目标代码，常见阶段包括：

```text
词法分析 → 语法分析 → 语义分析 → 中间代码/目标代码生成 → 优化
```

解释执行源程序属于解释器或运行环境的职责，不是编译器必须完成的核心阶段。预处理、汇编、链接、装载也可能出现在完整工具链中，但判断“编译器是否负责”时，应先区分源代码翻译阶段和后续执行、装配阶段。

<details>
<summary>相关真题：指令系统 3 题</summary>

<QuestionBank :questions="instructionQuestions" compact />

</details>

## 8. CRC 循环冗余校验

CRC 用生成多项式产生固定长度的校验码，主要用于检测数据传输或存储过程中是否出现错误。

解题步骤：

1. 找到生成多项式的最高幂次，记为 n；
2. 将信息码左移 n 位，也就是末尾补 n 个 0；
3. 把生成多项式按幂次从高到低写成二进制序列；
4. 用模 2 除法计算，模 2 减法本质上是逐位异或，不借位；
5. 得到 n 位余数，余数就是 CRC 校验码。

接收端把“信息码 + CRC 校验码”除以同一个生成多项式，余数为 0 时，通常判定未检测到错误。CRC 是错误检测技术，并不能保证检测出所有错误。

<details>
<summary>相关真题：数据校验与 CRC 1 题</summary>

<QuestionBank :questions="crcQuestions" compact />

</details>

## 复习顺序

1. 先完成嵌入式 10 题，掌握系统组成、处理器分类、实时性、MMU 和软件架构。
2. 再做流水线、CPU 主频、存储器和 RISC/CISC，重点练公式与对比表。
3. 接着做总线、通道、DMA 和 CRC，区分“传输方向”“控制器职责”和“校验过程”。
4. 最后回看 AI 芯片，把 GPU、NPU、FPGA、ASIC、SoC 放在同一张对比表里。

这部分的核心不是背大量型号，而是看到题干线索后判断它在<strong>处理器、存储器、总线、I/O、指令系统还是嵌入式约束</strong>哪一层。
