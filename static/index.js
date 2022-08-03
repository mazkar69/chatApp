const send = document.querySelector(".send");
const chatBox = document.querySelector(".chatBox");
const topName = document.querySelector(".user-name");

var socket = io();

this.user_name = prompt("Enter you name")               
socket.emit("new_user_connect",this.user_name);
topName.innerText = this.user_name;         //Set the Name on the top 

const currentTime = ()=>{
    const date = new Date();
    let hr = date.getHours();
    let min = date.getMinutes();
    return `${hr}:${min}`;
}



const appendmsg = (msg,pos,userName)=>{

    let name = document.createElement("span");
    name.classList.add("badge","name","bg-dark")
    name.innerText = userName;

    let date  = document.createElement("span");
    date.classList.add("badge","time","bg-grey")
    date.innerText = currentTime();

    let message = document.createElement("div")
    message.classList.add("message")
    message.classList.add(pos)
    message.innerHTML = msg;

    message.appendChild(name);
    message.appendChild(date);

    chatBox.appendChild(message); 
    

    
}

socket.on("recived_msg",(msg,userName)=>{
    appendmsg(msg,"left",userName);

})





send.addEventListener("click",(e)=>{
    e.preventDefault();
    const msg = document.querySelector(".text-msg");
    const msgtext = (msg.value);
    // socket.emit('chat message',msgtext);
    appendmsg(msgtext,"right","You");
    socket.emit("chat_message",msgtext,this.user_name);
    msg.value = "";
    chatBox.scrollTop =chatBox.scrollHeight;

})