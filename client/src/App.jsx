import { Outlet } from "react-router-dom";
import Menu from "./composants/Menu";

function App() {
  return (
    <div className="vh-100 container-fluid m-0 p-0">
        <Menu /> 
        <Outlet />
    </div>
  )
}

export default App