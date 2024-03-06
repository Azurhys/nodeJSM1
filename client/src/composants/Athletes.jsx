import React, { useState,useEffect } from 'react';
import useAthletes from '../hooks/useAthletes';
import usePays from '../hooks/usePays';

const Athletes = () => {
  const { athletes, loading, error, addAthlete, updateAthlete, deleteAthlete } = useAthletes();
  const { pays, loading: paysLoading, error: paysError, fetchPays } = usePays();
  const [formData, setFormData] = useState({ nom_athlete: '', pays_id: '' });
  const [selectedAthleteId, setSelectedAthleteId] = useState(null);

  useEffect(() => {
    fetchPays();
  }, [pays])
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedAthleteId) {
      updateAthlete(selectedAthleteId, formData);
    } else {
      addAthlete(formData);
    }
    setFormData({ nom_athlete: '', pays_id: '' });
    setSelectedAthleteId(null);
  };

  const handleUpdate = (id, nomAthlete, paysId) => {
    const updatedAthleteData = { nom_athlete: nomAthlete, pays_id: paysId };
    setFormData(updatedAthleteData);
    setSelectedAthleteId(id);
  };

  const handleDelete = (id) => {
    deleteAthlete(id);
  };

  if (loading || paysLoading) return <p>Loading...</p>;
  if (error || paysError) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2 className='my-3'>Athlètes</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Nom</th>
            <th scope="col">Pays</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {athletes.map(athlete => (
            <tr key={athlete.athlete_id}>
              <td>{athlete.nom_athlete}</td>
              <td>{pays.find(pays => pays.pays_id === athlete.pays_id)?.nom_pays || 'Non défini'}</td>
              <td>
                <button className="btn btn-warning mx-2" onClick={() => handleUpdate(athlete.athlete_id, athlete.nom_athlete, athlete.pays_id)}>Update</button>
                <button className="btn btn-danger mx-2" onClick={() => handleDelete(athlete.athlete_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2 className='my-3' >{selectedAthleteId ? 'Modifier un athlète' : 'Ajouter un athlète'}</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>Nom de l'athlète:</label>
          <input type="text" className='form-control my-3' name="nom_athlete" value={formData.nom_athlete} onChange={handleInputChange} />
        </div>
        <div className='form-group'>
          <label>Pays:</label>
          <select className='form-control my-3' name="pays_id" value={formData.pays_id} onChange={handleInputChange}>
            <option value="">Sélectionnez un pays</option>
            {pays.map(pays => (
              <option key={pays.pays_id} value={pays.pays_id}>{pays.nom_pays}</option>
            ))}
          </select>
        </div>
        <button className="btn btn-success" type="submit">{selectedAthleteId ? 'Modifier' : 'Ajouter'}</button>
      </form>
    </div>
  );
};

export default Athletes;
