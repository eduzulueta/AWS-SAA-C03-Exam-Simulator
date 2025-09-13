
import { ExamDomain } from './types';

export const EXAM_DOMAINS: ExamDomain[] = [
  {
    id: 'domain1',
    title: 'Design Secure Architectures',
    weighting: 30,
    description: 'This domain covers designing secure access to AWS resources and secure workloads and applications.',
    details: [
      "Design secure access to AWS resources",
      "Design secure workloads and applications",
      "Determine appropriate data security controls"
    ],
    studyGuide: `# Design Secure Architectures

This domain focuses on ensuring your AWS environment is secure from the ground up.

## Design secure access to AWS resources

- **IAM (Identity and Access Management):** The core of AWS security. Control access to services and resources securely.
- **Key Concepts:**
  - **Users:** An entity that you create in AWS to represent the person or application that uses it to interact with AWS.
  - **Groups:** A collection of IAM users. You can use groups to specify permissions for multiple users, which can make those permissions easier to manage.
  - **Roles:** An IAM identity that you can create in your account that has specific permissions. It's similar to an IAM user, but not associated with a specific person. A user can assume a role to temporarily take on different permissions for a specific task.
  - **Policies:** JSON documents that define permissions. You can attach policies to users, groups, and roles.
- **AWS Organizations & SCPs (Service Control Policies):** Centrally manage and govern your environment as you grow and scale. SCPs offer central control over the maximum available permissions for all accounts in your organization.

## Design secure workloads and applications

- **VPC (Virtual Private Cloud):** A logically isolated section of the AWS Cloud where you can launch AWS resources in a virtual network that you define.
- **Key Components:**
  - **Subnets:** A range of IP addresses in your VPC. Can be public (internet-accessible) or private.
  - **Route Tables:** A set of rules, called routes, that are used to determine where network traffic is directed.
  - **Security Groups:** Act as a virtual firewall for your instance to control inbound and outbound traffic. They are stateful.
  - **NACLs (Network Access Control Lists):** An optional layer of security for your VPC that acts as a firewall for controlling traffic in and out of one or more subnets. They are stateless.
- **AWS WAF (Web Application Firewall):** Helps protect your web applications from common web exploits.
- **AWS Shield:** A managed Distributed Denial of Service (DDoS) protection service.

## Determine appropriate data security controls

- **Encryption in Transit:** Secure data as it moves between resources. Use TLS/SSL.
- **Encryption at Rest:** Secure data while it is stored.
- **Key Services:**
  - **KMS (Key Management Service):** Makes it easy for you to create and manage cryptographic keys and control their use across a wide range of AWS services and in your applications.
  - **S3 Encryption:** Server-Side Encryption (SSE-S3, SSE-KMS, SSE-C) and Client-Side Encryption.
  - **EBS Encryption:** Encrypt your EBS volumes.
- **AWS Secrets Manager:** Helps you protect secrets needed to access your applications, services, and IT resources.`
  },
  {
    id: 'domain2',
    title: 'Design Resilient Architectures',
    weighting: 26,
    description: 'This domain covers designing scalable, loosely coupled, highly available, and fault-tolerant architectures.',
     details: [
      "Design scalable and loosely coupled architectures",
      "Design highly available and/or fault-tolerant architectures",
    ],
    studyGuide: `# Design Resilient Architectures

This domain is about building systems that can withstand failure and scale to meet demand.

## Design scalable and loosely coupled architectures

- **Loose Coupling:** Components in a system should be independent. If one component fails, it doesn't cause a cascade of failures.
- **Key Services:**
  - **SQS (Simple Queue Service):** A fully managed message queuing service that enables you to decouple and scale microservices, distributed systems, and serverless applications.
  - **SNS (Simple Notification Service):** A fully managed messaging service for both application-to-application (A2A) and application-to-person (A2P) communication. Uses a pub/sub model.
  - **EventBridge:** A serverless event bus that makes it easy to connect applications together using data from your own applications, integrated Software-as-a-Service (SaaS) applications, and AWS services.
- **Scalability:** The ability of a system to handle a growing amount of work by adding resources.
- **Key Concepts:**
  - **Vertical Scaling (Scaling Up):** Increasing the size of a single resource (e.g., a more powerful EC2 instance).
  - **Horizontal Scaling (Scaling Out):** Adding more resources (e.g., more EC2 instances).
- **Key Services:**
  - **Auto Scaling Groups:** Automatically adjust the number of EC2 instances in your group to meet current demand.
  - **Elastic Load Balancing (ELB):** Automatically distributes incoming application traffic across multiple targets, such as EC2 instances. Types include Application Load Balancer (ALB), Network Load Balancer (NLB), and Gateway Load Balancer (GWLB).

## Design highly available and/or fault-tolerant architectures

- **High Availability (HA):** Ensuring your application can handle failures of individual components with minimal downtime. Usually involves running workloads in multiple Availability Zones (AZs).
- **Fault Tolerance:** The ability of a system to remain in operation even if some of the components used to build the system fail.
- **Key Concepts:**
  - **Multi-AZ:** Deploying resources across multiple Availability Zones within a single AWS Region. This protects against a single data center failure.
  - **Multi-Region:** Deploying resources across multiple AWS Regions for disaster recovery (DR) and lower latency for global users.
- **Key Services:**
  - **Route 53:** A highly available and scalable cloud Domain Name System (DNS) web service. Offers various routing policies (Simple, Failover, Geolocation, Latency, Weighted) to support HA and DR strategies.
  - **RDS Multi-AZ:** Creates a synchronous standby replica of your database in a different AZ.
  - **S3 Versioning & Cross-Region Replication:** Protects against accidental deletes and provides DR capabilities.`
  },
  {
    id: 'domain3',
    title: 'Design High-Performing Architectures',
    weighting: 24,
    description: 'This domain focuses on high-performing storage, compute, database, network, and data ingestion solutions.',
    details: [
      "Determine high-performing and/or scalable storage solutions",
      "Design high-performing and elastic compute solutions",
      "Determine high-performing database solutions",
      "Determine high-performing and/or scalable network architectures",
      "Determine high-performing data ingestion and transformation solutions"
    ],
    studyGuide: `# Design High-Performing Architectures

This domain covers selecting the right AWS services to meet performance requirements.

## Determine high-performing and/or scalable storage solutions

- **S3 (Simple Storage Service):** Object storage built to store and retrieve any amount of data. Choose between different storage classes (Standard, Intelligent-Tiering, Glacier) based on access patterns.
- **EBS (Elastic Block Store):** Block-level storage volumes for use with EC2 instances. Different volume types (gp3, io2 Block Express) offer different performance characteristics.
- **EFS (Elastic File System):** A scalable, elastic file system for Linux-based workloads for use with AWS Cloud services and on-premises resources.
- **FSx:** Fully managed third-party file systems (e.g., FSx for Windows File Server, FSx for Lustre).

## Design high-performing and elastic compute solutions

- **EC2 (Elastic Compute Cloud):** Choose the right instance family (General Purpose, Compute Optimized, Memory Optimized, Storage Optimized) for your workload.
- **Lambda:** A serverless compute service that lets you run code without provisioning or managing servers. Ideal for event-driven workloads.
- **ECS (Elastic Container Service) & EKS (Elastic Kubernetes Service):** Managed services for running containerized applications.
- **Placement Groups:** Influence the placement of interdependent EC2 instances to meet the needs of your workload. Types: Cluster (low latency), Partition (reduce correlated failures), Spread (separate critical instances).

## Determine high-performing database solutions

- **RDS (Relational Database Service):** Managed service for relational databases like MySQL, PostgreSQL, Oracle, etc. Use Read Replicas to scale read-heavy workloads.
- **DynamoDB:** A fully managed NoSQL key-value and document database that delivers single-digit millisecond performance at any scale. Use DynamoDB Accelerator (DAX) for in-memory caching.
- **ElastiCache:** A fully managed in-memory data store and cache service (supports Redis and Memcached).
- **Redshift:** A fast, fully managed data warehouse that makes it simple and cost-effective to analyze all your data using standard SQL.

## Determine high-performing network architectures

- **Direct Connect:** A cloud service solution that makes it easy to establish a dedicated network connection from your premises to AWS.
- **Global Accelerator:** A networking service that improves the availability and performance of your applications with local or global users.
- **VPC Endpoints:** Enables you to privately connect your VPC to supported AWS services without requiring an internet gateway, NAT device, VPN connection, or AWS Direct Connect connection.`
  },
  {
    id: 'domain4',
    title: 'Design Cost-Optimized Architectures',
    weighting: 20,
    description: 'This domain covers cost-optimized storage, compute, database, and network architectures.',
    details: [
      "Design cost-optimized storage solutions",
      "Design cost-optimized compute solutions",
      "Design cost-optimized database solutions",
      "Design cost-optimized network architectures"
    ],
    studyGuide: `# Design Cost-Optimized Architectures

This domain focuses on building architectures that are efficient and economical.

## Design cost-optimized storage solutions

- **S3 Storage Classes:** Match your data access patterns to the right class. Use **S3 Intelligent-Tiering** to automate cost savings.
- **S3 Lifecycle Policies:** Automate the migration of objects to more cost-effective storage classes over time.
- **EBS Volume Types:** Choose the most cost-effective volume type that meets your performance needs (e.g., **gp3** offers a good balance of price and performance).
- **Data Transfer Costs:** Be aware of data transfer out (DTO) costs. Data transfer within the same AWS Region between AZs has a cost, and data transfer out to the internet is the most expensive.

## Design cost-optimized compute solutions

- **Right-Sizing:** Select the EC2 instance type that best fits the CPU, memory, and network needs of your workload. Use **AWS Compute Optimizer** for recommendations.
- **Pricing Models:**
  - **On-Demand:** Pay by the hour or second with no long-term commitments. Good for unpredictable workloads.
  - **Reserved Instances (RIs) & Savings Plans:** Provide significant discounts in exchange for a 1 or 3-year commitment. Best for steady-state workloads.
  - **Spot Instances:** Request spare EC2 computing capacity for up to 90% off the On-Demand price. Ideal for fault-tolerant, flexible workloads.
- **Auto Scaling:** Automatically adjust compute capacity to match demand, ensuring you don't pay for idle resources.
- **Serverless (Lambda):** Pay only for the compute time you consume. No charge when your code is not running. Eliminates the cost of idle servers.

## Design cost-optimized database solutions

- **Right-Sizing:** Choose the appropriate database instance size.
- **RDS vs. Aurora:** **Amazon Aurora** can be more cost-effective for certain workloads due to its storage architecture and performance.
- **Aurora Serverless:** Automatically starts up, shuts down, and scales capacity up or down based on your application's needs. Cost-effective for intermittent or unpredictable workloads.
- **DynamoDB Provisioned vs. On-Demand:** Choose **On-Demand** capacity mode for unpredictable workloads to pay per-request. Use **Provisioned Capacity** with auto-scaling for predictable traffic to optimize costs.

## Design cost-optimized network architectures

- **VPC Endpoints:** Use **Gateway Endpoints** (for S3 and DynamoDB) which are free, to avoid NAT Gateway data processing charges when accessing these services from private subnets.
- **CloudFront:** Use a Content Delivery Network (CDN) like CloudFront to cache content closer to users. This can significantly reduce data transfer out costs from your origin (e.g., S3 or EC2).
- **NAT Gateway:** Place NAT Gateways in a single AZ and route traffic from other AZs to it to reduce the number of gateways and associated costs (though this creates a single point of failure).`
  },
];

export const TOTAL_PRACTICE_QUESTIONS = 10;
export const PASSING_PERCENTAGE = 72;