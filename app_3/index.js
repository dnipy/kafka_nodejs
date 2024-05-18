const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'app_3',
  brokers: ['localhost:9092']
});

const consumer = kafka.consumer({ groupId: 'app3-group' });

const runConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'events', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log('app-3 = ',{
        partition,
        offset: message.offset,
        value: message.value.toString()
      });
    },
  });
};

runConsumer().catch(console.error);