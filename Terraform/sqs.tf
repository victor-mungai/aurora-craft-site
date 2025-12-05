##########################################
# SQS Queues
##########################################
resource "aws_sqs_queue" "contact_queue" {
  name                      = var.contact_queue_name
  delay_seconds             = 0
  max_message_size          = 262144
  message_retention_seconds = 1209600
  receive_wait_time_seconds = 0
  visibility_timeout_seconds = 30
}

resource "aws_sqs_queue" "review_queue" {
  name                      = var.review_queue_name
  delay_seconds             = 0
  max_message_size          = 262144
  message_retention_seconds = 1209600
  receive_wait_time_seconds = 0
  visibility_timeout_seconds = 30
}