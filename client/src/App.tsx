//import the outlet tag from the router-dom
import { Outlet } from "react-router-dom"




function App() {
 

  return (
    <>
      {/* handle every routes to load component in it  */}
      <Outlet /> 
    </>
  )
}

export default App
