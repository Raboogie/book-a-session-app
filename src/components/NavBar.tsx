import {navBarContent} from "../lib/appConstants.ts";
import {NavLink} from "react-router-dom";


function NavBar() {
    return (
        <>
            <header id="main-header">
                <h1>{navBarContent.title}</h1>
                <nav>
                    <ul>
                        {navBarContent.links.map((link) => (
                          <NavLink to={link.url} key={link.text}> <li>  {link.text}  </li> </NavLink>
                        ))}
                    </ul>
                </nav>
            </header>
        </>
    );
}

export default NavBar;