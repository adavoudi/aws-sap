# AWS CloudFormation

## 1. Introduction

AWS CloudFormation is a service that enables you to model, provision, and manage your AWS resources using code. With CloudFormation, you describe the desired state of your infrastructure in a template (written in JSON or YAML), and the service takes care of creating, updating, and deleting resources in the correct order. This chapter explains how CloudFormation automates resource management, enforces best practices such as version control and parameterization, and provides numerous built-in functionalities to ensure safe and efficient deployments.

The power of CloudFormation lies in its ability to remove manual configurations and orchestrate complex infrastructures by declaring what resources are needed and how they are interrelated. From deploying simple EC2 instances to orchestrating multi-tier applications with load balancers, security groups, and storage, CloudFormation streamlines every aspect of AWS resource management.

## 2. What is AWS CloudFormation?

CloudFormation allows you to describe your entire AWS infrastructure in a code file, known as a template. In these templates, you declare:

- **Resources:** AWS components such as EC2 instances, security groups, S3 buckets, Elastic IPs, load balancers, and more.
- **Parameters:** Dynamic inputs that allow users to customize deployments without modifying the template code.
- **Mappings:** Static variables used to control configuration details (e.g., region-specific AMI IDs).
- **Outputs:** Values you can export and import between stacks to enable cross-stack references.
- **Conditions:** Logical constructs to control resource creation based on input values or environment settings.
- **Intrinsic Functions:** Built-in functions (like `!Ref`, `Fn::GetAtt`, `Fn::FindInMap`, etc.) that simplify template declarations and allow dynamic reference resolution.

CloudFormation promotes an Infrastructure-as-Code (IaC) approach that not only automates resource provisioning but also integrates with version control systems, thereby streamlining code review and auditing processes.

## 3. Declaring and Managing Resources

### 3.1. The Core of CloudFormation Templates

At the heart of every CloudFormation template is the **Resources** section. This section is the only mandatory element in a template and contains the definitions of all AWS components that will be created. Each resource is declared with a type in the form of `service-provider::service-name::data-type-name` (e.g., `AWS::EC2::Instance`). These resources can reference one another, and CloudFormation automatically determines the correct order for resource creation, updates, and deletion.

For example, in a typical template you might declare:

- A security group for controlling access.
- Multiple EC2 instances that use the security group.
- Elastic IPs associated with the EC2 instances.
- An S3 bucket for storage.
- A load balancer in front of the instances.

This declarative approach abstracts away the manual steps of resource orchestration, reducing human error and speeding up deployments.

**Example YAML: Declaring Multiple Resources**

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Description: Template with multiple resources.
Resources:
  MySecurityGroup:
    Type: AWS::EC2::SecurityGroup
    Properties:
      GroupDescription: Allow SSH access
      SecurityGroupIngress:
        - IpProtocol: tcp
          FromPort: 22
          ToPort: 22
          CidrIp: 0.0.0.0/0

  MyEC2Instance:
    Type: AWS::EC2::Instance
    Properties:
      ImageId: ami-12345678
      InstanceType: t2.micro
      SecurityGroupIds:
        - !Ref MySecurityGroup
```

### 3.2. Resource Documentation and Syntax

Each AWS resource type has detailed documentation available via the AWS website. Documentation provides:

- **Property definitions:** A list of key-value pairs that configure each resource.
- **Usage examples:** Both JSON and YAML examples to help you understand how to configure resources.
- **Return values:** Information on what each resource returns when referenced (e.g., instance ID, availability zone).

For instance, when working with an `AWS::EC2::Instance`, properties such as `ImageId`, `InstanceType`, and `SecurityGroups` are defined in the template. Using the intrinsic function `!Ref` or `Fn::GetAtt`, you can reference properties of resources elsewhere in your template.

**Example YAML: Using Intrinsic Functions**

```yaml
Resources:
  MyEC2Instance:
    Type: AWS::EC2::Instance
    Properties:
      ImageId: ami-12345678
      InstanceType: t2.micro

Outputs:
  InstanceAZ:
    Description: The Availability Zone of the EC2 instance
    Value: !GetAtt MyEC2Instance.AvailabilityZone
```

## 4. Parameters and Mappings

### 4.1. Parameters

Parameters allow you to pass dynamic values into your CloudFormation templates, making your templates reusable across different environments. Consider the following key points:

- **Usage:** Use parameters for values that may change over time or that cannot be predetermined. For example, a security group description or instance type.
- **Validation:** Parameters support type definitions (e.g., String, Number, CommaDelimitedList) and validation rules such as allowed values, minimum/maximum lengths, and regular expressions.
- **Example:** A parameter for EC2 instance type might only allow `t2.micro`, `t2.small`, or `t2.medium`, with a default of `t2.micro`. Sensitive information, like a database password, can be protected using the `NoEcho` property.

**Example YAML: Defining and Using Parameters**

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Description: Template with parameters.
Parameters:
  InstanceType:
    Type: String
    Default: t2.micro
    AllowedValues:
      - t2.micro
      - t2.small
      - t2.medium

Resources:
  MyEC2Instance:
    Type: AWS::EC2::Instance
    Properties:
      ImageId: ami-12345678
      InstanceType: !Ref InstanceType
```

### 4.2. Mappings

Mappings are used to define static values that vary based on certain keys such as region, environment, or architecture. They are particularly useful when you have fixed configurations that differ across deployments. For example:

- A mapping can be used to specify region-specific AMI IDs for EC2 instances.
- You can access mapping values using the `Fn::FindInMap` function, which dynamically retrieves the correct value based on the current environment (e.g., region and instance architecture).

**Example YAML: Using Mappings**

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Description: Template with mappings.
Mappings:
  RegionMap:
    us-east-1:
      AMI: ami-0abcdef1234567890
    us-west-1:
      AMI: ami-0fedcba9876543210

Resources:
  MyEC2Instance:
    Type: AWS::EC2::Instance
    Properties:
      ImageId: !FindInMap [RegionMap, !Ref "AWS::Region", AMI]
      InstanceType: t2.micro
```

## 5. Outputs, Conditions, and Intrinsic Functions

### 5.1. Outputs

The **Outputs** section is optional but very useful for:

- Exporting values (like VPC IDs or security group IDs) that can be imported by other stacks.
- Displaying important information on the AWS console or via CLI commands.
- Facilitating cross-stack references to enforce separation of concerns and collaborative infrastructure management.

**Example YAML: Defining Outputs**

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Description: Template with outputs.
Resources:
  MyEC2Instance:
    Type: AWS::EC2::Instance
    Properties:
      ImageId: ami-12345678
      InstanceType: t2.micro

Outputs:
  InstanceId:
    Description: The Instance ID of the newly created EC2 instance
    Value: !Ref MyEC2Instance
    Export:
      Name: MyEC2InstanceID
```

### 5.2. Conditions

Conditions enable you to control resource creation based on predefined criteria. They are often used to distinguish between different environments (e.g., development vs. production) or to decide whether certain resources should be created:

- Conditions use logical functions such as `And`, `Equals`, `If`, `Not`, and `Or`.
- You can attach conditions to resources or outputs, ensuring that only resources that meet the condition are created.

**Example YAML: Using Conditions**

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Description: Template with conditions.
Parameters:
  EnvironmentType:
    Type: String
    Default: dev

Conditions:
  IsProd:
    Fn::Equals: [ !Ref EnvironmentType, prod ]

Resources:
  ProdOnlyBucket:
    Type: AWS::S3::Bucket
    Condition: IsProd
    Properties:
      BucketName: my-prod-bucket
```

### 5.3. Intrinsic Functions

Intrinsic functions simplify complex template operations. The most commonly used functions include:

- **Ref:** Returns the value of a parameter or the physical ID of a resource.
- **GetAtt:** Retrieves an attribute from a resource (e.g., the availability zone of an EC2 instance).
- **FindInMap:** Returns a value from a mapping.
- **ImportValue:** Imports a value that has been exported from another stack.
- **Join and Sub:** Useful for string manipulation.
- **Others:** Functions like `Base64`, `Cidr`, `GetAZs`, `Select`, `Split`, and logical functions (e.g., `If`, `Not`, `Equals`) enhance template flexibility.

**Example YAML: Using Intrinsic Functions Together**

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Description: Template using intrinsic functions.
Resources:
  MyEC2Instance:
    Type: AWS::EC2::Instance
    Properties:
      ImageId: ami-12345678
      InstanceType: t2.micro

Outputs:
  InstanceAZ:
    Description: The Availability Zone of the EC2 instance
    Value: !GetAtt MyEC2Instance.AvailabilityZone
```

## 6. Rollbacks and Failure Handling

CloudFormation provides robust mechanisms to handle errors during stack creation or updates:

- **Default Rollback:** If stack creation fails, CloudFormation rolls back all changes, deleting any resources that were provisioned.
- **Preserving Resources:** You can disable rollback or choose to preserve successfully provisioned resources during a failure. This is useful for troubleshooting issues with resource creation.
- **Stack Updates:** During updates, if a failure occurs, CloudFormation rolls back to the previous stable state. If the rollback itself fails (often due to manual changes to resources), you may need to intervene manually and use the `ContinueUpdateRollback` action to complete the process.

## 7. Security and IAM Roles in CloudFormation

CloudFormation supports enhanced security through the use of service roles:

- **Service Roles:** These are IAM roles dedicated to CloudFormation, which allow the service to create, update, and delete resources on your behalf. By granting only the necessary permissions via these roles (e.g., `iam:PassRole`), you adhere to the principle of least privilege.
- **Use Cases:** Service roles are particularly useful when users have limited permissions but need to perform stack operations. For instance, a user might be allowed to launch a stack but not directly modify underlying resources.

**Example YAML: Creating an IAM Role for CloudFormation**

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Description: Template to create a service role for CloudFormation.
Resources:
  CloudFormationServiceRole:
    Type: AWS::IAM::Role
    Properties:
      RoleName: CloudFormationServiceRole
      AssumeRolePolicyDocument:
        Version: '2012-10-17'
        Statement:
          - Effect: Allow
            Principal:
              Service: cloudformation.amazonaws.com
            Action: sts:AssumeRole
      Policies:
        - PolicyName: S3FullAccessPolicy
          PolicyDocument:
            Version: '2012-10-17'
            Statement:
              - Effect: Allow
                Action: s3:*
                Resource: '*'
```

## 8. Capabilities and Acknowledging Risks

Certain CloudFormation templates require explicit acknowledgment of potential risks:

- **CAPABILITY_IAM and CAPABILITY_NAMED_IAM:** These capabilities must be specified when your template creates or modifies IAM resources. The acknowledgment ensures that you understand the implications of creating resources with potentially wide-ranging permissions.
- **CAPABILITY_AUTO_EXPAND:** Required when using macros or nested stacks that perform dynamic transformations.

If you encounter an `InsufficientCapabilitiesException`, you must re-launch the template with the required capabilities to proceed.

## 9. Deletion Policies

Deletion policies allow you to control what happens to a resource when it is removed from the stack:

- **Delete:** The default policy, which removes the resource.
- **Retain:** Preserves the resource even after the stack is deleted.
- **Snapshot:** For supported resources (e.g., EBS volumes, RDS instances), creates a snapshot before deletion.

For example, you might retain a security group or create a snapshot of an EBS volume to preserve data for backup purposes. Note that for S3 buckets, the deletion will only succeed if the bucket is empty.

**Example YAML: Using Deletion Policies**

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Description: Template demonstrating deletion policies.
Resources:
  MyDynamoDBTable:
    Type: AWS::DynamoDB::Table
    DeletionPolicy: Retain
    Properties:
      TableName: MyTable
      AttributeDefinitions:
        - AttributeName: Id
          AttributeType: S
      KeySchema:
        - AttributeName: Id
          KeyType: HASH
      BillingMode: PAY_PER_REQUEST

  MyEBSVolume:
    Type: AWS::EC2::Volume
    DeletionPolicy: Snapshot
    Properties:
      Size: 8
      AvailabilityZone: us-east-1a
```

## 10. Stack Policies and Termination Protection

### 10.1. Stack Policies

Stack policies are JSON documents that define which resources can be updated during a stack update. They help protect critical resources from accidental modifications. A common pattern is to allow updates on most resources while explicitly denying changes to production databases or other sensitive components.

### 10.2. Termination Protection

Termination protection is a safety feature that prevents accidental deletion of your CloudFormation stacks. When enabled, you must explicitly disable termination protection before the stack can be deleted, thereby adding an extra layer of security to your deployments.

_Note: Termination protection is configured at the stack level via the AWS Management Console, CLI, or API rather than within the template itself._

## 11. Custom Resources

Custom resources extend the capabilities of CloudFormation to manage resources that are not natively supported. They are typically implemented using Lambda functions or SNS topics and allow you to:

- Run custom provisioning logic.
- Manage on-premises or third-party resources.
- Perform actions such as emptying a non-empty S3 bucket before deletion.

Custom resources are declared in the template using a type prefixed with `Custom::` (for example, `Custom::MyCustomResourceTypeName`), and they rely on a service token (the ARN of the Lambda function or SNS topic) to execute the custom logic.

**Example YAML: Declaring a Custom Resource**

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Description: Template with a custom resource.
Resources:
  MyCustomResource:
    Type: Custom::MyCustomResourceType
    Properties:
      ServiceToken: arn:aws:lambda:us-east-1:123456789012:function:MyCustomFunction
      SomeProperty: SomeValue
```

## 12. Dynamic References

Dynamic references enable CloudFormation to retrieve sensitive data at runtime from AWS Systems Manager Parameter Store or AWS Secrets Manager. This feature allows you to:

- Store plaintext values or secure strings (using `ssm` or `ssm-secure`) in Parameter Store.
- Retrieve secrets (using `secretsmanager`) directly within your template.
- Use the syntax `{{resolve:service-name:reference-key}}` to dynamically insert values during stack operations.

**Example YAML: Using Dynamic References**

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Description: Template using dynamic references.
Resources:
  MyS3Bucket:
    Type: AWS::S3::Bucket
    Properties:
      BucketName: my-dynamic-bucket
      AccessControl: !Sub "{{resolve:ssm:my-parameter:1}}"

  MyRDSInstance:
    Type: AWS::RDS::DBInstance
    Properties:
      DBInstanceIdentifier: mydbinstance
      MasterUsername: !Sub "{{resolve:secretsmanager:my-db-secret:SecretString:username}}"
      MasterUserPassword: !Sub "{{resolve:secretsmanager:my-db-secret:SecretString:password}}"
      DBInstanceClass: db.t2.micro
      Engine: mysql
      AllocatedStorage: 20
```

## 13. CloudFormation StackSets

StackSets extend the power of CloudFormation by enabling the deployment of stacks across multiple AWS accounts and regions:

- **Deployment Model:** An administrator account creates and manages StackSets, while target accounts receive the deployed stack instances.
- **Permissions:** Self-managed permissions require IAM roles in both administrator and target accounts. With service-managed permissions, AWS Organizations simplifies role management by automatically creating the necessary roles and granting trusted access.
- **Automation:** New accounts within your organization can automatically receive stack instances if they belong to a designated organizational unit (OU).

## 14. Conclusion

AWS CloudFormation is a powerful tool that transforms the way you manage cloud infrastructure. By treating infrastructure as code, CloudFormation not only automates resource provisioning but also ensures that your deployments are repeatable, version-controlled, and scalable. In this chapter, we explored every aspect of CloudFormation—from the basics of resource declaration and parameterization to advanced topics like rollback strategies, security roles, deletion policies, custom resources, dynamic references, and multi-account deployments with StackSets.

With these insights and practical YAML examples, you are well-equipped to design, deploy, and manage complex AWS architectures confidently and efficiently. Whether you are working in a single region or orchestrating deployments across a global enterprise, understanding CloudFormation’s features and best practices is key to leveraging the full power of AWS.