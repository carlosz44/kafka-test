const kafka = require("kafka-node");

const TOPIC_NAME = "test-app";
const messages1 = [
  "The IT Crowd",
  "The Office",
  "The Simpsons",
  "Curb your Enthusiasm",
];
const messages2 = [
  "Pulp Fiction",
  "Interstellar",
  "Funny Games",
  "Kill Bill",
  "Suspiria",
];

const client = new kafka.KafkaClient({ kafkaHost: "localhost:9093" });
client.createTopics(
  [
    {
      topic: TOPIC_NAME,
      partitions: 1,
      replicationFactor: 1,
    },
  ],
  (error, data) => console.log(error, data)
);
const consumer = new kafka.Consumer(client, [{ topic: TOPIC_NAME }]);
const producer1 = new kafka.Producer(client);
const producer2 = new kafka.Producer(client);

consumer.on("message", (message) => console.log(message));

[
  { producer: producer1, messages: messages1 },
  { producer: producer2, messages: messages2 },
].forEach((element) => {
  element.producer.on("ready", () => {
    const interval = setInterval(
      () =>
        element.producer.send(
          [
            {
              topic: TOPIC_NAME,
              messages:
                element.messages[
                  Math.floor(Math.random() * element.messages.length)
                ],
            },
          ],
          (error, data) => console.log(error, data)
        ),
      1000
    );
    setTimeout(() => {
      clearInterval(interval);
    }, 20000);
  });
});
