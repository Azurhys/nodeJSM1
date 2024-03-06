import { useState, useEffect } from 'react';
import axios from 'axios';

const useSports = () => {
  const [sports, setSports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSports();
  }, []);

  const fetchSports = async () => {
    try {
      const response = await axios.get('http://localhost:9000/sports');
      setSports(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const addSport = async (sportData) => {
    console.log(sportData)
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:9000/sports', sportData);
      fetchSports();
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const updateSport = async (id, sportData) => {
    try {
      setLoading(true);
      await axios.put(`http://localhost:9000/sports/${id}`, sportData);
      setSports(prevSports => prevSports.map(sport => (sport.sport_id === id ? { ...sport, ...sportData } : sport)));
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteSport = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:9000/sports/${id}`);
      setSports(prevSports => prevSports.filter(sport => sport.sport_id !== id));
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { sports, loading, error, addSport, updateSport, deleteSport, fetchSports };
};

export default useSports;
