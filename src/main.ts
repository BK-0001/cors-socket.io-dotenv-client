import { io } from "socket.io-client";
import "./style.css";

const socket = io("http://localhost:8000");

let room = "1";

socket.emit("join-room", room);

$("#app").html(`
  <div>
    <div class="rooms">
      <button class="room-1">Join Room 1</button>
      <button class="room-2">Join Room 2</button>
    </div>

    <h1>Chatroom <span>${room}</span></h1>

    <ul>
      <li>demo message</li>
    </ul>

    <form>
      <input type="text" />
      <button>SEND</button>
    </form>
  </div>
`);

const formElement = $("form");
const inputElement = $("input");
const ulElement = $("ul");
const rooms = $(".rooms");
const span = $("span");

rooms.on("click", (event: JQuery.ClickEvent) => {
  const roomId = (event.target as HTMLButtonElement).className.split("-")[1];

  room = roomId;
  span.text(room);

  socket.emit("join-room", room);
});

formElement.on("submit", (event: JQuery.SubmitEvent) => {
  event.preventDefault();

  const inputValue = inputElement.val();

  const listItem = $(`<li>${inputValue}</li>`);
  ulElement.append(listItem);

  socket.emit("message", inputValue, room);
});

socket.on("message", (message) => {
  const listItem = $(`<li>${message}</li>`);
  ulElement.append(listItem);
});
