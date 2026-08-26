<script setup lang="ts">
import QuestionBank from '../../../.vitepress/theme/QuestionBank.vue'
import questionBank from '../../../data/question-banks/os.json'

function questionId(question: (typeof questionBank.questions)[number]) {
  return `${question.exam}-${question.question_no}`
}

const questions = questionBank.questions.filter(
  (question) => question.category !== '嵌入式系统'
)

function questionsFor(categories: string[]) {
  const categorySet = new Set(categories)
  return questions.filter((question) => categorySet.has(question.category))
}

const overviewQuestions = questions.filter(
  (question) => question.category === '操作系统分类' || questionId(question) === '202311-21'
)
const processQuestions = questionsFor(['进程管理', '前趋图'])
const memoryQuestions = questions.filter(
  (question) => question.category === '内存管理' || questionId(question) === '202505-3'
)
const deviceQuestions = questionsFor(['磁盘管理'])
const fileQuestions = questionsFor(['文件系统']).filter(
  (question) => questionId(question) !== '202311-21'
)
const fileFocusQuestionIds = new Set([
  '202605-8', '202605-65', '202111-52', '201811-3',
  '201611-6', '201411-2', '202011-3',
])
const fileFocusQuestions = fileQuestions.filter((question) => fileFocusQuestionIds.has(questionId(question)))

function questionCount(questionList: typeof questions) {
  return new Set(questionList.map(questionId)).size
}
</script>

# 操作系统

> <strong>考试趋势：</strong>近年单次考试通常在<strong>5 分左右</strong>，整体波动不大。
>
> - 进程管理是每次都会落点的主干；前趋图与 P/V 等经典题型近期未直接出现，复习时掌握基本原理即可。
> - 文件管理在最近 3 次考试中连续出现，且最近一次题量明显增加，应作为近期复习重点。
> - 存储管理的考查较零散，设备管理直接考查较少；页面置换、磁盘调度和双缓冲等经典题型近期未直接出现，不必对复杂变式投入过多时间。

## 概述

操作系统是管理计算机软硬件资源、控制程序执行并为应用提供服务和接口的系统软件。可以先用下面这条主线定位知识：

```text
内核与系统调用 → 进程管理 → 文件管理 → 存储管理 → 设备管理
```

| 模块 | 主要内容 |
| --- | --- |
| 进程管理 | 进程与线程、状态、调度、通信、同步互斥、死锁和前趋图 |
| 文件管理 | 文件、目录、路径、文件分配、索引和文件系统元数据 |
| 存储管理 | 内存管理中的分页、分段、段页式、虚拟存储、页面置换和位示图 |
| 设备管理 | 中断、输入输出、缓冲、磁盘调度和设备分配 |

### 内核与系统调用

操作系统内核直接与硬件交互，核心功能可以归纳为<strong>进程管理、文件系统管理、设备驱动管理和内存管理</strong>。网络、安全和用户管理也可能由操作系统提供，但题目问“内核通常包括的功能”时，优先选择这四类核心管理功能。<a class="question-ref" href="#q-os-202311-21">#2023.11-21</a>

应用程序运行在用户态时不能直接执行特权指令。需要访问受保护资源时，通过系统调用触发<strong>访管中断（监控陷入）</strong>，由内核代为完成操作，再返回用户态。看到“用户态、特权指令、系统调用”这组关键词，就不要选外部中断或溢出中断。

中断处理通常包括保护必要现场、查找中断向量和转入中断服务程序；“保存全部通用寄存器的业务语义状态”并不是所有体系结构和中断处理程序都必然直接完成的标准步骤。

按运行方式还可以区分批处理、分时和实时系统：批处理关注吞吐量，分时关注交互响应，实时系统关注截止时间和响应的确定性。分时系统采用固定时间片时，参与轮转的用户或进程越多，一轮轮换所需时间越长。

### 历年真题

<details class="chapter-question-bank">
<summary class="chapter-question-bank-summary">
  <span class="chapter-question-bank-note">{{ questionCount(overviewQuestions) }} 道题</span>
  <span class="chapter-question-bank-action">
    <span class="chapter-question-bank-expand-label">展开</span>
    <span class="chapter-question-bank-collapse-label">收起</span>
  </span>
</summary>

<div class="chapter-question-bank-body">
  <QuestionBank :questions="overviewQuestions" anchor-prefix="os" compact hide-categories />
</div>
</details>

## 1. 进程管理 ⭐

### 1.1 进程的组成和状态

- <strong>进程</strong>是正在运行的程序实例，由<strong>程序、数据和进程控制块（PCB）</strong>组成，是资源分配和管理的基本单位。<a class="question-ref" href="#q-os-202311-25">#2023.11-25</a>
- <strong>线程</strong>是调度和执行的最小单位，自身不独立拥有系统资源。

同一进程内的线程共享进程的资源（代码段、数据段、打开的文件等），但寄存器和栈是每个线程私有的。<a class="question-ref" href="#q-os-202011-2">#2020.11-2</a>

PCB 是操作系统管控进程的核心数据载体，每个进程有唯一的 PCB 和进程标识。<a class="question-ref" href="#q-os-202605-9">#2026.05-9</a><a class="question-ref" href="#q-os-201811-2">#2018.11-2</a>

#### 三态模型

三态模型把进程生命周期划分为<strong>就绪、运行、阻塞</strong>三种状态：

- 就绪：已获得除 CPU 外的所有必需资源，在就绪队列等待调度；
- 运行：正在占用 CPU 执行，单 CPU 同一时刻只有一个运行态；
- 阻塞：又称等待态或睡眠态，等待 I/O 或其他事件，有空闲 CPU 也不能运行。

![进程三态模型及状态转换](/assets/general/process-three-state-model.svg)

转换关系：

- 就绪 → 运行：被调度器选中；
- 运行 → 就绪：时间片用尽、被抢占，或主动让出且不等待资源。<a class="question-ref" href="#q-os-202505-53">#2025.05-53</a><a class="question-ref" href="#q-os-202411-9">#2024.11-9</a>
- 运行 → 阻塞：等事件（wait 资源不足、缺页、请求 I/O）；
- 阻塞 → 就绪：事件完成；阻塞不能直接转运行。<a class="question-ref" href="#q-os-202405-30">#2024.05-30</a>

判断状态先看“等待的是什么”：只等 CPU 是就绪，等事件或资源是阻塞。

### 1.2 同步和互斥

<strong>信号量 S</strong>是表示资源数量的计数器，只有两个操作：<strong>P 占位置（申请），V 还位置（释放）</strong>。它解决的正是并发进程的两个协调问题：

#### 互斥：不能同时做

信号量初值 <strong>1</strong>（临界资源只有 1 个），每个进程进入前 P、退出后 V：

```text
P(mutex) → 临界区 → V(mutex)
```

一个进程在临界区里，其他进程 P 时就被挡住排队。

#### 同步：必须有先后

前驱做完，后继才能做。信号量初值 <strong><span class="numeric-zero">0</span></strong>（一开始前驱必然没做完）：

```text
A：做事 → V(S)    // 做完通知
B：P(S) → 做事    // 开始前等
```

![互斥与同步的 PV 用法](/assets/general/mutex-sync-pv.svg)

核心结论：<strong>信号量</strong>是资源计数器，<strong>P 申请、V 释放</strong>；用它实现<strong>互斥</strong>时初值设 1，保证各进程不同时进入临界区；实现<strong>同步</strong>时初值设 0，前驱做完 V 通知、后继开始前 P 等待。信号量为负时，其绝对值就是正在等待的进程数。<a class="question-ref" href="#q-os-201311-5">#2013.11-5</a><a class="question-ref" href="#q-os-202511-45">#2025.11-45</a><a class="question-ref" href="#q-os-201511-1">#2015.11-1</a>

### 1.3 死锁

<strong>死锁</strong>是多个进程互相等待对方占有的资源，导致谁都无法继续推进的状态。例如 A 占有资源 1、等待资源 2，B 占有资源 2、等待资源 1，双方就这样一直等下去，形成循环等待。<a class="question-ref" href="#q-os-201511-3">#2015.11-3</a>

死锁发生必须同时满足四个必要条件：

| 条件 | 含义 |
| --- | --- |
| 互斥 | 资源一次只能被一个进程使用 |
| 不可剥夺 | 不能抢走别人已持有的资源 |
| 请求与保持 | 拿着已有资源的同时还在申请新资源 |
| 循环等待 | 等待关系首尾相接成环 |

<strong>死锁预防</strong>：破坏四个必要条件中的任意一个即可。<a class="question-ref" href="#q-os-202411-7">#2024.11-7</a>

计算题直接套公式：n 个进程、每个最多需要 k 个同类资源时，不发生死锁的最小资源数为 <strong>n × (k − 1) + 1</strong>。<a class="question-ref" href="#q-os-202505-22">#2025.05-22</a>

### 1.4 前趋图

<strong>前趋图</strong>用有向无环图表示进程或任务之间的先后关系。箭头 `Pi → Pj` 表示 `Pi` 完成后，`Pj` 才能开始。

![前趋图示例](/assets/general/precedence-graph-example.svg)

- 箭头表示先后顺序：箭头从前趋任务指向后继任务，后继任务必须等所有指向它的前趋任务完成后才能开始。
- 按图可读为：A、B 没有前趋，可以先执行；C 要等 A、B 都完成；D 要等 B 完成；E 要等 C、D 都完成。<a class="question-ref" href="#q-os-201311-2">#2013.11-2</a>
- <strong>对应真题：</strong><a class="question-ref" href="#q-os-202211-2">#2022.11-2</a><a class="question-ref" href="#q-os-202111-4">#2021.11-4</a><a class="question-ref" href="#q-os-202011-1">#2020.11-1</a><a class="question-ref" href="#q-os-201911-1">#2019.11-1</a><a class="question-ref" href="#q-os-201711-5">#2017.11-5</a><a class="question-ref" href="#q-os-201411-1">#2014.11-1</a>

### 历年真题

<details class="chapter-question-bank">
<summary class="chapter-question-bank-summary">
  <span class="chapter-question-bank-note">{{ questionCount(processQuestions) }} 道题</span>
  <span class="chapter-question-bank-action">
    <span class="chapter-question-bank-expand-label">展开</span>
    <span class="chapter-question-bank-collapse-label">收起</span>
  </span>
</summary>

<div class="chapter-question-bank-body">
  <QuestionBank :questions="processQuestions" anchor-prefix="os" compact hide-categories />
</div>
</details>

## 2. 文件管理 ⭐

文件系统的核心价值是<strong>按名存取</strong>：用户只给文件名，由文件系统隐藏外存的具体位置和设备细节，负责组织、定位和分配文件。本节只抓住两个问题：

```text
文件内容放在哪里、如何找到 → 哪些存储空间可以分配
```

### 2.1 文件索引

文件的<strong>物理结构</strong>，也就是文件的存储方式，主要有三种：

- 顺序分配：把文件的数据块依次放在连续的磁盘空间中，访问速度快，但文件扩展不灵活。
- 链接分配：把分散的数据块用指针链接起来，扩展比较方便，但随机访问效率较低。
- <strong>索引分配</strong>：另外建立索引，记录逻辑块和物理块的对应关系，适合<strong>随机访问</strong>的<strong>可变长文件</strong>。

文件索引分为<strong>直接索引</strong>和<strong>间接索引</strong>两类；间接索引又分为<strong>一级间接索引</strong>、<strong>二级间接索引</strong>等。

```text
直接索引：      iaddr[0]～iaddr[5] ─────────→ 数据块
一级间接索引：  iaddr[6] ───────→ 索引块 ─→ 数据块
二级间接索引：  iaddr[7] ───────→ 索引块 ─→ 索引块 ─→ 数据块
```

#### 索引层级判断

例题：

> 某文件系统文件存储采用文件索引节点法。假设磁盘索引块和磁盘数据块大小均为 1KB，每个文件的索引节点中有 8 个地址项 iaddr[0]～iaddr[7]，每个地址项大小为 4 字节，其中 iaddr[0]～iaddr[5] 为直接地址索引，iaddr[6] 是一级间接地址索引，iaddr[7] 是二级间接地址索引。如果要访问 icwutil.dll 文件的逻辑块号分别为 0、260 和 518，则系统应分别采用（）。该文件系统可表示的单个文件最大长度是（）KB。

这道题其实是在问：文件从开头开始，每 `1KB` 切成一块以后，每一块应该通过 inode 中的哪一个地址项找到。

题目给出索引块大小为 `1KB`，每个地址项占 `4B`，所以一个索引块可以保存：

```text
1KB ÷ 4B = 256 个地址
```

本题的数量关系可以画成：

```text
iaddr[0]～iaddr[5]：6 个直接地址 ─────────→ 6 个数据块
iaddr[6]：        1 个一级地址 ──→ 1 个索引块 ──→ 256 个数据块
iaddr[7]：        1 个二级地址 ──→ 256 个一级索引块
                                      └─→ 每个一级索引块再指向 256 个数据块
                                      └─→ 共 256 × 256 个数据块
```

<strong>直接索引</strong>：6 个直接地址项分别指向文件最前面的 6 个数据块。文件第 1 个数据块编号为逻辑块 `0`，第 2 个为逻辑块 `1`，一直到第 6 个为逻辑块 `5`。因此：

```text
文件最前面的 6 个数据块：逻辑块 0～5 → iaddr[0]～iaddr[5]
```

题目要访问的逻辑块 `0`，就是文件的第 1 个数据块，所以使用直接索引。

<strong>一级间接索引</strong>：`iaddr[6]` 不直接存放一个数据块的位置，而是先指向一个索引块。这个索引块大小也是 `1KB`，每个地址占 `4B`，所以里面可以放 256 个数据块地址。它接着前面的 6 个数据块继续存放文件内容，因此负责逻辑块 `6～261`。题目中的逻辑块 `260` 在这个范围内，所以使用一级间接索引。

<strong>二级间接索引</strong>：`iaddr[7]` 要连续经过两层索引块，才能找到真正存放文件内容的数据块。第一个索引块可以指向 256 个二级索引块，每个二级索引块又可以指向 256 个数据块，所以一共可以覆盖 `256 × 256` 个数据块。它接在一级间接索引之后，从逻辑块 `262` 开始，因此题目中的逻辑块 `518` 使用二级间接索引。

再看文件最大长度：直接索引能指向 `6` 个数据块，一级间接索引能指向 `256` 个数据块，二级间接索引能指向 `256 × 256` 个数据块。因此文件最多能保存：

```text
(6 + 256 + 256 × 256) × 1KB = 65798KB
```

这里统计的是文件能够保存的<strong>数据块</strong>，索引块只是用来保存地址，不能重复算作文件数据。以后遇到同类题，只要先算一个索引块能放多少个地址，再按照直接、一级间接、二级间接的顺序把逻辑块范围接起来，就能同时判断索引层级和最大文件长度。


### 2.2 磁盘空间管理

磁盘空闲空间管理方法有空闲文件目录、空闲块链、位示图和成组链接法，本节直接看<strong>位示图</strong>：用二进制的 1 位表示磁盘空间中的 1 个物理块的使用情况。

本节重点是位示图。它的关系可以直接画成：

```text
磁盘容量 ÷ 物理块大小 = 物理块总数

1 个物理块 ──→ 1 位（空闲或已使用）
物理块总数 ──→ 位示图总位数
位示图总位数 ÷ 机器字长 ──→ 位示图占用的字数
```

#### 位示图空间计算

例题：

> 假设某计算机的字长为 32 位，该计算机文件管理系统磁盘空间管理采用位示图（bitmap）记录磁盘的使用情况。若磁盘的容量为 300GB，物理块的大小为 4MB，那么位示图的大小为多少个字？

这道题问的不是文件内容有多大，而是要用多少位来记录整个磁盘的物理块状态。磁盘先按 `4MB` 一个物理块切开，先算出磁盘一共有多少个物理块：

```text
300GB ÷ 4MB
= 300 × 1024MB ÷ 4MB
= 76800 个物理块
```

位示图中一个物理块对应一位，所以 `76800` 个物理块就需要 `76800` 位。题目问的是“多少个字”，而计算机字长为 `32` 位，因此：

```text
76800 位 ÷ 32 位/字 = 2400 个字
```

这里的“字”指<strong>机器字</strong>，32 位机器中 1 个字等于 32 位，所以总位数除以 32 就得到字数。

### 历年真题

本节聚焦<strong>7 道独立题、9 条分值记录</strong>：文件索引 6 道，磁盘空间管理 1 道。2025 年 5 月第 3 题实际考查主存页框位示图，放入存储管理小节。

<details class="chapter-question-bank">
<summary class="chapter-question-bank-summary">
  <span class="chapter-question-bank-note">{{ questionCount(fileFocusQuestions) }} 道题</span>
  <span class="chapter-question-bank-action">
    <span class="chapter-question-bank-expand-label">展开</span>
    <span class="chapter-question-bank-collapse-label">收起</span>
  </span>
</summary>

<div class="chapter-question-bank-body">
  <QuestionBank :questions="fileFocusQuestions" anchor-prefix="os" compact hide-categories />
</div>
</details>

## 3. 存储管理

### 3.1 内存管理

内存管理可以按一条主线来理解：<strong>程序如何装入内存 → 地址如何找到数据 → 内存不够时怎么办 → 哪些页框可以分配</strong>。真题虽然换了问法，但大多都落在这条链上。

```text
程序装入内存
      │
      ├─ 分页：页号 → 页表 → 物理页框号
      ├─ 分段：段号 → 段表 → 基址 + 段内偏移
      └─ 段页式：段号 → 段表 → 页号 → 页表 → 物理页框号

内存不足 → 虚拟存储 → 缺页 → 页面置换
页框分配状态 → 位示图
```

内存分配方式先整体认识即可：连续分配按一整段空间装入，分页按固定大小的页框装入，分段按程序的逻辑结构装入；段页式则先按逻辑划分段，再把每个段分页。真题中反复出现、值得单独拆题讲解的是<strong>分页地址转换</strong>；其他内容以知识点和判断入口为主。

#### 分页地址转换

例题：

> 某计算机系统页面大小为 4K，进程 P1 的页面变换表如下图示。P1 要访问数据的逻辑地址为十六进制 `1B1AH`，那么该逻辑地址经过变换后，对应的物理地址应为十六进制多少？

![P1 页表](/assets/general/os-c01-2021-11-q01-page-table.svg)

页面大小为 `4KB = 2^12`，所以逻辑地址的低 12 位是页内偏移，高位是页号。十六进制地址 `1B1AH` 可以直接拆成：

```text
逻辑地址 1B1AH = 页号 1 | 页内偏移 B1A
页表显示：页号 1 → 物理块号 6
物理地址   = 物理块号 6 | 页内偏移 B1A
            = 6B1AH
```

这里最重要的是：<strong>页内偏移不变，只把逻辑页号替换成页表查到的物理页框号</strong>。2020 年 11 月第 8 题只是把同一过程改成二进制地址，并增加有效位判断；页面有效位为 1，才可以继续完成转换。

分页题还可能顺带考<strong>页面共享</strong>。2013 年 11 月第 1 题中，两个进程的不同逻辑页要共享物理页 8，本质上就是让两个页表项都指向物理页 8。

#### 分段存储

分段按照程序的逻辑结构划分代码段、数据段、堆栈段等，段的长度可以<strong>动态变化</strong>。逻辑地址由“段号 + 段内偏移”组成，查段表时要检查段号是否存在，以及段内偏移是否小于段长；超过段长就是<strong>段内地址越界</strong>。2024 年 11 月第 53 题考查分段特点，2015 年 11 月第 2 题考查越界判断，这两题掌握同一套知识即可，不单独展开例题。

#### 段页式存储

段页式就是把两种方式串起来：程序先按逻辑功能划分为多个段，每个段内部再划分为固定大小的页。地址转换时，先根据段号查段表，找到该段对应的页表，再根据页号查页表得到物理页框号，最后加上页内偏移。

2020 年 11 月第 9 题只考概念判断：看到“程序按逻辑分成多段、每段内部再分页、使用段表和页表共同管理”，就是段页式存储。本题只保留在知识点中，不单独设置例题。

#### 虚拟存储与页面置换

虚拟存储解决的是“程序较大、内存放不下”的问题：程序不必一次性全部装入内存，访问到尚未装入的页面时产生缺页，再从外存调入。内存没有空闲页框时，就要选择一个已经在内存中的页面淘汰。

2019 年 11 月第 2 题考过一次组合题：先根据页面大小和页表完成地址转换；如果要访问的页面不在内存，再根据置换规则选择淘汰页。由于目前只有这一道直接考查页面置换，掌握基本规则即可，不单独拆真题讲解：

- FIFO：淘汰最早进入内存的页面；
- LRU：淘汰最近最久没有被访问的页面；
- Clock：根据访问位循环检查，访问位为 0 的页面优先淘汰。

#### 位示图与页框分配

分页后，主存被划分成许多大小相同的物理页框，一个页框对应位示图中的 1 位。2025 年 5 月第 3 题考查过一次这类计算，掌握下面的关系即可：

```text
页框总数 = 主存容量 ÷ 页面大小
位示图位数 = 页框总数
位示图字节数 = 位示图位数 ÷ 8
```

这类题的关键是先看清楚<strong>一位表示的是主存页框</strong>。如果题目改成磁盘容量和物理块，才是文件管理中的磁盘位示图，计算形式相同但管理对象不同。

### 历年真题

<details class="chapter-question-bank">
<summary class="chapter-question-bank-summary">
  <span class="chapter-question-bank-note">{{ questionCount(memoryQuestions) }} 道题</span>
  <span class="chapter-question-bank-action">
    <span class="chapter-question-bank-expand-label">展开</span>
    <span class="chapter-question-bank-collapse-label">收起</span>
  </span>
</summary>

<div class="chapter-question-bank-body">
  <QuestionBank :questions="memoryQuestions" anchor-prefix="os" compact hide-categories />
</div>
</details>

## 4. 设备管理

磁盘 I/O 时间通常拆成<strong>移臂/寻道、旋转定位和数据传输</strong>等环节。磁盘调度题明确要求“先进行移臂调度，再进行旋转调度”时，先根据磁头位置安排柱面访问顺序。

最短移臂调度从当前磁头位置出发，每一步选择距离最近的请求；选中后更新磁头位置，再继续选择，不能直接按请求出现的顺序读取。

磁盘记录排列会影响旋转等待。顺序处理题要结合每磁道物理块数、旋转一周时间、当前磁头位置和每条记录处理时间逐步计算；优化排列时，目标是让下一条记录的读取尽可能衔接当前处理过程。

双缓冲把“磁盘读入缓冲区、缓冲区送入用户区、系统处理”拆成不同阶段，通过两个缓冲区重叠 I/O 和处理。计算时要按题目给出的阶段关系找瓶颈，不能无条件把所有时间简单串行相加。首次打开文件的题则关注目录或文件控制信息的查找，以及打开文件信息的建立；虽然题库归类为磁盘管理，知识上仍属于文件访问过程。

### 历年真题

<details class="chapter-question-bank">
<summary class="chapter-question-bank-summary">
  <span class="chapter-question-bank-note">{{ questionCount(deviceQuestions) }} 道题</span>
  <span class="chapter-question-bank-action">
    <span class="chapter-question-bank-expand-label">展开</span>
    <span class="chapter-question-bank-collapse-label">收起</span>
  </span>
</summary>

<div class="chapter-question-bank-body">
  <QuestionBank :questions="deviceQuestions" anchor-prefix="os" compact hide-categories />
</div>
</details>
