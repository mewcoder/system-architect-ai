<script setup lang="ts">
import QuestionBank from '../../../.vitepress/theme/QuestionBank.vue'
import questionBank from '../../../data/question-banks/network.json'

function questionId(question: (typeof questionBank.questions)[number]) {
  return `${question.exam}-${question.question_no}`
}

const questionCount = new Set(questionBank.questions.map(questionId)).size
const recordCount = questionBank.questions.length
const examStats = [...new Set(questionBank.questions.map((question) => question.exam))]
  .sort()
  .reverse()
  .map((exam) => ({
    exam,
    label: `${exam.slice(0, 4)} 年 ${Number(exam.slice(4))} 月`,
    count: new Set(
      questionBank.questions
        .filter((question) => question.exam === exam)
        .map(questionId)
    ).size
  }))
const examMax = Math.max(...examStats.map((batch) => batch.count), 1)
</script>

# 计算机网络

> <strong>考试趋势：</strong>网络题库共<strong>{{ questionCount }} 道独立题</strong>、<strong>{{ recordCount }} 条分值记录</strong>。近 4 场考试每场覆盖 2～4 道独立题，考点分布较广，但主线比较稳定：先考通信和分层模型，再考 IP、交换、应用协议、网络规划与安全。复习时优先掌握协议定位、设备职责、地址计算和工程设计判断。

计算机网络解决的是<strong>不同主机之间如何可靠、高效、安全地交换数据</strong>。可以先用下面这条主线定位题目：

```text
信号与传输 → 网络分层 → 局域网与 IP → 传输层与应用层 → 网络工程与安全
```

## 通信技术

- <strong>编码和采样</strong>
  - 曼彻斯特编码在每个码元中间发生跳变，具有时钟同步能力。
  - 采样频率至少为最高频率的 2 倍，才能在理想条件下无失真恢复模拟信号。
  - 采样频率和信道带宽不是同一个概念，看到“最高频率”时再使用采样定理。

- <strong>调制和传输</strong>
  - 信源产生信息，发送端完成编码和调制，接收端完成解调和译码。
  - 调制是把信息承载到适合信道传输的载波上；调制解调器负责数字信号和模拟信号之间的转换。
  - 理想无噪声信道使用奈奎斯特公式：`最大数据传输速率 = 2W × log₂V`。
  - 有噪声信道使用香农公式：`信道容量 = W × log₂(1 + S/N)`。
  - `W` 是带宽，`V` 是离散信号电平数，`S/N` 是信噪比。先判断信道条件，再选择公式。

- <strong>复用、多址和交换</strong>
  - 复用方式包括 TDM、FDM、CDM；多址方式包括 TDMA、FDMA、CDMA，不要把两组概念混用。
  - 电路交换独占通路；报文交换和分组交换采用存储转发；分组交换把报文拆成较小分组，Internet 核心采用分组交换。
  - 单工只能单向传输；半双工可以双向传输但不能同时进行；全双工可以同时进行双向传输。

## 网络体系结构与协议

![OSI 和 TCP/IP 体系结构](/assets/general/network-layer-model.svg)

OSI 模型从下到上分为<strong>物理层、数据链路层、网络层、传输层、会话层、表示层和应用层</strong>。考试中常将会话层、表示层的功能并入应用层理解，但分层定位仍应以题目给出的模型为准。

| 层次 | 主要对象 | 典型考点 |
| --- | --- | --- |
| 物理层 | 比特、信号、传输介质 | 编码、调制、接口和传输速率 |
| 数据链路层 | 帧、MAC 地址 | 成帧、差错检测、局域网交换 |
| 网络层 | 分组、IP 地址 | 路由、寻址、子网和网络互联 |
| 传输层 | 段、端口 | 进程间通信、TCP、UDP、流量控制 |
| 应用层 | 应用报文 | DNS、DHCP、HTTP、邮件和网络管理 |

发送数据时，数据从上到下逐层封装；接收数据时从下到上逐层解封装。每一层只使用相邻下层提供的服务，并向上层提供约定的接口。题目若问“不同网络之间互联”或“根据 IP 地址转发”，优先定位网络层；若问“应用进程之间通信”，定位传输层。

## 局域网、网络设备与 IP

- <strong>设备职责</strong>

  | 设备 | 主要层次 | 主要作用 |
  | --- | --- | --- |
  | 中继器、集线器 | 物理层 | 再生或广播信号，扩展传输距离 |
  | 网桥、二层交换机 | 数据链路层 | 根据 MAC 地址转发帧 |
  | 路由器、三层交换机 | 网络层 | 根据 IP 地址完成网络间转发 |
  | 防火墙 | 以网络层为主 | 按安全规则过滤进出流量 |

- <strong>交换和局域网</strong>
  - 交换机根据收到帧的源 MAC 地址学习端口；目的 MAC 地址已知时定向转发，未知时泛洪。
  - 冗余链路容易形成二层环路，生成树协议（STP）用于阻断环路；链路聚合可以提高带宽和可靠性。
  - 网桥和交换机主要解决同一局域网内的帧转发，路由器负责不同网络之间的分组转发。

- <strong>IP 地址和路由</strong>
  - IPv4 普通子网可用主机数为 `2ⁿ - 2`，`n` 是主机位数；计算时要先确认网络地址和广播地址是否被排除。
  - IPv6 地址长 128 位，支持单播、组播和任播，没有广播；链路本地地址通常以 `FE80::/10` 开头。
  - 管理距离比较不同路由来源的可信程度，路由代价比较同一协议内的路径优劣，二者不是同一个指标。
  - DiffServ 根据 IP 头中的服务类型字段设置 DS 码点，再进行差异化转发。

## 传输层与应用层协议

- <strong>TCP 和 UDP</strong>
  - TCP 面向连接、可靠、有序，提供确认、重传和流量控制；UDP 无连接、开销小，不保证可靠和有序。
  - 端口号用于标识主机中的应用进程，因此传输层实现的是进程到进程的通信。

- <strong>常见应用协议</strong>

  | 服务 | 重点 |
  | --- | --- |
  | DNS | A 记录正向解析，PTR 记录反向解析，常用端口 53 |
  | DHCP | Discover、Offer、Request、Ack；地址冲突时客户端可发送 Decline |
  | HTTP / HTTPS | Web 协议；HTTPS 是 HTTP over SSL/TLS，常用端口 80 / 443 |
  | SMTP | 发送邮件，常用端口 25 |
  | POP3 / IMAP | 接收或管理服务器端邮件，常用端口 110 / 143 |

浏览器访问 Web 页面时，通常先通过 DNS 获得服务器 IP 地址，再完成链路寻址和 TCP 连接，最后发送 HTTP 请求。Linux DNS 客户端的核心配置文件是 `/etc/resolv.conf`。

## 网络工程与服务质量

- <strong>需求、设计和实施</strong>
  - 需求分析回答“需要什么”，包括总体需求、综合布线、可用性、可靠性、安全性和工程造价初估。
  - 逻辑设计回答“怎么组网”，处理网络结构、拓扑、技术选型、IP、路由、冗余和安全。
  - 物理设计回答“怎么落地”，处理设备、布线、机房和部署；实施阶段还包括设备验收、安装调试、试运行、切换和用户培训。

- <strong>分层网络</strong>
  - 接入层连接终端，汇聚层汇聚流量并实施策略，核心层提供高速、可靠的骨干转发。
  - 连续的地址空间有利于路由汇总，可以减少上级路由器维护的明细路由数量。
  - 综合布线六个子系统是工作区、水平、干线、管理、设备间和建筑群；水平子系统连接干线子系统和工作区子系统。

- <strong>可靠性和 QoS</strong>
  - 冗余用于避免单点失效；备用路径在主路径失效时启用；负载分担使用并行链路共同承担流量。
  - IntServ 按数据流提供 QoS，服务类型包括保证质量、负载受控和尽力而为；DiffServ 按业务类别或标记提供差异化服务。
  - SDN 分离控制平面和转发平面，通常包括应用层、控制层和转发层。
  - 网络总延迟可分为处理、排队、发送和传播延迟；服务器延迟还要关注队列和磁盘 I/O。

## 网络安全

- <strong>安全目标</strong>
  - 保密性防止未授权泄露，完整性防止非法篡改，可用性保证合法访问。
  - 数字签名可以支持身份认证、完整性和不可抵赖性；单纯加密传输不能直接推出不可抵赖性。

- <strong>安全协议</strong>
  - SSL/TLS 位于传输层之上、应用协议之下，为 HTTP、SMTP 等应用层协议提供认证、加密和完整性保护；HTTPS 是 HTTP over TLS。
  - S/MIME、PGP 面向邮件安全，MIME 本身不等于安全协议；IPSec 工作在网络层。
  - Kerberos 基于对称密钥，使用可信第三方和票据完成认证，核心是 KDC 而不是 CA；时间戳等机制用于防止重放攻击。
  - 防火墙按规则监视和过滤网络边界流量，重点看其部署位置和过滤规则，不要把它与入侵检测的职责混淆。

## 其他考点

- <strong>网络存储</strong>
  - RAID5 至少需要 3 块磁盘，可用容量通常按“磁盘数量减 1”乘以最小单盘容量计算。
  - 倒排索引把词项映射到包含该词项的文档列表，适合全文检索。
  - 例如，3 块 80G 硬盘组成 RAID5，可用容量为 160G；2 块 80G 加 1 块 40G 时，按最小容量计算，可用容量为 80G。

- <strong>移动网络与 5G</strong>
  - 5G 的典型特征是高速率、低时延、大规模连接和网络切片。
  - 网络切片是在一个物理网络上划分多个逻辑隔离的虚拟网络，以适应不同业务的性能和安全要求。

## 历年真题

<details class="chapter-question-bank">
<summary class="chapter-question-bank-summary">
  <span class="chapter-question-bank-note">{{ questionCount }} 道题 / {{ recordCount }} 条分值记录</span>
  <span class="chapter-question-bank-action">
    <span class="chapter-question-bank-expand-label">展开</span>
    <span class="chapter-question-bank-collapse-label">收起</span>
  </span>
</summary>

<div class="chapter-question-bank-body">
  <div class="chapter-question-bank-chart">
    <div
      v-for="batch in examStats"
      :key="batch.exam"
      class="question-bank-chart-row"
    >
      <span class="question-bank-chart-label">{{ batch.label }}</span>
      <span class="question-bank-chart-track">
        <span
          class="question-bank-chart-bar"
          :style="{ width: `${(batch.count / examMax) * 100}%` }"
        ></span>
      </span>
      <strong>{{ batch.count }}</strong>
    </div>
  </div>
  <QuestionBank :questions="questionBank.questions" compact hide-categories />
</div>

</details>
