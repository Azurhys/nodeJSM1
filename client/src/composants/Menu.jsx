import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { useAuth } from '../context/authContext'

const Menu = () => {
    const navigate = useNavigate();
    const { authenticated, username, logout } = useAuth();
    
    const handleLogout = () => {
        logout();
        navigate('/login');
    };
    
    return ( 
        <div className="bg-dark mb-3">
            <nav className="navbar navbar-expand navbar-light container">
                <span className="navbar-brand fs-3 text-light">
                    Node JO
                </span>
                <ul className="navbar-nav">
                    {authenticated ? (
                        <>
                            <li className="nav-item">
                                <span className="nav-link text-light">
                                    Bienvenue {username}
                                </span>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/dashboard" className={({isActive}) => {
                                    return isActive ? "nav-link active text-light" : "nav-link text-secondary"
                                }}>Dashboard</NavLink>
                            </li>
                            <li className="nav-item">
                                <button className="btn btn-link text-light" onClick={handleLogout}>Déconnexion</button>
                            </li>
                        </>
                    ) : (
                        <li className="nav-item">
                            <NavLink to="/login" className={({isActive}) => {
                                return isActive ? "nav-link active text-light" : "nav-link text-secondary"
                            }}>Login</NavLink>
                        </li>
                    )}
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