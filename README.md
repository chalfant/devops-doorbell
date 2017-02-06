# DevOps Doorbell

Serverless backend for AWS IoT button. When the button is pressed, the handler.button is fired. It calls Twilio to send text messages to all numbers (space separated) in the TO_PHONE environment variable.

See .env.example for required environment variables.

* https://aws.amazon.com/iotbutton/
* https://serverless.com/
* https://www.twilio.com/
