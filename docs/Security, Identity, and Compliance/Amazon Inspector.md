# Amazon Inspector

## 1. Introduction

Amazon Inspector provides a systematic approach to security by performing continuous assessments of your running infrastructure. By leveraging agents and integrations with other AWS services, Inspector automatically scans for vulnerabilities and deviations from security best practices. Whether you are deploying traditional EC2 instances, containerized applications using Amazon ECR, or serverless functions with AWS Lambda, Inspector offers a unified solution to detect potential security issues early in the development and deployment process.

## 2. Key Features of Amazon Inspector

Amazon Inspector incorporates several core features that make it an essential tool for maintaining a robust security posture in the cloud. These include continuous security assessments, integration with a comprehensive vulnerability database, and risk scoring to prioritize remediation efforts.

![Amazon Inspector](./_assets/amazon_inspector.png)

### 2.1. Continuous Security Assessments

Inspector is built to provide continuous monitoring of your infrastructure. For Amazon EC2 instances, it utilizes the AWS Systems Manager agent to perform real-time security assessments. This continuous scanning evaluates both the operating system for known vulnerabilities and the network configurations for unintended accessibility. Similarly, container images stored in Amazon ECR and Lambda functions are analyzed either at the time of deployment or as part of an ongoing security evaluation process. This persistent oversight ensures that any new vulnerability, especially those emerging from updates in the vulnerability database, is quickly identified and assessed.

### 2.2. Vulnerability Database (CVE) Integration

At the heart of Inspector’s assessment engine is its integration with an extensive vulnerability database based on the Common Vulnerabilities and Exposures (CVE) system. Whether it is scanning EC2 instances, ECR container images, or Lambda functions, Inspector references this database to detect known vulnerabilities in the software packages and configurations deployed within your environment. The integration with the CVE database means that as new vulnerabilities are documented, Inspector can automatically trigger re-assessments to ensure that your infrastructure remains compliant with the latest security standards.

### 2.3. Risk Scoring for Prioritization

Each time Amazon Inspector runs an assessment, it assigns a risk score to the detected vulnerabilities. This score is calculated based on factors such as severity, exploitability, and the potential impact on your environment. The risk scoring mechanism is vital for helping security teams prioritize remediation efforts, allowing them to focus first on vulnerabilities that pose the highest risk. This systematic approach to risk management ensures that resources are efficiently allocated to address the most critical issues.

## 3. Supported Assessment Targets

Amazon Inspector supports a diverse range of AWS resources, enabling comprehensive security assessments across different computing paradigms. The service is designed to seamlessly integrate into environments that utilize Amazon EC2, Amazon ECR, and AWS Lambda.

### 3.1. Amazon EC2 Instances

For EC2 instances, Inspector works by leveraging the AWS Systems Manager (SSM) agent. When an EC2 instance is launched—ideally using an image that comes pre-installed with the SSM agent, such as Amazon Linux—the agent enables Inspector to perform continuous assessments. These assessments include analyzing the operating system for package vulnerabilities and evaluating network reachability to identify unintended access points. Proper registration of the instance with Systems Manager is crucial; otherwise, the instance may be flagged as “Unmanaged,” prompting the need for remediation via Systems Manager automation workflows.

### 3.2. Amazon ECR Container Images

As container images are pushed to Amazon ECR, Amazon Inspector automatically initiates a security assessment. This process checks the container images for known vulnerabilities, ensuring that any issues within the containerized applications are identified early. This integration allows development and operations teams to maintain high security standards for containerized environments by identifying and mitigating vulnerabilities before deployment.

### 3.3. AWS Lambda Functions

Inspector extends its assessment capabilities to serverless architectures by evaluating AWS Lambda functions. During deployment, the service scans the function code and its package dependencies for software vulnerabilities. This real-time assessment ensures that serverless applications are secure and free from vulnerabilities that could compromise functionality or data integrity.

## 4. Integration with AWS Services

Amazon Inspector is designed to work seamlessly with other AWS security and event management services. This integration enhances its capabilities by enabling centralized visibility and automated response mechanisms.

### 4.1. AWS Security Hub

Inspector can forward its security findings directly to AWS Security Hub. This integration consolidates vulnerability reports, allowing security teams to view all findings from multiple AWS security services in one central dashboard. By doing so, organizations gain a holistic view of their security posture and can quickly identify areas that require attention.

### 4.2. Amazon EventBridge

In addition to Security Hub integration, Inspector sends detailed events and findings to Amazon EventBridge. This capability allows you to automate custom workflows or trigger remediation actions based on specific security events. Whether it is alerting a security team or invoking an automated patching process, the EventBridge integration facilitates proactive security management and response.

## 5. Pricing

Amazon Inspector’s pricing model is designed to be straightforward, charging based on the specific resources that are scanned. This cost-effective structure ensures that organizations only pay for the assessments that are conducted, making it scalable and efficient for both small and large deployments.

### 5.1. Cost Structure (Per Instance, Image, and Rescan)

The pricing for Amazon Inspector is calculated per instance, per container image, and per rescan. For example, the pricing table provided during demonstrations indicates charges such as $0.09 per container image scan and $0.01 per rescan, alongside a cost structure for EC2 instance scans. This granular approach ensures that costs remain proportional to usage and that you only incur charges based on the security assessments performed on your active resources.

### 5.2. 15-Day Trial for New Accounts

To allow prospective users to evaluate the service, new accounts are offered a 15-day trial period. During this trial, you can enable and use Amazon Inspector to perform security assessments without incurring any charges. After the trial period, billing is initiated according to the standard pricing model. This trial period provides a risk-free opportunity to assess the value of the service before committing to ongoing usage.

## 6. Enabling Amazon Inspector

Deploying Amazon Inspector involves a few key steps, including configuring service permissions, setting up the required IAM roles, and optionally enabling the service across your entire AWS organization.

### 6.1. Service Permissions and IAM Roles

To operate effectively, Amazon Inspector requires certain permissions that are managed through an IAM role. When you enable Inspector, the service automatically creates and configures a managed role with the necessary permissions. This role allows Inspector to perform actions such as accessing the Systems Manager agent on EC2 instances, scanning container images, and integrating with other AWS services. Ensuring that this role is properly attached to your resources is critical for the service to function as intended.

### 6.2. Organizational Deployment

For enterprises with multiple AWS accounts, Inspector offers the capability to enable assessments at an organizational level. By deploying Inspector across your organization, you can centrally manage security assessments and ensure consistent security practices across all accounts. This centralized deployment is particularly beneficial for organizations seeking a unified view of their security posture and streamlined remediation processes.

## 7. Conclusion

Amazon Inspector is a powerful and versatile security assessment service that helps organizations maintain a robust security posture across diverse AWS resources. By continuously scanning Amazon EC2 instances, ECR container images, and Lambda functions, and by integrating with AWS Security Hub and Amazon EventBridge, Inspector provides comprehensive visibility into potential vulnerabilities and misconfigurations. Its integration with a CVE-based vulnerability database and risk scoring mechanism further aids in prioritizing remediation efforts. With a clear pricing structure and a 15-day trial period for new users, Amazon Inspector offers a scalable and effective solution for securing modern cloud environments.