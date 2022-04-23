"use strict";

class User {
  constructor(name = '', password = '', rndField = 'defolt rnd info') {
    this.name = name;
    this.pass = password;
    this.rndField = rndField;
  }
}
class Message {
  constructor(user = null, text = '') {
    this.user = user;
    this.text = text;
    let time = new Date();
    this.time = time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds();
  }
  generateMessageHTML() {
    return `
    <div class="message">
        <h2>${this.user == undefined ? '' : this.user.name} ${this.time}</h2>
        <p>${this.text}</p>
        <button type='button' class='btn'>кнопка</button>
    </div>
  `;
  }
}

let user1 = new User("default1",'123');
let user2 = new User("default2",'pass');

let messageList = [];
messageList.push(new Message(user1, "сообщение 1"));
messageList.push(new Message(user2, "сообщение 2 и так далее"));
messageList.push(new Message(undefined, "сообщение без юзера"));


const body = document.body;


let messageHTML = messageList.map(message => {
  return message.generateMessageHTML();
}).join('');


const messagesDiv = document.createElement('div');
messagesDiv.classList.add('messages');

messagesDiv.innerHTML = messageHTML;

body.appendChild(messagesDiv);


const sendFormDiv = document.createElement('div');
sendFormDiv.classList.add('sendForm');

let sendFormHTML = `<form>
  <input name="one" value="1">
  <button type='button' class='sendBtn'>кнопка</button>
</form>`;
sendFormDiv.innerHTML = sendFormHTML;

body.appendChild(sendFormDiv);


const sendButton = sendFormDiv.children[0].querySelector('.sendBtn');

sendButton.onclick = () => {
  let form = sendFormDiv.firstChild;

  console.log(form);
  messageList.push(new Message(undefined, 'sss'))

  messagesDiv.innerHTML += messageList[messageList.length - 1].generateMessageHTML();

  sendButton.scrollIntoView(false)
};