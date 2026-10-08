var kafka = require("kafka-node");

// 196.216.167.190
const client = new kafka.KafkaClient({ kafkaHost: "196.216.167.190:9092" });

// const admin = new kafka.Admin(client);
// admin.listTopics((err, res) => {
//   console.log("topics", res);
// });

//create a topic
client.createTopics(
  [
    {
      topic: "test-topic",
      partitions: 1,
      replicationFactor: 2,
    },
  ],
  (error, result) => {
    // result is an array of any errors if a given topic could not be created
    if (error) {
      console.log("Error creating topic: ", error);
    } else {
      console.log("Topic created: ", result);
    }
  }
);

producer = new kafka.Producer(client);
producer.on("ready", function () {
  producer.send([{ topic: "test-topic", messages: "hi", partition: 0 }], function (err, data) {
    if (err) {
      console.log("Error producing: ", err);
    }
    console.log("Produced message: ", data);
  });
});

producer.on("error", function (err) {});

consumer = new kafka.Consumer(client, [{ topic: "test-topic", partition: 0 }], {
  autoCommit: false,
});

consumer.on('message', function (message) {
    console.log("got message: ", message);
});

consumer.on('error', function (error) {
    console.log("Got error: ", error);
});