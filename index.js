var express = require('express')
var app = express()
var path = require('path')
var server = require("http").Server(app)
var io = require("socket.io")(server)
var PORT = process.env.PORT || 3000
//socket.io
var channels = new Array();
io.sockets.on("connection", function(socket){
    socket.data = {}
    console.log("client is connected: "+socket.id)
    socket.emit("sv_login", socket.id)
    socket.on("sv_init_game", function(data) {
        var channel = null;
        if( channels.length == 0 ){
            channel = generate();
            socket.join(channel);
            channels.push(channel)
        }
        else{
            channel = channels[0]
            socket.join(channel);
            channels = channels.filter(e => e !== channel)
            io.sockets.in(channel).emit("sv_ready_play", socket.id)
        }
        socket.data.channel = channel;
        console.log(socket.id + " join channel " + channel)
    })
    socket.on("client_generate_heap", function(heaps) {
        socket.broadcast.to(socket.data.channel).emit('sv_generate_heap', heaps);
    })
    socket.on("client_select_item", function(location) {
        console.log(location)
        socket.broadcast.to(socket.data.channel).emit('sv_select_item', location);
    })
    socket.on('disconnect', function() {
      console.log("client is disconnect: " + socket.id);
      if ( !socket.data.channel  ) return
      var channel = socket.data.channel
      channels = channels.filter(e => e !== channel)
   });
})

//
app.use('/dist', express.static('dist'))
app.use('/assets', express.static('assets'))
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'))
});

function run(options) {
    console.log('Start express!'); 
    server.listen(PORT);
}

run.prototype.apply = function(compiler) {
  compiler.plugin('done', function() {
    console.log('Nim game listening on port ' + PORT); 
  });
};
var ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

var ID_LENGTH = 8;

var generate = function() {
  var rtn = '';
  for (var i = 0; i < ID_LENGTH; i++) {
    rtn += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
  }
  return rtn;
}

module.exports = run;
