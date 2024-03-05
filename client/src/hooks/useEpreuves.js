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
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchEpreuves();

    return () => {
      // Cleanup function to cancel ongoing requests
    };
  }, []);

  return { epreuves, loading, error };
};

export default useEpreuves;
