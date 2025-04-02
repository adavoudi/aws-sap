# Amazon ElastiCache

## 1. Introduction

Amazon ElastiCache makes it easy to set up, manage, and scale distributed in-memory cache in the AWS Cloud. It provides a high performance, resizable, and cost-effective in-memory cache, while removing complexity associated with deploying and managing a distributed cache environment. With Amazon ElastiCache Serverless, you can create a highly available cache in under a minute without infrastructure provisioning or configuration, and never have to worry about capacity. Amazon ElastiCache is Valkey-, Memcached-, and Redis OSS-compatible.

## 2. Supported Engines

Amazon ElastiCache is now compatible with three in‑memory caching engines:

- **Memcached:**
    - A simple, multi-threaded caching solution ideal for read-heavy use cases.
    - Managed as a pool of independent nodes that scale horizontally, with features such as automatic node replacement and Auto Discovery to adjust dynamically to your application’s needs.  
        
- **Redis (ElastiCache for Redis OSS):**
    - Offers a richer feature set with advanced data structures (lists, sets, sorted sets, and hashes), persistence options, replication, and pub/sub messaging.
    - Supports high availability with a primary node and read replicas, as well as automatic failover using a Multi-AZ configuration.
    - Provides additional security features such as encryption (both in transit and at rest), Redis AUTH, and Role-Based Access Control (RBAC).

- **Valkey:**
	Valkey is a fork of Redis OSS 7.2, created by the Linux Foundation and community contributors after Redis changed its licensing. It is an open source, in-memory, high performance, key-value datastore. It is a drop-in replacement for Redis OSS. It can be used for a variety of workloads such as caching, session stores, and message queues, and can act as a primary database. Valkey can run as either a standalone daemon or in a cluster, with options for replication and high availability.

### 2.1. Redis vs Memcached vs Valkey

Below is a side-by-side comparison table of the three engines—**Memcached**, **Redis**, and **Valkey**:

| **Feature**                         | **Memcached**                                                                                                           | **Redis**                                                                                                                             | **Valkey**                                                                                                                                                                                                                              |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Origin / History**                | - One of the oldest and most widely adopted in-memory caches.<br /><br />- Historically the gold standard for web caching.  | - Open-source, started as an advanced key-value store with more complex data structures.- Long track record of community adoption.    | - Forked from Redis OSS 7.2 in March 2024 after Redis Inc. changed its open-source model.<br /><br />- Overseen by the Linux Foundation, ensuring an open, community-driven project.                                                        |
| **Primary Use Case**                | - Primarily used for object caching to offload databases.<br /><br />- Focused on simple key-value caching.                 | - In-memory data store with advanced data structures.<br /><br />- Can act as a cache or a primary database for certain workloads.        | - Drop-in replacement for Redis OSS with additional performance optimizations.<br /><br />- Suitable for caching, session stores, message queues, or as a primary database.                                                                 |
| **Data Structures**                 | - Simple key-value pairs (strings only).                                                                                | - Rich data types (strings, hashes, lists, sets, sorted sets, bitmaps, HyperLogLogs, streams, geospatial).                            | - Same advanced data structures as Redis (sorted sets, hashes, bit arrays, HyperLogLogs, streams, geospatial, etc.).                                                                                                                    |
| **Persistence**                     | - No built-in persistence; purely in-memory, ephemeral.                                                                 | - Offers RDB (snapshotting) and AOF (Append Only File) persistence options.                                                           | - Similar to Redis, supports point-in-time backups and disk persistence.<br /><br />- Primary-replica architecture for high availability.                                                                                                   |
| **Replication & High Availability** | - No native replication; each node is standalone and treated as expendable.                                             | - Supports asynchronous replication (primary-replica), enabling Multi-AZ setups and failover.                                         | - Also supports primary-replica architecture with asynchronous replication.<br /><br />- Designed to support high availability (multi-node, cluster setups).                                                                                |
| **Multi-threading**                 | - Multithreaded, can effectively utilize multiple CPU cores.                                                            | - Primarily single-threaded event loop (though newer versions have some threading for I/O), but historically less multi-core usage.   | - Valkey 7.2 is similar to Redis, but Valkey 8.0 introduces a new I/O threading architecture.<br /><br />- Up to 230% higher throughput and 70% lower latency than Valkey 7.2.                                                              |
| **Scalability**                     | - Horizontal scaling by adding/removing nodes; treated like a pool (similar to an EC2 Auto Scaling group).              | - Scales via clustering and sharding across multiple nodes with failover.                                                             | - Offers clustering, replication, and high availability options.<br /><br />- Can scale vertically or horizontally to meet demand.                                                                                                          |
| **Advanced Features**               | - Basic atomic increment/decrement counters only.                                                                       | - Pub/Sub messaging, geospatial queries, sorting, ranking, complex data manipulations, Lua scripting.                                 | - Same feature set as Redis (e.g., Pub/Sub, geospatial, advanced data structures) plus improvements in performance and memory usage.<br /><br />- Ideal for advanced real-time use cases such as geospatial queries and ML workloads.       |
| **Security & Compliance**           | - Typically used for simpler caching scenarios; does not offer advanced security or compliance features out of the box. | - Offers encryption in transit and at rest (in managed services), suitable for PCI DSS, HIPAA, FedRAMP use cases.                     | - Like Redis, supports encryption and compliance (in managed AWS services) for enterprise use.                                                                                                                                          |
| **Licensing & Community**           | - Open source but historically developed outside the Linux Foundation’s stewardship.                                    | - Initially open source, but newer Redis Inc. versions have changed licenses.                                                         | - Fully open source under the BSD 3-Clause license.<br /><br />- Stewarded by the Linux Foundation and a vibrant open source community.<br /><br />- Ensures license stability and community-driven development.                                |
| **AWS Managed Options**             | - **Amazon ElastiCache for Memcached**: fully managed, auto-scaling, node replacement, easy setup.                      | - **Amazon ElastiCache for Redis**: fully managed, widely used for caching, sessions, pub/sub, and more.                              | - **Amazon ElastiCache for Valkey**: drop-in Redis replacement with improved performance.                                                                                                                                               |
| **Pricing / Cost**                  | - Available under ElastiCache. Pricing depends on node type and usage.                                                  | - ElastiCache for Redis pricing is higher than Memcached, but still pay-as-you-go.                                                    | - ElastiCache for Valkey: ~20–33% lower cost vs. other supported engines in certain modes.                                                                                                                                              |
| **Ideal Use Cases**                 | - Pure caching with minimal overhead.<br /><br />- Need simple, fast, distributed caches.                                   | - Applications needing advanced data structures.<br /><br />- Leaderboards, real-time analytics, pub/sub, geospatial, session store, etc. | - All Redis-like use cases plus improved performance.<br /><br />- Caching, real-time analytics, ephemeral or persistent store.<br /><br />- Suitable for open source enthusiasts seeking assured license continuity and community development. |


## 3. Cluster Formation

Amazon ElastiCache is organized into clusters. With Memcached, a cluster consists of multiple independent nodes forming a distributed cache pool. In contrast, a Redis cluster is built around a single primary node with optional read replicas for scaling reads and ensuring high availability.  

## 4. Network & Security

- **VPC Integration:**  
    You can deploy your cache clusters within an Amazon Virtual Private Cloud (VPC) for network isolation and enhanced security.
- **Security Features:**  
    In addition to VPC security, ElastiCache supports encryption (both at rest and in transit), and for Redis, it provides authentication mechanisms and role-based access controls.  

## 5. Monitoring

Amazon ElastiCache integrates with Amazon CloudWatch, providing detailed metrics (e.g., CPU usage, memory consumption, cache hits/misses, and replication lag) that help monitor the health and performance of your cache nodes.  
## 6. Scaling

For Memcached, you can add or remove nodes to adjust capacity. For Redis, scaling can be achieved by adding read replicas (for read scaling) or sharding simple key/counter workloads across multiple clusters since complex data types do not shard automatically. 

## 7. Pricing Models

Amazon ElastiCache offers both on-demand and reserved node pricing models. Reserved nodes provide a significant discount compared to on‑demand pricing in exchange for a one- or three-year commitment, helping to optimize cost based on predictable workloads.

## 8. Use Cases

ElastiCache is a versatile service with a range of applications:

- **Database Query Caching:** Offload read requests from relational or NoSQL databases, thereby improving response times.
- **Session Stores:** Cache user sessions to enhance the performance and scalability of web applications.
- **Real-Time Leaderboards:** Utilize Redis’ sorted sets to maintain real-time ranking systems.
- **Rate Limiting and Atomic Counters:** Use atomic operations for reliable, high-speed counters and to throttle API requests.
- **Time-Series Data Processing:** Rapidly process and analyze time-stamped data for real-time analytics.  
## 9. Conclusion

For further information, please refer to the [official documentation](https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/WhatIs.html).