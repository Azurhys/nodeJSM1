import { useState, useEffect } from 'react';
import axios from 'axios';

const useEpreuves = () => {
  const [epreuves, setEpreuves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEpreuves = async () => {
      try {
        const response = await axios.get('http://localhost:9000/epreuves');
        setEpreuves(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchEpreuves();
  }, []);

  const addEpreuve = async (epreuveData) => {
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:9000/epreuves', epreuveData);
      setEpreuves(prevEpreuves => [...prevEpreuves, response.data]);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const updateEpreuve = async (id, epreuveData) => {
    try {
      setLoading(true);
      await axios.put(`http://localhost:9000/epreuves/${id}`, epreuveData);
      setEpreuves(prevEpreuves => prevEpreuves.map(epreuve => (epreuve.epreuve_id === id ? { ...epreuve, ...epreuveData } : epreuve)));
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteEpreuve = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:9000/epreuves/${id}`);
      setEpreuves(prevEpreuves => prevEpreuves.filter(epreuve => epreuve.epreuve_id !== id));
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { epreuves, loading, error, addEpreuve, updateEpreuve, deleteEpreuve };
};

export default useEpreuves;
