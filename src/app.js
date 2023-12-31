import { render } from "./render.js";

//getting the dom node in which we will append our code from js

const app = document.getElementById("app");

//now we will define a state

const state = {
  todos: [],
};

//now the next thing is we have to render or view based on state in UI
//we will create a function then from that we will return the UI based on out state

const template = () => {
  return `<div class = "mt-20">
    <div class='flex justify-center items-center'>
      <input  type="text" class = "border border-black">
      <button class = "add-todo"> Add Todo </button>
    </div>
    ${
      !state.todos.length
        ? `<p class = "text-red-500">There is nothing to do!</p>`
        : `<ul>
            ${state.todos.map((todo) => `<li>${todo.task}</li>`).join("")}
          </ul>`
    }
  </div>`;
};

//when we will call this function it will return UI based of state

//now we need a function by which we can render our UI generated by template, i.e attach it in DOM

render(template(), app);

setTimeout(() => {
  state.todos = [...state.todos, { task: "yes yes yes" }];
  render(template(), app);
}, 3000);

setTimeout(() => {
  state.todos = [...state.todos, { task: "no no no" }];
  render(template(), app);
}, 8000);
