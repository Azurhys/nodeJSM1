import { useState, useEffect } from 'react';
import axios from 'axios';

const useMedailles = () => {
  const [medailles, setMedailles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMedailles();
  }, []);
  const fetchMedailles = async () => {
    try {
      const response = await axios.get('http://localhost:9000/medailles');
      setMedailles(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  const addMedaille = async (formData) => {
    try {
      const response = await axios.post('http://localhost:9000/medailles', formData);
      fetchMedailles();
    } catch (error) {
      setError(error);
    }
  };

  const updateMedaille = async (id, formData) => {
    try {
      await axios.put(`http://localhost:9000/medailles/${id}`, formData);
      const updatedMedailles = medailles.map(medaille => (medaille.medaille_id === id ? { ...medaille, ...formData } : medaille));
      fetchMedailles();
    } catch (error) {
      setError(error);
    }
  };

  const deleteMedaille = async (id) => {
    try {
      await axios.delete(`http://localhost:9000/medailles/${id}`);
      const updatedMedailles = medailles.filter(medaille => medaille.medaille_id !== id);
      fetchMedailles();
    } catch (error) {
      setError(error);
    }
  };

  return { medailles, loading, error, addMedaille, updateMedaille, deleteMedaille, fetchMedailles};
};

export default useMedailles;
