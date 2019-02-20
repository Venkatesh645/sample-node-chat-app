const express = require("express");
const app = express();
const util = require('util');

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index');
});

const server = app.listen(3000, () => {
  console.log('server started in 3000');
  const io = require("socket.io")(server);

  io.on('connection', (socket) => {
    console.log('=====================');
    console.log('New User connected');
    console.log(`socket =>${util.inspect(socket)}`);
    console.log('=====================');

    socket.on('change_username', (data) => {
      socket.username = data.username;
    })

    //listen on new_message
    socket.on('new_message', (data) => {
      //broadcast the new message
      console.log()
      console.log(`new_message  message=>${util.inspect(data)}`)
      console.log(`socket obj => ${util.inspect(socket)}`)
      console.log()
      io.sockets.emit('new_message', { message: data.message, username: socket.username });
    });

        //listen on typing
    socket.on('typing', (data) => {
    	socket.broadcast.emit('typing', {username : socket.username})
    })

  })


});
