<script setup lang="ts">
import QuestionBank from '../../../.vitepress/theme/QuestionBank.vue'
import questionBank from '../../../data/question-banks/architecture.json'

function questionsForCategories(categories: string[]) {
  const selected = new Set(categories)
  return questionBank.questions
    .filter((question) =>
      selected.has(question.category) &&
      question.id !== 'architecture-c03-s22-2025-05-q42-p1'
    )
    .sort((a, b) =>
      b.exam.localeCompare(a.exam) ||
      b.question_no - a.question_no ||
      a.part_no - b.part_no
    )
}

const distributedServiceQuestions = questionsForCategories([
  'REST 与 Web Service',
  '面向服务架构',
  '微服务架构',
  '云计算与虚拟化架构',
  '中间件架构',
  '企业应用集成架构',
  '网格服务架构',
  'CDN 与反向代理'
])
</script>

# 微服务与分布式架构

## 1. 服务化架构

这一组考点主要比较<strong>服务如何描述、发现、调用、组合和治理</strong>。看到题目中的术语时，先判断它解决的是资源访问、服务契约、服务发现，还是服务间解耦，不要把它们都当成“接口技术”。

### REST 与 Web Service

REST 以资源为中心，用 URI 标识资源，用 HTTP 方法表达操作，并强调无状态交互。常见方法的考试语义如下：

| 方法 | 典型语义 | 易错点 |
| --- | --- | --- |
| GET | 获取资源 | 主要用于读取，不承担创建资源的语义 |
| POST | 提交数据，常用于创建资源 | 不等同于所有修改操作 |
| PUT | 对资源进行整体替换 | 与 PATCH 的局部修改相区别 |
| PATCH | 对资源做局部修改 | 题目若强调部分字段更新，优先考虑 PATCH |

SOAP 是 Web Service 的消息交互协议，重点在<strong>规范化消息封装和跨平台通信</strong>，不是服务注册或服务编排工具。WSDL 是服务描述语言，回答“服务能做什么、如何通信、在哪里访问”三个问题：描述操作、协议与数据格式，以及访问地址。UDDI 用于服务注册与发现；BPEL 则把多个服务组织、编排成业务流程。可按“SOAP 负责交互、WSDL 负责描述、UDDI 负责发现、BPEL 负责编排”记忆。

### SOA、ESB 与微服务

SOA 面向企业级服务复用和异构系统整合，通常通过服务契约、注册发现和 ESB 统一支撑服务之间的路由、协议转换、消息格式适配与监控。ESB 的关键价值是<strong>让服务请求者不必直接依赖服务提供者的地址、协议和消息格式</strong>，从而实现松耦合；UDDI 解决的是发现问题，不能替代 ESB 的消息中介作用。

微服务按业务能力拆分应用，强调服务自治、独立开发、独立部署、独立扩展和去中心化治理。它与 SOA 都追求服务化和松耦合，但典型区别是：SOA 更关注企业范围的复用、整合和集中协调，微服务更关注小粒度服务的自治、快速交付和独立演进。题目若问管理方式，通常将微服务归为去中心化，将依托 ESB 的 SOA 归为集中协调；这不是说所有实际系统都只有一种治理形态。

微服务治理常考三种机制：

- <strong>熔断</strong>用于阻止故障调用持续扩散，经典状态为关闭、打开、半打开；半打开允许少量探测请求，成功后恢复关闭，失败则重新打开。
- <strong>超时</strong>用于限制远程调用的等待时间，避免线程或连接长期阻塞；它解决的是等待边界，不等于重试或熔断。
- <strong>CQRS</strong>将读模型与写模型分离，便于分别优化读写负载，但多个模型同步可能带来数据延迟和最终一致性问题。

<details>
<summary>相关真题：21 道独立题 / 24 条记录</summary>

<QuestionBank :questions="distributedServiceQuestions" compact hide-categories />

</details>

## 2. 分布式平台与集成

这一组考点关注<strong>异构资源怎样通信、集成、调度和就近提供</strong>。解题时要把“解耦”“异步”“资源池化”“缓存”和“标准化服务”分别对应到具体机制。

### 消息、中间件与企业应用集成

消息中间件以消息为通信载体，重点是<strong>异步通信、松耦合和可靠传递</strong>。点对点模型中，一条消息通常由一个消费者处理；发布/订阅模型中，发布者将消息发送到主题，多个订阅者可以分别接收。不要把消息中间件误解为只能同步调用的远程对象中间件。

企业应用集成（EAI）把不同应用的接口、数据和功能接入统一平台，常按自下而上的四层服务理解：<strong>通信服务、信息传递与转换服务、应用连接服务、流程控制服务</strong>。因此最高层是流程控制服务；数据格式转换属于信息传递与转换层，应用适配和连接属于应用连接层。

### 云计算与虚拟化

云计算通过资源池化、按需使用和弹性伸缩提供计算资源，虚拟化是常见的基础支撑手段。KVM、Xen、Hyper-V 属于虚拟化技术；虚拟机监控器负责在物理资源上隔离和管理虚拟机。题目中的 LVS 是负载均衡技术，不属于虚拟化技术。判断云原生或云平台选项时，优先抓住<strong>资源池化、弹性、自动化和服务化交付</strong>，不要把任何分布式软件都归为云计算。

### CDN、反向代理与网格服务

CDN 和反向代理的共同基础是<strong>缓存</strong>：代理节点代替源站接收请求，并尽量从靠近用户或请求入口的位置返回已有内容。CDN 更强调多节点、按地域就近分发静态或可缓存内容；反向代理更强调站在服务端前方统一接入、转发、缓存和隐藏源站。二者都可以改善访问性能，但 CDN 的核心是内容分发网络，不能简单等同于普通代理。

网格服务把分散的计算、存储等异构资源抽象为标准化 Web Service，通过统一接口支持资源发布、发现、组合和跨域协同。OGSA 的考点落在<strong>标准化 Web Service、异构资源服务化和互操作</strong>，不是某一种具体硬件或单一资源调度算法。
