# Amazon ECS

## 1. Introduction

Amazon Elastic Container Service (Amazon ECS) is a fully managed container orchestration service that helps you easily deploy, manage, and scale containerized applications. As a fully managed service, Amazon ECS comes with AWS configuration and operational best practices built-in. It's integrated with both AWS tools, such as Amazon Elastic Container Registry, and third-party tools, such as Docker. This integration makes it easier for teams to focus on building the applications, not the environment. You can run and scale your container workloads across AWS Regions in the cloud, and on-premises, without the complexity of managing a control plane.

## 2. Key Components

- **Clusters:**  
    A cluster is a logical grouping of container instances (whether EC2 or on-premises via ECS Anywhere) where your tasks and services run. It provides a centralized management point for your container workloads.  

- **Task Definitions:**  
    These are blueprints written in JSON that specify one or more containers, the Docker images to use, resource allocation (CPU and memory), networking modes, data volumes, logging configurations, and IAM roles. Each task definition is versioned, allowing you to iterate on your application’s configuration over time. Below, you can see a sample task definition:
    
```json
{
    "family": "sample-fargate", 
    "networkMode": "awsvpc", 
    "containerDefinitions": [
        {
            "name": "fargate-app", 
            "image": "public.ecr.aws/docker/library/httpd:latest", 
            "portMappings": [
                {
                    "containerPort": 80, 
                    "hostPort": 80, 
                    "protocol": "tcp"
                }
            ], 
            "essential": true, 
            "entryPoint": [
                "sh",
		"-c"
            ], 
            "command": [
                "/bin/sh -c \"echo '<html> <head> <title>Amazon ECS Sample App</title> <style>body {margin-top: 40px; background-color: #333;} </style> </head><body> <div style=color:white;text-align:center> <h1>Amazon ECS Sample App</h1> <h2>Congratulations!</h2> <p>Your application is now running on a container in Amazon ECS.</p> </div></body></html>' >  /usr/local/apache2/htdocs/index.html && httpd-foreground\""
            ]
        }
    ], 
    "requiresCompatibilities": [
        "FARGATE"
    ], 
    "cpu": "256", 
    "memory": "512"
}
```

- **Tasks and Services:**
    - **Task:** A task is a running instance of a task definition.
    - **Service:** A service allows you to run and maintain a specified number of task instances. It monitors task health and automatically replaces tasks if they fail, ensuring high availability.

- **Container Agent & Optimized AMIs:**  
    ECS container instances (typically Amazon EC2 instances using the ECS-optimized AMI) run an ECS agent that communicates with the ECS control plane to manage task scheduling and instance state.


## 3. Launch Types

Amazon ECS offers multiple ways to run your containerized applications, each with its own set of benefits, trade-offs, and levels of control. The choice of launch type and deployment option depends on your operational requirements, desired level of infrastructure management, and workload characteristics.

### 3.1. Amazon EC2 Launch Type

With the EC2 launch type, you are responsible for provisioning, configuring, and managing the EC2 instances (or container instances) that form your ECS cluster. This gives you full control over the underlying hardware, including the choice of instance types (e.g., compute-optimized, GPU-enabled, memory-optimized) and the ability to run custom or specialized operating systems (such as the Amazon ECS-optimized AMI or Bottlerocket).

You can tailor the cluster to meet specific performance or compliance needs. For instance, you might use instances with enhanced networking or optimized storage options. EC2 clusters are well-suited for workloads that require specific instance characteristics or when you need to integrate with legacy systems that require direct host-level access.

EC2-based clusters can be integrated with Auto Scaling Groups, and with ECS Capacity Providers you can define strategies that automatically adjust the number of instances in your cluster. Capacity providers allow you to set policies on how tasks are placed based on available resources, balancing the load among different instance types or even combining EC2 and Fargate capacity within a single cluster.  

#### 3.1.1. Task Placement Strategies for EC2 Launch Type

For tasks running on the EC2 launch type, Amazon ECS uses a two-step process to decide where tasks should run. First, it filters out container instances that don’t meet the task’s resource requirements (such as CPU, memory, GPU, and port availability) or any user-defined placement constraints. Then, it uses placement strategies to sort and select the “best” instances from the remaining candidates. Here are the main placement strategies available for EC2 launch type:

- **Random**
    - **Behavior:**  
        Tasks are placed on container instances at random, while still meeting any defined constraints.
    - **Use Case:**  
        Best for scenarios where no specific instance preference exists, and you want to evenly distribute tasks over time without over-engineering the placement logic.
- **Binpack**
    - **Behavior:**  
        Binpack places tasks on instances in a way that minimizes unused resources. You choose whether to optimize based on CPU or memory. It packs tasks onto as few instances as possible, which can help maximize resource utilization and reduce costs by freeing up underutilized instances.
    - **Use Case:**  
        Ideal for cost-sensitive environments where you want to maximize instance efficiency and potentially reduce the number of running container instances.
- **Spread**
    - **Behavior:**  
        The spread strategy distributes tasks evenly across a defined set of “bins.” The bins can be:
        - **Instance ID:** Ensures that tasks are evenly distributed across all container instances.
        - **Attributes:** For example, using `attribute:ecs.availability-zone` spreads tasks evenly across Availability Zones.
    - **Use Case:**  
        Useful when high availability is critical. By spreading tasks across different Availability Zones or instances, you reduce the risk that a failure in one zone or on one instance will affect all tasks.

### 3.2. AWS Fargate Launch Type

![[aws-fargate.png]]

AWS Fargate abstracts the underlying compute infrastructure. You simply define your container’s resource requirements (CPU, memory, and networking settings) in the task definition, and Fargate automatically provisions the appropriate infrastructure at runtime. This removes the burden of managing EC2 instances and the associated scaling, patching, and maintenance tasks.

Fargate tasks are billed on a per-second basis for the allocated resources, which can be especially cost-effective for sporadic or unpredictable workloads. This model eliminates the need for overprovisioning and helps optimize cost by ensuring you only pay for what you use.

Each Fargate task runs in its own isolated runtime environment with dedicated compute, memory, and networking resources. This isolation is achieved without requiring you to manage separate host instances, and it enhances security by reducing the potential for cross-task interference.  

Task placement strategies and constraints aren't supported for tasks using the Fargate launch type. Fargate will try its best to spread tasks across accessible Availability Zones.
### 3.3. ECS Anywhere

ECS Anywhere extends the capabilities of ECS beyond the AWS Cloud. With ECS Anywhere, you can register and manage on-premises servers or even resources in other clouds using the same ECS control plane and APIs. This provides a consistent management experience across both cloud and on-premises environments.

Organizations that have significant on-premises investments or need to meet specific data residency or latency requirements can use ECS Anywhere to orchestrate containerized applications across a diverse set of environments without learning new tools or processes.
## 4. Task vs. Service Deployments

When you run a task directly (using the `run-task` API call), it is intended for short-lived, one-off jobs. This is ideal for batch processing, ad hoc testing, or one-time jobs where you do not require continuous availability.

On the other hand, ECS services are used to run and maintain a specified number of task instances continuously. If a task fails or stops unexpectedly, the ECS service scheduler automatically replaces it, ensuring that your desired task count is maintained. Services can also be integrated with load balancers (Application or Network Load Balancers) to distribute incoming traffic across tasks, making them suitable for production web applications and APIs.

Beyond simply launching tasks, ECS supports advanced deployment strategies such as rolling updates, blue/green deployments (often using AWS CodeDeploy integration), and can leverage ECS Capacity Providers to distribute tasks across different types of infrastructure. These strategies help minimize downtime and maintain application stability during updates.

## 5. Combining Launch Types with Capacity Providers

Capacity providers enable you to use more than one launch type within a single ECS cluster. For example, you can create a service that uses both EC2 and Fargate capacity providers, defining a strategy for how tasks should be distributed. This provides flexibility in scaling and cost management, as you can balance between the full control of EC2 and the ease-of-use of Fargate based on workload demands.

By associating ECS services with capacity providers, you can automatically scale the underlying resources (whether EC2 instances or Fargate tasks) based on real-time usage metrics. This helps optimize resource utilization and ensures that your application can handle fluctuations in traffic without manual intervention.

## 6. ECS Networking

Amazon ECS provides a variety of networking options that determine how containers communicate both internally and with external systems. The choice of network mode influences aspects such as isolation, security, and how ports are managed. Below is a detailed explanation of the available networking options for ECS tasks:

### 6.1. Network Modes for ECS Tasks on EC2

When running ECS tasks on Amazon EC2 instances (as opposed to Fargate), you can choose among several Docker network modes:

#### **a. awsvpc (VPC Networking)**

When using the `awsvpc` mode, each task is allocated its own elastic network interface (ENI) in your VPC. This gives the task a unique private IP address (and optionally an IPv6 address), just like an EC2 instance. These ENIs are managed by ECS, and you can view them in the EC2 console. They support features like dual-stack (IPv4 and IPv6), security groups, and VPC flow logs for monitoring network traffic.

- **Benefits:**
    - **Isolation:** Tasks operate with their own network stack, providing strong isolation between tasks.
    - **Security:** You can assign security groups directly to tasks, allowing fine-grained control over inbound and outbound traffic.
    - **Integration:** Directly compatible with load balancers (Application and Network Load Balancers) and supports dynamic port mappings without port collisions.
- **Use Cases:**  
    Recommended for applications that require predictable network performance and robust security controls. This mode is also required for tasks on Fargate.

#### **b. Bridge**

This is the default Docker networking mode for Linux containers when no specific network mode is defined. In this setup, all containers share the host’s internal Docker bridge network.

- **Benefits:**
    - **Simplicity:** Containers communicate over an internal network, and you can use Docker port mapping to expose specific container ports on the host.
- **Limitations:**
    - **Isolation:** Since all containers share the same bridge, there is less network isolation compared to `awsvpc`.
    - **Port Management:** You must manage port conflicts manually because multiple tasks on the same host might attempt to use the same host ports.
- **Use Cases:**  
    Suitable for legacy applications or simple deployments where container-to-container communication within the same host is sufficient.

#### **c. Host**

In host mode, the container bypasses Docker’s virtual network and uses the host’s network stack directly. This means the container shares the same IP address as the host.

- **Benefits:**
    - **Performance:** Eliminates network translation overhead, which can improve performance in network-intensive applications.
- **Limitations:**
    - **Port Collisions:** Since containers share the host's network, the same port cannot be used by multiple containers simultaneously.
    - **Security & Isolation:** There is no network isolation between containers and the host, increasing the potential impact of any network-based attack.
- **Use Cases:**  
    Best used for applications that require very high network performance or when containers need to use specific host-level networking features.

#### **d. None**

With the `none` mode, the container is launched without any external network connectivity. It is completely isolated from any network, though it can still communicate with other containers in the same task via localhost.

- **Benefits & Use Cases:**  
	Useful for running isolated tasks that do not require any network communication, such as certain batch jobs or testing scenarios.

### 6.2. Network Mode for Windows Containers

For Windows-based containers, the networking options differ slightly:

- **Default (NAT Mode):**  
    On Windows containers running on Amazon ECS, the default network mode is `default`, which uses the Windows NAT driver (commonly referred to as the `nat` network mode).
    - **Behavior:**  
        Containers share a NAT-based network, which abstracts the networking behind a virtualized network interface. Unlike the `bridge` mode on Linux, the Windows `default` mode does not support some of the advanced Docker networking features available on Linux.
- **Limitations:**
    - The `awsvpc` mode is not available for Windows containers on EC2, so you cannot assign each container its own ENI.

### 6.3. Networking Considerations for Fargate Tasks

For tasks running on AWS Fargate, the `awsvpc` network mode is the only supported option. Each task is assigned its own ENI, which provides the benefits of task-level isolation, security groups, and direct integration with VPC networking.

When using Fargate, you must specify a `NetworkConfiguration` during task or service launch. This includes:

- **Subnets:**  
	Where your task ENIs will be placed (public or private subnets based on your access requirements).
- **Security Groups:**  
	Directly applied to each task’s ENI to control traffic.
- **Public IP Assignment:**  
	Optionally, you can assign a public IP address to tasks if they need direct internet access.

### 6.4. ECS Networking Best Practices

AWS provides a set of best practices for networking with ECS:

- **Use the awsvpc Mode:**  
    Whenever possible, especially for production workloads, use the `awsvpc` mode to leverage the full benefits of VPC networking, including enhanced security and performance.
- **Plan Your Subnets:**  
    Decide whether tasks should run in public subnets (for direct internet access) or private subnets with a NAT gateway (for enhanced security).
- **Configure Security Groups Appropriately:**  
    Apply the principle of least privilege by ensuring that only necessary traffic is allowed to and from your tasks.
- **Monitor Network Traffic:**  
    Utilize VPC Flow Logs and CloudWatch metrics to monitor network performance and troubleshoot issues.

## 7. Task Lifecycle

The flow chart below shows the task lifecycle flow.

![[ecs-task-lifecycle.png]]


* **PROVISIONING**
	Amazon ECS has to perform additional steps before the task is launched. For example, for tasks that use the `awsvpc` network mode, the elastic network interface needs to be provisioned.

* **PENDING**
	This is a transition state where Amazon ECS is waiting on the container agent to take further action. A task stays in the pending state until there are available resources for the task.

* **ACTIVATING**
	This is a transition state where Amazon ECS has to perform additional steps after the task is launched but before the task can transition to the `RUNNING` state. This is the state where Amazon ECS pulls the container images, creates the containers, configures the task networking, registers load balancer target groups, and configures service discovery.

* **RUNNING**
	The task is successfully running.

* **DEACTIVATING**
	This is a transition state where Amazon ECS has to perform additional steps before the task is stopped. For example, for tasks that are part of a service that's configured to use Elastic Load Balancings target groups, the target group deregistration occurs during this state.

* **STOPPING**
	This is a transition state where Amazon ECS is waiting on the container agent to take further action.
	For Linux containers, the container agent will send the `SIGTERM` signal to notify the application needs to finish and shut down, and then send a `SIGKILL` after waiting the `StopTimeout` duration set in the task definition.

* **DEPROVISIONING**
	Amazon ECS has to perform additional steps after the task has stopped but before the task transitions to the `STOPPED` state. For example, for tasks that use the `awsvpc` network mode, the elastic network interface needs to be detached and deleted.

* **STOPPED**
	The task has been successfully stopped.

* **DELETED**
	This is a transition state when a task stops. This state is not displayed in the console, but is displayed in `describe-tasks`.

## 8. Pricing

Amazon ECS itself doesn’t add any extra charge—you pay only for the underlying compute, storage, and other AWS services that your containerized applications consume. Here’s a breakdown:

- **ECS Is Free:**  
    There’s no additional fee for using Amazon ECS as a service. The orchestration and management provided by ECS are offered at no extra cost.
    
- **EC2 Launch Type:**  
    When you run tasks on EC2 instances, you’re charged for the EC2 instances, storage (like EBS), data transfer, and any additional AWS services you use (for example, CloudWatch for logging). Essentially, your costs reflect the pricing of the individual AWS resources that host and support your containers.
    
- **AWS Fargate:**  
    For tasks using the Fargate launch type, pricing is based on the vCPU and memory resources you specify in your task definition. You’re billed per second (with a one-minute minimum) for the resources allocated to your running tasks. This model provides fine-grained billing for compute capacity without needing to manage the underlying instances.
    
- **ECS Anywhere:**  
    When using ECS Anywhere to run tasks on your own servers or other environments, you’re not charged for the orchestration service itself. However, you continue to pay for any additional AWS services you use (such as AWS Systems Manager for agent management or CloudWatch for monitoring), and you’re responsible for your on-premises infrastructure costs.

## 9. Conclusion

Amazon ECS is a robust, scalable, and secure platform for managing containerized applications on AWS. Whether you choose the flexibility of managing your own EC2 instances, the ease of serverless Fargate, or extend ECS to on-premises environments with ECS Anywhere, the service is designed to integrate seamlessly with AWS’s rich ecosystem of tools and services. 

For further reading and deep dives into specific topics, refer to the [official resources](https://docs.aws.amazon.com/ecs/latest/developerguide/Welcome.html).