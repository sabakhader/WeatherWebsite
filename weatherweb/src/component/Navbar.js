import{FaBars,FaTimes} from "react-icons/fa";
import{useRef} from "react";




function Navbar(){
    const navRef=useRef();


    const showNavbar=()=>{
        navRef.current.classList.toggle("responsive_nav");

    }


    return(
        <header>
            
            <nav ref={navRef}>
                <a href="/"> Home</a>
                <a href="http://localhost:3000/Profile"> Profile</a>
                <a href="http://localhost:3000/Login">Login</a>
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