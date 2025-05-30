const socket = io();
const chat = document.getElementById('chat');
const usernameInput = document.getElementById('username');
const messageInput = document.getElementById('message');

function sendMessage() {
  const name = usernameInput.value.trim();
  const message = messageInput.value.trim();
  if (name && message) {
    const now = new Date();
    const time = now.toLocaleTimeString(); // e.g., 10:25:03 AM
    socket.emit('chat message', { name, message, time });
    messageInput.value = '';
  }
}

socket.on('chat message', (data) => {
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML = `
    <span class="username">${data.name}</span>:
    ${data.message}
    <span class="timestamp">[${data.time}]</span>
  `;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
});
