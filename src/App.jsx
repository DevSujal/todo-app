import { useEffect, useState } from "react";
import "./App.css";
import { TodoContextProvider, useTodo } from "./assets/context";
import { TodoForm, TodoItem } from "./components";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const todosLocal = setTodos(JSON.parse(localStorage.getItem("todos")));

    if (todosLocal && Array.isArray(todosLocal) && todosLocal.length > 0) {
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo) => {

    
    if(isExists(todo).length > 0) return
    

    setTodos((prev) => [
      
      {
        id: Date.now(),
        todoTitle: todo,
        completed: false,
      },
      ...prev
    ]);
  };

  const isExists = (todo) =>  todos.filter((oldTodo) => oldTodo.todoTitle === todo)

  const updateTodo = (todoId, todo) => {
    setTodos((prev) =>
      prev.map((oldTodo) => (oldTodo.id === todoId ? todo : oldTodo))
    );
  };

  const removeTodo = (todoId) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== todoId));
  };

  const toggleComplete = (todoId) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };
  return (
    <TodoContextProvider
      value={{
        todos,
        addTodo,
        toggleComplete,
        updateTodo,
        removeTodo,
      }}
    >
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            <TodoForm />{" "}
          </div>
          <div className="flex flex-wrap gap-y-3">
            {todos.map((todo) => (
              <div className="w-full" key={todo.id}>
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoContextProvider>
  );
}

export default App;
