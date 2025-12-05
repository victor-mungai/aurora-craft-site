variable "project_name" {
  type    = string
  default = "portfolio"
}

# Queue ARNs and URLs will be generated from created resources

variable "contact_queue_name" {
  type    = string
  default = "ContactSubmitQue"
}
variable "review_queue_name" {
  type    = string
  default = "SubmitReviewQues"
}
variable "contact_lambda_name" {
  type    = string
  default = "ContactProcessing"
}
variable "review_lambda_name" {
  type    = string
  default = "ReviewProcessing"
}

variable "rate_limit" {
  type    = number
  default = 10
}

variable "burst_limit" {
  type    = number
  default = 5
}

variable "region" {
  type    = string
  default = "us-east-1"
}
