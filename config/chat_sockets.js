module.exports.chatSockets = function(socketServer){
    let io = require('socket.io')(socketServer,{
      cors:{
        origin:"*"
      }
    });
    
    io.sockets.on('connection',function(socket){
        console.log('new connection received',socket.id);
        socket.on('disconnect',function(){
            console.log('Socket disconnected');
        });

      // .on() detects an event sent by client in this case is to join chat room
      socket.on('join_room',function(data){
         console.log('joining request rec',data);

         socket.join(data.chatroom);

         io.in(data.chatroom).emit('user_joined',data); // letting others know you jined chatroom
      });

      // CHANGE :: detect send_message and broadcast to everyone in the room
      socket.on('send-message',function(data){
        io.in(data.chatroom).emit('receive_message',data);
      });
    });
}
