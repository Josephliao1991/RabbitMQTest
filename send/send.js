var amqp = require('amqplib/callback_api');
var argv = require('optimist').argv;
// then connect to RabbitMQ server

/*
amqp.connect('amqp://localhost', function(err, conn) {});
// Next we create a channel, which is where most of the API for getting things done resides:

amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {});
});
// To send, we must declare a queue for us to send to; then we can publish a message to the queue:
*/
var times = argv.send_time

amqp.connect('amqp://localhost', function(err, conn) {

  conn.createChannel(function(err, ch) {
    var queue = 'hello';

    ch.assertQueue(queue, {durable: false});

    for (var i = 0; i < times; i++) {
        ch.sendToQueue(queue, new Buffer('Hello World!'+i));
    }

    console.log(" [x] Sent 'Hello World!'");

  });

  setTimeout(function() { conn.close(); process.exit(0) }, 500);

});
