import React, { useState, useEffect } from 'react';
import useEpreuves from '../hooks/useEpreuves';
import useSports from '../hooks/useSports';
import axios from 'axios';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import Athletes from './Athletes';

const Dashboard = () => {
  const { epreuves, loading, error, addEpreuve, updateEpreuve, deleteEpreuve } = useEpreuves();
  const { sports, loading: sportsLoading, error: sportsError, addSport, updateSport, deleteSport, fetchSports } = useSports();
  const [formData, setFormData] = useState({ nom_epreuve: '', sport_id: '' });
  const [selectedEpreuveId, setSelectedEpreuveId] = useState(null); // Id de l'épreuve sélectionnée pour la modification
  const [selectedSportId, setSelectedSportId] = useState(null);
  const [sportFormData, setSportFormData] = useState({ nom_sport: '' });

  const handleSportInputChange = (e) => {
    const { name, value } = e.target;
    setSportFormData({ ...sportFormData, [name]: value });
  };

  const handleSportSubmit = (e) => {
    e.preventDefault();
    if (selectedSportId) {
      updateSport(selectedSportId, sportFormData);
    } else {
      addSport(sportFormData);
    }
    setSportFormData({ nom_sport: '' });
    setSelectedSportId(null);
    fetchSports();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSportUpdate = (id) => {
    const selectedSport = sports.find(sport => sport.sport_id === id);
    setSportFormData({ nom_sport: selectedSport.nom_sport, site_competition : selectedSport.site_competition });
    setSelectedSportId(id);
    fetchSports();
    };

    const handleSportDelete = (id) => {
        deleteSport(id);
        fetchSports();
    };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedEpreuveId) {
      // Si une épreuve est sélectionnée, mettre à jour
      updateEpreuve(selectedEpreuveId, formData); // Passer l'ID de l'épreuve sélectionnée
    } else {
      // Sinon, ajouter une nouvelle épreuve
      addEpreuve(formData);
    }
    setFormData({ nom_epreuve: '', sport_id: '' });
    setSelectedEpreuveId(null); // Réinitialiser l'épreuve sélectionnée
  };

  const handleUpdate = (id) => {
    const selectedEpreuve = epreuves.find(epreuve => epreuve.epreuve_id === id);
    setFormData({ nom_epreuve: selectedEpreuve.nom_epreuve, sport_id: selectedEpreuve.sport_id });
    setSelectedEpreuveId(id); // Garder l'ID de l'épreuve sélectionnée

  };

  const handleDelete = (id) => {
    deleteEpreuve(id);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className='p-3'>
      <h2>Epreuves</h2>
      <table className="table table-striped">
            <thead>
                <tr>
                <th scope="col">Nom de l'épreuve</th>
                <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                {epreuves.map(epreuve => (
                <tr key={epreuve.epreuve_id}>
                    <td>{epreuve.nom_epreuve}</td>
                    <td>
                    <button className="btn btn-warning mx-2" onClick={() => handleUpdate(epreuve.epreuve_id)}>Update</button>
                    <button className="btn btn-danger mx-2" onClick={() => handleDelete(epreuve.epreuve_id)}>Delete</button>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>

      <h2>{selectedEpreuveId ? 'Modifier une épreuve' : 'Ajouter une épreuve'}</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>Nom de l'épreuve:</label>
          <input className='form-control my-3' type="text" name="nom_epreuve" value={formData.nom_epreuve} onChange={handleInputChange} />
        </div>
        <div className='form-group'>
          <label>Sport:</label>
          <select className='form-control my-3' name="sport_id" value={formData.sport_id} onChange={handleInputChange}>
            <option value="">Sélectionnez un sport</option>
            {sports.map(sport => (
              <option key={sport.sport_id} value={sport.sport_id}>{sport.nom_sport}</option>
            ))}
          </select>
        </div>
        <button className="btn btn-success" type="submit">{selectedEpreuveId ? 'Modifier' : 'Ajouter'}</button>
      </form>
      <h2 className='my-3'>Sports</h2>
        <table className="table table-striped">
            <thead>
            <tr>
                <th scope="col">Nom du sport</th>
                <th scope="col">Actions</th>
            </tr>
            </thead>
            <tbody>
            {sports.map(sport => (
                <tr key={sport.sport_id}>
                <td>{sport.nom_sport}</td>
                <td>
                    <button className="btn btn-warning mx-2" onClick={() => handleSportUpdate(sport.sport_id)}>Update</button>
                    <button className="btn btn-danger mx-2" onClick={() => handleSportDelete(sport.sport_id)}>Delete</button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        <h2 className='my-3' >{selectedSportId ? 'Modifier un sport' : 'Ajouter un sport'}</h2>
        <form onSubmit={handleSportSubmit}>
            <div className='form-group'>
            <label>Nom du sport:</label>
            <input className='form-control my-3' type="text" name="nom_sport" value={sportFormData.nom_sport} onChange={handleSportInputChange} />
            </div>
            <div className='form-group'>
            <label>Lieu de la compétition :</label>
            <input className='form-control my-3' type="text" name="site_competition" value={sportFormData.site_competition} onChange={handleSportInputChange} />
            </div>
            <button className="btn btn-success" type="submit">{selectedSportId ? 'Modifier' : 'Ajouter'}</button>
        </form>
        <Athletes />
    </div>
  );
};

export default Dashboard;
