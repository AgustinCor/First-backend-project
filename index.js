// npm init -y 
// git init
//create .gitignore
//poner node-modules en .gitignore
// hacer nodemon npm -D nodemon
const express =require("express");
const path=require("path");
const fs=require("fs/promises");

const app=express();

app.use(express.json());

const jsonPath=path.resolve("./file/todos.json");

app.get("/tasks",async(req,res)=>{
   const jsonFile=await fs.readFile(jsonPath,"utf-8");
    res.send(jsonFile);
});

app.post("/tasks",async(req,res)=>{
   const todo=req.body;
   const todosArray=JSON.parse(await fs.readFile(jsonPath,"utf-8"));

   const lastIndex=todosArray.length -1;
   const newId=todosArray[lastIndex].id +1;
   
   todosArray.push({...todo,id:newId});
   await fs.writeFile(jsonPath,JSON.stringify(todosArray));
   res.end()
});

app.put("/tasks",async(req,res)=>{
  const {status,id}=req.body;
  const todosArray=JSON.parse(await fs.readFile(jsonPath,"utf-8"));
  const todoIndex=todosArray.findIndex(todo => todo.id === id);

  todosArray[todoIndex].status=status;

  await fs.writeFile(jsonPath,JSON.stringify(todosArray));
  res.end();
});

app.delete("/tasks",async(req,res)=>{
  const {id}=req.body;
  const todosArray=JSON.parse(await fs.readFile(jsonPath,"utf-8"));
  const todoIndex=todosArray.findIndex(todo => todo.id === id);
  todosArray.splice(todoIndex,1);
  await fs.writeFile(jsonPath,JSON.stringify(todosArray));
  res.end();
});

const PORT=8000;

app.listen(PORT)

console.log(`Hello world corriendo en el puerto ${PORT}`)

