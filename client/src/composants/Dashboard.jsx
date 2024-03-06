import React, { useState, useEffect } from 'react';
import useEpreuves from '../hooks/useEpreuves';
import axios from 'axios';

const Dashboard = () => {
  const { epreuves, loading, error, addEpreuve, updateEpreuve, deleteEpreuve } = useEpreuves();
  const [formData, setFormData] = useState({ nom_epreuve: '', sport_id: '' });
  const [sports, setSports] = useState([]);
  const [selectedEpreuveId, setSelectedEpreuveId] = useState(null); // Id de l'épreuve sélectionnée pour la modification

  useEffect(() => {
    const fetchSports = async () => {
      try {
        const response = await axios.get('http://localhost:9000/sports');
        setSports(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des sports :', error);
      }
    };

    fetchSports();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
    window.location.reload(); // Recharger la page
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
    </div>
  );
};

export default Dashboard;
