output "api_invoke_url" {
  value = aws_api_gateway_deployment.deploy.invoke_url
}

output "api_key" {
  value       = aws_api_gateway_api_key.key.value
  description = "Use this key in x-api-key header"
  sensitive   = true
}

output "endpoints" {
  value = {
    review  = "${aws_api_gateway_deployment.deploy.invoke_url}review"
    contact = "${aws_api_gateway_deployment.deploy.invoke_url}contact"
  }
}
