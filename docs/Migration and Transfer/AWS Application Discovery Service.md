# AWS Application Discovery Service
## 1. Introduction

AWS Application Discovery Service is a comprehensive toolset designed to help organizations gain visibility into their on-premises infrastructure in preparation for migration to the AWS cloud. Below is an in‐depth overview that covers its purpose, core features, modes of operation, use cases, pricing, and integration with other AWS services.

AWS Application Discovery Service automates the collection of configuration, performance, and dependency data from on-premises servers and databases. This information is crucial for planning cloud migrations, enabling enterprises to perform detailed analyses such as Total Cost of Ownership (TCO) assessments, dependency mapping, and resource right-sizing before moving workloads to AWS. The service centralizes collected data in your AWS Migration Hub home Region, ensuring that migration planning and tracking are streamlined across your portfolio.

## 2. How It Works

### 2.1. Modes of Discovery

AWS Application Discovery Service supports multiple approaches to data collection:

- **Agentless Discovery**  
    The Agentless Collector (delivered as an OVA file) is deployed in your VMware vCenter environment. It gathers static configuration data such as hostnames, IP addresses, resource allocations, and historical utilization metrics without installing an agent on each virtual machine. This method is ideal for quickly obtaining an overview of virtualized environments, though it does not capture in-depth details like running processes or internal network connections.
    
- **Agent-Based Discovery**  
    In cases where deeper insights are required, you can install the AWS Application Discovery Agent on your physical servers, virtual machines, or even EC2 instances. This agent collects detailed, time-series data on system performance, running processes, and both inbound and outbound network connections, which is valuable for accurately mapping application dependencies.
    
- **File-Based Import & Third-Party Integration**  
    You also have the option to import data from existing configuration management databases (CMDBs) using a CSV template. Furthermore, AWS Partner Network (APN) solutions can integrate with Application Discovery Service via its public APIs to import and correlate data directly into Migration Hub.

### 2.2. Data Flow & Analysis

1. **Data Collection:**
    - The chosen discovery method collects static and dynamic data, including system configurations, performance metrics (CPU, memory, disk, and network usage), and application dependencies.
    - For agent-based discovery, data is collected continuously, allowing you to analyze trends over time.

2. **Data Storage & Analysis:**
    - All collected information is stored in your AWS Migration Hub home Region. You can export this data for further analysis in tools such as Amazon Athena and Amazon QuickSight.
    - Detailed performance baselines are established, which you can compare against post-migration metrics to evaluate the success of your cloud migration.

3. **Migration Planning:**
    - With clear insights into server dependencies and resource utilization, you can group servers into applications, estimate migration costs, and plan migration waves using integrated tools like AWS Migration Hub and AWS Server Migration Service.

## 3. Key Features

- **Comprehensive Infrastructure Visibility:**  
    Collects detailed server and database configurations, including IP addresses, MAC addresses, resource allocations, and utilization metrics.
    
- **Dependency Mapping:**  
    Captures network connections and process-level details (when using the agent) to help map out interdependencies among servers and applications.
    
- **Performance Metrics:**  
    Measures system performance through metrics such as CPU, memory, disk I/O, and network throughput to establish performance baselines.
    
- **Data Exploration:**  
    Enables deeper analysis by integrating with Amazon Athena, allowing you to run queries on time-series data and visualize performance trends in Amazon QuickSight.
    
- **Seamless Integration:**  
    Works in conjunction with AWS Migration Hub, AWS Database Migration Service Fleet Advisor, and other AWS migration services to provide a unified migration planning experience. 
    
- **Security & Data Protection:**  
    Ensures that all data is encrypted both in transit (using HTTPS/TLS) and at rest within the AWS cloud, with strict controls over where your discovery data is stored (i.e., the Migration Hub home Region).

## 4. Use Cases

- **Migration Planning:**  
    Create a comprehensive migration plan by analyzing on-premises configurations and performance data. This includes grouping servers into applications and establishing migration waves.
    
- **Dependency Analysis:**  
    Identify and visualize server dependencies to determine the optimal sequence for migration and minimize downtime.
    
- **Cost Optimization:**  
    Use detailed resource utilization data to right-size AWS resources and estimate migration costs accurately.
    
- **Performance Benchmarking:**  
    Compare on-premises performance baselines with post-migration metrics to validate the success of your migration.
    
- **Integration with Third-Party Tools:**  
    Import data from CMDBs or leverage APN partner solutions to enrich your migration strategy.

## 5. Pricing

AWS Application Discovery Service itself does not incur additional charges for the discovery of your on-premises assets. You only pay for the underlying AWS resources used (for example, Amazon S3 for data storage, Amazon Athena for querying, or Amazon Kinesis Data Firehose for data streaming). This pay-as-you-go pricing model ensures that you only incur costs based on your actual usage without any minimum fees or upfront commitments.  

## 6. Integration with AWS Ecosystem

- **AWS Migration Hub:**  
    Consolidates migration progress and allows you to track your discovered assets and migration activities from a single console.
    
- **AWS Database Migration Service (DMS):**  
    Uses discovery data to help assess and plan migrations for database workloads.
    
- **Amazon Athena & QuickSight:**  
    Facilitate deep-dive analytics and visualizations of the collected data, supporting more informed migration decisions.
    
- **Third-Party Tools:**  
    APN partner solutions can access the discovery data via public APIs, enabling you to integrate their specialized tools into your migration process.

## 7. Conclusion

AWS Application Discovery Service is an essential tool for any organization planning a move to the AWS cloud. By automating the collection of detailed configuration, performance, and dependency data, it enables a more strategic, data-driven approach to migration. Whether you need quick, high-level insights via agentless discovery or deeper, process-level details with agent-based discovery, AWS ADS provides the flexibility and scalability to support a wide range of migration scenarios—all while integrating seamlessly with other AWS migration services.