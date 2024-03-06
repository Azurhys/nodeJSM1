import React, { useState } from 'react';
import { useAuth } from '../context/authContext';
import { NavLink, useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(username, password);
            navigate('/')
        } catch (error) {
            console.error('Erreur de connexion :', error.message);
        }
    };

    return (
        <div className='p-3'>
            <h2>Connexion</h2>
            <form onSubmit={handleSubmit}>
                <div  className='form-group'>
                    <label>Nom d'utilisateur :</label>
                    <input type="text" className="form-control my-3" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div  className='form-group'>
                    <label>Mot de passe :</label>
                    <input type="password" className="form-control my-3" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit" class="btn btn-primary">
                    Se connecter
                </button>
            </form>
        </div>
    );
};

export default Login;
