This is a [Apache Kafka](https://kafka.apache.org/) project built on [Docker](https://hub.docker.com/r/bitnami/kafka) with [`kafka-node`](https://www.npmjs.com/package/kafka-node).

## Getting Started

First, run the development server:

```bash
docker-compose up -d
```

This will create a Kafka environment at [http://localhost:9093](http://localhost:9093) for testing.

Then, install all dependencies and run the `index.js` file:

```bash
npm install
```

```bash
node index.js
```

This will create a new topic and start sending random messages from the two producers during 20 seconds. You can editing the behaviour by modifying `index.js` and running the `node index.js` again.
