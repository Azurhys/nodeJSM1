import { useState, useEffect } from 'react';
import axios from 'axios';

const useSports = () => {
  const [sports, setSports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSports = async () => {
      try {
        const response = await axios.get('http://localhost:9000/sports');
        setSports(response.data);
        console.log(response)
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    fetchSports();
  }, []);

  return { sports, loading, error };
};

export default useSports;
