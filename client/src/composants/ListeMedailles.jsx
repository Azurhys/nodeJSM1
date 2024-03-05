import React from 'react';
import useMedailles from '../hooks/useMedailles';

const ListeMedailles = () => {
    const { medailles, loading, error } = useMedailles();
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>Error: {error.message}</div>;
    }
  
    return (
      <div>
        <h1>Liste des médaillés</h1>
        <ul>
          {medailles.map((medaille, index) => (
            <li key={index}>{medaille.nom_athlete} - {medaille.type_medaille}</li>
          ))}
        </ul>
      </div>
    );
  };
 
export default ListeMedailles;