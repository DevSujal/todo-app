import { useState } from "react";
import { useTodo } from "../assets/context";

function TodoItem({ todo }) {
  const { updateTodo, removeTodo, toggleComplete } = useTodo();

  const [isTodoEditable, setIsTodoEditable] = useState();
  const [todoMsg, setTodoMsg] = useState(todo.todoTitle);

  const editTodo = () => {
    updateTodo(todo.id, { ...todo, todoTitle: todoMsg });
  };

  const toggleCompleted = () => {
    toggleComplete(todo.id);
  };
  return (
    <div
      className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${
        todo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
      }`}
    >
      <input
        type="checkbox"
        className="rounded-full cursor-pointer transform scale-150 translate-y-3 translate-x-1"
        checked={todo.completed}
        onChange={toggleCompleted}
      />
      <input
        type="text"
        className={`border outline-none w-full bg-transparent rounded-lg ${
          isTodoEditable ? "border-black/10 px-2" : "border-transparent"
        } ${todo.completed ? "line-through" : ""}`}
        value={todoMsg}
        onChange={(e) => setTodoMsg(e.target.value)}
        readOnly={!isTodoEditable}
      />
      {/* Edit, Save Button */}
      <button
        className="inline-flex w-8 h-8 text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50 rounded-full transform translate-y-1"
        onClick={() => {
          if (todo.completed) return;

          if (isTodoEditable) {
            editTodo();
          }
          setIsTodoEditable((prev) => !prev);
        }}
        disabled={todo.completed}
      >
        {isTodoEditable ? "📁" : "✏️"}
      </button>
      {/* Delete Todo Button */}
      <button
        className="inline-flex w-8 h-8 rounded-full text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 transform translate-y-1"
        onClick={() => removeTodo(todo.id)}
      >
        ❌
      </button>
    </div>
  );
}

export default TodoItem;
