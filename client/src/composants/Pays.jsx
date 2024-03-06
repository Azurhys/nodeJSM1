import React, { useState } from 'react';
import usePays from '../hooks/usePays';

const Pays = () => {
  const { pays, loading, error, addPays, updatePays, deletePays } = usePays();
  const [formData, setFormData] = useState({ nom_pays: '' });
  const [selectedPaysId, setSelectedPaysId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedPaysId) {
      updatePays(selectedPaysId, formData);
    } else {
      addPays(formData);
    }
    setFormData({ nom_pays: '' });
    setSelectedPaysId(null);
  };

  const handleUpdate = (id, nomPays) => {
    const updatedPaysData = { nom_pays: nomPays };
    setFormData(updatedPaysData);
    setSelectedPaysId(id);
  };

  const handleDelete = (id) => {
    deletePays(id);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2 className='my-3'>Pays</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Nom</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {pays.map(pays => (
            <tr key={pays.pays_id}>
              <td>{pays.nom_pays}</td>
              <td>
                <button className="btn btn-warning mx-2" onClick={() => handleUpdate(pays.pays_id, pays.nom_pays)}>Update</button>
                <button className="btn btn-danger mx-2" onClick={() => handleDelete(pays.pays_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2 className='my-3' >{selectedPaysId ? 'Modifier un pays' : 'Ajouter un pays'}</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>Nom du pays:</label>
          <input type="text" className='form-control my-3' name="nom_pays" value={formData.nom_pays} onChange={handleInputChange} />
        </div>
        <button className="btn btn-success" type="submit">{selectedPaysId ? 'Modifier' : 'Ajouter'}</button>
      </form>
    </div>
  );
};

export default Pays;
