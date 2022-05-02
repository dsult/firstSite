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
        <h2>${this.user == null ? '' : this.user.name} ${this.time}</h2>
        <p>${this.text}</p>
    </div>
  `;
  }
}

let currentUser = null;

let userList = [];
let user1 = new User("default1",'123');
let user2 = new User("default2",'pass');
userList.push(user1)
userList.push(user2)

let messageList = [];
messageList.push(new Message(user1, "сообщение 1"));
messageList.push(new Message(user2, "сообщение 2 и так далее"));
messageList.push(new Message(currentUser, "сообщение без юзера"));


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
  <button type='button' class='sendButton'>отправить</button>
</form>`;
sendFormDiv.innerHTML = sendFormHTML;

body.appendChild(sendFormDiv);


const sendButton = sendFormDiv.children[0].querySelector('.sendButton');

sendButton.onclick = () => {
  let form = sendFormDiv.firstChild;

  messageList.push(new Message(currentUser, form.elements.sendInp.value))

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

let currentUserStatusDiv = document.createElement('div');
currentUserStatusDiv.classList.add('currentUserStatusDiv');
userDiv.append(currentUserStatusDiv);

let exitButtonDiv = document.createElement('div');
exitButtonDiv.classList.add('exitButtonDiv');
userDiv.append(exitButtonDiv);
exitButtonDiv.innerHTML = '<button class="exitButton">выйти</button>';
exitButtonDiv.style.display = 'none';

loginDiv.innerHTML = '<p class="openLgn">login</p>'
registerDiv.innerHTML = '<p class="openReg">register</p>'

let loginForm =`<form>
  <p></p>
  <input name="logInp"> логин
  <p></p>
  <input name="pasInp"> пароль
  <p></p>
  <button type='button' class='loginButton'>войти</button>
</form>`;

loginDiv.querySelector('.openLgn').onclick = () => { 
  loginDiv.innerHTML += loginForm;

  loginDiv.querySelector('.loginButton').onclick = () => {
    let form = loginDiv.querySelector('form');
    
    switch (userLogin(form.logInp.value, form.pasInp.value)) {
      case 'error 1':
        // тут мог быть код для подсветки поля красным
        console.log('заполните поле логин');
        break;

      case 'error 2':
        console.log('заполните поле пароль');
        break;

      case 'error 3':
        console.log('пользователь не найден');
        break;

      case 'error 4':
        console.log('пароль неверный');
        break;
          
      case 'entre':
        registerDiv.style.display = 'none';
        loginDiv.style.display = 'none';
        form.logInp.value = null;
        form.pasInp.value = null;
        currentUserStatusDiv.innerHTML = 'вы вошли как ' + currentUser.name;
        exitButtonDiv.style.display = '';
        break;
      default:
        break;
    }

  };

  function userLogin(login, pass) {
    if (login == '') {
      return 'error 1';
    }

    if (pass == '') {
      return 'error 2';
    }
    let findUser = userList.find(user => user.name === login);
    if (findUser == undefined) {
      return 'error 3';
    }

    if (findUser.pass !== pass) {
      return 'error 4';
    }

    currentUser = findUser;
    return 'entre';
  }
};

let registerForm =`<form>
  <p></p>
  <input name="logInp"> логин
  <p></p>
  <input name="pasInp"> пароль
  <p></p>
  <input name="rndInp"> любое дополнительное поле
  <p></p>
  <button type='button' class='regButton'>зарегистрироваться</button>
</form>`;

registerDiv.querySelector('.openReg').onclick = () => { 
  registerDiv.innerHTML += registerForm;

  registerDiv.querySelector('.regButton').onclick = () => {
    let form = registerDiv.querySelector('form');
    switch (userRegister(form.logInp.value, form.pasInp.value, form.rndInp.value)) {
      case 'error 1':
        // тут мог быть код для подсветки поля красным
        console.log('заполните поле логин');
        break;

      case 'error 2':
        console.log('заполните поле пароль');
        break;

      case 'error 3':
        console.log('такой пользователь уже есть');
        break;

      case 'entre':
        registerDiv.style.display = 'none';
        loginDiv.style.display = 'none';
        exitButtonDiv.style.display = '';
        form.logInp.value = null;
        form.pasInp.value = null;
        form.rndInp.value = null;
        currentUserStatusDiv.innerHTML = 'вы зарегистрировались и вошли как ' + currentUser.name;
        break;

      default:
        break;
    }
  };
  function userRegister(login, pass, rndField) {
    if (login == '') {
      return 'error 1';
    }

    if (pass == '') {
      return 'error 2';
    }

    let findUser = userList.find(user => user.name === login);
    if (findUser !== undefined) {
      return 'error 3';
    }

    currentUser = new User(login, pass, rndField);
    return 'entre';
  }
};

exitButtonDiv.querySelector('.exitButton').onclick = () => {
  registerDiv.style.display = '';
  loginDiv.style.display = '';
  currentUserStatusDiv.innerHTML = '';
  exitButtonDiv.style.display = 'none';
  currentUser = null;
}