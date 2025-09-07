
import { BottomWarming } from "../Pages/BottomWarming";
import { TodoListing } from "./TodoListing";

function Dashboard() {


 

  // useEffect (()=>{
  //   axios.get("http:localhost:3000/find").then((res))
  // })
  return (
    <div className="flex justify-center bg-slate-300 h-screen ">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white p-2 h-max px-4 w-80 text-center">
          
           <TodoListing></TodoListing>
         
          <BottomWarming
            label={"Logout /"}
            to={"/sigin"}
            buttonText={"Logout"}
          ></BottomWarming>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
