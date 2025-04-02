# Amazon CodeGuru

## 1. Introduction

Amazon CodeGuru is an AI-powered developer tool that helps improve your code quality and optimize your application performance. It does so by combining machine learning with automated reasoning to analyze your source code and runtime behavior. In essence, CodeGuru is composed of two main services:

- **Amazon CodeGuru Reviewer** – This service automates code reviews by analyzing your code (typically as part of pull requests or full repository scans) and then providing actionable recommendations to fix bugs, improve code quality, and address potential security vulnerabilities.
- **Amazon CodeGuru Profiler** – This service continuously profiles your running applications, identifies the “most expensive” lines of code (e.g., those causing performance bottlenecks), and offers guidance on how to optimize your application's performance and reduce compute costs.

In addition, there is an aspect of **CodeGuru Security** (which builds upon the Reviewer service) that focuses specifically on detecting security issues in your code through static analysis, using advanced ML models trained on AWS security best practices.

## 2. Amazon CodeGuru Reviewer

**What It Does:**

- Analyzes code changes submitted via pull requests or through repository scans.
- Detects hard-to-find bugs, identifies deviations from coding best practices, and highlights security vulnerabilities.
- Uses machine learning models that have been trained on millions of code reviews (both from open source and internal Amazon codebases).

**How It Works:**

- When a repository is associated with CodeGuru Reviewer (via integration with GitHub, AWS CodeCommit, Bitbucket, or GitLab), the service automatically initiates a review when code changes occur.
- The service securely clones the repository into an ephemeral, sandboxed container (often an AWS ECS Fargate instance with VM‐level isolation) to perform its analysis.
- Once the analysis is complete, it returns recommendations as inline comments on the pull request and stores a history of the code review.

## 3. Amazon CodeGuru Profiler

**What It Does:**

- Continuously monitors your application’s performance in production.
- Identifies which parts of your code consume the most CPU or take the most time (commonly visualized through flame graphs).
- Provides recommendations on how to optimize inefficient code paths—helping reduce both latency and compute costs.

**How It Works:**

- A lightweight profiling agent runs within your application (whether on Amazon EC2, container services like Amazon ECS/EKS, AWS Lambda, or even on-premises).
- The agent periodically samples performance data (typically every five minutes) and securely transmits it to the CodeGuru Profiler service.
- The collected data is aggregated and presented through an interactive console that displays flame graphs and detailed performance metrics, along with specific optimization recommendations.

## 4. Amazon CodeGuru Security

**What It Does:**

- While originally a component of CodeGuru Reviewer, CodeGuru Security is now positioned as a rearchitected service dedicated to static application security testing (SAST).
- It leverages both machine learning and program analysis to scan your code for security vulnerabilities such as hardcoded credentials, injection flaws, and other issues defined by standards like the OWASP Top Ten and CWE Top 25.

**Key Features:**

- **High Precision Detection:** Uses advanced ML models and hundreds of detectors to reduce false positives.
- **Automated Remediation:** Provides detailed, actionable recommendations along with potential inline code fixes.
- **Integration with Developer Workflows:** Can be integrated into CI/CD pipelines, and it supports multiple languages and repository types.

## 5. Integration and Workflow

**Repository and CI/CD Integration:**

- CodeGuru services can be integrated directly with your code repositories such as GitHub, GitHub Enterprise, AWS CodeCommit, Bitbucket, and GitLab.
- They also work seamlessly with continuous integration pipelines, so you can automatically trigger code reviews on pull requests or run full repository scans.
- Additionally, IDE integrations and plugins are available for environments like Visual Studio Code, JetBrains IDEs, and notebook platforms (e.g., JupyterLab, Amazon SageMaker Studio).

## 6. Conclusion

For the most up-to-date and comprehensive information, always refer to [Amazon CodeGuru Documentation](https://docs.aws.amazon.com/codeguru/).

