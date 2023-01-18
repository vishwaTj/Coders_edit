// class chatEngine{
//    constructor(chatBoxId,userEmail){
//     this.chatBox = $(`#${chatBoxId}`);
//     this.userEmail = userEmail;
//     // from the cdn js which we have copied it gaves us a global variable io
//     this.socket  = io.connect('http://localhost:5000');
//     if(this.userEmail){
//         this.connectionHandler();
//     }

//    }

//    connectionHandler(){
//     let self =this;
//     // this.socket = io('http://localhost:5000', { transports: ['websocket'] });
//     this.socket.on('connect',function(){
//         console.log('connection established using sockets');
       
//        // sending a request to join the chat room (so taht we nknow the user is online) 
//        self.socket.emit('join_room',{
//          user_email: self.userEmail,
//          chatroom:'codeial'
//        });

//        // knowing if some user joins a chat room
//        self.socket.on('user_joined',function(data){
//          console.log('a user joined',data);
//        })
        
//     });

//     // CHANGE :: send a message on clicking the send message button
//     $('#send-message').click(function(){
//         let msg = $('#chat-message-input').val();
//         console.log(msg);
//         if(msg!=''){
//           self.socket.emit('send_mesage',{
//             message: msg,
//             user_email: self.userEmail,
//             chatroom:'codeial'
//           });
//         }
//     });

//     self.socket.on('receive_message',function(data){
//        console.log('message recieved', data.message);

//        let newMessage = $('<li>');

//        let messageType = 'other-message';
       
//        if(data.user_email == self.userEmail){
//          messageType = 'self-message';
//        }
//        newMessage.append($('<span>',{
//         'html':data.message
//        }));

//        newMessage.addClass(messageType);

//        $('#chat-messages-list').append(newMessage);
//     })

//    }
// }

class chatEngine{
  constructor(chatBoxId, userEmail,userName){
      this.chatBox = $(`#${chatBoxId}`);
      this.userEmail = userEmail;
      this.userName=userName;
      console.log(userName);
      // from the cdn js which we have copied it gaves us a global variable io
      this.socket = io.connect('http://localhost:5000');

      if (this.userEmail){
          this.connectionHandler();
      }
  }

  connectionHandler(){
      let self = this;
      this.socket.on('connect', function(){
          console.log('connection established using sockets...!');
      let time_ = new Date().getTime();     

          // sending a request to join the chat room (so taht we know the user is online) 
          self.socket.emit('join_room',{
                user_email : self.userEmail,
                user_name : self.userName,
                time: time_,
                chatroom : 'Coders_edit'
            });

            // knowing if some user joins a chat room
            self.socket.on('user_joined', function(data){
                console.log('a user joined!!',data);
            })
        });

        // Change :: send a msz on clicking the send msz
        $('#send-message').click(function(){
            let msg = $('#chat-message-input').val();
            console.log(msg);
            if(msg != ''){
                self.socket.emit('send-message',{
                    message: msg,
                    user_name: self.userName,
                    user_email: self.userEmail,
                    time : self.time_,
                    chatroom: 'Coders_edit'
                });
            }
        });

        self.socket.on('receive_message', function(data){
            console.log('message recevied',data);
            
            let newMessage = $('<li>');

            let messageType = 'other-message';

            if(data.user_email == self.userEmail){
              messageType = 'self-message';
            }

            newMessage.append($('<h12>',{
                'html' : data.user_name
            }));


            newMessage.append($('<span>',{
                'html' : data.message
            }));


            newMessage.addClass(messageType);

            $('#chat-messages-list').append(newMessage);
        })

    }
}