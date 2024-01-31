import{FaBars,FaTimes} from "react-icons/fa";
import{useRef} from "react";
import './index.css';



function Navbar(){
    const navRef=useRef();


    const showNavbar=()=>{
        navRef.current.classList.toggle("responsive_nav");

    }


    return(
        <header>
            <h3>logo</h3>
            <nav ref={navRef}>
                <a href="/"> Home</a>
                <a href="http://Profile"> Profile</a>
                <a href="http://Login">Login</a>
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