<script setup lang="ts">
import QuestionBank from '../../.vitepress/theme/QuestionBank.vue'
import questionBank from '../../data/question-banks/network.json'

function questionsFor(keys: string[]) {
  const selected = new Set(keys)
  return questionBank.questions
    .filter((question) => selected.has(`${question.exam}-${String(question.question_no).padStart(2, '0')}`))
    .sort((a, b) =>
      b.exam.localeCompare(a.exam) ||
      b.question_no - a.question_no ||
      a.part_no - b.part_no
    )
}

const foundationQuestions = questionsFor(['202405-35'])
const communicationQuestions = questionsFor([
  '202511-23', '202511-28', '202505-4', '202505-7', '202505-15',
  '202411-59', '202405-32', '202111-10',
])
const networkTechnologyQuestions = questionsFor([
  '202605-5', '202405-31', '202311-2', '202311-33', '202211-53',
  '202211-54', '202111-9', '202511-35',
])
const networkingQuestions = questionsFor([
  '202511-25', '202405-36', '202411-8', '202605-43', '202211-14',
  '202011-12', '201911-11', '201911-12', '201911-13', '201811-12',
  '201811-13', '201611-10', '201611-11', '201611-12', '201511-11',
])
const engineeringQuestions = questionsFor([
  '202111-11', '202011-13', '201911-35', '201711-12', '201711-11',
  '201511-45', '201411-9', '201411-8', '201311-10', '201311-9',
  '201411-10',
])
const securityQuestions = questionsFor([
  '202605-6', '202311-7', '202211-13', '202011-31', '201911-34',
  '201711-10', '201411-43',
])
const supplementaryQuestions = questionsFor(['202605-62', '201511-10'])
</script>

# 计算机网络

本页按已确认的六章结构整理：网络基础、通信技术、网络技术、组网技术、网络工程、网络安全。网络存储题数量较少，作为补充考点保留。

本模块共有<strong>52 道独立真题</strong>、<strong>55 条分值记录</strong>；六章核心内容覆盖 50 道题，补充考点覆盖 2 道题。近 4 场考试覆盖 13 道不同题号。

## 1. 网络基础

先建立分层地图，再判断设备、协议和安全机制的位置。

### 网络指标

网络指标分两类：性能指标和建设指标。

- 性能指标：速率、带宽、吞吐量、时延。
- 建设指标：费用、可靠性、可扩展性、可维护性。

做网络建设方案题时，不能只比较传输速率，还要看可靠性、扩展能力和维护成本。

### 分层模型

OSI 从下到上分为物理层、数据链路层、网络层、传输层、会话层、表示层和应用层。记住四条主线：<strong>物理层传比特，数据链路层传帧，网络层负责寻址和路由，传输层面向进程提供端到端服务</strong>。

TCP/IP 分为网络接口层、网际层、传输层和应用层；OSI 的表示层和会话层通常并入应用层。做题时先判断问题属于信号、链路、网络、进程还是应用。

<details>
<summary>相关真题：1 题</summary>

<QuestionBank :questions="foundationQuestions" compact />

</details>

## 2. 通信技术

通信技术解决信号如何编码、采样、调制、复用、交换和传输，重点是公式的适用条件。

### 编码和采样

曼彻斯特编码在码元中间跳变，具有时钟同步能力。采样频率至少为最高频率的两倍，才能在理想条件下无失真恢复。不要把采样频率和信道带宽混为一谈。

### 信道和调制

信源产生信息，发信机完成编码和调制，接收端完成解调和译码。调制是把信息承载到适合信道传输的载波上；调制解调器的典型作用是完成数字信号和模拟信号之间的转换。

### 传输速率

传输速率计算先判断信道条件：

- 理想无噪声信道使用奈奎斯特公式：`最大数据传输速率 = 2W × log₂V`。
- 有噪声信道使用香农公式：`信道容量 = W × log₂(1 + S/N)`。

其中 `W` 是带宽，`V` 是离散信号电平数，`S/N` 是信噪比。两种信道条件不能混用公式。

### 复用和交换

复用和多址要分开记：复用方式包括 TDM、FDM、CDM；多址方式包括 TDMA、FDMA、CDMA。

交换方式抓住三个关键词：电路交换独占通路，报文交换存储转发，分组交换拆分报文传输。Internet 网络核心采用分组交换。

<details>
<summary>相关真题：8 题</summary>

<QuestionBank :questions="communicationQuestions" compact />

</details>

## 3. 网络技术

这一章关注网络形态和接入技术，重点掌握 LAN、WAN、MAN、以太网、WLAN、移动网络和 5G 的特征。

### 网络类型

局域网覆盖范围有限，常见拓扑有总线型、星型、树型、环型和网状。星型网络的终端连接中心设备，总线型网络共享传输介质。

广域网连接分布较远的网络，通常需要路由器或网关；城域网覆盖城市范围，常见结构为核心层、汇聚层和接入层。

### 以太网

以太网由 IEEE 802.3 定义，帧的最小长度通常为 64 字节。设置最小帧长是为了保证发送端能在规定时间内检测冲突。

### 无线网络和 5G

WLAN 使用 IEEE 802.11 系列标准。WEP 较早，WPA 是改进方案，WPA2 基于 IEEE 802.11i 并使用 AES。

5G 的重点特征是高速率、低时延、大规模连接和网络切片。网络切片是在一个物理网络上划分多个逻辑隔离的虚拟网络。

<details>
<summary>相关真题：8 题</summary>

<QuestionBank :questions="networkTechnologyQuestions" compact />

</details>

## 4. 组网技术

这一章解决设备怎样组成网络，协议怎样完成互联，是题目最集中的章节。

### 设备和交换

| 设备 | 主要层次 | 主要作用 |
| --- | --- | --- |
| 中继器、集线器 | 物理层 | 再生信号、扩展传输距离 |
| 网桥、二层交换机 | 数据链路层 | 根据 MAC 地址转发帧 |
| 路由器、三层交换机 | 网络层 | 根据 IP 地址完成网络间转发 |
| 防火墙 | 以网络层为主 | 按规则过滤进出流量 |

交换机学习源 MAC 地址；目的地址已知则定向转发，未知则泛洪。冗余链路需要 STP 防止环路，链路聚合可以提高带宽和可靠性。

### IP 和路由

IPv4 普通子网可用主机数为 `2ⁿ - 2`；IPv6 地址长 128 位，链路本地地址通常以 `FE80::/10` 开头。

管理距离比较不同路由来源的可信程度；路由代价比较同一协议内的路径优劣。DiffServ 根据 IP 头中的服务类型字段设置 DS 码点，再进行差异化转发。

### 传输层

TCP 可靠、有连接、有序；UDP 无连接、开销小、不保证可靠有序。端口号用于标识应用进程。

### 应用服务

| 服务 | 重点 |
| --- | --- |
| DNS | A 记录正向解析，PTR 记录反向解析，端口 53 |
| DHCP | Discover、Offer、Request、Ack |
| SMTP | 发送邮件，端口 25 |
| POP3 | 接收邮件，端口 110 |
| IMAP | 管理服务器端邮件，端口 143 |
| HTTP | Web 协议，端口 80 |
| HTTPS | HTTP 加上 SSL/TLS，端口 443 |

浏览器访问 Web 页面时，通常先 DNS 解析，再完成链路寻址和 TCP 连接，最后发送 HTTP 请求。

<details>
<summary>相关真题：15 题</summary>

<QuestionBank :questions="networkingQuestions" compact />

</details>

## 5. 网络工程

网络工程按照需求分析、网络设计和网络实施展开，重点是阶段分工、分层网络、可靠性和 QoS。

### 需求和设计

需求分析包括总体需求、综合布线、可用性可靠性、安全性和工程造价初估。逻辑设计处理结构、拓扑、技术选型、IP、路由、冗余和安全；物理设计处理设备、布线、机房和部署。

做题时区分三句话：需求分析回答“需要什么”，逻辑设计回答“怎么组网”，物理设计回答“怎么落地”。

### 分层网络

接入层连接终端，汇聚层汇聚流量和实施策略，核心层提供高速可靠的骨干转发。连续地址空间可以支持路由汇总，减少上级路由器维护的明细路由数量。

### 冗余和 QoS

冗余避免单点失效；备用路径在主路径失效时启用；负载分担使用并行链路共同承担流量。

IntServ 按数据流提供 QoS；DiffServ 按业务类别或标记提供差异化服务；SDN 分离控制平面和转发平面。

### 网络实施

实施包括工程计划、设备验收、安装调试、试运行和切换、用户培训。综合布线六个子系统是工作区、水平、干线、管理、设备间和建筑群。

<details>
<summary>相关真题：11 题</summary>

<QuestionBank :questions="engineeringQuestions" compact />

</details>

## 6. 网络安全

网络安全围绕保密性、完整性和可用性展开，重点掌握安全协议的层次和使用场景。

### 安全目标

保密性防止未授权泄露，完整性防止非法篡改，可用性保证合法访问。数字签名可以支持身份认证、完整性和不可抵赖性；单纯加密传输不能直接推出不可抵赖性。

### 安全协议

- SSL/TLS 位于传输层之上、应用协议之下，提供认证、加密和完整性保护；HTTPS 是 HTTP over TLS。
- S/MIME、PGP 面向邮件安全；MIME 本身不等于安全协议；IPSec 工作在网络层。
- Kerberos 使用可信第三方和票据完成认证，关键词是单点登录、认证服务器和票据授予服务器。
- 防火墙按规则监视和过滤网络边界流量。

<details>
<summary>相关真题：7 题</summary>

<QuestionBank :questions="securityQuestions" compact />

</details>

## 补充考点：网络存储

网络存储包含 RAID5 和倒排索引，不强行归入网络安全。

- RAID5 至少需要 3 块磁盘，容量通常按“磁盘数量减 1”乘以最小单盘容量计算。
- 倒排索引把词项映射到包含该词项的文档列表，适合全文检索。

<details>
<summary>相关真题：2 题</summary>

<QuestionBank :questions="supplementaryQuestions" compact />

</details>

## 题量小结

| 章节 | 独立题数 | 分值记录 |
| --- | ---: | ---: |
| 网络基础 | 1 | 1 |
| 通信技术 | 8 | 8 |
| 网络技术 | 8 | 8 |
| 组网技术 | 15 | 16 |
| 网络工程 | 11 | 12 |
| 网络安全 | 7 | 7 |
| 补充考点：网络存储 | 2 | 3 |
| <strong>合计</strong> | <strong>52</strong> | <strong>55</strong> |
