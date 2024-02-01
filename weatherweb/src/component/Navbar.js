import{FaBars,FaTimes} from "react-icons/fa";
import{useRef} from "react";
import { Link } from 'react-router-dom';




function Navbar(){
    const navRef=useRef();


    const showNavbar=(e)=>{
        e.preventDefault();
        if (navRef.current) {
            navRef.current.classList.toggle("responsive_nav");
          }

    }


    return(
        <header>
            
            <nav ref={navRef}>
                <Link to="/"> Home</Link>
                <Link to="/Profile"> Profile</Link>
                <Link to="/Login">Login</Link>
                <button  className='nav-btn nav-close-btn'
                onClick={showNavbar}>
                    <FaTimes/>
                </button>
            </nav>
                <button  className='nav-btn'
              onClick={showNavbar}>
                    <FaBars/>
                </button>
        </header>

    );
}
export default Navbar;