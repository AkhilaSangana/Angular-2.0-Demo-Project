import { Injectable } from '@angular/core';

@Injectable()
export class MessageService {

  messages :string []=[];
  
  constructor() { }

  add(message:string){
    return this.messages.push(message);
  }

  clear(){
    return this.messages=[];
  }

}
