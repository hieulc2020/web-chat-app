import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private url = 'http://localhost:3000';
  
  private socket;

  constructor() { 
    this.socket = io(this.url);
    let content = {
      "username": "SYSTEM",
      "groupName": localStorage.getItem("currentGroup"),
      "channelName": localStorage.getItem("currentChannel"),
      "message": localStorage.getItem("username") + " has joined the chat"
    }
    this.socket.emit('new-message', content);
  }

  public sendMessage(username:string, groupName:string, channelName:string, message:string) {
    console.log("Sending: " + message);
    let content = {
      "username": username,
      "groupName": groupName,
      "channelName": channelName,
      "message": message
    }
    this.socket.emit('new-message', content);
  }

  public getMessages = () => {
    return Observable.create((observer) => {
      this.socket.on('message', (content) => {
        console.log('Received message:')
        console.log(content);
        observer.next(content);
      });
    });
  }
}
