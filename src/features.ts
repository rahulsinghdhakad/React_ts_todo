export const setData = (todos: TodoItem[]) => {
    localStorage.setItem("myTodos", JSON.stringify(todos))
}

export const getData = ()=>{
    const todos=localStorage.getItem("myTodos")
    return todos? JSON.parse(todos) : [];
}