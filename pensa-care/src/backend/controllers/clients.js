import { useCallback, useEffect, useState } from 'react';

export const useClients = () => {
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState('name,asc');
  const [searchTerm, setSearchTerm] = useState('');

  const clientsPerPage = 6;
 
  // Create an axios instance
  const api = axios.create({
    baseURL: 'http://localhost:8080',
  });

  const fetchClients = useCallback(async (page, size) => {
    setLoading(true);
    const response = await api.get('/api/v1/clients', {
      params: {
        page: currentPage - 1,
        size: clientsPerPage,
        sort: sortOrder,
        name: searchTerm,
      },
    });
    setLoading(false);
    return response.data;
  }, [currentPage, searchTerm, sortOrder]);

  useEffect(() => {
    const fetchAndSetClients = async () => {
      const newClients = await fetchClients(currentPage - 1, clientsPerPage);
      setClients(prevClients => [...prevClients, ...newClients.content]);
    };

    fetchAndSetClients();
  }, [currentPage, fetchClients]);

  const handleClick = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handleSearchChange = (event) => {
    const searchTerm = event.target.value;
    const filtered = clients.filter(client => client.name.includes(searchTerm));
    setFilteredClients(filtered);
  };

  return {
    clients,
    filteredClients,
    currentPage,
    loading,
    sortOrder,
    searchTerm,
    handleClick,
    handleSearchChange,
    setSortOrder,
    setSearchTerm,
  };
};