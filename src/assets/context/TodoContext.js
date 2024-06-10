import { useContext } from "react";
import { createContext } from "react";


export const TodoContext = createContext({
    todos : [
        {
            id : 1,
            todoTitle : "Nothing To Do",
            completed : false
        }
    ],
    theme : "dark",
    addTodo : (todo) => {},
    removeTodo : (todoId) => {},
    updateTodo : (todoId, update) => {},
    toggleComplete : (todoId) => {},
    switchTheme : () => {}
})

export const TodoContextProvider = TodoContext.Provider


export const useTodo = () => {
    return useContext(TodoContext)
}

