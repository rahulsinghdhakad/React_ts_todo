import { AppBar, Button, Container, Stack, TextField, Toolbar, Typography } from "@mui/material"
import TodoItems from "./componenets/TodoItems"
import { useEffect, useState } from "react"
import { getData, setData } from "./features"

function App() {
  const [todos, setTodods] = useState<TodoItem[]>(getData())

  const [title, setTitle] = useState<string>("")

  useEffect(()=>{
    setData(todos);
  },[todos])

  const deleteHandler = (id: TodoItem["id"]) => {
    const newTodo=todos.filter((i)=> i.id!==id);
    setTodods(newTodo);
  };

  const completeHandler = (id: TodoItem["id"]) => {
    const newTodo=todos.map((i)=> {
      if(i.id===id) i.isCompleted=!i.isCompleted;
      return i;
    });
    setTodods(newTodo);
  };

  const sumbitHandler = () => {
    const newTodo: TodoItem = {
      title,
      isCompleted: false,
      id: Math.random() * 1000
    }
    setTodods(prev=> [...prev, newTodo])
    setTitle("");
  }

  const editHandler = (id: TodoItem["id"], title:string) => {
    const newTodo=todos.map((i)=> {
      if(i.id===id) i.title=title;
      return i;
    });
    setTodods(newTodo);
  };

  return (
    <>
      <Container maxWidth="sm" sx={{
        height: "100vh"
      }}>

        <AppBar position="static">
          <Toolbar>
            <Typography>todo app</Typography>
          </Toolbar>
        </AppBar>

        <Stack height={"75%"} direction={"column"} p={"10px 20px"} spacing={"1rem"}>

          {todos.map((i) => <TodoItems
            key={i.id}
            todo={i}
            completeHandler={completeHandler}
            deleteHandler={deleteHandler}
            isComplete={i.isCompleted}
            editHandler={editHandler}
          />)}
        </Stack>

        <TextField
          fullWidth
          value={title}
          label={"hello"}
          onChange={(e) => setTitle(e.target.value)} 
          onKeyDown={(e)=>{if(e.key=="Enter" && title!=="") sumbitHandler()}}/>

        <Button
          fullWidth
          disabled={title===""}
          onClick={() =>sumbitHandler()}
          variant="contained" sx={{
            margin: "10px 0"
          }}>
            ADD
          </Button>
      </Container>
    </>
  )
}

export default App
