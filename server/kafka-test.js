var kafka = require("kafka-node");

const client = new kafka.KafkaClient({kafkaHost: "196.216.167.190:9092"});
const admin = new kafka.Admin(client);
admin.listTopics((err, res) => {
  console.log("topics", res);
});

// KAFKA_BROKER_HOST=196.216.167.190:9092