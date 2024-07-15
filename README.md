# Ucla Store Website (BackEnd) 
- ld5ehom.github.io/portfolio/
- ld5ehom@gmail.com 
- https://www.linkedin.com/in/ld5ehom

### Project Overview
```angular2html
- This project is an online store developed using Spring Boot and AWS services, employing a microservices architecture (MSA) for scalable and efficient performance.
- Designed and implemented a RESTful backend server enabling persistent storage in an online database using AWS services, including RDS for relational data, DynamoDB for NoSQL data (such as purchase history), and S3 for storage.
- Utilized AWS Lambda for serverless computing and Cognito for user authentication.
- Integrated AWS SNS, SQS, and SES for notifications, messaging, and email services.
- Utilized: Java/Spring, REST, IAM, RDS, DynamoDB, S3, Lambda, Cognito, SNS, SQS, SES
```


### Spring Boot Start
```angular2html
- AWS Corretto: https://docs.aws.amazon.com/corretto/latest/corretto-17-ug/downloads-list.html
- Spring initializr : https://start.spring.io/#!type=maven-project&language=java&platformVersion=3.2.2&packaging=jar&jvmVersion=17&groupId=com.store&artifactId=backend&name=backend&description=TaeWook%20store%20project&packageName=com.store.backend&dependencies=lombok,web
```

### Reference site
```angular2html
- Terraform : developer.hashicorp.com/terraform
- Terraform(plugin) : github.com/ohmyzsh/ohmyzsh/tree/master/plugins/terraform
- Terraform install : https://developer.hashicorp.com/terraform/tutorials/aws-get-start/install-cli
```

### AWS CLI
```angular2html
aws configure --profile default-long-term
us-west-1
```

### aws-mfa
```angular2html
which pip3
sudo ln -s /opt/homebrew/bin/pip3 /usr/local/bin/pip

pipx install aws-mfa
aws-mfa --version
aws-mfa --device arn:aws:iam::[MFA] --duration 86400 --profile default
```

### Terraform
```angular2html
terraform init
terraform apply -auto-approve
terraform destroy
```
```angular2html
- Deploy
sam build --template-file /Users/teo/Desktop/store/template.yaml
sam deploy --stack-name store-backend --s3-bucket lambda-package-ld5ehom --capabilities CAPABILITY_IAM --region us-west-1 --template-file /Users/teo/Desktop/store/template.yaml
sam list endpoints --output json --stack-name store-backend --region us-west-1
```

### Code-server
```angular2html
- Install : https://coder.com/docs/code-server/latest/install#installsh 
ssh -i ~/Downloads/store.pem ec2-user@IP
```

```angular2html
brew service list
```

### * All AWS data is deleted after testing