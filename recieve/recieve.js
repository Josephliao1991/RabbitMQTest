var amqp = require('amqplib/callback_api');
// Setting up is the same as the sender; we open a connection and a channel, and declare the queue from which we're going to consume. Note this matches up with the queue that sendToQueue publishes to.

amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var queue = 'hello';

    ch.assertQueue(queue, {durable: false});

    // Note that we declare the queue here, as well. Because we might start the receiver before the sender, we want to make sure the queue exists before we try to consume messages from it.

    // We're about to tell the server to deliver us the messages from the queue. Since it will push us messages asynchronously, we provide a callback that will be executed when RabbitMQ pushes messages to our consumer. This is what Channel.consume does.

    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
    ch.consume(queue, function(msg) {
      console.log(" [x] Received %s", msg.content.toString());
    }, {noAck: true});

  });
});
