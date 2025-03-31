# Amazon EC2 - Security

## 1. Introduction

Amazon EC2 (Elastic Compute Cloud) delivers scalable, on‑demand virtual servers in the AWS Cloud. Security is built into every layer of the service and is governed by the AWS shared responsibility model. In this model:

- **Security of the Cloud:** AWS is responsible for the protection of the global infrastructure—including data centers, physical hardware, networking, and virtualization platforms. This encompasses AWS’s data center design, the security of the Nitro System (which underpins modern EC2 instances), and regular third‑party audits for compliance.

- **Security in the Cloud:** Customers are responsible for securing what they deploy on that infrastructure. This includes proper configuration of Virtual Private Clouds (VPCs), security groups, network ACLs, patching and hardening guest operating systems, managing credentials and access through IAM, and protecting data.

## 2. Core Components of EC2 Security

### 2.1. Data Protection

- **Encryption at Rest:**
    - Amazon EBS volumes can be encrypted using AWS Key Management Service (KMS), ensuring that stored data is protected by industry‑standard AES‑256 encryption (see [Amazon EBS encryption](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ebs-encryption.html)).
    - Instance store volumes are automatically encrypted on supported instance types using hardware‑assisted encryption.
- **Encryption in Transit:**
    - All API calls and data transmissions to and from AWS services use SSL/TLS (with a requirement for TLS 1.2 and a recommendation for TLS 1.3) to protect data in transit.
### 2.2. Network Security

- **VPC and Security Groups:**
    - Amazon EC2 is deployed within a Virtual Private Cloud (VPC), which gives you complete control over your virtual networking environment. Security groups act as stateful virtual firewalls that control inbound and outbound traffic to your instances.
    - Best practices include using the principle of least privilege when defining security group rules and limiting access (e.g., opening SSH only from specific IP ranges).
- **Additional Network Controls:**
    - You can further enhance security using network ACLs, VPC endpoints (such as AWS PrivateLink), and by architecting your environment to avoid unintended public exposure.

### 2.3. Identity and Access Management (IAM)

- **Credential Management:**
    - Secure access is achieved by using IAM to manage user accounts, roles, and permissions. For EC2, this includes assigning IAM roles to instances so that temporary credentials are automatically rotated and securely provided to applications.
- **Key Pairs and MFA:**
    - EC2 uses key pairs (public/private RSA keys) for secure instance access via SSH or RDP. Additionally, multi‑factor authentication (MFA) is recommended for AWS account and IAM user access.

## 3. Best Practices for Securing EC2

To ensure a robust security posture, AWS recommends that customers:

- **Harden Instances:**
    - Regularly update and patch guest operating systems and applications.
    - Remove or disable unnecessary services and accounts.
- **Apply Least Privilege:**
    - Define security groups with the minimum permissions necessary.
    - Use IAM policies that grant only the permissions required by users and roles.
- **Monitor and Log Activity:**
    - Enable AWS CloudTrail for logging API activity.
    - Use Amazon CloudWatch to monitor system and application metrics.
    - Consider using Amazon Inspector for vulnerability assessments.
- **Implement Backup and Recovery:**
    - Regularly back up critical data using EBS snapshots and create AMIs as templates for rapid recovery.
- **Use Advanced Security Features:**
    - Leverage AWS Security Hub to continuously assess your security posture against best practices.
    - For higher‑security workloads, consider dedicated instance placement (Dedicated Instances or Dedicated Hosts) and AWS PrivateLink for private API access.

These practices are detailed in the [Best practices for Amazon EC2](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-best-practices.html) documentation.

## 4. The AWS Nitro System and EC2 Isolation

Modern EC2 instances are powered by the AWS Nitro System—a purpose‑built platform that enhances security by offloading virtualization functions to dedicated hardware. Key benefits include:

- **Strong Isolation:**
    - The Nitro Hypervisor minimizes the attack surface by eliminating unnecessary components and ensuring that guest instances do not share CPU caches or memory with other tenants, effectively mitigating risks from side‑channel attacks.
- **Hardware‑Assisted Security:**
    - Nitro Cards and the Nitro Security Chip provide secure boot, hardware‑rooted trust, and encryption, ensuring that even AWS administrators cannot access instance data.

## 5. Compliance and Certification

Amazon EC2 is designed to meet rigorous global compliance standards. AWS undergoes regular third‑party audits and provides comprehensive compliance reports covering frameworks such as PCI DSS, HIPAA, FedRAMP, ISO 27001, SOC 1/2/3, and more. Customers can access these reports via the AWS Compliance Programs.

## 6. Instance Profile

An **instance profile** is essentially a container for an IAM role that you attach to an Amazon EC2 instance. It enables the instance to obtain temporary security credentials that the instance’s applications can use to make AWS API calls—without needing to hard‑code long‑term credentials. This mechanism is a core part of how EC2 integrates with AWS Identity and Access Management (IAM).

If you create an IAM role for EC2 using the IAM console, AWS automatically creates an instance profile with the same name as the role. However, if you use the AWS CLI, API, or SDKs to create roles, you must create the instance profile as a separate step and then add the role to it.

![[instance-profile.png]]

Each instance profile can contain only one IAM role. Although the same role can be used with multiple instance profiles, an EC2 instance may have only one instance profile attached at a time.

### 6.1. How Instance Profiles Work

1. **Role Association:**  
    When you launch an EC2 instance, you specify an IAM role—either by selecting from the list (when using the console, which shows instance profile names) or by specifying the instance profile name via the CLI/API.
    
2. **Temporary Credentials Delivery:**  
    The attached instance profile makes the role’s temporary security credentials available through the instance’s metadata endpoint ([http://169.254.169.254](http://169.254.169.254)). AWS SDKs often automatically retrieve and refresh these credentials for your application.
    
3. **Credential Rotation:**  
    Because the credentials are temporary, they’re automatically rotated and refreshed—reducing the risk associated with long‑term credentials.
    
4. **Management and Modification:**  
    You can use AWS CLI commands (e.g., `create-instance-profile`, `add-role-to-instance-profile`, `associate-iam-instance-profile`, etc.) to manage instance profiles. Additionally, you can attach or detach an instance profile from an instance even after it’s launched.
## Conclusion

Amazon EC2 Security is a multifaceted discipline that leverages a robust shared responsibility model, advanced hardware‑assisted isolation through the Nitro System, and comprehensive controls for data protection, network security, and identity management. By following AWS’s best practices and utilizing its extensive official documentation and whitepapers, customers can deploy EC2 instances with confidence that their environments are both resilient and secure.

For further details, refer to these official AWS materials:

- [**Security in Amazon EC2**](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-security.html) 
- [**Amazon Web Services: Overview of Security Processes**](https://docs.aws.amazon.com/whitepapers/latest/aws-overview-security-processes/aws-overview-security-processes.pdf)  
- **[The Security Design of the AWS Nitro System](https://docs.aws.amazon.com/whitepapers/latest/security-design-of-aws-nitro-system/security-design-of-aws-nitro-system.html):** Outlines the architectural decisions that enhance isolation and security for EC2 instances.  