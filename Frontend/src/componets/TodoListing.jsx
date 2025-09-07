import { TodoComponent } from "../Pages/TodoCompents";
import { Head } from "../Pages/Head";
import { useCallback, useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import axios from "axios";

export const TodoListing =  () => {
  useEffect(()=>{
    const fetchTodos = async ()=>{
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3000/todos",{
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
      console.log(response.data);
      
      setAllTodos(response.data)
    }
    fetchTodos()
  },[])
  const [title, setTitle] = useState("");
  const [allTodos, setAllTodos] = useState([]);

  const addTodo =useCallback( async () => {
    const token = localStorage.getItem("token")
    const response = await axios.post("http://localhost:3000/todos", { title },
      {
        headers:{
          Authorization:`Bearer ${token}`,
        }
      }
    );

  setAllTodos((prevTodos) => [...prevTodos, response.data]);
  setTitle("");
    
  },[]);

  const deleteTask =useCallback( async (index, id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3000/todos/${id}`,{
          headers:{
           Authorization:`Bearer ${token}`
      }
      });
      setAllTodos((prevTodos)=>{prevTodos.filter((todo)=>todo._id!==id)})
      
    } catch (error) {
      console.log("error deleting todo", error);
    }
  },[]);
  return (
    <div>
      <Head label={"TO DO LIST"}></Head>
      <TodoComponent
        placeholder={"Enter a Title"}
        onClick={addTodo}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      ></TodoComponent>
      <div className="pt-2">
        {Array.isArray(allTodos) && allTodos.map((currIteam, index) => {
          return (
            <div
              key={index}
              className="flex items-center justify-between text-left pl-6 pr-6 py-2 border-b"
            >
              <p className="">{currIteam.title}</p>
              <button onClick={() => deleteTask(index, currIteam._id)}>
                <MdDelete size={20} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
