<script setup lang="ts">
import QuestionBank from '../../.vitepress/theme/QuestionBank.vue'
import questionBank from '../../data/question-banks/security.json'

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

const foundationQuestions = questionsFor([
  '202505-51', '202411-1', '202405-48', '202211-51', '202111-41'
])
const frameworkQuestions = questionsFor(['202411-5', '202411-4', '202211-18'])
const cryptographyQuestions = questionsFor([
  '202605-15', '202605-16', '202511-27', '202511-33', '202505-59',
  '202411-52', '202311-19', '202011-11', '201811-38', '201611-41'
])
const accessQuestions = questionsFor([
  '202605-61', '202605-36', '202405-54', '202111-46', '201911-4', '201311-35'
])
const attackQuestions = questionsFor([
  '202605-17', '202411-17', '202111-29', '202011-30', '201611-42',
  '201411-42', '201311-36'
])
const assuranceQuestions = questionsFor([
  '202511-26', '202405-55', '202405-14', '202411-48', '201911-8'
])
</script>

# 信息安全

只记定义、对比、数字和题干关键词。教材对应第 4 章。

## 1. 安全基础

| 要素 | 关键词 |
| --- | --- |
| 机密性 | 防泄露 |
| 完整性 | 防篡改、删除、破坏 |
| 可用性 | 授权用户能访问；被阻止通常是拒绝服务 |
| 可控性 | 控制信息流向和行为 |
| 可审查性 | 事后追踪、取证、回放 |

信息安全范围：<strong>设备、数据、内容、行为</strong>安全。

题干判断：泄露→机密性；篡改→完整性；服务不可用→可用性；争议取证→可审查性。

<details>
<summary>相关真题：5 题</summary>

<QuestionBank :questions="foundationQuestions" compact />

</details>

## 2. 安全体系

| 体系 | 内容 |
| --- | --- |
| 技术 | 基础设备、网络、操作系统、数据库、终端 |
| 组织 | 决策层、管理层、执行层 |
| 管理 | 法律、制度、培训 |

完整的信息安全系统 = <strong>技术 + 组织 + 管理</strong>。

数据安全治理三个目标：<strong>满足合规、管理风险、促进利用</strong>。三个层次：<strong>战略层、全生命周期安全层、基础安全层</strong>。

<details>
<summary>相关真题：3 题</summary>

<QuestionBank :questions="frameworkQuestions" compact />

</details>

## 3. 加密技术

| 技术 | 关键区别 | 主要用途 |
| --- | --- | --- |
| 对称加密 | 加密、解密同一把密钥 | 大量数据加密 |
| 非对称加密 | 加密、解密不同密钥 | 保密通信、密钥交换、签名 |
| Hash/摘要 | 单向生成摘要 | 完整性校验、辅助签名 |

必记：<strong>DES 56 位</strong>；两把独立密钥的<strong>三重 DES 有效 112 位</strong>；<strong>AES 为 128/192/256 位</strong>。

- 保密：公钥加密，私钥解密。
- 签名：私钥签名，公钥验证；长文件通常先签 Hash 摘要。
- RSA：安全性依赖大数分解困难。
- KDC：主密钥保护分配过程，会话密钥用于一次通信。
- CA：签发公钥证书，证书包含身份、公钥、时间戳等，并由 CA 私钥签名。

<details>
<summary>相关真题：10 题</summary>

<QuestionBank :questions="cryptographyQuestions" compact />

</details>

## 4. 访问控制

访问控制三要素：<strong>主体、客体、控制策略</strong>。

判断顺序：<strong>认证身份 → 判断权限 → 审计行为</strong>。

| 机制 | 记忆点 |
| --- | --- |
| ACM | 行是主体，列是客体，单元格是权限 |
| ACL | 按客体保存，查“谁能访问这个客体” |
| 能力表 | 按主体保存，查“这个主体能访问什么” |
| 授权关系表 | 保存非空授权关系 |

<details>
<summary>相关真题：6 题</summary>

<QuestionBank :questions="accessQuestions" compact />

</details>

## 5. 攻击防护

| 关键词 | 直接判断 |
| --- | --- |
| DDoS/DoS | 破坏可用性 |
| SYN Flooding | 大量半连接，耗尽服务端资源 |
| IP/DNS 欺骗 | 伪造身份、地址或解析结果 |
| 流量分析 | 从流量特征推断敏感信息 |
| SQL 注入 | 恶意输入改变 SQL 逻辑 |
| 端口扫描 | 探测开放服务和操作系统 |
| 漏洞扫描 | 查找可能被利用的系统弱点 |

漏洞扫描：基于网络不需在目标机安装代理；基于主机通常能发现更多漏洞。

<details>
<summary>相关真题：7 题</summary>

<QuestionBank :questions="attackQuestions" compact />

</details>

## 6. 安全保障

保护等级由低到高：<strong>用户自主保护级 → 系统审计保护级 → 安全标记保护级 → 结构化保护级 → 访问验证保护级</strong>。

风险关系：<strong>威胁利用脆弱性作用于资产，形成风险和安全事件；安全措施降低风险，但仍可能存在残余风险</strong>。

风险评估五要素：<strong>资产、威胁、脆弱性、风险、安全措施</strong>。按实施者分为<strong>自评估</strong>和<strong>他评估</strong>。

<details>
<summary>相关真题：5 题</summary>

<QuestionBank :questions="assuranceQuestions" compact />

</details>

## 参考资料

- 《系统架构设计师教程（第 2 版）》第 4 章，教材第 145～174 页。
