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
    this.time = time.getHours() + ':' 
    + (time.getMinutes() >= 10 ? time.getMinutes() : '0' + time.getMinutes()) + ':' 
    + (time.getSeconds() >= 10 ? time.getSeconds() : '0' + time.getSeconds());
  }
  generateMessageHTML() {
    return `
    <div class="message">
        <h2>${this.user == undefined ? '' : this.user.name} ${this.time}</h2>
        <p>${this.text}</p>
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
  <input name="sendInp">
  <button type='button' class='sendBtn'>отправить</button>
</form>`;
sendFormDiv.innerHTML = sendFormHTML;

body.appendChild(sendFormDiv);


const sendButton = sendFormDiv.children[0].querySelector('.sendBtn');

sendButton.onclick = () => {
  let form = sendFormDiv.firstChild;

  messageList.push(new Message(undefined, form.elements.sendInp.value))

  messagesDiv.innerHTML += messageList[messageList.length - 1].generateMessageHTML();

  form.elements.sendInp.value = '';
  window.scrollBy(0,1000)
};


const userDiv = document.createElement('div');
userDiv.classList.add('userDiv');
body.prepend(userDiv);

let loginDiv = document.createElement('div');
loginDiv.classList.add('loginDiv');
userDiv.append(loginDiv);

let registerDiv = document.createElement('div');
registerDiv.classList.add('registerDiv');
userDiv.append(registerDiv);

loginDiv.innerHTML = '<p class="openLgn">login</p>'
registerDiv.innerHTML = '<p class="openRgs">register</p>'

let loginForm =`<form>
  <p></p>
  <input name="logInp"> логин
  <p></p>
  <input name="pasInp"> пароль
  <p></p>
  <button type='button' class='loginBtn'>войти</button>
</form>`;

loginDiv.querySelector('.openLgn').onclick = () => { 
  loginDiv.innerHTML += loginForm;

  loginDiv.querySelector('.loginBtn').onclick = () => {
    let form = loginDiv.querySelector('form');
    
    
    console.log(userLogin(form.logInp.value, form.pasInp.value)); 
  };

};

function userLogin(login, pass) {
  if (login == '') {
    return 'error 1';
  }

  if (pass == '') {
    return 'error 2';
  }

  console.log(login + ' ' + pass)
  if (messageList.find(user => user.name === login && user.password === pass)) {
    return 'успешный вход';
  }

  return 3;
}