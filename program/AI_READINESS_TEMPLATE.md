# AI Readiness Template

An organisation-level AI readiness assessment, written out in full: seven sections, 72 questions, five scored options for each, and the recommendation each question triggers. Kept as a template and reference for AISC work: the Day 2 Readiness Scorecard and Data Readiness Audit, Day 7 governance, and any organisation-level assessment for the Private Challenge or AI Clarity for Chiefs.

> **Internal reference only. Never published or given to participants as it stands.** The questions and options are a published assessment's wording, studied on 2026-10-22, with every product, vendor and link taken out. Anything that reaches participants is rewritten in AISC's own words and voice, and in plain words a non-technical leader understands.

## The assessment at a glance

It measures an organisation's preparedness for AI across seven pillars, looking at leadership vision, investment, data, models, risk and how AI fits into the business.

| # | Section | Questions | Question titles |
|---|---|---|---|
| 1 | Business Strategy | 3 | Q1 Investment Plan, Q2 Use-Cases, Q3 Business Strategy |
| 2 | Organization and Culture | 5 | Q4 Vision Communication, Q5 AI Skilling, Q6 Decision Agility, Q7 AI Expertise, Q8 Security Culture |
| 3 | AI Strategy and Experience | 4 | Q9 Identifying AI Models for Use Cases, Q10 Workflows for AI Development and Deployment, Q11 Skills and Experiences in AI Projects, Q12 Alignment of AI Strategy with Security and Threat Intelligence |
| 4 | Data Foundations | 17 | Q13 Cloud Infrastructure, Q14 Data Governance, Q15 Data Ingestion, Q16 Data Discovery, Q17 Data Access, Q18 Data Engineering, Q19 Data Labeling, Q20 Data Privacy, Q21 Data Policy & Tagging, Q22 Unstructured Data Retrieval, Q23 Structured Data Feeds, Q24 Real-time Data Processing, Q25 Data Quality Management, Q26 Data Integration, Q27 Metadata Management, Q28 Data Representativeness, Q29 Data Safeguards |
| 5 | AI Governance and Security | 9 | Q30 TEI Controls, Q31 Data Sharing, Q32 User Communication, Q33 AI Governance, Q34 AI Security, Q35 Regulatory Compliance, Q36 Human-Centred Design, Q37 AI Ethics, Q38 AI Training and Education |
| 6 | Infrastructure for AI | 17 | Q39 Reserved Capacity Provisioning, Q40 Pay-as-you-go Usage, Q41 Logging and Alerting, Q42 Deployment Management, Q43 Abuse Prevention, Q44 Bias Detection and Mitigation, Q45 Tenancy Model, Q46 Rate Limiting, Q47 Query Constraints, Q48 Utilisation Tracking, Q49 Cost Management, Q50 Security and Compliance, Q51 Scalability Planning, Q52 Continuous Learning, Q53 Agentic AI, Q54 AI Lifecycle Management, Q55 AI Performance Optimization |
| 7 | Model Management | 17 | Q56 Exploratory Data Analysis, Q57 Synthetic Data Generation, Q58 Feature Exploration, Q59 ML Pipelines, Q60 Feature Management, Q61 Model Engineering, Q62 Model Selection, Q63 Model Deployment, Q64 Release Pipelines, Q65 Model Flighting, Q66 Model Release, Q67 Inference Scaling, Q68 Inference Management, Q69 Model Interpretability, Q70 Model Fine-Tuning, Q71 Model Monitoring, Q72 AI Workflow Automation |
| | **Total** | **72** | |

## How it works

1. **Start screen.** A name for the assessment (prefilled with the date) and a checkbox for each section. Every section is optional: the person chooses which to take.
2. **One question per screen.** The section name above, the question title, the question, then five options. Every question needs one answer.
3. **Back** and **Next**, and a free note field under every question.
4. **Results page,** in two tabs: guidance and a summary of the answers.
   - An overall result: one band (Critical, Moderate or Excellent) and a score out of 5.
   - A bar for each section with its band.
   - A link to a further, more technical assessment.
   - "Improve your results": for each section, the band, the score out of 5 and a list of recommended actions. Each action has a checkbox to mark it done, a priority and a note. Tabs show recommendations and unanswered questions, with a filter.

Taking all 72 questions took about 21 minutes, with most answers at the first option. The stated time is 45 minutes.

## Scoring

- **Each option carries a score:** the first 1, then 2, 3, 4, 5. The options are maturity levels: **Initial, Evolving, Acceptable, Advanced, Optimized.**
- **A section's score is the average of its answers,** shown rounded as "n/5". The overall result is an average too.
- **Bands:** **Critical 0 to 2, Moderate 2 to 3, Excellent 3 to 5.** Excellent starts at 3, the "Acceptable" level, so an organisation that is merely acceptable everywhere is called excellent, and one that is Evolving everywhere is still Critical.
- **Recommendations:** each question has exactly one recommendation (72 in all), shown when the answer is the **first or second option** and hidden from the third upwards. A section's count of actions is the number of its questions answered at the bottom two levels.
- **Horizons:** every recommendation is tagged with a horizon the results page does not show: Horizon 1, Operational Enhancements (29); Horizon 2, Innovative Iterations (26); Horizon 3, Transformational Innovation (17). Each is listed with its recommendation below.

### Irregularities in the source

- **Organization and Culture uses its own level names,** not Initial to Optimized. For example, Vision Communication runs: No clear communication, Acknowledgement without vision, Initial communication and initiatives, Strong advocacy and understanding, Cultivation of AI-driven culture. Scores are still 1 to 5.
- **Q69 Model Interpretability scores 1, 2, 2, 3, 5.** Every other question scores 1 to 5.
- **The priority of every recommendation is 0.**

## The founder's run (20 Oct 2026)

| Section | Band | Result | Recommended actions |
|---|---|---|---|
| **Overall** | **Critical** | **1/5** | |
| Business Strategy | Critical | 1/5 | 3 |
| Organization and Culture | Moderate | 2/5 | 5 |
| AI Strategy and Experience | Critical | 1/5 | 4 |
| Data Foundations | Critical | 1/5 | 17 |
| AI Governance and Security | Critical | 1/5 | 9 |
| Infrastructure for AI | Critical | 1/5 | 17 |
| Model Management | Critical | 1/5 | 17 |

Every section showed its full count of actions (72 of 72), so every answer was at one of the two lowest levels. The answer to each question was not kept.

## Insights for AISC

1. **It measures an organisation's technology, not a leader.** Only the first three sections (12 questions) are about strategy, people and culture. The other 60 assume an engineering team, and many assume one particular cloud platform. A non-technical leader cannot answer them honestly. This confirms the Day 2 decision that a leader scores themselves.
2. **Its recommendations sell products.** In the original, many recommendations name a product as the fix, and the results page points to another assessment. AISC stays vendor-neutral.
3. **It scores harshly and reads as a verdict.** An organisation starting out lands on "Critical" in red in almost every section, with 72 actions to take. The Readiness Scorecard avoids this: a snapshot, not a test, six scores, no total and no label.
4. **Parts are reusable, rewritten for leaders:**
   - **Data Foundations (Q13 to Q29)** gives a checklist of data qualities (governance, access, privacy, quality, labelling, metadata, representativeness, safeguards) for the Day 2 Data Readiness Audit, once translated out of technical language.
   - **AI Governance and Security (Q30 to Q38)** lines up with Day 7: governance, ethics, regulatory compliance, user communication, data sharing, human-centred design, training.
   - **Business Strategy, Organization and Culture, AI Strategy and Experience (Q1 to Q12)** are close to what a chief or a leadership team could answer, which suits an organisation-level check for the Private Challenge or AI Clarity for Chiefs.
   - **The five-level ladder** (Initial, Evolving, Acceptable, Advanced, Optimized), with a concrete description of each level per question, is a clear pattern for any maturity scale.
5. **Results features worth borrowing:** the next step shown right where a low answer is, a note on every question and action, a list of unanswered questions, and actions that appear only for the two lowest answers.
6. **Mistakes to avoid in our own tools:** level names that change between sections, a question with irregular scores, broken characters in the text, typos in titles, and a priority field that is always 0.

---

# Sections, questions and options

Each question lists its five options with the score each one carries, then the recommendation shown for the two lowest answers.

## 1. Business Strategy

The Business Strategy questionnaire evaluates the alignment of your organization's strategic goals with AI integration. It assesses strategic vision, leadership commitment, resource allocation, and market positioning, while also considering the Investment Plan and Use-cases to ensure your business strategy effectively leverages AI for sustainable growth.

3 questions.

### Q1. Investment Plan

**How well-defined is the investment plan for AI implementation across the business?**

| Score | Option |
|---|---|
| 1 | Initial: There's limited focus on a formal investment plan. The emphasis is on understanding potential costs associated with AI (such as data preparation and tools). |
| 2 | Evolving: Development of a clear investment plan is underway. This plan estimates costs for data, infrastructure, personnel, tools, and ROI, and identifies funding sources. |
| 3 | Acceptable: There's a well-established investment plan in place. Monitoring and adjustments occur based on actual project costs and results. |
| 4 | Advanced: The investment plan is continuously updated to reflect increased resource requirements as successful initiatives scale. |
| 5 | Optimized: There's a continuous focus on maximizing the value delivered by AI. Investment plans are optimized for cost-effectiveness. |

**Recommendation** (shown when the answer is the first or second option; Horizon 1: Operational Enhancements): Create an investment plan to leverage Generative AI for Maximum ROI.

### Q2. Use-Cases

**How far along is your organization in establishing approved, prioritized, and socialized use cases for AI?**

| Score | Option |
|---|---|
| 1 | Initial: There are no identified or documented AI use cases. There's limited focus on researching potential applications of AI that align with business objectives. |
| 2 | Evolving: Potential AI use cases have been identified through workshops or brainstorming. They are now being evaluated and prioritized based on factors like business impact, feasibility (data, technical expertise, and infrastructure), and potential benefits. |
| 3 | Acceptable: Approved use cases are under development or being deployed. |
| 4 | Advanced: Successful AI initiatives are being scaled to a broader scope or across different departments. |
| 5 | Optimized: Existing use cases are continuously monitored and evaluated for performance against established metrics. |

**Recommendation** (shown when the answer is the first or second option; Horizon 1: Operational Enhancements): Implement a change management plan to socialize the value of AI across the organization. This might involve informing relevant teams about the AI initiatives and their goals, as well as addressing potential concerns through transparent communication. Go through a checklist of secure, responsible AI implementation. Ensure that the performance of the deployed AI is monitored and outcomes are measured both to provide assurance of intended performance and to provide visibility to future drift.

### Q3. Business Strategy

**How effectively does the business strategy integrate security throughout the AI lifecycle?**

| Score | Option |
|---|---|
| 1 | Initial: Security is not a major consideration in the early stages of exploring AI use cases. There might be basic awareness but no formal policies or processes. |
| 2 | Evolving: The organization recognizes the need for security in AI and is beginning to develop a plan. Security considerations might be included in high-level project proposals. |
| 3 | Acceptable: A basic security policy for AI projects is established. Security considerations are included in some stages of the AI development lifecycle, but the process might not be fully integrated. |
| 4 | Advanced: A documented security framework for AI is in place, and security is integrated into core development processes. Security training is provided for relevant personnel. |
| 5 | Optimized: The organization has a mature security posture for AI. Security is a continuous focus, and best practices are consistently applied. |

**Recommendation** (shown when the answer is the first or second option; Horizon 1: Operational Enhancements): Develop a comprehensive security framework for AI that outlines security considerations throughout the full lifecycle (data collection, training, deployment, and monitoring). Assign roles and responsibilities for AI security within the organization.

## 2. Organization and Culture

The AI Strategy and Experience questionnaire evaluates your organization's approach to AI implementation. It covers identifying AI models for use cases, developing and deploying AI workflows, fostering diversity in roles and experiences within AI projects, and aligning AI strategy with security and threat intelligence to ensure comprehensive and secure AI integration. Additionally, it assesses vision communication, AI skilling, decision agility, AI expertise, and security culture to provide a holistic view of your organization's AI readiness.

5 questions.

### Q4. Vision Communication

**How effectively has company leadership communicated their vision and the importance of AI for the future of the business?**

| Score | Option |
|---|---|
| 1 | No clear communication: Leadership has not communicated about AI. The focus is on understanding AI's potential impact. |
| 2 | Acknowledgement without vision: Leadership acknowledges AI's potential but hasn't communicated a clear vision. |
| 3 | Initial communication and initiatives: Leadership has communicated a vision for AI, and initial AI initiatives are underway. |
| 4 | Strong advocacy and understanding: Leadership strongly advocates for AI, and there's a company-wide understanding of its importance. |
| 5 | Cultivation of AI-driven culture: Leadership actively cultivates an AI-driven culture of innovation and continuous learning. |

**Recommendation** (shown when the answer is the first or second option; Horizon 1: Operational Enhancements): Conduct an internal assessment of potential AI applications and engage leadership in discussions about AI impact on the organization.

### Q5. AI Skilling

**How readily available are the AI skilling and credentialing resources needed to execute on AI initiatives for the customer?**

| Score | Option |
|---|---|
| 1 | No formal program: No formal program for developing AI skills. The focus is on identifying needed skills. |
| 2 | Recognition and planning: The organization recognizes the need for AI skills development and is planning to make resources available. |
| 3 | Initial skilling programs: Initial AI skilling programs are being offered to employees. |
| 4 | Comprehensive program: A comprehensive AI skills development program is in place, supporting a mature AI workforce. |
| 5 | Culture of continuous learning: There's a culture of continuous learning focused on AI, actively fostering and promoting AI expertise. |

**Recommendation** (shown when the answer is the first or second option; Horizon 1: Operational Enhancements): Conduct a skills gap analysis to identify the specific AI skills and knowledge required for current and future initiatives.

### Q6. Decision Agility

**How agile are the company's decision-making processes to take advantage of fast-moving advances in AI?**

| Score | Option |
|---|---|
| 1 | No formal process: No formal process for evaluating and adopting new AI advancements. The focus is on understanding AI's potential. |
| 2 | Recognition and planning: The organization recognizes the need for agility and is planning to establish agile decision-making processes. |
| 3 | Initial agile processes: Initial agile decision-making processes are in place, with proof-of-concept projects. |
| 4 | Well-established agility: Agile decision-making is well established, supporting quick adaptation to new AI advancements. |
| 5 | Leadership in AI adoption: The organization is a leader in adopting cutting-edge AI advancements, with agile decision-making as a core strength. |

**Recommendation** (shown when the answer is the first or second option; Horizon 1: Operational Enhancements): Conduct an internal assessment to identify areas where AI could be beneficial. Research different AI technologies and applications.

### Q7. AI Expertise

**What is the level of expertise available to contribute to AI projects?**

| Score | Option |
|---|---|
| 1 | No dedicated team: No dedicated AI team or expertise. The focus is on identifying needed skillsets. |
| 2 | Recognition and planning: The organization recognizes the need for AI expertise and is planning to make experts available. |
| 3 | Initial access to expertise: Initial access to AI expertise has been established, with experts contributing to projects. |
| 4 | Well-established AI team: A well-established AI team with diverse expertise supports a mature AI development pipeline. |
| 5 | Deep pool of expertise: The organization has a deep pool of AI expertise, attracting top talent, with a dedicated AI officer on staff. |

**Recommendation** (shown when the answer is the first or second option; Horizon 1: Operational Enhancements): Conduct a skills gap analysis to identify the required AI knowledge and skills needed for current and future initiatives at expert level. Research options for acquiring AI expertise, such as hiring AI specialists or partnering with external AI partners.

### Q8. Security Culture

**How deeply has a security-first culture been instilled into all aspects of the organization (operations, employee training, product development, and leadership commitment)?**

| Score | Option |
|---|---|
| 1 | Low security awareness: Security awareness is generally low, and security is not a primary focus. |
| 2 | Recognition and basic policies: The organization recognizes the need for a security-first culture but lacks a concrete plan. Basic policies might exist. |
| 3 | Established training programs: Security awareness training programs are established, with partial integration into operations and development. |
| 4 | Strong security culture: Security is a core value integrated into daily operations, training, and development. Leadership demonstrates commitment. |
| 5 | Ingrained security culture: Security is ingrained in all aspects of the organization, with consistent security consciousness and unwavering leadership commitment. |

**Recommendation** (shown when the answer is the first or second option; Horizon 1: Operational Enhancements): Initiate awareness campaigns to educate employees on the importance of cybersecurity, especially in the context of AI. Identify security risks associated with AI adoption within the organization. Begin discussions with leadership to emphasize the need for a security-first culture.

## 3. AI Strategy and Experience

The AI Strategy and Experience Questionnaire evaluates your organization's approach to AI implementation. It covers identifying AI models for use cases, developing and deploying AI workflows, fostering diversity in roles and experiences within AI projects, and aligning AI strategy with security and threat intelligence to ensure comprehensive and secure AI integration.

4 questions.

### Q9. Identifying AI Models for Use Cases

**How readily can your organization identify the AI models best suited for the respective AI use cases?**

| Score | Option |
|---|---|
| 1 | Initial: There's no formal process for selecting AI models. The focus is on understanding basic AI concepts and their potential applications for achieving business objectives. |
| 2 | Evolving: Potential AI use cases have been identified. The focus is on selecting the most appropriate model for each use case based on factors like data availability and characteristics, as well as desired model outcomes. |
| 3 | Acceptable: Pilot testing of chosen AI models is underway, or initial model deployment has begun. |
| 4 | Advanced: Successful AI models are deployed and delivering value. There's a continuous process for evaluating and potentially upgrading models based on real-world data and user feedback. |
| 5 | Optimized: A well-defined process for model selection and improvement is in place. The organization actively seeks opportunities to use cutting-edge AI models for continuous value creation. |

**Recommendation** (shown when the answer is the first or second option; Horizon 1: Operational Enhancements): Select the most appropriate AI model for each use case by consulting with AI experts, conducting feasibility studies of different models, and pilot testing the chosen models with a limited data set to evaluate their performance.

### Q10. Workflows for AI Development and Deployment

**At what level are there workflows in place to create a standard, repeatable process for the development and deployment of AI solutions?**

| Score | Option |
|---|---|
| 1 | Initial: No defined AI workflows exist. |
| 2 | Evolving: The organization recognizes the need for standardized processes. A high-level development workflow for AI solutions is being defined. |
| 3 | Acceptable: Initial development and deployment processes are being implemented and tested through pilot projects. |
| 4 | Advanced: A well-defined and standardized development process is in place and supporting the successful deployment of AI solutions across the organization. |
| 5 | Optimized: The development and deployment process is highly optimized, efficient, and adaptable to evolving AI needs. The organization is actively seeking opportunities to use MLOps practices for continuous improvement. |

**Recommendation** (shown when the answer is the first or second option; Horizon 1: Operational Enhancements): Identify the need for standardized processes for AI development and deployment. Research and explore best practices for building and managing AI projects.

### Q11. Skills and Experiences in AI Projects

**How diverse are the roles and experiences of people involved in AI projects?**

| Score | Option |
|---|---|
| 1 | Initial: There is no dedicated team for AI projects. The organization is in the early stages of identifying the skills and experience required for AI development and deployment. |
| 2 | Evolving: The organization recognizes the need for skilled AI practitioners. A plan is being developed to build a team with foundational AI capabilities and relevant experience. |
| 3 | Acceptable: An initial AI team is in place with some relevant skills and experience. The team is actively working on AI projects, though capabilities may still be developing. |
| 4 | Advanced: A well-established AI team with strong technical skills and practical experience is leading AI initiatives across the organization. |
| 5 | Optimized: The organization has a highly skilled, experienced, and continuously learning AI team that drives innovation and supports AI adoption across business functions. |

**Recommendation** (shown when the answer is the first or second option; Horizon 1: Operational Enhancements): Conduct a skills gap analysis to identify the skills and experience needed for AI projects (data science, software engineering, domain knowledge, project management, and communication).

### Q12. Alignment of AI Strategy with Security and Threat Intelligence

**How aligned is the AI strategy with security and threat intelligence?**

| Score | Option |
|---|---|
| 1 | Initial: There's no dedicated team or strategy for AI projects. The focus is on identifying potential skillsets needed for AI security strategy development and deployment. |
| 2 | Evolving: The organization recognizes the potential of AI for security and threat intelligence. High-level plans might exist to explore AI-powered security solutions. |
| 3 | Acceptable: A basic AI strategy for security and threat intelligence is established. Pilot projects might be underway to test the effectiveness of AI solutions in specific security areas. |
| 4 | Advanced: A mature AI strategy for security and threat intelligence is in place. Multiple AI-powered security solutions are successfully deployed and integrated with the existing security infrastructure. |
| 5 | Optimized: The organization demonstrates a best-in-class approach to AI-powered security and threat intelligence. AI is fully integrated into the overall security strategy, delivering significant improvements in threat detection and prevention. |

**Recommendation** (shown when the answer is the first or second option; Horizon 1: Operational Enhancements): Initiate discussions on how AI can be used to enhance security and threat intelligence capabilities. Identify potential use cases for AI in security, such as anomaly detection or cyber threat analysis.

## 4. Data Foundations

The Data Foundations questionnaire is designed to assess the maturity and readiness of your organization’s data infrastructure for AI implementation. This questionnaire covers key areas such as data governance, data quality, data integration, and data management practices. By evaluating these aspects, the questionnaire helps identify strengths and areas for improvement, ensuring that your data foundation is robust enough to support successful AI initiatives.

17 questions.

### Q13. Cloud Infrastructure

**How robust is the customer's dedicated cloud infrastructure for running large AI workloads, making advancements in machine learning (ML) and analytic and generative AI (GenAI), and performing reliably at scale?**

| Score | Option |
|---|---|
| 1 | Initial: Your organization has no dedicated cloud infrastructure for AI. Efforts are focused on understanding the computational requirements of AI projects and aligning them with existing IT resources. |
| 2 | Evolving: Your organization has a basic plan for dedicated cloud infrastructure, but it lacks full structure. The plan considers aspects like processing power, storage capacity, and security for AI workloads, but comprehensive implementation is not yet established. |
| 3 | Acceptable: Your organization has deployed a dedicated cloud infrastructure that supports initial AI workloads. While structured, the infrastructure lacks scalability and efficiency. |
| 4 | Advanced: Your organization has a scalable cloud infrastructure in place, effectively supporting AI initiatives with growing processing demands and data volume. However, there are opportunities for further optimization. |
| 5 | Optimized: Your organization has a well-optimized cloud infrastructure seamlessly integrated with AI initiatives. The infrastructure delivers optimal performance at scale, with continuous improvements ensuring high efficiency and effectiveness. |

**Recommendation** (shown when the answer is the first or second option; Horizon 1: Operational Enhancements): Consider adopting a well-architected framework for cloud infrastructure, so it can run large AI workloads with robust performance, scalability and optimisation.

### Q14. Data Governance

**How effective is your organization’s data governance in ensuring data quality, security, accessibility, and compliance? Consider processes for data validation, policies for data management, measures for data protection, and roles and responsibilities for maintaining data governance.**

| Score | Option |
|---|---|
| 1 | Initial: Your organization has no data governance in place. Data management practices are unstructured and lack formal oversight. |
| 2 | Evolving: Your organization has basic data governance, but it lacks structure. Initial efforts are made, but comprehensive policies are not yet established. |
| 3 | Acceptable: Your organization has structured data governance, though it lacks automation. Processes are in place, but efficiency and scalability are limited. |
| 4 | Advanced: Your organization has automated data governance, but it lacks optimization. Systems are in place, yet there are opportunities for refining and improving governance practices. |
| 5 | Optimized: Your organization has fully automated and optimized data governance. Data management practices are well-integrated, efficient, and continuously improving. |

**Recommendation** (shown when the answer is the first or second option; Horizon 1: Operational Enhancements): Consider implementing a comprehensive data governance framework that includes establishing clear policies, roles, and responsibilities; investing in automated data management tools; and ensuring regular audits for compliance and optimization.

### Q15. Data Ingestion

**How is data ingested into your data platform? Consider the diversity of data sources, handling of various data formats, efficiency with large volumes and high velocities, data quality assurance, scalability, and the extent of process automation.**

| Score | Option |
|---|---|
| 1 | Initial: Your organization has no formal data ingestion processes. Data is ingested manually, leading to inconsistency and delays. |
| 2 | Evolving: Your organization has basic data ingestion processes, but they lack structure. Initial automation efforts are in place, but many steps remain manual. |
| 3 | Acceptable: Your organization has structured data ingestion processes, though they lack full automation. Data is ingested from multiple sources, but efficiency and scalability are limited. |
| 4 | Advanced: Your organization has automated data ingestion processes, but they lack optimization. Systems are in place to handle large volumes of data, yet there are opportunities for refining and improving ingestion practices. |
| 5 | Optimized: Your organization has fully automated and optimized data ingestion processes. Data is ingested efficiently from diverse sources with minimal manual intervention, ensuring high quality and scalability. |

**Recommendation** (shown when the answer is the first or second option; Horizon 1: Operational Enhancements): Consider implementing a robust data ingestion framework that supports diverse data sources and formats, ensures data quality, and is scalable and automated.

### Q16. Data Discovery

**How effectively is data discovered and cataloged in your organization? Consider the comprehensiveness of the data inventory, metadata management, search and discovery tools, data classification, data lineage tracking, and user accessibility.**

| Score | Option |
|---|---|
| 1 | Initial: Your organization has no formal processes for data discovery and cataloging. Data assets are scattered and poorly documented. |
| 2 | Evolving: Your organization has basic data discovery and cataloging processes, but they lack structure. Some data is cataloged, but many assets remain undocumented. |
| 3 | Acceptable: Your organization has structured data discovery and cataloging processes, though they lack full automation. A significant portion of data is cataloged, but improvements are needed for better metadata management and search capabilities. |
| 4 | Advanced: Your organization has automated data discovery and cataloging processes, but they lack optimization. Systems are in place to manage and discover data effectively, yet there are opportunities for refining and enhancing these practices. |
| 5 | Optimized: Your organization has fully automated and optimized data discovery and cataloging processes. Data assets are comprehensively documented, easily discoverable, and metadata is well-managed and up-to-date. |

**Recommendation** (shown when the answer is the first or second option; Horizon 1: Operational Enhancements): Consider implementing a comprehensive data discovery and cataloging framework that includes robust metadata management, automated data classification, and effective search and discovery tools.

### Q17. Data Access

**How effectively is data accessed and managed in your organization? Consider access controls, data security protocols, data governance policies, user accessibility, data integration, and the effectiveness of data management tools.**

| Score | Option |
|---|---|
| 1 | Initial: Your organization has no formal processes for data access and management. Data access is ad-hoc, and there are significant issues with data security and governance. |
| 2 | Evolving: Your organization has basic processes for data access and management, but they lack structure. Initial efforts are in place, but comprehensive policies are not yet established. |
| 3 | Acceptable: Your organization has structured processes for data access and management, though they lack full automation. Data is accessible to authorized users, but efficiency and scalability are limited. |
| 4 | Advanced: Your organization has automated data access and management processes, but they lack optimization. Systems are in place to manage data effectively, yet there are opportunities for refining and improving these practices. |
| 5 | Optimized: Your organization has fully automated and optimized data access and management processes. Data is securely managed and easily accessible to authorized users, with robust governance and integration practices. |

**Recommendation** (shown when the answer is the first or second option; Horizon 1: Operational Enhancements): Consider implementing a comprehensive data access and management framework that includes robust access controls, data security protocols, and efficient management tools.

### Q18. Data Engineering

**How effectively is data engineering implemented in your organization? Consider data pipeline efficiency, scalability, data quality, automation, monitoring, integration, and security.**

| Score | Option |
|---|---|
| 1 | Initial: Data engineering processes are ad-hoc or inconsistently implemented, leading to inefficiencies and data quality issues. |
| 2 | Evolving: Basic data engineering practices are in place, but scalability and automation are limited. |
| 3 | Acceptable: Structured data engineering processes exist, though there is room for improvement in automation and scalability. |
| 4 | Advanced: Automated data engineering processes are implemented with effective scalability and robust monitoring. |
| 5 | Optimized: Fully automated and optimized data engineering processes ensure high efficiency, scalability, and data quality, with proactive maintenance and compliance measures. |

**Recommendation** (shown when the answer is the first or second option; Horizon 1: Operational Enhancements): Consider enhancing effectiveness through structured processes, automation, and scalable solutions to optimize data engineering practices within your organization.

### Q19. Data Labeling

**How effectively is data labeled and categorized in your organization? Consider consistency, accuracy, relevance, automation, integration, user accessibility, and feedback mechanisms.**

| Score | Option |
|---|---|
| 1 | Initial: Data labeling and categorization are ad-hoc or inconsistently applied, leading to confusion and inefficiencies. |
| 2 | Evolving: Basic standards exist, but there are inconsistencies and inaccuracies in data labeling and categorization. |
| 3 | Acceptable: Data labeling and categorization are mostly consistent and accurate, but manual processes limit scalability. |
| 4 | Advanced: Automated tools ensure consistent and accurate data labeling and categorization, enhancing efficiency and integration. |
| 5 | Optimized: Fully automated and optimized processes with AI-driven insights and continuous improvement mechanisms ensure data labels and categories are highly accurate, relevant, and accessible. |

**Recommendation** (shown when the answer is the first or second option; Horizon 1: Operational Enhancements): Consider implementing structured and automated data labeling and categorization processes. A data governance tool with data classification and information protection can help with labeling and categorization needs.

### Q20. Data Privacy

**How effectively is data privacy managed and enforced in your organization? Consider data privacy policies, data minimization and retention, access controls, data encryption, compliance, and training initiatives.**

| Score | Option |
|---|---|
| 1 | Initial: Data privacy policies are inconsistent, leading to compliance gaps and security risks. Access controls and encryption are basic, with limited automation and infrequent audits. |
| 2 | Evolving: Policies are documented but inconsistently applied. Access controls and encryption are improving, but manual processes and sporadic audits hinder compliance. |
| 3 | Acceptable: Clear policies are well-communicated. Automated access controls and comprehensive encryption cover sensitive data. Regular audits ensure compliance and prompt remediation. |
| 4 | Advanced: Automated policies and proactive compliance management are in place. AI-driven access controls and encryption adapt to threats. Integrated audits ensure continuous improvement. |
| 5 | Optimized: Fully automated, AI-driven policies ensure predictive compliance and proactive security. Advanced access controls and encryption are continuously optimized with real-time audits and immediate remediation. |

**Recommendation** (shown when the answer is the first or second option; Horizon 1: Operational Enhancements): Consider implementing structured and automated data privacy management and enforcement processes in your organization.

### Q21. Data Policy & Tagging

**How effectively are data policies and tagging strategies implemented in your organization? Consider policy definition, tagging standards, automation, access control, compliance, searchability, governance, and monitoring.**

| Score | Option |
|---|---|
| 1 | Initial: Data policies and tagging are poorly defined and inconsistent. Minimal automation, basic access controls, overlooked compliance, limited searchability, and sporadic governance and monitoring. |
| 2 | Evolving: Policies are documented but inconsistently enforced. Emerging tagging standards with some automation. Improving access controls, ad-hoc compliance, better searchability, and more regular monitoring. |
| 3 | Acceptable: Clear policies and tagging standards, well-communicated. Automated tags and access controls, regular compliance reviews, easily searchable data, defined governance roles, and established monitoring processes. |
| 4 | Advanced: Automated and consistent policies and tagging. Robust, automated access controls, proactive compliance, efficient searchability, integrated governance, and continuous monitoring. |
| 5 | Optimized: Fully automated, AI-driven policies and tagging. Dynamic access controls, predictive compliance, real-time monitoring, immediate remediation, and deeply embedded governance with advanced tools. |

**Recommendation** (shown when the answer is the first or second option; Horizon 1: Operational Enhancements): Consider implementing data policy and tagging solutions, including information protection and data loss prevention. These tools enhance data governance, ensure compliance and improve security posture.

### Q22. Unstructured Data Retrieval

**How effectively is unstructured data retrieved and preprocessed in your organization? Consider data source integration, retrieval methods, search capabilities, preprocessing tools, scalability, data quality management, metadata enrichment, and automation.**

| Score | Option |
|---|---|
| 1 | Initial: Poorly identified and integrated data sources. Inefficient retrieval, limited search, basic pre-processing, ad-hoc quality management, rare metadata enrichment, minimal automation. |
| 2 | Evolving: Better identified and partially integrated data sources. Improving retrieval, developing search, advanced pre-processing, emerging quality management, more common metadata enrichment, some automation. |
| 3 | Acceptable: Unstructured data sources are well-identified and integrated. Retrieval is efficient, search capabilities are robust, pre-processing tools are effective and scalable, data quality management is systematic, metadata enrichment is standard practice, and automation is widely implemented. |
| 4 | Advanced: Comprehensively integrated data sources. Highly efficient retrieval, advanced search, sophisticated and scalable pre-processing, proactive quality management, thorough metadata enrichment, extensive automation. |
| 5 | Optimized: Seamlessly integrated data sources. Optimized retrieval, cutting-edge search, state-of-the-art and scalable pre-processing, predictive quality management, continuous metadata enrichment, pervasive automation. |

**Recommendation** (shown when the answer is the first or second option; Horizon 1: Operational Enhancements): Consider a unified analytics platform for unstructured data retrieval: centralised storage, AI-assisted discovery, tools for data ingestion and transformation, and real-time analysis of streaming data. Simplify data management and enhance retrieval capabilities.

### Q23. Structured Data Feeds

**How effectively are structured data feeds and streams managed in your organization? Consider integration, timeliness, scalability, quality assurance, monitoring, transformation, security, and compliance.**

| Score | Option |
|---|---|
| 1 | Initial: Minimal and inconsistent data feed integration. Poor timeliness with delays, limited scalability, ad-hoc quality assurance, sporadic monitoring, basic data transformation, rudimentary security, and overlooked compliance. |
| 2 | Evolving: Better integration but inconsistent. Improving timeliness, addressing scalability, emerging quality assurance, more regular monitoring, sophisticated data transformation, improving security, and structured compliance efforts. |
| 3 | Acceptable: Well-integrated data feeds. Good timeliness with near real-time processing, adequate scalability, systematic quality assurance, consistent monitoring, effective data transformation, robust security, and regular compliance reviews. |
| 4 | Advanced: Seamlessly integrated data feeds. Excellent timeliness with real-time processing, high scalability, proactive quality assurance, comprehensive monitoring, highly effective data transformation, advanced security, and proactive compliance management. |
| 5 | Optimized: Fully integrated and optimized data feeds. Near-instantaneous timeliness with real-time processing, virtually unlimited scalability, predictive quality assurance, continuous and automated monitoring, state-of-the-art data transformation, cutting-edge security, and seamless compliance integration. |

**Recommendation** (shown when the answer is the first or second option; Horizon 1: Operational Enhancements): Use data pipelines for structured data feeds. Streamline workflows, automate transformations, ensure seamless data movement, and monitor with built-in tools. Schedule pipeline runs for scalability and reliability. Enhance data management efficiently.

### Q24. Real-time Data Processing

**How effectively is real-time data processing managed in your organization? Consider data ingestion, stream processing, low latency, scalability, visualization, security, and compliance.**

| Score | Option |
|---|---|
| 1 | Initial: Inconsistent, manual data ingestion. Basic stream processing with high latency. Limited scalability, rudimentary visualization tools, minimal security, and neglected compliance. |
| 2 | Evolving: Improving data ingestion with some automation. More efficient stream processing, but latency issues persist. Addressing scalability, better visualization tools, improving security, and structured compliance efforts. |
| 3 | Acceptable: Automated, reliable data ingestion. Efficient stream processing with low latency. Adequate scalability, effective visualization tools, robust security, and regular compliance reviews. |
| 4 | Advanced: Highly automated, optimized data ingestion. Near real-time stream processing with minimal latency. High scalability, advanced visualization tools, comprehensive security, and proactive compliance management. |
| 5 | Optimized: Fully automated, seamless data ingestion. Real-time stream processing with negligible latency. Virtually unlimited scalability, cutting-edge visualization tools, state-of-the-art trends in security, and seamless compliance integration |

**Recommendation** (shown when the answer is the first or second option; Horizon 1: Operational Enhancements): Use real-time analytics for dynamic insights and actions. Centralise data in a real-time hub, use no-code connectors for integration, and employ advanced analytics for comprehensive insights. Set up real-time alerts for proactive monitoring and decision-making.

### Q25. Data Quality Management

**How effectively is data quality managed in your organization? Consider policies, validation, cleansing, lineage, monitoring, ownership, tools, and training.**

| Score | Option |
|---|---|
| 1 | Initial: Undefined or poorly communicated policies, ad-hoc validation and cleansing, minimal lineage tracking, sporadic monitoring, unclear ownership, basic tools, and limited or non-existent training. |
| 2 | Evolving: Documented but inconsistently enforced policies, improving validation and cleansing, some lineage tracking, more regular monitoring, emerging ownership roles, more sophisticated tools, and starting training initiatives. |
| 3 | Acceptable: Clear, well-communicated policies, systematic validation and cleansing, comprehensive lineage tracking, consistent monitoring, clearly defined ownership roles, effective tools, and regular training. |
| 4 | Advanced: Automated and consistently applied policies, advanced validation and cleansing, detailed lineage tracking, proactive monitoring, well-established ownership, highly effective tools, and continuous training programs. |
| 5 | Optimized: Fully automated and integrated policies, predictive validation and cleansing, real-time lineage tracking, continuous and automated monitoring, deeply embedded ownership, state-of-the-art tools, and ongoing adaptive training. |

**Recommendation** (shown when the answer is the first or second option; Horizon 1: Operational Enhancements): Consider a data quality management tool to enhance data reliability and accuracy: data profiling, no-code or low-code quality rules, regular quality scans and integration with governance, ensuring continuous improvement and high data integrity standards.

### Q26. Data Integration

**How effectively is data integration managed in your organization? Consider integration strategy, data sources, tools and platforms, real-time capabilities, data quality, scalability, error handling, and lineage and traceability.**

| Score | Option |
|---|---|
| 1 | Initial: Undefined strategy, poorly integrated data sources, basic tools and platforms, limited real-time capabilities, inconsistent data quality, minimal scalability, ad-hoc error handling, and lacking lineage and traceability. |
| 2 | Evolving: Developing strategy, better integration of data sources, improving tools and platforms, some real-time capabilities, addressing data quality, increasing scalability, emerging error handling processes, and implementing lineage and traceability. |
| 3 | Acceptable: Clear strategy aligned with business goals, well-integrated data sources, effective tools and platforms, robust real-time capabilities, consistently managed data quality, scalability meeting current needs, systematic error handling, and comprehensive lineage and traceability. |
| 4 | Advanced: Proactive strategy fully aligned with business objectives, seamlessly integrated data sources, advanced tools and platforms, highly efficient real-time capabilities, proactively managed data quality, high scalability, automated error handling, and detailed and accessible lineage and traceability. |
| 5 | Optimized: Fully optimized and predictive strategy, seamlessly and dynamically integrated data sources, state-of-the-art tools and platforms, near-instantaneous real-time capabilities, data quality managed with predictive analytics, virtually unlimited scalability, fully automated error handling, and continuously updated and easily accessible lineage and traceability. |

**Recommendation** (shown when the answer is the first or second option; Horizon 1: Operational Enhancements): Consider messaging, event routing and workflow automation services for comprehensive data integration. Messaging ensures reliable, scalable delivery. Event routing simplifies event-driven development with real-time handling. Workflow automation connects systems with minimal coding.

### Q27. Metadata Management

**How effectively is metadata management handled in your organization? Consider metadata strategy, tools and platforms, standards, automation, lineage, accessibility, governance, and quality assurance.**

| Score | Option |
|---|---|
| 1 | Initial: Undefined strategy, basic tools and platforms, inconsistent standards, minimal automation, poor lineage tracking, limited accessibility, unclear governance roles, and ad-hoc quality assurance. |
| 2 | Evolving: Developing strategy, better tools and platforms, emerging standards, some automation, improving lineage tracking, increasing accessibility, defining governance roles, and emerging quality assurance practices. |
| 3 | Acceptable: Clear, well-communicated strategy, effective tools and platforms, consistently applied standards, widespread automation, comprehensive lineage tracking, good accessibility, clearly defined governance roles, and systematic quality assurance. |
| 4 | Advanced: Proactive strategy fully aligned with business objectives, advanced tools and platforms, rigorously applied standards, extensive automation, detailed and accessible lineage tracking, easily accessible metadata, integrated governance, and proactive quality assurance. |
| 5 | Optimized: Fully optimized and predictive strategy, state-of-the-art tools and platforms, dynamically applied standards, pervasive automation, continuously updated and easily accessible lineage tracking, highly accessible metadata, deeply embedded governance, and continuous adaptive quality assurance. |

**Recommendation** (shown when the answer is the first or second option; Horizon 1: Operational Enhancements): Consider a metadata management tool to enhance data governance and compliance: automated discovery, scanning and classification of data across on-premises, multi-cloud and SaaS environments, ensuring comprehensive and efficient data oversight.

### Q28. Data Representativeness

**How representative is the customer's data against relevant target customers and business objectives?**

| Score | Option |
|---|---|
| 1 | Initial: Your organization has no formal process for assessing data representativeness. Efforts are focused on identifying potential data sources relevant to target customers and business objectives. |
| 2 | Evolving: Your organization has developed a basic data access plan considering data representativeness, but it lacks full structure. The plan outlines strategies for acquiring data that reflects the target audience and aligns with business goals. |
| 3 | Acceptable: Your organization is actively collecting and integrating data based on the data access plan. The representativeness of the data is being monitored, but processes are not yet fully optimized. |
| 4 | Advanced: Your organization has successfully deployed AI models, and data representativeness is actively monitored and maintained. However, there are opportunities for further optimization. |
| 5 | Optimized: Your organization has a well-established process for ensuring data representativeness throughout the AI lifecycle. Data quality and relevance are continuously monitored and optimized, ensuring high accuracy and effectiveness. |

**Recommendation** (shown when the answer is the first or second option; Horizon 1: Operational Enhancements): Consider a data governance programme to uplift your organization's data representativeness maturity, ensuring comprehensive data governance, quality and alignment with business objectives.

### Q29. Data Safeguards

**How strong are the data safeguards to protect the digital assets and critical infrastructure that underpin the organization's AI initiatives?**

| Score | Option |
|---|---|
| 1 | Initial: Your organization has limited awareness of data security best practices. There are no formal data safeguarding processes in place for AI initiatives. |
| 2 | Evolving: Your organization recognizes the need for data safeguards for AI and is starting to develop a plan. Basic data security policies might exist, but they are not specifically tailored for AI initiatives. |
| 3 | Acceptable: Your organization has established a data security strategy for AI. Essential data security controls are implemented for AI projects, but there are opportunities for further refinement. |
| 4 | Advanced: Your organization has a mature data security framework in place for AI initiatives. Data security controls are consistently applied throughout the AI lifecycle, though there may be opportunities for further optimization. |
| 5 | Optimized: Your organization has a strong data security posture for AI. Data security is continuously monitored and improved upon, ensuring robust protection and compliance. |

**Recommendation** (shown when the answer is the first or second option; Horizon 1: Operational Enhancements): Consider adopting a zero trust security framework to uplift your organization's data safeguards maturity, ensuring robust protection of digital assets and critical infrastructure for AI initiatives.

## 5. AI Governance and Security

AI governance and security are critical components of AI readiness. They ensure that AI systems are developed and deployed responsibly, ethically, and securely. Effective AI governance involves establishing policies, processes, and controls to manage AI risks, ensure compliance with regulations, and promote transparency and accountability. AI security focuses on protecting AI systems from threats, ensuring data privacy, and maintaining the integrity of AI models.

9 questions.

### Q30. TEI Controls

**How effective are the controls that are in place to ensure the transparency, explainability, and interpretability (TEI) of AI tools and results?**

| Score | Option |
|---|---|
| 1 | Initial: There are no formal controls in place to ensure TEI in AI initiatives. The focus is on understanding the importance of TEI for responsible AI development. |
| 2 | Evolving: Your organization recognizes the need for TEI in AI initiatives. A plan is being developed to implement basic TEI controls. |
| 3 | Acceptable: Initial TEI controls are in place. AI models have been documented, and basic explanations for outputs have been provided. |
| 4 | Advanced: Well-established TEI controls have been implemented. AI models are demonstrably transparent, explainable, and interpretable. |
| 5 | Optimized: Your organization is a leader in TEI practices for AI development. TEI is a core principle that fosters trust, transparency, and responsible AI innovation. |

**Recommendation** (shown when the answer is the first or second option; Horizon 2: Innovative Iterations): Consider conducting an internal assessment of TEI risks and research best practices for implementing TEI controls.

### Q31. Data Sharing

**How comprehensive are the security and compliance considerations that are in place for sharing AI-generated data with third parties?**

| Score | Option |
|---|---|
| 1 | Initial: There are no formal controls in place to govern the sharing of AI-generated data with third parties. The focus is on understanding the potential risks associated with data sharing. |
| 2 | Evolving: The organization recognizes the need for controls governing third-party sharing of AI-generated data. A plan is being developed to implement basic controls. |
| 3 | Acceptable: Initial controls are in place to govern the sharing of AI-generated data. Data sharing agreements have been established, and basic security measures have been implemented. |
| 4 | Advanced: A well-established data governance framework is in place. Data sharing practices are consistent and secure across the organization. |
| 5 | Optimized: The organization is a leader in secure and compliant AI data sharing practices. The data governance framework is a core strength that fosters trust and transparency with third parties. |

**Recommendation** (shown when the answer is the first or second option; Horizon 2: Innovative Iterations): Consider conducting an internal assessment to identify types of AI-generated data and the potential risks associated with sharing them with third parties, and research industry best practices and regulatory requirements for secure AI data sharing.

### Q32. User Communication

**At what level are systems and processes in place to inform users of applicable use cases of the AI model or tool, expected performance metrics, and limitations?**

| Score | Option |
|---|---|
| 1 | Initial: There are no formal processes to inform users about AI models or tools. The focus is on understanding the importance of user transparency in responsible AI development. |
| 2 | Evolving: The organization recognizes the need for user communication about AI models. A plan is being developed to implement basic communication practices. |
| 3 | Acceptable: Initial communication processes are in place. Users receive basic information about AI models through documentation and disclaimers. |
| 4 | Advanced: Well-established communication plans are in place. Users are actively engaged through various channels and have opportunities to provide feedback. |
| 5 | Optimized: The organization is a leader in user-centric AI development. Communication is a core strength that fosters trust, transparency, and continuous improvement of AI models. |

**Recommendation** (shown when the answer is the first or second option; Horizon 2: Innovative Iterations): Consider conducting an internal assessment to identify potential risks associated with a lack of user transparency in AI initiatives, such as misuse or unrealistic expectations. Research best practices for communicating AI capabilities and limitations to users to ensure responsible AI development and foster trust.

### Q33. AI Governance

**How well is AI usage being governed to comply with regulatory policies and responsible AI principles?**

| Score | Option |
|---|---|
| 1 | Initial: There's limited awareness of existing and emerging AI regulations and responsible AI principles. No formal governance structure or processes are in place to ensure compliance. |
| 2 | Evolving: Your organization recognizes the need for AI governance and compliance. High-level plans might exist to establish a governance framework, but details are lacking. |
| 3 | Acceptable: A basic AI governance framework exists, outlining key compliance considerations and responsible AI principles. Basic processes are established to monitor and manage AI projects from a governance perspective. |
| 4 | Advanced: A mature AI governance framework is in place with well-defined processes for compliance and responsible AI implementation. Regular audits and assessments are conducted to ensure adherence to established policies. |
| 5 | Optimized: Your organization demonstrates a best-in-class approach to AI governance. The AI governance framework is recognized as a competitive advantage, promoting trust and ethical development in AI solutions. |

**Recommendation** (shown when the answer is the first or second option; Horizon 2: Innovative Iterations): Consider conducting a baseline assessment of relevant AI regulations and responsible AI principles that might impact your organization's AI initiatives. Identify potential compliance risks associated with current or planned AI practices. Initiate discussions on the need for AI governance within the organization to ensure responsible and compliant AI development.

### Q34. AI Security

**How effectively is AI security managed in your organization, considering threat detection, vulnerability management, data protection, compliance, monitoring, and continuous improvement?**

| Score | Option |
|---|---|
| 1 | Initial: Your organization lacks a formal AI security strategy. Efforts are managed informally, leading to inconsistent threat detection and vulnerability management. |
| 2 | Evolving: Basic AI security practices are in place, but improvements are needed in threat detection, vulnerability management, and data protection. Initial compliance and monitoring efforts show promise but lack full structure. |
| 3 | Acceptable: A defined strategy for AI security exists, with reasonable threat detection, vulnerability management, and data protection practices. Compliance, monitoring, and continuous improvement are managed with reasonable effectiveness, but there are opportunities for improvement. |
| 4 | Advanced: AI security is well-structured, with strong threat detection, vulnerability management, and data protection practices. Effective compliance, monitoring, and continuous improvement processes are in place, though there may be opportunities for further optimization. |
| 5 | Optimized: AI security is fully optimized, with robust threat detection, automated vulnerability management, and comprehensive data protection. Compliance, monitoring, and continuous improvement processes are managed rigorously and efficiently, ensuring high accuracy and effectiveness. |

**Recommendation** (shown when the answer is the first or second option; Horizon 2: Innovative Iterations): Consider a data security and governance programme as the overarching initiative to uplift your organization's AI security maturity.

### Q35. Regulatory Compliance

**How effectively is regulatory compliance managed in your organization, considering policy adherence, risk assessment, monitoring, reporting, training, and continuous improvement?**

| Score | Option |
|---|---|
| 1 | Initial: Your organization lacks a formal regulatory compliance strategy. Efforts are managed informally, leading to inconsistent policy adherence and risk assessment. |
| 2 | Evolving: Basic regulatory compliance practices are in place, but improvements are needed in policy adherence, risk assessment, and monitoring. Initial reporting and training efforts show promise but lack full structure. |
| 3 | Acceptable: A defined strategy for regulatory compliance exists, with reasonable policy adherence, risk assessment, and monitoring practices. Reporting, training, and continuous improvement are managed with reasonable effectiveness, but there are opportunities for improvement |
| 4 | Advanced: Regulatory compliance is well-structured, with strong policy adherence, risk assessment, and monitoring practices. Effective reporting, training, and continuous improvement processes are in place, though there may be opportunities for further optimization. |
| 5 | Optimized: Regulatory compliance is fully optimized, with robust policy adherence, automated risk assessment, and comprehensive monitoring. Reporting, training, and continuous improvement processes are managed rigorously and efficiently, ensuring high accuracy and effectiveness. |

**Recommendation** (shown when the answer is the first or second option; Horizon 2: Innovative Iterations): Consider a policy management framework as the overarching initiative to uplift your organization's regulatory compliance maturity: tools and built-in definitions to manage policy adherence, risk assessment, monitoring, reporting, training and continuous improvement.

### Q36. Human-Centred Design

**How effectively is human-centered design implemented in your organization, considering user research, design thinking, prototyping, user testing, feedback integration, and continuous improvement?**

| Score | Option |
|---|---|
| 1 | Initial: Your organization lacks a formal human-centred design strategy. Efforts are managed informally, leading to inconsistent user research and design thinking practices. |
| 2 | Evolving: Basic human-centred design practices are in place, but improvements are needed in user research, design thinking, and prototyping. Initial user testing and feedback integration efforts show promise but lack full structure. |
| 3 | Acceptable: A defined strategy for human-centred design exists, with reasonable user research, design thinking, and prototyping practices. User testing, feedback integration, and continuous improvement are managed with reasonable effectiveness, but there are opportunities for improvement. |
| 4 | Advanced: Human-centred design is well-structured, with strong user research, design thinking, and prototyping practices. Effective user testing, feedback integration, and continuous improvement processes are in place, though there may be opportunities for further optimization. |
| 5 | Optimized: Human-centred design is fully optimized, with robust user research, design thinking, and prototyping practices. Advanced user testing, feedback integration, and continuous improvement processes ensure high efficiency and continuous refinement. |

**Recommendation** (shown when the answer is the first or second option; Horizon 2: Innovative Iterations): Consider design-led thinking as the overarching initiative to uplift your organization's human-centered design maturity, ensuring robust user research, design thinking, prototyping, user testing, feedback integration and continuous improvement.

### Q37. AI Ethics

**How effectively are AI ethics and governance managed in your organization, considering ethical guidelines, policy enforcement, transparency, accountability, risk assessment, and continuous improvement?**

| Score | Option |
|---|---|
| 1 | Initial: Your organization lacks a formal AI ethics and governance strategy. Efforts are managed informally, leading to inconsistent ethical guidelines and policy enforcement. |
| 2 | Evolving: Basic AI ethics and governance practices are in place, but improvements are needed in ethical guidelines, policy enforcement, and transparency. Initial accountability and risk assessment efforts show promise but lack full structure. |
| 3 | Acceptable: A defined strategy for AI ethics and governance exists, with reasonable ethical guidelines, policy enforcement, and transparency practices. Accountability, risk assessment, and continuous improvement are managed with reasonable effectiveness, but there are opportunities for improvement. |
| 4 | Advanced: AI ethics and governance are well-structured, with strong ethical guidelines, policy enforcement, and transparency practices. Effective accountability, risk assessment, and continuous improvement processes are in place, though there may be opportunities for further optimization. |
| 5 | Optimized: AI ethics and governance are fully optimized, with robust ethical guidelines, automated policy enforcement, and comprehensive transparency. Accountability, risk assessment, and continuous improvement processes are managed rigorously and efficiently, ensuring high accuracy and effectiveness. |

**Recommendation** (shown when the answer is the first or second option; Horizon 2: Innovative Iterations): Consider a responsible AI framework as the overarching initiative to uplift your organization's AI ethics and governance maturity, ensuring robust ethical guidelines, policy enforcement, transparency, accountability, risk assessment and continuous improvement.

### Q38. AI Training and Education

**How effectively are AI training and education managed in your organization, considering curriculum development, training delivery, skill assessment, continuous learning, resource availability, and feedback integration?**

| Score | Option |
|---|---|
| 1 | Initial: Your organization lacks a formal AI training and education strategy. Efforts are managed informally, leading to inconsistent curriculum development and training delivery. |
| 2 | Evolving: Basic AI training and education practices are in place, but improvements are needed in curriculum development, training delivery, and skill assessment. Initial continuous learning and resource availability efforts show promise but lack full structure. |
| 3 | Acceptable: A defined strategy for AI training and education exists, with reasonable curriculum development, training delivery, and skill assessment practices. Continuous learning, resource availability, and feedback integration are managed with reasonable effectiveness, but there are opportunities for improvement. |
| 4 | Advanced: AI training and education are well-structured, with strong curriculum development, training delivery, and skill assessment practices. Effective continuous learning, resource availability, and feedback integration processes are in place, though there may be opportunities for further optimization. |
| 5 | Optimized: AI training and education are fully optimized, with robust curriculum development, automated training delivery, and comprehensive skill assessment. Continuous learning, resource availability, and feedback integration processes are managed rigorously and efficiently, ensuring high accuracy and effectiveness. |

**Recommendation** (shown when the answer is the first or second option; Horizon 2: Innovative Iterations): Consider an AI skills programme as the overarching initiative to uplift your organization's AI training and education maturity, ensuring robust curriculum development, training delivery, skill assessment, continuous learning, resource availability and feedback integration.

## 6. Infrastructure for AI

The questionnaire is designed to evaluate the maturity and readiness of your organization's infrastructure for implementing AI solutions. This comprehensive assessment covers essential areas such as AI governance, model quality, integration capabilities, and management practices. By assessing these aspects, the questionnaire helps identify strengths and areas for improvement, ensuring that your infrastructure is robust enough to support successful AI initiatives.

17 questions.

### Q39. Reserved Capacity Provisioning

**How effectively is reserved capacity provisioning managed in your organization, considering resource allocation, automation, monitoring, and scalability?**

| Score | Option |
|---|---|
| 1 | Initial: Your organization lacks a formal reserved capacity provisioning strategy. Provisioning efforts are managed informally, leading to inconsistent resource allocation and potential inefficiencies. |
| 2 | Evolving: Basic reserved capacity provisioning practices are in place, but improvements are needed in resource allocation and automation. Initial efforts show promise but lack full structure. |
| 3 | Acceptable: A defined strategy for reserved capacity provisioning exists, with reasonable resource allocation and automation practices. Provisioning processes are managed with reasonable effectiveness, but there are opportunities for improvement in monitoring and scalability. |
| 4 | Advanced: reserved capacity provisioning is well-structured, with strong resource allocation and automation practices. Effective monitoring and scalability processes are in place, though there may be opportunities for further optimization. |
| 5 | Optimized: reserved capacity provisioning is fully optimized, with robust resource allocation, automated processes, and comprehensive monitoring. Provisioning processes are managed rigorously and efficiently, with excellent scalability and continuous improvement. |

**Recommendation** (shown when the answer is the first or second option; Horizon 2: Innovative Iterations): Consider enhancing your reserved capacity provisioning strategy by developing a scalable and repeatable framework, increasing automation, and optimizing resource allocation and scalability.

### Q40. Pay-as-you-go Usage

**How effectively is pay-as-you-go usage managed in your organization, considering resource allocation, cost management, monitoring, and scalability?**

| Score | Option |
|---|---|
| 1 | Initial: Your organization lacks a formal pay-as-you-go usage management strategy. pay-as-you-go usage efforts are managed informally, leading to inconsistent resource allocation and potential cost inefficiencies. |
| 2 | Evolving: Basic pay-as-you-go usage management practices are in place, but improvements are needed in resource allocation and cost management. Initial efforts show promise but lack full structure. |
| 3 | Acceptable: A defined strategy for pay-as-you-go usage management exists, with reasonable resource allocation and cost management practices. pay-as-you-go usage processes are managed with reasonable effectiveness, but there are opportunities for improvement in monitoring and scalability. |
| 4 | Advanced: pay-as-you-go usage management is well-structured, with strong resource allocation and cost management practices. Effective monitoring and scalability processes are in place, though there may be opportunities for further optimization. |
| 5 | Optimized: pay-as-you-go usage management is fully optimized, with robust resource allocation, automated cost management, and comprehensive monitoring. pay-as-you-go usage processes are managed rigorously and efficiently, with excellent scalability and continuous improvement. |

**Recommendation** (shown when the answer is the first or second option; Horizon 2: Innovative Iterations): Consider enhancing your pay-as-you-go model management by improving cost tracking and reporting systems, implementing advanced forecasting mechanisms, and optimizing resource usage.

### Q41. Logging and Alerting

**How effectively are logging and alerting managed in your organization, considering log collection, analysis, alert configuration, monitoring, and response?**

| Score | Option |
|---|---|
| 1 | Initial: Your organization lacks a formal logging and alerting strategy. Efforts are managed informally, leading to inconsistent log collection and alert configuration. |
| 2 | Evolving: Basic logging and alerting practices are in place, but improvements are needed in log analysis and alert configuration. Initial monitoring and response efforts show promise but lack full structure. |
| 3 | Acceptable: A defined strategy for logging and alerting exists, with reasonable log collection, analysis, and alert configuration practices. Monitoring and response processes are managed with reasonable effectiveness, but there are opportunities for improvement. |
| 4 | Advanced: Logging and alerting are well-structured, with strong log collection, analysis, and alert configuration practices. Effective monitoring and response processes are in place, though there may be opportunities for further optimization. |
| 5 | Optimized: Logging and alerting are fully optimized, with robust log collection, automated analysis, and comprehensive alert configuration. Monitoring and response processes are managed rigorously and efficiently, with continuous improvement. |

**Recommendation** (shown when the answer is the first or second option; Horizon 2: Innovative Iterations): Set up comprehensive logging and alerting systems with automated and predictive capabilities.

### Q42. Deployment Management

**How effectively is deployment management handled in your organization, considering deployment strategy, automation, monitoring, rollback, and documentation?**

| Score | Option |
|---|---|
| 1 | Initial: Your organization lacks a formal deployment management strategy. Deployment efforts are managed informally, leading to inconsistent strategy and automation. |
| 2 | Evolving: Basic deployment management practices are in place, but improvements are needed in strategy, automation, and monitoring. Initial rollback and documentation efforts show promise but lack full structure. |
| 3 | Acceptable: A defined strategy for deployment management exists, with reasonable automation and monitoring practices. Rollback and documentation processes are managed with reasonable effectiveness, but there are opportunities for improvement. |
| 4 | Advanced: Deployment management is well-structured, with strong strategy, automation, and monitoring practices. Effective rollback and documentation processes are in place, though there may be opportunities for further optimization. |
| 5 | Optimized: Deployment management is fully optimized, with robust strategy, automation, and monitoring practices. Advanced rollback and documentation processes ensure high efficiency and continuous improvement. |

**Recommendation** (shown when the answer is the first or second option; Horizon 2: Innovative Iterations): Implement CI/CD pipelines and automated deployment strategies.

### Q43. Abuse Prevention

**How effectively is AI abuse prevention managed in your organization, considering detection mechanisms, response strategies, user education, policy enforcement, and continuous improvement?**

| Score | Option |
|---|---|
| 1 | Initial: Your organization lacks a formal AI abuse prevention strategy. Efforts are managed informally, leading to inconsistent detection and response mechanisms. |
| 2 | Evolving: Basic AI abuse prevention practices are in place, but improvements are needed in detection mechanisms and response strategies. Initial user education and policy enforcement efforts show promise but lack full structure. |
| 3 | Acceptable: A defined strategy for AI abuse prevention exists, with reasonable detection mechanisms and response strategies. User education and policy enforcement are managed with reasonable effectiveness, but there are opportunities for improvement. |
| 4 | Advanced: AI abuse prevention is well-structured, with strong detection mechanisms and response strategies. Effective user education and policy enforcement processes are in place, though there may be opportunities for further optimization. |
| 5 | Optimized: AI abuse prevention is fully optimized, with robust detection mechanisms, automated response strategies, and comprehensive user education. Policy enforcement processes are managed rigorously and efficiently, with continuous improvement. |

**Recommendation** (shown when the answer is the first or second option; Horizon 2: Innovative Iterations): Implement advanced abuse prevention measures and real-time detection systems.

### Q44. Bias Detection and Mitigation

**How effectively is bias detection and mitigation managed in your organization, considering aspects such as identifying potential biases, implementing strategies to reduce biases, ensuring fairness and ethical AI practices, and continuously monitoring for bias throughout the model lifecycle?**

| Score | Option |
|---|---|
| 1 | Initial: Your organization lacks a formal bias detection and mitigation strategy. Bias detection is managed informally, leading to inconsistent identification and potential biases. |
| 2 | Evolving: Your organization has basic bias detection practices but lacks full structure and automation. Initial efforts are in place, but improvements are needed in bias identification, data quality, and model evaluation. |
| 3 | Acceptable: Your organization has a defined strategy for bias detection and mitigation with some measures for bias identification, data quality, and model evaluation. Bias detection is managed with reasonable effectiveness, but there are opportunities for improvement in monitoring and compliance. |
| 4 | Advanced: Your organization has a well-defined and structured bias detection strategy with effective bias identification, data quality, and model evaluation. Systems are managed effectively, but there may be room for optimization in tools and mitigation strategies. |
| 5 | Optimized: Your organization has fully optimized bias detection and mitigation processes with robust bias identification, automated data quality checks, and comprehensive model evaluation. Bias detection is managed rigorously and efficiently, with excellent documentation and compliance practices. |

**Recommendation** (shown when the answer is the first or second option; Horizon 2: Innovative Iterations): Leverage tools and strategies for identifying and mitigating biases in AI models, ensuring fairness and ethical AI practices.

### Q45. Tenancy Model

**How effectively is the tenancy model for AI managed in your organization, considering tenant isolation, resource allocation, security, scalability, monitoring, and compliance?**

| Score | Option |
|---|---|
| 1 | Initial: Your organization lacks a formal tenancy model for AI. Efforts are managed informally, leading to inconsistent tenant isolation and resource allocation. |
| 2 | Evolving: Basic tenancy model practices are in place, but improvements are needed in tenant isolation, resource allocation, and security. Initial scalability and monitoring efforts show promise but lack full structure. |
| 3 | Acceptable: A defined strategy for the tenancy model exists, with reasonable tenant isolation, resource allocation, and security practices. Scalability, monitoring, and compliance are managed with reasonable effectiveness, but there are opportunities for improvement. |
| 4 | Advanced: The tenancy model is well-structured, with strong tenant isolation, resource allocation, and security practices. Effective scalability, monitoring, and compliance processes are in place, though there may be opportunities for further optimization. |
| 5 | Optimized: The tenancy model is fully optimized, with robust tenant isolation, automated resource allocation, and comprehensive security. Scalability, monitoring, and compliance processes are managed rigorously and efficiently, with continuous improvement. |

**Recommendation** (shown when the answer is the first or second option; Horizon 2: Innovative Iterations): Implement structured and automated tenancy models with advanced isolation techniques.

### Q46. Rate Limiting

**How effectively is rate limiting managed in your organization's LLM (Large Language Model) usage, considering request handling, resource allocation, performance monitoring, scalability, and compliance?**

| Score | Option |
|---|---|
| 1 | Initial: Your organization lacks a formal rate limiting strategy for LLM usage. Efforts are managed informally, leading to inconsistent request handling and resource allocation. |
| 2 | Evolving: Basic rate limiting practices are in place, but improvements are needed in request handling, resource allocation, and performance monitoring. Initial scalability and compliance efforts show promise but lack full structure. |
| 3 | Acceptable: A defined strategy for rate limiting exists, with reasonable request handling, resource allocation, and performance monitoring practices. Scalability and compliance are managed with reasonable effectiveness, but there are opportunities for improvement. |
| 4 | Advanced: Rate limiting is well-structured, with strong request handling, resource allocation, and performance monitoring practices. Effective scalability and compliance processes are in place, though there may be opportunities for further optimization. |
| 5 | Optimized: Rate limiting is fully optimized, with robust request handling, automated resource allocation, and comprehensive performance monitoring. Scalability and compliance processes are managed rigorously and efficiently, with continuous improvement. |

**Recommendation** (shown when the answer is the first or second option; Horizon 2: Innovative Iterations): Implement structured and automated rate limiting strategies.

### Q47. Query Constraints

**How effectively are query constraints managed in your organization, considering constraint definition, implementation, performance impact, scalability, monitoring, and compliance?**

| Score | Option |
|---|---|
| 1 | Initial: Your organization lacks a formal strategy for implementing query constraints. Efforts to manage and limit queries are informal, leading to potential inefficiencies and inconsistencies in handling large language model (LLM) queries. |
| 2 | Evolving: Basic query constraint practices are in place, but improvements are needed in defining, implementing, and monitoring constraints. Initial efforts show promise but lack full structure and consistency. |
| 3 | Acceptable: A defined strategy for query constraints exists, with reasonable practices for defining, implementing, and monitoring constraints. Scalability and continuous improvement are managed with reasonable effectiveness, but there are opportunities for enhancement. |
| 4 | Advanced: Query constraints are well-structured, with strong practices for defining, implementing, and monitoring constraints. Effective scalability and continuous improvement processes are in place, though there may be opportunities for further optimization. |
| 5 | Optimized: Query constraints are fully optimized, with robust practices for defining, implementing, and monitoring constraints. Scalability and continuous improvement processes are managed rigorously and efficiently, ensuring high accuracy and effectiveness in handling LLM queries. |

**Recommendation** (shown when the answer is the first or second option; Horizon 2: Innovative Iterations): Implement structured and automated query constraint strategies.

### Q48. Utilisation Tracking

**How effectively is utilization tracking managed in your organization, considering data collection, analysis, reporting, scalability, monitoring, and continuous improvement?**

| Score | Option |
|---|---|
| 1 | Initial: Your organization lacks a formal utilization tracking strategy. Efforts are managed informally, leading to inconsistent data collection and analysis. |
| 2 | Evolving: Basic utilization tracking practices are in place, but improvements are needed in data collection, analysis, and reporting. Initial scalability and monitoring efforts show promise but lack full structure. |
| 3 | Acceptable: A defined strategy for utilization tracking exists, with reasonable data collection, analysis, and reporting practices. Scalability, monitoring, and continuous improvement are managed with reasonable effectiveness, but there are opportunities for improvement. |
| 4 | Advanced: Utilization tracking is well-structured, with strong data collection, analysis, and reporting practices. Effective scalability, monitoring, and continuous improvement processes are in place, though there may be opportunities for further optimization. |
| 5 | Optimized: Utilization tracking is fully optimized, with robust data collection, automated analysis, and comprehensive reporting. Scalability, monitoring, and continuous improvement processes are managed rigorously and efficiently, ensuring high accuracy and effectiveness. |

**Recommendation** (shown when the answer is the first or second option; Horizon 2: Innovative Iterations): Implement structured and automated utilization tracking and optimization strategies.

### Q49. Cost Management

**How effectively is cost management handled in your organization, considering budgeting, cost tracking, optimization, reporting, scalability, and continuous improvement?**

| Score | Option |
|---|---|
| 1 | Initial: Your organization lacks a formal cost management strategy. Efforts are managed informally, leading to inconsistent budgeting and cost tracking. |
| 2 | Evolving: Basic cost management practices are in place, but improvements are needed in budgeting, cost tracking, and optimization. Initial reporting and scalability efforts show promise but lack full structure. |
| 3 | Acceptable: A defined strategy for cost management exists, with reasonable budgeting, cost tracking, and optimization practices. Reporting, scalability, and continuous improvement are managed with reasonable effectiveness, but there are opportunities for improvement. |
| 4 | Advanced: Cost management is well-structured, with strong budgeting, cost tracking, and optimization practices. Effective reporting, scalability, and continuous improvement processes are in place, though there may be opportunities for further optimization. |
| 5 | Optimized: Cost management is fully optimized, with robust budgeting, automated cost tracking, and comprehensive optimization. Reporting, scalability, and continuous improvement processes are managed rigorously and efficiently, ensuring high accuracy and effectiveness. |

**Recommendation** (shown when the answer is the first or second option; Horizon 2: Innovative Iterations): Consider cost management and billing tools as the overarching initiative to uplift your organization's AI cost management maturity: budgeting, cost tracking, optimisation, reporting, scalability and continuous improvement.

### Q50. Security and Compliance

**How effectively are security and compliance managed in your organization, considering risk assessment, policy enforcement, monitoring, incident response, scalability, and continuous improvement?**

| Score | Option |
|---|---|
| 1 | Initial: Your organization lacks a formal security and compliance strategy. Efforts are managed informally, leading to inconsistent risk assessment and policy enforcement. |
| 2 | Evolving: Basic security and compliance practices are in place, but improvements are needed in risk assessment, policy enforcement, and monitoring. Initial incident response and scalability efforts show promise but lack full structure. |
| 3 | Acceptable: A defined strategy for security and compliance exists, with reasonable risk assessment, policy enforcement, and monitoring practices. Incident response, scalability, and continuous improvement are managed with reasonable effectiveness, but there are opportunities for improveme |
| 4 | Advanced: Security and compliance are well-structured, with strong risk assessment, policy enforcement, and monitoring practices. Effective incident response, scalability, and continuous improvement processes are in place, though there may be opportunities for further optimization. |
| 5 | Optimized: Security and compliance are fully optimized, with robust risk assessment, automated policy enforcement, and comprehensive monitoring. Incident response, scalability, and continuous improvement processes are managed rigorously and efficiently, ensuring high accuracy and effectiveness. |

**Recommendation** (shown when the answer is the first or second option; Horizon 2: Innovative Iterations): Consider a secure-by-design programme as the overarching initiative to uplift your organization's security and compliance maturity: best practices for risk assessment, policy enforcement, monitoring, incident response, scalability and continuous improvement.

### Q51. Scalability Planning

**How effectively is scalability planning managed in your organization, considering capacity forecasting, resource allocation, performance monitoring, automation, cost management, and continuous improvement?**

| Score | Option |
|---|---|
| 1 | Initial: Your organization lacks a formal scalability planning strategy. Efforts are managed informally, leading to inconsistent capacity forecasting and resource allocation. |
| 2 | Evolving: Basic scalability planning practices are in place, but improvements are needed in capacity forecasting, resource allocation, and performance monitoring. Initial automation and cost management efforts show promise but lack full structure. |
| 3 | Acceptable: A defined strategy for scalability planning exists, with reasonable capacity forecasting, resource allocation, and performance monitoring practices. Automation, cost management, and continuous improvement are managed with reasonable effectiveness, but there are opportunities for improvement. |
| 4 | Advanced: Scalability planning is well-structured, with strong capacity forecasting, resource allocation, and performance monitoring practices. Effective automation, cost management, and continuous improvement processes are in place, though there may be opportunities for further optimization. |
| 5 | Optimized: Scalability planning is fully optimized, with robust capacity forecasting, automated resource allocation, and comprehensive performance monitoring. Automation, cost management, and continuous improvement processes are managed rigorously and efficiently, ensuring high accuracy and effectiveness. |

**Recommendation** (shown when the answer is the first or second option; Horizon 2: Innovative Iterations): Consider a well-architected framework as the overarching initiative to uplift your organization's scalability planning maturity: guidance on capacity forecasting, resource allocation, performance monitoring, automation, cost management and continuous improvement.

### Q52. Continuous Learning

**How effectively is continuous learning managed in your organization, considering aspects such as ongoing model retraining, incorporating new data, improving model performance over time, and ensuring adaptability to changing requirements?**

| Score | Option |
|---|---|
| 1 | Initial: Continuous learning is informal, leading to inconsistent strategy and data integration. Model adaptation, performance monitoring, and feedback loops are minimal. |
| 2 | Evolving: Basic continuous learning practices are in place, but improvements are needed in strategy, data integration, and model adaptation. Initial performance monitoring and feedback efforts show promise but lack full structure. |
| 3 | Acceptable: A defined strategy for continuous learning exists, with reasonable data integration and model adaptation practices. Performance monitoring, feedback loops, and automation are managed effectively but have room for improvement. |
| 4 | Advanced: Continuous learning is well-structured, with strong strategy, data integration, and model adaptation practices. Effective performance monitoring, feedback loops, and automation processes are in place, though there may be opportunities for further optimization. |
| 5 | Optimized: Continuous learning is fully optimized, with robust strategy, data integration, and model adaptation practices. Advanced performance monitoring, feedback loops, and automation processes ensure high efficiency and continuous improvement. |

**Recommendation** (shown when the answer is the first or second option; Horizon 2: Innovative Iterations): Implement continuous learning practices to keep models updated and improve performance over time.

### Q53. Agentic AI

**How effectively is Agentic AI managed in your organization, considering aspects such as the development, deployment, and orchestration of autonomous AI agents, their ability to solve complex, multi-step problems, and their integration with various tools and data sources?**

| Score | Option |
|---|---|
| 1 | Initial: Agentic AI management is informal, leading to inconsistent development, deployment, and orchestration of autonomous AI agents. Their ability to solve complex, multi-step problems and integration with various tools and data sources is minimal. |
| 2 | Evolving: Basic Agentic AI practices are in place, but improvements are needed in the development, deployment, and orchestration of autonomous AI agents. Initial efforts to solve complex, multi-step problems and integrate with various tools and data sources show promise but lack full structure. |
| 3 | Acceptable: A defined strategy for Agentic AI management exists, with reasonable development, deployment, and orchestration of autonomous AI agents. Their ability to solve complex, multi-step problems and integration with various tools and data sources is managed effectively but has room for improvement. |
| 4 | Advanced: Agentic AI management is well-structured, with strong development, deployment, and orchestration of autonomous AI agents. Effective practices for solving complex, multi-step problems and integrating with various tools and data sources are in place, though there may be opportunities for further optimization. |
| 5 | Optimized: Agentic AI management is fully optimized, with robust development, deployment, and orchestration of autonomous AI agents. Advanced practices for solving complex, multi-step problems and integrating with various tools and data sources ensure high efficiency and continuous improvement. |

**Recommendation** (shown when the answer is the first or second option; Horizon 2: Innovative Iterations): Consider developing and managing autonomous AI agents capable of solving complex, multi-step problems

### Q54. AI Lifecycle Management

**How effectively is AI lifecycle management handled in your organization, considering model development, deployment, monitoring, versioning, scalability, governance, security, and collaboration?**

| Score | Option |
|---|---|
| 1 | Initial: Your organization lacks a formal AI lifecycle management strategy. AI lifecycle processes are managed informally, leading to inconsistent development, deployment, and monitoring practices. |
| 2 | Evolving: Your organization has basic AI lifecycle management pr2actices but lacks full structure and automation. Initial efforts are in place, but improvements are needed in model development, deployment, and monitoring. |
| 3 | Acceptable: Your organization has a defined strategy for AI lifecycle management with some measures for model development, deployment, and monitoring. AI lifecycle processes are managed with reasonable effectiveness, but there are opportunities for improvement in versioning, scalability, and governance. |
| 4 | Advanced: Your organization has a well-defined and structured AI lifecycle management strategy with effective model development, deployment, and monitoring. Systems are managed effectively, but there may be room for optimization in security and collaboration. |
| 5 | Optimized: Your organization has fully optimized AI lifecycle management processes with robust model development, automated deployment, and comprehensive monitoring. AI lifecycle processes are managed rigorously and efficiently, with excellent versioning, scalability, governance, and collaboration practices. |

**Recommendation** (shown when the answer is the first or second option; Horizon 2: Innovative Iterations): Consider managing the entire lifecycle of AI models, from development and deployment to monitoring and updating.

### Q55. AI Performance Optimization

**How effectively is AI performance optimization managed in your organization, considering model tuning, resource utilization, scalability, hyperparameter optimization, monitoring, evaluation metrics, and automation?**

| Score | Option |
|---|---|
| 1 | Initial: Your organization lacks a formal AI performance optimization strategy. Optimization efforts are managed informally, leading to inconsistent model tuning and resource utilization. |
| 2 | Evolving: Your organization has basic AI performance optimization practices but lacks full structure and automation. Initial efforts are in place, but improvements are needed in model tuning, resource utilization, and scalability. |
| 3 | Acceptable: Your organization has a defined strategy for AI performance optimization with some measures for model tuning, resource utilization, and scalability. Optimization processes are managed with reasonable effectiveness, but there are opportunities for improvement in hyperparameter optimization and monitoring. |
| 4 | Advanced: Your organization has a well-defined and structured AI performance optimization strategy with effective model tuning, resource utilization, and scalability. Systems are managed effectively, but there may be room for optimization in evaluation metrics and automation. |
| 5 | Optimized: Your organization has fully optimized AI performance optimization processes with robust model tuning, automated resource utilization, and comprehensive scalability. Optimization processes are managed rigorously and efficiently, with excellent hyperparameter optimization, monitoring, and evaluation metrics. |

**Recommendation** (shown when the answer is the first or second option; Horizon 2: Innovative Iterations): Consider implementing and continuously optimizing AI model performance through monitoring, fine-tuning, and resource management.

## 7. Model Management

The Model Management questionnaire is designed to assess the maturity and readiness of your organization’s model management practices for AI implementation. This questionnaire covers key areas such as model governance, model quality, model integration, and model lifecycle management practices. By evaluating these aspects, the questionnaire helps identify strengths and areas for improvement, ensuring that your model management foundation is robust enough to support successful AI initiatives.

17 questions.

### Q56. Exploratory Data Analysis

**How effective is your organization's exploratory data analysis (EDA) in terms of data preparation, analysis techniques, communication, automation, and documentation?**

| Score | Option |
|---|---|
| 1 | Initial: Your organization lacks a formal EDA strategy. Data preparation and analysis techniques are managed informally, leading to inconsistent insights and potential inefficiencies. |
| 2 | Evolving: Your organization has basic EDA practices but lacks full structure and automation. Initial efforts are in place, but improvements are needed in data preparation, analysis techniques, and communication. |
| 3 | Acceptable: Your organization has a defined strategy for EDA with some measures for data preparation, analysis techniques, and communication. EDA processes are managed with reasonable effectiveness, but there are opportunities for improvement in automation and documentation. |
| 4 | Advanced: Your organization has a well-defined and structured EDA strategy with effective data preparation, analysis techniques, and communication. Systems are managed effectively, but there may be room for optimization in automation and documentation. |
| 5 | Optimized: Your organization has fully optimized EDA processes with robust data preparation, automated analysis techniques, and comprehensive communication. EDA processes are managed rigorously and efficiently, with excellent documentation practices. |

**Recommendation** (shown when the answer is the first or second option; Horizon 3: Transformational Innovation): Consider implementing structured and automated exploratory data analysis processes in your organization.

### Q57. Synthetic Data Generation

**How effectively is synthetic data generated and used in your organization, considering its quality, use cases, security, integration, and feedback processes?**

| Score | Option |
|---|---|
| 1 | Initial: Synthetic data lacks accuracy in reflecting real-world data characteristics, limiting its usefulness. Usage is sporadic, with minimal security measures and challenging integration. Feedback loops for improvement are minimal. |
| 2 | Evolving: Efforts improve synthetic data accuracy, but inconsistencies remain. Usage expands, with basic security measures and ongoing integration challenges. Limited feedback mechanisms exist for iterative improvement. |
| 3 | Acceptable: Synthetic data accurately reflects real-world data, supporting diverse applications. Strong security measures and well-managed integration are in place. Structured feedback processes continuously improve data generation methods. |
| 4 | Advanced: Synthetic data closely mimics real-world data, enhancing utility in complex models. It is securely used across applications, with seamless integration and continuous feedback loops driving improvements. |
| 5 | Optimized: AI-driven synthetic data generation ensures unparalleled accuracy and relevance. It is fully integrated into operations, with state-of-the-art security and continuous feedback mechanisms driving ongoing optimization and innovation. |

**Recommendation** (shown when the answer is the first or second option; Horizon 3: Transformational Innovation): Consider implementing structured and automated synthetic data generation processes, using a dedicated synthetic data tool.

### Q58. Feature Exploration

**How effectively are features explored and selected in your organization's data analysis and modeling processes, considering exploration, selection criteria, alignment with business objectives, automation, and validation?**

| Score | Option |
|---|---|
| 1 | Initial: Feature exploration and selection are informal, leading to inconsistent relevance and quality. Alignment with business objectives is weak, and automation and validation processes are minimal. |
| 2 | Evolving: Basic feature exploration and selection practices are in place, but improvements are needed in alignment with business objectives, automation, and validation. Initial efforts show promise but lack full structure. |
| 3 | Acceptable: A defined strategy for feature exploration and selection exists, with reasonable alignment to business objectives. Automation and validation processes are implemented but have room for improvement. |
| 4 | Advanced: Feature exploration and selection are well-structured, with strong alignment to business objectives. Effective automation and validation processes are in place, though there may be opportunities for further optimization. |
| 5 | Optimized: Feature exploration and selection are fully optimized, with robust alignment to business objectives. Advanced automation and validation processes ensure high-quality, relevant features, continuously refined through feedback loops. |

**Recommendation** (shown when the answer is the first or second option; Horizon 3: Transformational Innovation): Consider implementing structured and automated feature exploration and selection processes in your organization.

### Q59. ML Pipelines

**How effectively are ML pipelines built and managed in your organization, considering aspects such as pipeline design, implementation, monitoring, automation, and collaboration?**

| Score | Option |
|---|---|
| 1 | Initial: ML pipeline design and management are informal, leading to inconsistent implementation and monitoring. Automation and collaboration are minimal. |
| 2 | Evolving: Basic ML pipeline practices are in place, but improvements are needed in design, implementation, and monitoring. Initial automation and collaboration efforts show promise but lack full structure. |
| 3 | Acceptable: A defined strategy for ML pipeline design and management exists, with reasonable implementation and monitoring practices. Automation and collaboration are managed effectively but have room for improvement. |
| 4 | Advanced: ML pipeline design and management are well-structured, with strong implementation and monitoring practices. Effective automation and collaboration processes are in place, though there may be opportunities for further optimization. |
| 5 | Optimized: ML pipeline design and management are fully optimized, with robust implementation and monitoring practices. Advanced automation and collaboration processes ensure high efficiency and continuous improvement. |

**Recommendation** (shown when the answer is the first or second option; Horizon 3: Transformational Innovation): Improve this using a structured MLOps (Machine Learning Operations) approach

### Q60. Feature Management

**How effectively is feature management handled in your organization, considering aspects such as feature selection, engineering, validation, and collaboration?**

| Score | Option |
|---|---|
| 1 | Initial: Feature management is informal, leading to inconsistent identification, engineering, and storage. Automation and collaboration are minimal. |
| 2 | Evolving: Basic feature management practices are in place, but improvements are needed in identification, engineering, and storage. Initial automation and collaboration efforts show promise but lack full structure. |
| 3 | Acceptable: A defined strategy for feature management exists, with reasonable identification, engineering, and storage practices. Automation and collaboration are managed effectively but have room for improvement. |
| 4 | Advanced: Feature management is well-structured, with strong identification, engineering, and storage practices. Effective automation and collaboration processes are in place, though there may be opportunities for further optimization. |
| 5 | Optimized: Feature management is fully optimized, with robust identification, engineering, and storage practices. Advanced automation and collaboration processes ensure high efficiency and continuous improvement. |

**Recommendation** (shown when the answer is the first or second option; Horizon 3: Transformational Innovation): To enhance feature management, consider a central configuration service for managing features and settings.

### Q61. Model Engineering

**How effectively is model engineering conducted in your organization, considering aspects such as model development, optimization, fine-tuning, and collaboration?**

| Score | Option |
|---|---|
| 1 | Initial: Model engineering is informal, leading to inconsistent development, deployment, and monitoring. Tool utilization and collaboration are minimal. |
| 2 | Evolving: Basic model engineering practices are in place, but improvements are needed in development, deployment, and monitoring. Initial tool utilization and collaboration efforts show promise but lack full structure. |
| 3 | Acceptable: A defined strategy for model engineering exists, with reasonable development, deployment, and monitoring practices. Tool utilization and collaboration are managed effectively but have room for improvement. |
| 4 | Advanced: Model engineering is well-structured, with strong development, deployment, and monitoring practices. Effective tool utilization and collaboration processes are in place, though there may be opportunities for further optimization. |
| 5 | Optimized: Model engineering is fully optimized, with robust development, deployment, and monitoring practices. Advanced tool utilization and collaboration processes ensure high efficiency and continuous improvement. |

**Recommendation** (shown when the answer is the first or second option; Horizon 3: Transformational Innovation): Focus on developing and optimizing machine learning models, including fine-tuning and performance improvements.

### Q62. Model Selection

**How effectively is model selection conducted in your organization, considering aspects such as choosing the appropriate model architecture, evaluating pre-trained models, and aligning models with specific use cases?**

| Score | Option |
|---|---|
| 1 | Initial: Model selection is ad hoc. There is limited understanding of how to choose appropriate models or evaluate pre-trained options. Decisions are often based on convenience or familiarity rather than fit for purpose. |
| 2 | Evolving: The organization is developing basic criteria for selecting models. Some evaluation of model architectures and pre-trained options is conducted, but processes are informal and inconsistent. |
| 3 | Acceptable: Model selection is guided by defined criteria. Teams consider architecture, performance, and alignment with use cases. Pre-trained models are evaluated, but reuse and benchmarking practices are still maturing. |
| 4 | Advanced: Model selection is systematic and data-driven. Teams compare multiple architectures and pre-trained models using standardized benchmarks. Selection is aligned with business goals and technical constraints. |
| 5 | Optimized: Model selection is a strategic capability. The organization maintains a curated library of evaluated models, including pre-trained and fine-tuned options. Selection is automated where possible and tightly integrated with MLOps and governance processes. |

**Recommendation** (shown when the answer is the first or second option; Horizon 3: Transformational Innovation): Choose the appropriate model architecture and pre-trained models for specific tasks.

### Q63. Model Deployment

**How effectively is model deployment managed in your organization, considering aspects such as seamless integration, deployment strategies, monitoring, and ensuring model performance in production environments?**

| Score | Option |
|---|---|
| 1 | Initial: Model deployment is informal, leading to inconsistent implementation and monitoring. Automation, scalability, security, and documentation practices are minimal. |
| 2 | Evolving: Basic model deployment practices are in place, but improvements are needed in implementation, monitoring, and CI/CD integration. Initial efforts in automation, scalability, security, and documentation show promise but lack full structure. |
| 3 | Acceptable: A defined strategy for model deployment exists, with reasonable implementation, monitoring, and CI/CD integration practices. Automation, scalability, security, and documentation are managed effectively but have room for improvement. |
| 4 | Advanced: Model deployment is well-structured, with strong implementation, monitoring, and CI/CD integration practices. Effective automation, scalability, security, and documentation processes are in place, though there may be opportunities for further optimization. |
| 5 | Optimized: Model deployment is fully optimized, with robust implementation, monitoring, and CI/CD integration practices. Advanced automation, scalability, security, and documentation processes ensure high efficiency and continuous improvement. |

**Recommendation** (shown when the answer is the first or second option; Horizon 3: Transformational Innovation): Ensure seamless integration and deployment of models into production environments.

### Q64. Release Pipelines

**How effectively are release pipelines managed in your organization, considering aspects such as automation, continuous integration and deployment (CI/CD) practices, monitoring, and ensuring smooth model updates and releases?**

| Score | Option |
|---|---|
| 1 | Initial: Release pipeline implementation is informal, leading to inconsistent definition and automation. Testing, monitoring, and rollback practices are minimal. |
| 2 | Evolving: Basic release pipeline practices are in place, but improvements are needed in definition, automation, and CI/CD integration. Initial testing and monitoring efforts show promise but lack full structure. |
| 3 | Acceptable: A defined strategy for release pipeline implementation exists, with reasonable automation and CI/CD integration. Testing, monitoring, and rollback practices are managed effectively but have room for improvement. |
| 4 | Advanced: Release pipeline implementation is well-structured, with strong definition, automation, and CI/CD integration. Effective testing, monitoring, and rollback processes are in place, though there may be opportunities for further optimization. |
| 5 | Optimized: Release pipeline implementation is fully optimized, with robust definition, automation, and CI/CD integration. Advanced testing, monitoring, and rollback processes ensure high efficiency and continuous improvement. |

**Recommendation** (shown when the answer is the first or second option; Horizon 3: Transformational Innovation): Automate the release and deployment process, integrating CI/CD practices for continuous integration and deployment.

### Q65. Model Flighting

**How effectively is model flighting managed in your organization, considering aspects such as conducting controlled experiments, A/B testing, evaluating model performance, and iterating based on feedback?**

| Score | Option |
|---|---|
| 1 | Initial: Model flighting is not practiced. Models are deployed directly to production without controlled testing or performance comparison. |
| 2 | Evolving: Basic experimentation is conducted (e.g., manual A/B tests), but processes are informal and lack consistent monitoring or rollback strategies. |
| 3 | Acceptable: Controlled experiments are used for some deployments. A/B testing and performance evaluation are in place, but feedback loops and automation are limited. |
| 4 | Advanced: Model flighting is systematic. A/B testing, canary releases, and shadow deployments are supported by automated monitoring and rollback mechanisms. |
| 5 | Optimized: Model flighting is a core capability. Experiments are continuously run, monitored, and optimized. Feedback is integrated into model iteration, and flighting is embedded in CI/CD pipelines. |

**Recommendation** (shown when the answer is the first or second option; Horizon 3: Transformational Innovation): Consider refining your model flighting strategy by enhancing segmentation and targeting, improving monitoring and feedback mechanisms, and implementing robust rollout and contingency planning.

### Q66. Model Release

**How effectively is model release managed in your organization, considering aspects such as ensuring all necessary checks and validations, coordinating formal releases, monitoring post-release performance, and managing version control?**

| Score | Option |
|---|---|
| 1 | Initial: Model release is informal, leading to inconsistent strategy and deployment automation. Validation, monitoring, and rollback practices are minimal. |
| 2 | Evolving: Basic release processes exist but are inconsistently applied. Some manual validations are performed, and versioning is ad hoc. Monitoring is reactive, and rollback is possible but not rehearsed. |
| 3 | Acceptable: Model release follows a documented process with standardized validations and version control. Releases are coordinated with stakeholders, and basic monitoring is in place. Rollback procedures are defined but not automated.. |
| 4 | Advanced: Model release is governed by automated pipelines with enforced validations, structured approvals, and consistent versioning. Monitoring includes real-time alerts, and rollback is automated and tested periodically. |
| 5 | Optimized: Model release is fully automated, policy-driven, and integrated with continuous validation and observability. Releases are risk-assessed, monitored with predictive analytics, and supported by self-healing and rollback mechanisms. Feedback loops continuously improve the process. |

**Recommendation** (shown when the answer is the first or second option; Horizon 3: Transformational Innovation): Manage the formal release of models to production, ensuring all necessary checks and validations are completed.

### Q67. Inference Scaling

**How effectively is inference scaling managed in your organization, considering aspects such as optimizing scalability, handling high-volume inference requests, ensuring low latency, and maintaining performance under varying loads?**

| Score | Option |
|---|---|
| 1 | Initial: Inference scaling is informal, leading to inconsistent strategy and resource allocation. Performance monitoring, scalability, and cost management practices are minimal. |
| 2 | Evolving: Basic inference scaling practices are in place, but improvements are needed in strategy, resource allocation, and performance monitoring. Initial scalability and cost management efforts show promise but lack full structure. |
| 3 | Acceptable: A defined strategy for inference scaling exists, with reasonable resource allocation and performance monitoring practices. Scalability, cost management, and documentation are managed effectively but have room for improvement. |
| 4 | Advanced: Inference scaling is well-structured, with strong strategy, resource allocation, and performance monitoring practices. Effective scalability, cost management, and documentation processes are in place, though there may be opportunities for further optimization. |
| 5 | Optimized: Inference scaling is fully optimized, with robust strategy, resource allocation, and performance monitoring practices. Advanced scalability, cost management, and documentation processes ensure high efficiency and continuous improvement. |

**Recommendation** (shown when the answer is the first or second option; Horizon 3: Transformational Innovation): Optimize the scalability of model inference to handle high-volume requests efficiently.

### Q68. Inference Management

**How effectively is inference management handled in your organization, considering aspects such as monitoring inference performance, maintaining service availability, managing operational aspects, and ensuring efficient resource utilization?**

| Score | Option |
|---|---|
| 1 | Initial: Inference management is reactive and fragmented. Monitoring is minimal, service availability is inconsistent, and resource usage is often inefficient. Operational practices are undocumented. |
| 2 | Evolving: Basic monitoring tools are in place, and service uptime is tracked manually. Some operational workflows exist, but resource allocation is static and not optimized for demand. |
| 3 | Acceptable: Inference performance is monitored with standard metrics. Service availability is managed through scheduled scaling. Operational processes are documented, and resource usage is reviewed periodically. |
| 4 | Advanced: Real-time monitoring and alerting are integrated. Auto-scaling policies are in place to handle variable loads. Operational workflows are automated, and resource utilization is optimized for cost and performance. |
| 5 | Optimized: Inference management is predictive and self-adjusting. Performance is continuously tuned using telemetry. High availability is ensured through redundancy and failover strategies. Resource usage is dynamically optimized across environments. |

**Recommendation** (shown when the answer is the first or second option; Horizon 3: Transformational Innovation): Manage the operational aspects of model inference, including monitoring performance and maintaining service availability.

### Q69. Model Interpretability

**How effectively is model interpretability managed in your organization, considering aspects such as explaining model predictions, ensuring transparency, providing insights into model behavior, and enhancing trust in AI systems?**

| Score | Option |
|---|---|
| 1 | Initial: Your organization lacks a formal model interpretability strategy. Interpretability is managed informally, leading to inconsistent transparency and potential biases. |
| 2 | Evolving: Your organization has basic interpretability practices but lacks full structure and automation. Initial efforts are in place, but improvements are needed in transparency, explainability, and bias detection. |
| 2 | Acceptable: Your organization has a defined strategy for model interpretability with some transparency, explainability, and bias detection measures. Interpretability is managed with reasonable effectiveness, but there are opportunities for improvement in monitoring and communication. |
| 3 | Advanced: Your organization has a well-defined and structured interpretability strategy with effective transparency, explainability, and bias detection. Systems are managed effectively, but there may be room for optimization in tools and stakeholder communication. |
| 5 | Optimized: Your organization has fully optimized interpretability processes with robust transparency, automated explainability, and comprehensive bias detection. Interpretability is managed rigorously and efficiently, with excellent documentation and communication practices. |

**Recommendation** (shown when the answer is the first or second option; Horizon 3: Transformational Innovation): Enhance the transparency and explainability of models, providing insights into model behavior.

### Q70. Model Fine-Tuning

**How effectively is fine-tuning managed in your organization, considering aspects such as customizing pre-trained models, optimizing model performance for specific tasks, incorporating domain-specific data, and ensuring continuous improvement?**

| Score | Option |
|---|---|
| 1 | Initial: Fine-tuning is informal, leading to inconsistent customization and optimization of pre-trained models. Domain-specific data incorporation and continuous improvement practices are minimal. |
| 2 | Evolving: Basic fine-tuning practices are in place, but improvements are needed in customizing pre-trained models, optimizing performance for specific tasks, and incorporating domain-specific data. Initial efforts in continuous improvement show promise but lack full structure. |
| 3 | Acceptable: A defined strategy for fine-tuning exists, with reasonable customization of pre-trained models, optimization for specific tasks, and incorporation of domain-specific data. Continuous improvement practices are managed effectively but have room for enhancement. |
| 4 | Advanced: Fine-tuning is well-structured, with strong customization of pre-trained models, optimization for specific tasks, and incorporation of domain-specific data. Effective continuous improvement processes are in place, though there may be opportunities for further optimization. |
| 5 | Optimized: Fine-tuning is fully optimized, with robust customization of pre-trained models, optimization for specific tasks, and incorporation of domain-specific data. Advanced continuous improvement processes ensure high efficiency and ongoing enhancement. |

**Recommendation** (shown when the answer is the first or second option; Horizon 3: Transformational Innovation): Customize pre-trained models to better fit specific tasks or datasets, improving performance.

### Q71. Model Monitoring

**How effectively is monitoring managed in your organization, considering aspects such as tracking model usage, performance metrics, token statistics, and ensuring the reliability and availability of AI services?**

| Score | Option |
|---|---|
| 1 | Initial: Monitoring is informal, leading to inconsistent tracking of model usage, performance metrics, and token statistics. Practices for ensuring the reliability and availability of AI services are minimal. |
| 2 | Evolving: Basic monitoring practices are in place, but improvements are needed in tracking model usage, performance metrics, and token statistics. Initial efforts to ensure reliability and availability show promise but lack full structure. |
| 3 | Acceptable: A defined strategy for monitoring exists, with reasonable tracking of model usage, performance metrics, and token statistics. Practices for ensuring the reliability and availability of AI services are managed effectively but have room for improvement. |
| 4 | Advanced: Monitoring is well-structured, with strong tracking of model usage, performance metrics, and token statistics. Effective practices for ensuring the reliability and availability of AI services are in place, though there may be opportunities for further optimization. |
| 5 | Optimized: Monitoring is fully optimized, with robust tracking of model usage, performance metrics, and token statistics. Advanced practices for ensuring the reliability and availability of AI services ensure high efficiency and continuous improvement. |

**Recommendation** (shown when the answer is the first or second option; Horizon 3: Transformational Innovation): Track model usage, performance metrics, and token statistics to ensure reliability and availability.

### Q72. AI Workflow Automation

**How effectively is AI workflow automation managed in your organization, considering aspects such as creating, customizing, and running executable flows, integrating LLMs, prompts, and Python tools, and ensuring efficient development and deployment of AI applications?**

| Score | Option |
|---|---|
| 1 | Initial: AI workflow automation is informal, leading to inconsistent creation, customization, and execution of flows. Integration of LLMs, prompts, and Python tools is minimal, and development and deployment practices are inefficient. |
| 2 | Evolving: Basic AI workflow automation practices are in place, but improvements are needed in creating, customizing, and running executable flows. Initial efforts to integrate LLMs, prompts, and Python tools show promise but lack full structure. Development and deployment practices are improving but still need enhancement. |
| 3 | Acceptable: A defined strategy for AI workflow automation exists, with reasonable practices for creating, customizing, and running executable flows. Integration of LLMs, prompts, and Python tools is managed effectively, but there is room for improvement in development and deployment efficiency. |
| 4 | Advanced: AI workflow automation is well-structured, with strong practices for creating, customizing, and running executable flows. Effective integration of LLMs, prompts, and Python tools is in place, though there may be opportunities for further optimization in development and deployment processes. |
| 5 | Optimized: AI workflow automation is fully optimized, with robust practices for creating, customizing, and running executable flows. Advanced integration of LLMs, prompts, and Python tools ensures high efficiency in development and deployment of AI applications, with continuous improvement processes in place. |

**Recommendation** (shown when the answer is the first or second option; Horizon 3: Transformational Innovation): Streamline the development and deployment of AI applications by creating, customizing, and running executable flows that integrate LLMs, prompts, and Python tools.

