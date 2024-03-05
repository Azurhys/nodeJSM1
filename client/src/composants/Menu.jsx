import { NavLink, useNavigate } from "react-router-dom";

const Menu = () => {const navigate = useNavigate()
    const handleLogout = (e) => {
        e.preventDefault();
        logout()
        navigate("/login")
    }
    return ( 
        <div className="bg-dark mb-3">
            <nav className="navbar navbar-expand navbar-light container">
                <span className="navbar-brand fs-3 text-light">
                    Node JO
                </span>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink to="/" className={({isActive}) => {
                            return isActive ? "nav-link active text-light" : "nav-link text-secondary"
                        }}>Accueil</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/listemedailles" className={({isActive}) => {
                            return isActive ? "nav-link active text-light" : "nav-link text-secondary"
                        }}>Liste Medailles</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/listesports" className={({isActive}) => {
                            return isActive ? "nav-link active text-light" : "nav-link text-secondary"
                        }}>Liste Sports</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/map" className={({isActive}) => {
                            return isActive ? "nav-link active text-light" : "nav-link text-secondary"
                        }}>Map</NavLink>
                    </li>
                </ul>
            </nav>
        </div>
     );
}
 
export default Menu;