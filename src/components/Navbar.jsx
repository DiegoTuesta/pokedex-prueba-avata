import { useState } from "react"
import { Link } from "react-router-dom"

const Navbar = () => {

  const [dark, setDark] = useState(false)
  
  const modeDark = () => {
    document.documentElement.classList.toggle('dark')
    setDark(!dark)
  }
  return (
    <div className="navbar">
        <div className="navbar-half">
            <Link to={'/'} >
              <img src="/assets/img/pokeapi.svg" alt="pokeapi-diego-tuesta" />
            </Link>
            <div onClick={modeDark} className="navbar-central">
              <i className={ dark ? "fa-regular fa-sun fa-beat" : "fa-solid fa-moon fa-bounce"}></i>
            </div>
        </div>
    </div>
  )
}

export default Navbar