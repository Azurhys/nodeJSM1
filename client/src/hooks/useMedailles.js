import { useState, useEffect } from 'react';
import axios from 'axios';

const useMedailles = () => {
  const [medailles, setMedailles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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

    fetchMedailles();
  }, []);

  return { medailles, loading, error };
};

export default useMedailles;
