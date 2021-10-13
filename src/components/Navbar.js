import { NavLink } from "react-router-dom";



export default function Navbar() {

  return (
    <header className="bottom-0 w-full h-screen ">
    <div className="block fixed inset-x-0 bottom-0 z-10 shadow">
      <div className="border-solid container mx-auto flex justify-between">
      
        <nav className="flex">
          <NavLink
            to="/"
            exact
            activeClassName="text-cl2"
            className="flex flex-col justify-center items-center px-3 mr-4 text-black-500 hover:text-red-800 text-4xl font-bold cursive tracking-widest"

          >
            greenScan
          </NavLink>
          <NavLink
            to="/WebCam"
            className="inline-flex items-center py-3 px-3 my-6 rounded text-black-500 hover:text-red-800"
            activeClassName="text-blue-100 bg-black-700"
          >
            Scanner
          </NavLink>
          <NavLink
            to="/RecycleSymbols"
            className="inline-flex items-center py-3 px-3 my-6 rounded text-black-500 hover:text-red-800"
            activeClassName="text-blue-100 bg-black-700"
          >
            Materials
          </NavLink>
          <NavLink
            to="/contact"
            className="inline-flex items-center py-3 px-3 my-6 rounded text-black-500 hover:text-red-800"
            activeClassName="text-blue-100 black-700"
          >
            Contact
          </NavLink>
          <div className="max-w-6xl  mx-auto px-4 py-10 md:py-20">
            <div className="flex  md:flex-row justify-between items-center">
          

             
            </div>
          </div>

        </nav>
        <div className=" align-baseline py-6 px-6 my-8">
       </div>
        </div>
      </div>
    </header>
  );
}
