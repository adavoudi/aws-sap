# AWS Shields
## 1. Introduction

AWS Shields is a security service that safeguards your cloud infrastructure against DDoS attacks. DDoS attacks are designed to disrupt the normal operation of a service by overwhelming it with a flood of requests from multiple sources distributed across the globe. AWS Shields addresses these threats by offering built-in and advanced protection measures, ensuring that both routine and sophisticated attacks can be mitigated effectively.

## 2. Understanding DDoS Attacks

DDoS, or Distributed Denial of Service, is an attack vector where an attacker leverages multiple compromised systems to flood a target's infrastructure with excessive requests. The objective is to saturate the target’s resources, such as bandwidth, processing power, or network capacity, so that legitimate users experience degraded service or complete unavailability.

Key characteristics of DDoS attacks include:

- **Massive Request Volume:** A sudden surge of requests overwhelms the target.
- **Distributed Sources:** The attack originates from numerous computers across various geographic locations.
- **Attack Methods:** Common techniques include SYN floods, UDP floods, and reflection attacks. Each method exploits different layers of the network stack, particularly layers 3 and 4, to disrupt service.

The understanding of how DDoS attacks function is essential for appreciating the layered defense strategies employed by AWS Shields.

## 3. AWS Shield Standard

AWS Shield Standard offers baseline protection against DDoS attacks. It is automatically available to all AWS customers and provides essential defenses against common network and transport layer attacks.

### 3.1. Free and Automatic Protection

One of the core benefits of AWS Shield Standard is that it is provided at no additional cost. This service is automatically activated for every AWS customer, offering immediate protection without the need for manual configuration or extra charges. It is designed to mitigate a variety of common DDoS attack techniques, ensuring that even customers with minimal security configurations receive a foundational level of defense.

### 3.2. Layer 3/4 Attack Mitigation

AWS Shield Standard is engineered to protect against attacks that target the lower layers of the OSI model:

- **Layer 3 (Network Layer):** This includes attacks that manipulate the IP layer, such as IP spoofing or other network-level tactics.
- **Layer 4 (Transport Layer):** This encompasses techniques like SYN floods and UDP floods that target the transport protocols to overwhelm server resources.

By focusing on these layers, AWS Shield Standard effectively neutralizes many types of DDoS attacks that rely on exhausting network and transport resources.

## 4. AWS Shield Advanced

For organizations requiring a higher level of security, AWS Shield Advanced provides enhanced DDoS protection. This service is designed to defend against more sophisticated DDoS attacks and to offer additional tools and resources that assist in both attack mitigation and operational continuity.

### 4.1. Enhanced DDoS Defense Features

AWS Shield Advanced builds upon the capabilities of the Standard service by incorporating advanced features designed to counter complex attack vectors. It extends protection to additional AWS services and employs proactive strategies to reduce the impact of high-volume and targeted attacks. The service is particularly useful in scenarios where conventional measures might be insufficient to manage the scale and complexity of an attack.

### 4.2. Protected Services (EC2, CloudFront, Route 53, etc.)

Shield Advanced is tailored to protect key AWS resources, including:

- **Amazon EC2:** Virtual servers that power a wide range of applications.
- **Elastic Load Balancing:** Distributes incoming application traffic across multiple targets.
- **Amazon CloudFront:** A global content delivery network (CDN) that accelerates delivery of web content.
- **AWS Global Accelerator:** Improves application availability and performance through intelligent routing.
- **Amazon Route 53:** A scalable DNS web service that directs user requests to endpoints.

By offering protection for these services, AWS Shield Advanced ensures that both the underlying compute infrastructure and the delivery mechanisms for applications remain secure during a DDoS event.

### 4.3. Automatic WAF Integration for Layer 7 Mitigation

Beyond network and transport layer protection, AWS Shield Advanced integrates automatically with AWS Web Application Firewall (WAF) to defend against Layer 7 (application layer) attacks. In the event of an attack, the service can dynamically generate, evaluate, and deploy WAF rules. This automated response helps mitigate threats that target the application layer, such as HTTP floods or other sophisticated attacks that aim to exploit vulnerabilities in web applications.

### 4.4. Real-Time Attack Monitoring with CloudWatch Metrics

Real-time monitoring is a crucial aspect of AWS Shield Advanced. The service leverages Amazon CloudWatch to provide detailed metrics that offer insights into the ongoing state of the network during an attack. Some of the key metrics include:

- **DDoSDetected:** A binary indicator that signals whether a DDoS event is currently in progress.
- **DDoSAttackBitsPerSecond:** Measures the volume of attack traffic in bits per second.
- **DDoSAttackPacketsPerSecond:** Tracks the number of packets per second being used in the attack.
- **DDoSAttackRequestsPerSecond:** Provides data on the rate of request traffic aimed at the resource.

These metrics empower security teams to quickly assess the situation and adjust their defense strategies in real time, ensuring that the response is both timely and effective.

### 4.5. Financial Safeguards Against Attack Costs

DDoS attacks can result in significant operational costs due to the increased traffic load and potential overage fees on network usage. AWS Shield Advanced includes financial safeguards to protect organizations from the unexpected costs that may arise during an attack. This aspect of the service provides reassurance that, even in the event of a sustained attack, the financial impact will be mitigated.

### 4.6. 24/7 Access to AWS DDoS Response Team

In addition to automated defenses, AWS Shield Advanced offers direct access to the AWS DDoS Response Team (DRT) around the clock. This dedicated team of experts is available 24/7 to assist with the mitigation of ongoing attacks. Their expertise ensures that organizations receive immediate guidance and support during critical moments, helping to restore normal service operation as quickly as possible.

## 5. Conclusion

In summary, understanding and leveraging the appropriate level of DDoS protection through AWS Shields is crucial for maintaining service availability, ensuring operational continuity, and managing the financial impact associated with DDoS attacks.