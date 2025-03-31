# AWS Compute Optimizer

## 1. Introduction

**AWS Compute Optimizer** is a machine learning–powered service that analyzes your AWS compute resource configurations and their utilization metrics. Its primary goal is to help you optimize your workloads by providing rightsizing recommendations that can lower costs and improve performance. It achieves this by comparing the current configurations of your resources to their actual usage patterns and then suggesting more optimal resource types or sizes.

## 2. Supported Resources

Compute Optimizer currently supports recommendations for multiple AWS compute resources, including:

- **Amazon EC2 Instances:** It evaluates CPU, memory, network, and disk I/O utilization to recommend instance types that are cost effective while still meeting performance needs.
- **Amazon EC2 Auto Scaling Groups:** It analyzes groups with single or mixed instance types (with supported scaling policies) and suggests rightsizing opportunities.
- **Amazon EBS Volumes:** It provides recommendations for moving to a different volume type, adjusting volume size, or IOPS settings.
- **AWS Lambda Functions:** It reviews memory configurations and usage patterns to recommend a more appropriate memory setting.
- **Amazon ECS Services on AWS Fargate:** It examines CPU and memory utilization to suggest optimal task resource settings.
- **Commercial Software Licenses:** It offers recommendations for Microsoft SQL Server licenses running on EC2 when applicable.
- **Amazon RDS DB Instances:** It gives rightsizing recommendations for several supported database engines, including Aurora, RDS MySQL, and PostgreSQL.

## 3. How It Works

![[aws-cost-optimizer.png]]


1. **Data Collection:**  
    Once you opt in (using the AWS Management Console, CLI, or SDKs), Compute Optimizer begins collecting configuration details and utilization data from Amazon CloudWatch. By default, it uses data from the past 14 days. With enhanced infrastructure metrics (an optional paid feature), the lookback period can be extended up to 93 days.
    
2. **Analysis & Machine Learning:**  
    The service uses machine learning algorithms to process these metrics—such as CPU utilization, memory usage, network I/O, disk I/O (for EC2 and EBS), and other relevant parameters—to evaluate whether your resources are over-provisioned, under-provisioned, or optimized.
    
3. **Recommendations:**  
    Based on the analysis, Compute Optimizer generates recommendations:
    
    - **Rightsizing Recommendations:** Suggestions to change instance types or sizes that could reduce cost or improve performance.
    - **Idle Resource Recommendations:** Identification of resources that are barely used and may be candidates for termination.
    - **License Optimization:** For specific commercial software running on EC2, recommendations may include license cost adjustments.
    - **Projected Metrics:** In addition to current usage, it shows projected utilization data for recommended resource configurations.

## 4. Multi-Account Support  

Compute Optimizer supports standalone accounts as well as AWS Organizations. In an organization, the management account can opt in and choose to include all member accounts for a unified view of recommendations.

## 5. Pricing

AWS Compute Optimizer itself does not incur additional charges. However, keep in mind:

- **CloudWatch Costs:**  
    The service uses CloudWatch metrics for analysis, and while basic CloudWatch monitoring is free, extended metrics or high-resolution metrics might incur charges.
- **Enhanced Infrastructure Metrics:**  
    Activating this feature extends the lookback period for analysis and may involve additional costs.

## 6. Conclusion

AWS Compute Optimizer is a powerful tool that leverages machine learning to provide actionable recommendations for optimizing your compute resource usage. By analyzing historical utilization and configuration data, it helps you rightsize your Amazon EC2 instances, Auto Scaling groups, EBS volumes, Lambda functions, ECS services, and more—ensuring you achieve a better balance of cost and performance. Its integration with CloudWatch, AWS Organizations, and customizable recommendation preferences make it an essential service for efficient AWS resource management.

For detailed information, refer to the [Getting Started with AWS Compute Optimizer](https://docs.aws.amazon.com/compute-optimizer/latest/ug/getting-started.html) guide.