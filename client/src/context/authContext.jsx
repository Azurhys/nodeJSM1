import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';


const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [authenticated, setAuthenticated] = useState(false);

    const login = async (username, password) => {
        try {
            // Envoyer les informations d'identification au serveur
            const response = await axios.post('http://localhost:9000/login', { username, password });
            if (response.status === 200) {
                setAuthenticated(true);
                console.log("connecté mon gars")
            }
        } catch (error) {
            console.error('Erreur lors de la connexion :', error);
            throw new Error('Erreur lors de la connexion');
        }
    };

    return (
        <AuthContext.Provider value={{ authenticated, login }}>
            {children}
        </AuthContext.Provider>
    );
};

