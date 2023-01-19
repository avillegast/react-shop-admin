import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (endpoint, limite) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [changing, setChanging] = useState(false);
  console.log('=====Limite===============================');
  console.log(limite);
  console.log('====================================');
  async function fetchData() {
    const response = await axios.get(endpoint, {
      params: {
        limit: limite,
        offset: (page - 1) * limite,
      },
    });
    setData(response.data);
    setLoading(false);
    console.log('===data=================================');
    console.log(response.data);
    console.log(response);
    console.log('====================================');
  }

  useEffect(() => {
    try {
      fetchData();
      console.log('data' + data);
    } catch (error) {
      console.log('error:' + error);
    }
  }, [endpoint, page, changing]);

  return { data, page, loading, changing, setPage, setChanging };
};

export default useFetch;
