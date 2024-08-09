import "./style.css";

$("#app").html(`
  <div>
    <h1>Chatroom</h1>

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
formElement.on("submit", (event: JQuery.SubmitEvent) => {
  event.preventDefault();

  const inputValue = inputElement.val();

  const listItem = $(`<li>${inputValue}</li>`);
  ulElement.append(listItem);
});
