<script setup lang="ts">
import QuestionBank from '../../../.vitepress/theme/QuestionBank.vue'
import { excludeQuestions } from '../../../.vitepress/theme/questionBankUtils'
import questionBank from '../../../data/question-banks/hardware.json'

const questions = excludeQuestions(questionBank.questions, ['202605-49', '202605-66'])
const embeddedQuestionKeys = new Set(['201611-1'])

function isEmbeddedQuestion(question: (typeof questions)[number]) {
  return (
    question.category === '嵌入式' ||
    question.category === 'AI 芯片' ||
    embeddedQuestionKeys.has(`${question.exam}-${question.question_no}`)
  )
}

const hardwareQuestions = questions.filter((question) => !isEmbeddedQuestion(question))
const embeddedQuestions = questions.filter(isEmbeddedQuestion)

function questionCount(questionList: typeof questions) {
  return new Set(questionList.map((question) => `${question.exam}-${question.question_no}`)).size
}
</script>

# 硬件与嵌入式

> <strong>考试趋势：</strong>从 2023 年之后的真题看，计算机硬件与嵌入式系统合计通常每年考<strong>1～3 分</strong>。
>
> - 计算机组成原理的考查较少且分散，整体呈弱化趋势，复习时以基础性掌握为主。
> - 嵌入式系统的考点更新较快、方向较灵活，应用导向更明显，复习时关注真题反映出的近期方向。

计算机系统是指用于数据管理的计算机硬件、软件及网络组成的系统。计算机系统可划分为硬件和软件两部分。

## 计算机硬件

冯·诺依曼计算机结构将计算机硬件划分为<strong>运算器、控制器、存储器、输入设备和输出设备</strong> 5 个部分。

- 处理器（CPU）
  - 组成：运算器、控制器和寄存器组。
  - 指令集：典型的处理器根据指令集的复杂程度可分为以下两类。
    - 复杂指令集（Complex Instruction Set Computers，CISC）：寻址方式多样，控制逻辑相对复杂；以 Intel、AMD 的 x86 CPU 为代表。
    - 精简指令集（Reduced Instruction Set Computers，RISC）：指令长度通常固定，便于译码和流水线处理；以 ARM 和 Power 为代表。

- 存储器
  - 存储器访问速度通常从快到慢为：寄存器、缓存（Cache）、主存（内存）、外存。缓存可分为片上缓存和片外缓存。

- 总线
  - 总线是计算机各部件之间传输数据、地址和控制信号的公共通道。
  - 按数据传输方式可分为串行总线和并行总线：串行总线按位依次传输数据，典型如 USB、SATA；并行总线可同时传输多个数据位，典型如 PCI、ATA（IDE）。

### 历年真题

<details class="chapter-question-bank">
<summary class="chapter-question-bank-summary">
  <span class="chapter-question-bank-note">{{ questionCount(hardwareQuestions) }} 道题</span>
  <span class="chapter-question-bank-action">
    <span class="chapter-question-bank-expand-label">展开</span>
    <span class="chapter-question-bank-collapse-label">收起</span>
  </span>
</summary>

<div class="chapter-question-bank-body">
  <QuestionBank :questions="hardwareQuestions" compact hide-categories />
</div>
</details>

## 嵌入式系统

- 嵌入式处理器分类
  - MPU（嵌入式微处理器）：微处理器加专门设计的电路板，集成度低、可靠性高，常见如 Cortex-A。
  - MCU（微控制器）：又称单片机，体积小、功耗低，常见如 8051、STM32。
  - DSP（数字信号处理器）：面向数字信号处理，常采用哈佛结构。
  - GPU（图形处理器）：擅长图形处理和大规模并行计算，也可用于人工智能计算。
  - SoC（片上系统）：将处理器、存储器和其他功能模块集成在一块芯片上。
  - NPU（神经网络处理器）：专门面向人工智能中的神经网络计算，在特定任务上更注重计算效率和能效。
  - FPGA（现场可编程门阵列）：可以根据需要配置硬件逻辑，了解即可。

- 环境适应性
  - 嵌入式处理器除满足低功耗、体积小等要求外，还需要适应复杂的工作环境，常按工作温度分为三个等级：
    - 民用级：0～70℃。
    - 工业级：−40～85℃。
    - 军用级：−55～150℃。

- 存储器
  - 随机存取存储器（RAM）：可随机读写，断电后数据丢失。
    - 动态随机存取存储器（DRAM）：容量大，常用作主存。
    - 静态随机存取存储器（SRAM）：速度快，常用作 Cache。
  - 只读存储器（ROM）：断电后数据仍能保留。
    - 可编程只读存储器（PROM）：只能编程一次。
    - 可擦可编程只读存储器（EPROM）：可通过紫外线擦除。
    - 电可擦可编程只读存储器（EEPROM）：可通过电擦除。
    - 闪存（Flash）：可在线电擦除和重写，擦写次数较多，常用来保存程序和数据；缺点是读取速度相对 RAM、Cache 较慢，且擦写寿命有限。

- 系统分类
  - 分类：按是否具有实时要求，可分为嵌入式实时系统和嵌入式非实时系统；实时系统又可分为强实时系统和弱实时系统。按安全性要求，可分为安全攸关系统和非安全攸关系统。
  - 实时系统（Real-Time System，RTS）：能够在规定时间内完成系统功能并作出响应的系统，重点不是单纯追求速度快，而是保证响应时间具有确定性。
  - 安全攸关系统：功能错误或失效可能导致人员伤亡、财产损失等严重后果的系统。

- 软件架构
  - 比较典型的嵌入式软件架构有两种：层次化模式架构和递归模式架构。

### 历年真题

<details class="chapter-question-bank">
<summary class="chapter-question-bank-summary">
  <span class="chapter-question-bank-note">{{ questionCount(embeddedQuestions) }} 道题</span>
  <span class="chapter-question-bank-action">
    <span class="chapter-question-bank-expand-label">展开</span>
    <span class="chapter-question-bank-collapse-label">收起</span>
  </span>
</summary>

<div class="chapter-question-bank-body">
  <QuestionBank :questions="embeddedQuestions" compact hide-categories />
</div>
</details>
