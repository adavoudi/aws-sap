# EC2 Fleet and Spot Fleet

## 1. Introduction

**Amazon EC2 Fleet** and **Spot Fleet** are features of Amazon EC2 that enable you to launch and manage large numbers of instances—whether using spare (Spot) capacity or a mix of Spot and On-Demand instances—with a single API call. By letting you specify multiple instance types, Availability Zones, and purchase options (Spot, On-Demand, or a mix), these fleets help optimize both cost and availability for your applications. They use launch templates or launch parameters to define the instance configurations, and they offer a high degree of flexibility in provisioning capacity at scale.

## 2. EC2 Fleet vs Spot Fleet

Both **EC2 Fleet** and **Spot Fleet** let you provision a large group of EC2 instances in a single API call—but they differ in focus, capabilities, and their long‐term roadmap.
### 2.1. EC2 Fleet

EC2 Fleet lets you launch a mix of instance types and purchasing options (Spot, On-Demand, and even Reserved in combination) to meet a defined target capacity.

It supports three request types:
- **Instant:** Synchronously launches instances and returns results immediately.
- **Request:** Asynchronously places a one-time request for capacity.
- **Maintain:** Continuously attempts to keep your fleet at the desired capacity, replacing instances that are interrupted.

You have granular control over allocation strategies (such as capacity-optimized or price-capacity-optimized), instance weighting, and diversification across Availability Zones and instance types.

EC2 Fleet is **available via API/CLI only** (no native console support) and is the recommended, actively maintained service for new deployments.
### 2.2. Spot Fleet

Spot Fleet is a **legacy mechanism** focused on launching Spot Instances. It also lets you request capacity from a diverse set of Spot pools with a specified target capacity.

It supports two modes:
- **Request:** A one-time request without automatic replenishment.
- **Maintain:** Continues to try to meet target capacity by replacing interrupted Spot Instances.

Unlike EC2 Fleet, Spot Fleet **is supported in the AWS Management Console**. However, it is based on an older API with no planned significant future investment from AWS. **It’s generally recommended only when console-based management is needed.**

## 3. Fleet Request Types

Both fleet types let you choose a request type that determines how capacity is provisioned and maintained:

- **Maintain**: The fleet automatically attempts to replace interrupted instances so that the target capacity is sustained over time.
- **Request**: A one-time request is made for the target capacity. If instances are interrupted or capacity is not immediately available, no automatic replenishment occurs.
- **Instant** (available only with EC2 Fleet): A synchronous, one-time request that launches instances immediately and returns the result in the API response.

## 4. What Are Capacity Pools?

Spot capacity pool refers to a collection of available (unused) EC2 instances that share a specific configuration. Typically, this configuration is defined by factors such as the instance type and the Availability Zone. For example, all spare _m5.large_ instances in a given Availability Zone (e.g., _us-east-1a_) form one pool. Fleets use these pools to allocate capacity across different combinations, which helps in optimizing for cost and reducing the likelihood of interruptions by diversifying across multiple pools.
## 5. Allocation Strategies

When launching instances from a pool of available capacity, fleets use allocation strategies to choose which capacity pool (a combination of instance type and Availability Zone) to draw from. Official AWS documentation lists several strategies:

- **Lowest Price** (legacy, not recommended): Requests instances from the cheapest available pool, but may result in higher interruption rates.
- **Price Capacity Optimized** (recommended): Considers both price and capacity, selecting pools with optimal spare capacity and competitive pricing.
- **Capacity Optimized / Capacity Optimized Prioritized**: Focuses on launching instances from the pools with the highest capacity availability, which can help lower the likelihood of interruptions.
- **Diversified**: Evenly spreads instances across the specified pools to further reduce risk.

## 6. Key Configuration Options

When you set up a fleet request (whether EC2 Fleet or Spot Fleet), you can configure several key parameters:

- **Target Capacity**: The number of instances or compute units you want to launch.
- **Launch Templates/Overrides**: Define instance configurations (AMI, instance type, key pair, etc.) and can include multiple overrides for diversification.
- **Instance Weighting**: Optionally assign weights to different instance types based on their compute capacity.
- **On-Demand vs. Spot Mix**: Specify how much of your target capacity should be fulfilled with On-Demand Instances versus Spot Instances.
- **Client Token & IAM Role**: Ensure idempotency and authorize the fleet to manage resources on your behalf.
- **Spending Limits and Maximum Prices**: (For Spot Instances) Though it’s generally recommended to let the maximum price default to the On-Demand rate to reduce interruptions.

Additional options include policies for handling excess capacity, termination behavior on interruption (e.g., stop, hibernate, or terminate), and even tagging options for managing resources.

## 7. Fleet Lifecycle Phases

The lifecycle of a fleet encompasses every stage—from when you submit a request to launch instances, through the period the fleet is actively managing capacity, to the eventual modification or cancellation of the request.

![[fleet-price.png]]

### 7.1. Submission/Creation

- **Request Submission:**  
    You begin by submitting a fleet request (using either EC2 Fleet or Spot Fleet APIs/CLI).
- **Initial Evaluation:**  
    When the request is submitted, the fleet enters an evaluation phase. During this phase, AWS checks if the request is valid and whether it meets your account’s quotas.
    - For Spot Fleet, this phase is reflected in the **“submitted”** state.
### 7.2. Active Phase

- **Provisioning and Running:**  
    Once approved, the fleet request enters the **“active”** state. Here, AWS is actively attempting to launch the requested instances from the available capacity pools.
- **Capacity Maintenance (Maintain Type):**
    - For requests configured as **“maintain”**, if any launched Spot Instances are interrupted or terminated due to capacity changes, AWS automatically attempts to replace them to meet the target capacity.
- **Lifecycle Monitoring:**  
    Throughout the active phase, the fleet monitors the health and status of its instances. AWS may provide signals (like rebalance recommendations) to help you proactively manage interruptions.
### 7.3. Modification

- **Updating Fleet Configuration:**  
    If you need to change the target capacity or other configuration details of a fleet that’s set to **maintain**, you can modify the request. During this period, the fleet is in a **“modifying”** state until the changes are fully processed.
### 7.4. Cancellation & Termination

- **Cancellation Initiation:**  
    When you decide to cancel (or delete) a fleet request, it does not immediately terminate all running instances. Instead, the request transitions into cancellation-related states.
- **Cancellation States:**
    - **Cancelled_running:**
        - The request is canceled, meaning no new instances will be launched, but the instances that were already launched continue to run.
    - **Cancelled_terminating:**
        - The cancellation process may include terminating the instances. In this state, the fleet is in the process of terminating its running instances.
    - **Cancelled:**
        - Once all instances have been terminated or have naturally completed their lifecycle, the request enters the final **“cancelled”** state.

These states help you manage whether your running instances should continue after cancellation or be shut down automatically.
## 8. Use Cases for Spot Instances

- **Data Analytics:** Large-scale data processing tasks can be distributed across multiple Spot Instances. If some instances are reclaimed, the job still continues on remaining or newly launched Spot Instances.
- **Rendering and Batch Processing:** Movie rendering, image processing, or continuous integration (CI) tasks can benefit from lower-cost capacity while tolerating intermittent loss of instances.
- **Resilient Web Services:** Some microservices can scale out gracefully and handle ephemeral compute capacity, particularly if stateless and properly orchestrated.
## 9. Conclusion

Spot Instances and Spot Fleets provide powerful mechanisms to optimize compute costs on AWS, especially for workloads that can handle potential interruptions. By setting a maximum price threshold, you retain control over the economics of your compute consumption.

For an even deeper dive into the underlying principles of cost optimization and best practices with Spot Instances, refer to the official AWS whitepaper **[Overview of Amazon EC2 Spot Instances](https://docs.aws.amazon.com/pdfs/whitepapers/latest/cost-optimization-leveraging-ec2-spot-instances/cost-optimization-leveraging-ec2-spot-instances.pdf)**. This whitepaper details when and how to use Spot Instances effectively, best practices, and integration with other AWS services.  
