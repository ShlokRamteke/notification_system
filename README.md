## Real-Time Notification System

This project is a microservices-based real-time notification system built with Node.js and Express. The system handles high-volume message processing and delivers real-time notifications to users. It integrates message queues and implements real-time data streaming.

## Installtion

1. Clone the repository:

```
git clone https://github.com/ShlokRamteke/notification_system
cd notification-system
```

2. Install dependencies:

```
npm install

```

3. Setup enviromnet variables:

```
PORT=3000
SI_PORT=5000
JWT_SECRET=your_jwt_secret
MONGODB_URI=mongodb://localhost:27017/notification-system
RABBITMQ_URL=amqp://127.0.0.1:5672

```

4. Start the applciation:

```
node app.js
node services/real-time/server.js

```
