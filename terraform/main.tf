terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "5.29.0"
    }
  }
}

provider "aws" {
  region = "us-west-1"

  default_tags {
    tags = {
      Name = local.name
    }
  }
}

provider "aws" {
  alias = "global"
  region = "us-east-1"

  default_tags {
    tags = {
      Name = local.name
    }
  }
}

locals {
  name = "store"
  s3_origin_id = "store_s3_origin"

  # TODO
  # ID(email)
  uid = "ld5ehom"

  # IP check : (https://www.myip.com/)
  myips = [
    "2603:8002:300:2e:109f:6d3a:a300:7033"
  ]

  # Enter the API ID value of API Gateway. ( NOT Resource ID )
  api_gateway_id = ""
}
