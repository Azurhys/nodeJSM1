import { useState, useEffect } from 'react';
import axios from 'axios';

const usePays = () => {
  const [pays, setPays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPays();
  }, []);

  const fetchPays = async () => {
    try {
      const response = await axios.get('http://localhost:9000/pays');
      setPays(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const addPays = async (paysData) => {
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:9000/pays', paysData);
      fetchPays();
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const updatePays = async (id, paysData) => {
    try {
      setLoading(true);
      await axios.put(`http://localhost:9000/pays/${id}`, paysData);
      fetchPays();
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const deletePays = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:9000/pays/${id}`);
      fetchPays();
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { pays, loading, error, addPays, updatePays, deletePays, fetchPays };
};

export default usePays;
