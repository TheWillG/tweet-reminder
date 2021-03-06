# Tweet Reminder

Web app microservice for inputting details to receive a tweet reminder at a later time.
![App Photo](https://github.com/TheWillG/tweet-reminder/blob/master/docs/tweet-reminder.png)

# Pre-reqs
To build and run this app locally you will need node:
- Install [Node.js](https://nodejs.org/en/)

# Getting started
Install dependencies
```
cd <project_name>
npm i
```
Build the project (compile TypeScript + create Docker image)
```
npm run docker
```
Run docker-compose (rabbitmq, mongodb, & tweet-reminder-webapp)
```
docker-compose up
```
The web app can be accessed on `localhost:8080`

The RabbitMQ management dashboard can be accessed on `localhost:15672`

And MongoDB can be accessed via Compass on `localhost:27018`

# Messaging Output
This microservice will output the following schema to RabbitMQ:
```
// AMQP_BROKER_URL=amqp://localhost:5672
// AMQP_EXCHANGE_NAME=TwitterReminder
// AMQP_EXPORT_QUEUE_NAME=webappexportqueue
{
  'handle': 'myTwitterHandle',
  'datetime': '2011-10-05T14:48:00.000Z', //DateTime ISO String
  'msg': 'Scheduled message!'
}
```
