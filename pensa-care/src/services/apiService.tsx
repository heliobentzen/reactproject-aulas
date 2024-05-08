import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

const useFetchClients = () => {
  const api = axios.create({
    baseURL: 'http://localhost:8080',
  });

  const token = localStorage.getItem('access_token');
  const clientsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState(null);

  const fetchClients = useCallback(async () => {
    const response = await api.get('/api/v1/clients', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        page: currentPage - 1,
        size: clientsPerPage,
      },
    });
    setData(response.data);
  }, [currentPage]);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  return { data, setCurrentPage };
};

export default useFetchClients;
