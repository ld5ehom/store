# Store Management System (BackEnd)
## Project Overview
- This project is an online store developed using Spring Boot and AWS services, employing a microservices architecture (MSA) for scalable and efficient performance.
- Designed and implemented a RESTful backend server enabling persistent storage in an online database using AWS services, including RDS for relational data, DynamoDB for NoSQL data (such as purchase history), and S3 for storage.
- Utilized AWS Lambda for serverless computing and Cognito for user authentication.
- Integrated AWS SNS, SQS, and SES for notifications, messaging, and email services.
- Utilized: Java, Spring Boot, REST, RDS, DynamoDB, S3
------------------
## Milestones
- M1: Core Functionality Development (Completed)
- **M2: Integration with the store iOS app**
------------------

## Task List
### M1: Core Functionality Development (Completed)
- Implemented sign-up, login, and logout functionalities using AWS Cognito. 
- Added product registration features using AWS S3. 
- Added product purchase features using AWS DynamoDB (NoSQL). 
- Created tables in MySQL using AWS RDS.
- Implemented product information upload and search functionality using OpenSearch.


### M2: Integration with the store iOS app

**Integration with the store iOS app**
- **Status** : Not Started
- **Details** : Integrate the store iOS app with AWS


------------------
## Progress Tracking
- **Current Phase** : Integration with the store iOS app
- **Overall Progress** : M1: Core functionality development completed. Preparing for integration with the store iOS app.
------------------
## Reference Site
- AWS Corretto: https://docs.aws.amazon.com/corretto/latest/corretto-17-ug/downloads-list.html
- Spring initializr : https://start.spring.io/#!type=maven-project&language=java&platformVersion=3.2.2&packaging=jar&jvmVersion=17&groupId=com.store&artifactId=backend&name=backend&description=TaeWook%20store%20project&packageName=com.store.backend&dependencies=lombok,web
- Terraform : developer.hashicorp.com/terraform
- Terraform(plugin) : github.com/ohmyzsh/ohmyzsh/tree/master/plugins/terraform
- Terraform install : https://developer.hashicorp.com/terraform/tutorials/aws-get-start/install-cli
------------------
## Getting Started 
### - Homebrew
```angular2html
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```
### - InteliJ
```angular2html
https://www.jetbrains.com/idea/download/?section=mac
```
```angular2html
InteliJ Plugin_Marketplace
- Lombok
- AWS Toolkit
- Terraform and HCL
```

### - MySQL
```angular2html
brew services start mysql
```
### - Terraform
```angular2html
brew tap hashicorp/tap
brew install hashicorp/tap/terraform
```
```angular2html
Verify the installation : 
terraform -help
```

### - EC2 Code-server (Online VCS)
```angular2html
ssh -i ~/Downloads/store.pem ec2-user@ + EC2 Instance Public IPv4 address
Install :
teo@TaeWookui-Macmini store % curl -fsSL https://code-server.dev/install.sh | sh
teo@TaeWookui-Macmini store % sudo systemctl enable --now code-server@USER
teo@TaeWookui-Macmini store % code-server --install-extension ms-python.python
teo@TaeWookui-Macmini store % code-server --install-extension cweijan.vscode-mysql-client2

Password : 
cat ~/.config/code-server/config.yaml
```
```angular2html
- EC2-user code server : 
sudo yum install git
mkdir workspace
cd workspace/
git clone https://github.com/ld5ehom/store.git
```

### - SSH Tunneling (MySQL, RDS)
```angular2html
pip install mycli
```

### - AWS-mfa
```angular2html
which pip3
sudo ln -s /opt/homebrew/bin/pip3 /usr/local/bin/pip

pipx install aws-mfa
```

---------------------
## Setup
### - Terraform
```angular2html
- AWS EC2 Key pair :
ls .. 
ls ~/Downloads/store.pem 
    -> /Users/teo/Downloads/store.pem
chmod 400 ~/Downloads/store.pem 
```
```angular2html
- Terraform build : 
aws s3 ls
terraform init
    -> .terraform  // folder build
terraform apply -auto-approve  // terraform build 
```
```angular2html
- Terraform Deploy (install) : 
sam build --template-file /Users/teo/Desktop/store/template.yaml
sam deploy --stack-name store-backend --s3-bucket lambda-package-ld5ehom --capabilities CAPABILITY_IAM --region us-west-1 --template-file /Users/teo/Desktop/store/template.yaml
sam list endpoints --output json --stack-name store-backend --region us-west-1
```

### - AWS CLI
```angular2html
aws configure --profile default-long-term
us-west-1
```

------------------------
## Start !!! 
### - MySQL
```angular2html
teo@TaeWookui-Macmini store % mysql -u root -p
Enter password: store1!
```
```angular2html
mysql> show databases;
mysql> create database store;
mysql> use store;
mysql> show tables;
mysql> ALTER TABLE `user` MODIFY COLUMN `id` INT NOT NULL AUTO_INCREMENT;
```
```angular2html
mysql> insert into `user` (username, `password`) values ('ld5ehom', 'store1!');
mysql> select * from user;
mysql> select * from goods_item;

mysql> exit
Bye
```

----
### - AWS-mfa
```angular2html
aws-mfa --version
aws-mfa --device arn:aws:iam::654654590487:mfa/IAM --duration 129600 --profile default
```
```angular2html
mycli -u root -p'store1!' -h localhost store
```
----

### * All AWS data is deleted after testing