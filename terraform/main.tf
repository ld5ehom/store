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
  region = "us-west-1"

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
  # ID(aws)
  uid = "ld5ehom"

  # IP check : (https://www.myip.com/) + /32
  myips = [
    "75.82.210.30/32"
  ]

  # Enter the API ID value of API Gateway. ( NOT Resource ID )
  api_gateway_id = ""
}
