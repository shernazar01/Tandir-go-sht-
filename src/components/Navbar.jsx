import { useState } from "react";


function Navbar(){

  const [open,setOpen] = useState(false);


  return(
    <header className="navbar">

      <div className="container nav-container">


        <div className="logo">
          🍖 Jarqo'rg'on Tandir
        </div>



        <div 
        className="hamburger"
        onClick={()=>setOpen(!open)}
        >
          ☰
        </div>



        <nav className={open ? "active" : ""}>

          <a href="#home">
            Bosh sahifa
          </a>

          <a href="#about">
            Biz haqimizda
          </a>

          <a href="#menu">
            Menyu
          </a>

          <a href="#gallery">
            Galereya
          </a>

          <a href="#reviews">
            Fikrlar
          </a>

          <a href="#contact">
            Aloqa
          </a>

        </nav>


      </div>

    </header>
  )

}


export default Navbar;