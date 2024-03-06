import { useState, useEffect } from 'react';
import axios from 'axios';

const useAthletes = () => {
  const [athletes, setAthletes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAthletes();
  }, []);

  const fetchAthletes = async () => {
    try {
      const response = await axios.get('http://localhost:9000/athletes');
      setAthletes(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const addAthlete = async (athleteData) => {
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:9000/athletes', athleteData);
      fetchAthletes();
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const updateAthlete = async (id, athleteData) => {
    try {
      setLoading(true);
      await axios.put(`http://localhost:9000/athletes/${id}`, athleteData);
      fetchAthletes();
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteAthlete = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:9000/athletes/${id}`);
      fetchAthletes();
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { athletes, loading, error, addAthlete, updateAthlete, deleteAthlete };
};

export default useAthletes;
