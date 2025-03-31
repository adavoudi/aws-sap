# Savings Plans

## 1. Introduction

Amazon Savings Plans are a flexible pricing model that lets you save significantly on your AWS compute usage in exchange for a commitment to a consistent spend (measured in dollars per hour) over a 1‑ or 3‑year period. In practice, once you commit, any usage up to that hourly dollar amount is billed at a discounted rate compared to On-Demand prices, with any excess usage charged at standard On-Demand rates. Depending on your workload and flexibility needs, you can achieve savings of up to 72%.

## 2. Types of Savings Plans

AWS offers three types of Savings Plans: Compute Savings Plans, EC2 Instance Savings Plans, and SageMaker AI Savings Plans.

### 2.1. Compute Savings Plans

**Compute Savings Plans** provide the most flexibility and prices that are up to 66 percent off of On-Demand rates. These plans automatically apply to your EC2 instance usage, regardless of instance family (for example, m5, c5, etc.), instance size (for example, c5.large, c5.xlarge, etc.), Region (for example, us-east-1, us-east-2, etc.), operating system (for example, Windows, Linux, etc.), or tenancy (for example, Dedicated, default, Dedicated Host). They also apply to your Fargate and Lambda usage. With Compute Savings Plans, you can move a workload from c5 to m5, shift your usage from EU (Ireland) to EU (London), or migrate your application from Amazon EC2 to Amazon ECS using Fargate at any time. You can continue to benefit from the low prices provided by Compute Savings Plans as you make these changes.
### 2.2. EC2 Instance Savings Plans

**EC2 Instance Savings Plans** provide savings up to 72 percent off On-Demand, in exchange for a commitment to a specific instance family in a chosen AWS Region (for example, m5 in Virginia). These plans automatically apply to usage regardless of instance size (for example, m5.xlarge, m5.2xlarge, etc.), OS (for example, Windows, Linux, etc.), and tenancy (Host, Dedicated, Default) within the specified family in a Region.

With an EC2 Instance Savings Plan, you can change your instance size within the instance type (for example, from c5.xlarge to c5.2xlarge) or the operating system (for example, from Windows to Linux), or move from Dedicated tenancy to Default and continue to receive the discounted rate provided by your EC2 Instance Savings Plan.
### 2.3. Amazon SageMaker Savings Plans

**SageMaker AI Savings Plans** provide savings up to 64 percent off of On-Demand rates. These plans automatically apply to your SageMaker AI instance usage regardless of instance family (for example, ml.m5, ml.c5, etc.), instance sizes (for example ml.c5.large, ml.c5.xlarge, etc.), Region (for example, us-east-1, us-east-2, etc.), and component (for example, Notebook, Training, etc.).

With SageMaker AI Savings Plans, you can move a workload from ml.c5 to ml.m5, shift your usage from Europe (Ireland) to Europe (London), or migrate your usage from Training to Inference at any time and continue to receive benefits.
### 2.4. Comparison

Here's a comparison table summarizing the key differences between Compute Savings Plans, EC2 Instance Savings Plans, and SageMaker AI Savings Plans:

| **Feature**                    | **Compute Savings Plans** 💻📊                                                                 | **EC2 Instance Savings Plans** 🖥️🔒                                                                 | **SageMaker AI Savings Plans** 🤖🧠                                                         |
|--------------------------------|-----------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------|
| **Savings (vs. On-Demand)**    | Up to **66% off** 💸                                                                          | Up to **72% off** 💰 (highest discount)                                                            | Up to **64% off** 📉                                                                         |
| **Applicable Services**        | EC2, Fargate, Lambda 🖥️🚢λ                                                                   | EC2 only 🖥️                                                                                        | SageMaker AI Instances 🤖 (Notebooks, Training, Inference)                                   |
| **Commitment Scope**           | **Flexible** 🌐🔀 (any service, family, region, size, OS, tenancy)                            | **Locked** 🔒 to instance family + region (e.g., "m5 in Virginia")                                 | **Flexible** 🌐🔀 (any SageMaker family, region, size, component)                            |
| **Flexibility**                |                                                                                               |                                                                                                     |                                                                                             |
| - **Instance Family**          | Any family ✅ (e.g., c5 → m5)                                                                 | Locked to chosen family ❌ (e.g., m5 only)                                                         | Any SageMaker family ✅ (e.g., ml.c5 → ml.m5)                                                |
| - **Instance Size**            | Any size ✅ (e.g., c5.large → c5.xlarge)                                                      | Any size within family ✅ (e.g., m5.large → m5.2xlarge)                                            | Any SageMaker size ✅ (e.g., ml.c5.large → ml.c5.xlarge)                                     |
| - **Region**                   | Any region ✅🌍                                                                                | Locked to chosen region ❌📍                                                                        | Any region ✅🌍                                                                               |
| - **OS/Tenancy**               | Any OS/tenancy ✅ (Windows ↔ Linux, Dedicated ↔ Default)                                      | OS/tenancy changes allowed ✅ within family/region (e.g., Windows → Linux)                         | N/A ❌ (applies to SageMaker components, not OS/tenancy)                                      |
| - **Component/Workload**       | Applies to EC2, Fargate, Lambda ↔🔄                                                           | N/A ❌                                                                                             | Any component ✅ (Notebook ↔ Training ↔ Inference)                                           |
| **Allowed Changes**            | Migrate **anywhere** 🔄🌐 (family, region, OS, tenancy, or service)                           | Change size/OS/tenancy **within family/region** ↔🔄                                               | Shift **freely** 🔄 (family, region, component)                                               |

## 3. How Savings Plans Work

Savings Plans provide savings beyond On-Demand rates in exchange for a commitment of using a specified amount of compute power (measured per hour) for a one or three year period.

Savings Plans offer a flexible pricing model that provides savings on AWS usage. You can save up to 72 percent on your AWS compute workloads. Compute Savings Plans provide lower prices on Amazon EC2 instance usage regardless of instance family, instance size, OS, tenancy, or AWS Region. This also applies to AWS Fargate and AWS Lambda usage. SageMaker AI Savings Plans provide you with lower prices for your Amazon SageMaker AI instance usage, regardless of your instance family, instance size, component, or AWS Region.

You can manage your plans by using recommendations, performance reporting, and budget alerts in AWS Cost Explorer.

When you sign up for Savings Plans, the prices you'll pay for usage stays the same through the plan term. You can pay for your commitment using **All upfront**, **Partial upfront**, or **No upfront** payment options.

To get started with Savings Plans, you'll need to enable Cost Explorer. Cost Explorer helps you optimize your costs with Savings Plans. In Cost Explorer, you can access customized purchase recommendations based on your past AWS usage, purchase Savings Plans, and easily manage your purchased Savings Plans.

Start by enabling your settings and permissions in Cost Explorer before using the AWS Billing and Cost Management console to view, analyze, and manage your Savings Plans.

## 4. Comparison with Reserved Instances

Compute Savings Plans are a flexible pricing model that offers low prices, just like Amazon EC2 Reserved Instances (RI), but with added flexibility. With Savings Plans, you can reduce your bill by committing to a consistent amount of compute usage (measured in $/hour), instead of specific instance configurations. Savings Plans give you the flexibility to use the compute option that best suits your needs at low prices, without having to perform exchanges or modifications.

Compute Savings Plans provide savings up to 66 percent off On-Demand, similar to Convertible RIs. Compute Savings Plans automatically reduce your cost on EC2 instance usage, Fargate, and Lambda. EC2 Instance Savings Plans offer savings up to 72 percent off of On-Demand, similar to Standard RIs. They also automatically save you money on any instance usage within a given EC2 instance family in your Region of choice.

| **Feature/Aspect**                 | **Compute Savings Plans** | **EC2 Instance Savings Plans** | **Convertible RIs**          | **Standard RIs**          |
| ---------------------------------- | ------------------------- | ------------------------------ | ---------------------------- | ------------------------- |
| **Savings Over On-Demand**         | 💰 Up to **66%**          | 💰 Up to **72%**               | 💰 Up to **66%**             | 💰 Up to **72%**          |
| **Monetary Commitment**            | ✅ Yes                     | ✅ Yes                          | ❌ No                         | ❌ No                      |
| **Applies to Any Instance Family** | ✅ **Yes**                 | ❌ No                           | 🔄 Manual Exchange*          | ❌ No                      |
| **Applies to Any Instance Size**   | ✅ **Yes**                 | ✅ **Yes**                      | 🌐 Regional Flexibility**    | 🌐 Regional Flexibility** |
| **Applies to Any Tenancy/OS**      | ✅ **Yes**                 | ✅ **Yes**                      | 🔄 Manual Exchange*          | ❌ No                      |
| **Applies to Fargate (ECS/EKS)**   | ✅ **Yes**                 | ❌ No                           | ❌ No                         | ❌ No                      |
| **Applies to Lambda**              | ✅ **Yes**                 | ❌ No                           | ❌ No                         | ❌ No                      |
| **Cross-Region Application**       | 🌍 **Yes**                | ❌ No                           | ❌ No                         | ❌ No                      |
| **Term Length (1 or 3 years)**     | 📅 ✅                      | 📅 ✅                           | 📅 ✅                         | 📅 ✅                      |
| **Cancellation During Term**       | 🚫 **No**                 | 🚫 **No**                      | 🚫 **No** (🔄 Exchange only) | 🚫 **No**                 |

## 5. Conclusion

Amazon Savings Plans offer a modern, flexible way to lower your AWS compute costs while allowing you the freedom to adjust your usage as your needs evolve. By choosing between the more flexible Compute Savings Plans or the higher-discount but region- and family-specific EC2 Instance Savings Plans (or even SageMaker Savings Plans for ML workloads), you can tailor your commitment to match your usage profile and achieve substantial savings.

For the most authoritative details on Savings Plans, refer to these official resources:

* [AWS Savings Plans User Guide](https://docs.aws.amazon.com/savingsplans/latest/userguide/what-is-savings-plans.html)
