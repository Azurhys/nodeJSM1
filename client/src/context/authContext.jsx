import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [authenticated, setAuthenticated] = useState(false);
    const [username, setUsername] = useState('');

    const login = async (username, password) => {
        try {
            const response = await axios.post('http://localhost:9000/login', { username, password });
            if (response.status === 200) {
                setAuthenticated(true);
                setUsername(username);
            }
        } catch (error) {
            console.error('Erreur lors de la connexion :', error);
            throw new Error('Erreur lors de la connexion');
        }
    };

    const logout = () => {
        setAuthenticated(false);
        setUsername('');
    };

    return (
        <AuthContext.Provider value={{ authenticated, username, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
