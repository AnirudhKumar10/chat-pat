import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css'],
})
export class ChatBoxComponent implements OnInit {
  socket: SocketIOClient.Socket;
  constructor(
    private chat: ChatService,
    private auth: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.socket = io.connect();
    this.auth
      .getuserbyid({ user_id: this.route.snapshot.params.id })
      .subscribe(<Response>(data) => {
        this.name = data.name;
        this.reciver_id = data.id;
        this.chat
          .getMessages(this.reciver_id.toString(), {
            sender_id: localStorage.getItem('usr_id'),
          })
          .subscribe(<Response>(data) => {
            this.messages = data.msg;
          });
      });

    this.socket.on("msg", (data) => {
      if(data.rcv_id === this.sender_id){
        this.messages.push({
          msg: data.msg,
          sender_id: data.sender_id,
          rcv_id: data.rcv_id
        });
      }
    });
  }

  name = 'user';
  sender_id = localStorage.getItem('usr_id');
  reciver_id;
  messages;
  failed = false;

  sendMessage(msg) {
    this.messages.push({
      msg: msg.value,
      sender_id: this.sender_id,
      rcv_id: this.reciver_id,
    });
    this.chat
      .sendMessage({
        msg: msg.value,
        sender_id: this.sender_id,
        rcv_id: this.reciver_id,
      })
      .subscribe(<Response>(data) => {
        msg.value = '';
      });
  }
}
