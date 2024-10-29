import { Delete, Edit } from "@mui/icons-material"
import { Button, Checkbox, Paper, Stack, TextField, Typography } from "@mui/material"
import { useState } from "react"

type PropType = {
  todo: TodoItem,
  deleteHandler: (id: TodoItem["id"]) => void,
  completeHandler: (id: TodoItem["id"]) => void,
  isComplete: boolean,
  editHandler:(id:TodoItem["id"],title:string)=>void
}


const TodoItems = ({ todo, deleteHandler, completeHandler, isComplete, editHandler }: PropType) => {
  const [edit, setEdit] = useState<boolean>(false)
  const [title, setTitle] = useState<string>(todo.title)
  return (
    <Paper sx={{ padding: "1rem" }}>

      <Stack direction={"row"} spacing={"1rem"} alignItems={"center"} justifyContent={"center"}>

        {
          edit ?
            <TextField
              fullWidth 
              value={title}
              onChange={(e) => setTitle(e.target.value)} 
              onKeyDown={(e)=>{
                if(e.key=="Enter" && title!==""){
                  editHandler(todo.id,title);
                  setEdit(false);
                } 
              }}/> :

            <Typography width={"100%"} padding={"0 1rem"}>{todo.title}</Typography>
        }

        <Checkbox checked={isComplete} onChange={() => completeHandler(todo.id)} />

        <Button color="secondary" onClick={() => deleteHandler(todo.id)}> <Delete /> </Button>

        <Button color="secondary" onClick={() => setEdit(prev => !prev)}> <Edit /> </Button>

      </Stack>
    </Paper>
  )
}

export default TodoItems
