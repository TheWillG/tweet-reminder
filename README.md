# Tweet Reminder

Web app microservice for inputting details to receive a tweet reminder at a later time.


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