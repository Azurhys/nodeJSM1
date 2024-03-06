import React, { useState } from 'react';
import useAthletes from '../hooks/useAthletes';

const Athletes = () => {
  const { athletes, loading, error, addAthlete, updateAthlete, deleteAthlete } = useAthletes();
  const [formData, setFormData] = useState({ nom_athlete: '', pays_id: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addAthlete(formData);
    setFormData({ nom_athlete: '', pays_id: '' });
  };

  const handleUpdate = (id) => {
    const updatedAthleteData = { nom_athlete: 'Updated Athlete', pays_id: 1 }; // Modifier pays_id selon vos besoins
    updateAthlete(id, updatedAthleteData);
  };

  const handleDelete = (id) => {
    deleteAthlete(id);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Athletes</h2>
      <ul>
        {athletes.map(athlete => (
          <li key={athlete.athlete_id}>
            {athlete.nom_athlete} - {athlete.pays_id}
            <button onClick={() => handleUpdate(athlete.athlete_id)}>Update</button>
            <button onClick={() => handleDelete(athlete.athlete_id)}>Delete</button>
          </li>
        ))}
      </ul>
      <h2>Ajouter un athlète</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom de l'athlète:</label>
          <input type="text" name="nom_athlete" value={formData.nom_athlete} onChange={handleInputChange} />
        </div>
        <div>
          <label>Pays:</label>
          <input type="text" name="pays_id" value={formData.pays_id} onChange={handleInputChange} />
        </div>
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
};

export default Athletes;
