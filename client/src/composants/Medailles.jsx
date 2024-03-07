import React, { useState, useEffect } from 'react';
import useMedailles from '../hooks/useMedailles';
import useEpreuves from '../hooks/useEpreuves';
import useAthletes from '../hooks/useAthletes';

const Medailles = () => {
  const { medailles, loading, error, addMedaille, updateMedaille, deleteMedaille } = useMedailles();
  const [formData, setFormData] = useState({ epreuve_id: '', athlete_id: '', nom_athlete: '', type_medaille: '' });
  const [selectedMedailleId, setSelectedMedailleId] = useState(null);
  const { epreuves } = useEpreuves();
  const { athletes } = useAthletes();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedAthlete = athletes.find(athlete => athlete.athlete_id === parseInt(formData.athlete_id));
    const dataToSend = {
      ...formData,
      nom_athlete: selectedAthlete ? selectedAthlete.nom_athlete : ''
    };
    if (selectedMedailleId) {
      updateMedaille(selectedMedailleId, dataToSend);
    } else {
      addMedaille(dataToSend);
    }
    setFormData({ epreuve_id: '', athlete_id: '', nom_athlete: '', type_medaille: '' });
    setSelectedMedailleId(null);
  };

  const handleUpdate = (id, medailleData) => {
    setFormData(medailleData);
    setSelectedMedailleId(id);
  };

  const handleDelete = (id) => {
    deleteMedaille(id);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2 className='my-3'>Médailles</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Épreuve ID</th>
            <th scope="col">Nom de l'athlète</th>
            <th scope="col">Type de médaille</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {medailles.map(medaille => (
            <tr key={medaille.medaille_id}>
              <td>{medaille.epreuve_id}</td>
              <td>{medaille.nom_athlete}</td>
              <td>{medaille.type_medaille}</td>
              <td>
                <button className="btn btn-warning mx-2" onClick={() => handleUpdate(medaille.medaille_id, medaille)}>Update</button>
                <button className="btn btn-danger mx-2" onClick={() => handleDelete(medaille.medaille_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2 className='my-3' >{selectedMedailleId ? 'Modifier une médaille' : 'Ajouter une médaille'}</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>Épreuve:</label>
          <select className='form-control my-3' name="epreuve_id" value={formData.epreuve_id} onChange={handleInputChange}>
            <option value="">Sélectionnez une épreuve</option>
            {epreuves.map(epreuve => (
              <option key={epreuve.epreuve_id} value={epreuve.epreuve_id}>{epreuve.nom_epreuve}</option>
            ))}
          </select>
        </div>
        <div className='form-group'>
          <label>Nom de l'athlète:</label>
          <select className='form-control my-3' name="athlete_id" value={formData.athlete_id} onChange={handleInputChange}>
            <option value="">Sélectionnez un athlète</option>
            {athletes.map(athlete => (
              <option key={athlete.athlete_id} value={athlete.athlete_id}>{athlete.nom_athlete}</option>
            ))}
          </select>
        </div>
        <div className='form-group'>
          <label>Type de médaille:</label>
          <select className='form-control my-3' name="type_medaille" value={formData.type_medaille} onChange={handleInputChange}>
            <option value="">Sélectionnez un type de médaille</option>
            <option value="Or">Or</option>
            <option value="Argent">Argent</option>
            <option value="Bronze">Bronze</option>
          </select>
        </div>
        <button className="btn btn-success" type="submit">{selectedMedailleId ? 'Modifier' : 'Ajouter'}</button>
      </form>
    </div>
  );
};

export default Medailles;
