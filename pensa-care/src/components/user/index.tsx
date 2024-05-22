import { Avatar, Button, Center, Flex, Text } from '@mantine/core';
import { Link } from 'react-router-dom';
import logoutIco from '../../assets/icons/logout.svg';
import ApiService from '../../services/ApiService';
import { useEffect, useRef, useState } from 'react';
import ImageApiService from '../../services/ImageApiService';

const logout = () => {
  // Remove the access_token and expires_at from localStorage
  localStorage.removeItem('access_token');
  localStorage.removeItem('expires_at');
};
const api = new ApiService('');
const imageApiService = new ImageApiService();

export function User() {
  const [link, setLink] = useState('');
  const [id, setId] = useState('');
  const fileInputRef = useRef(null);

  const handleFileChange = async (event: any) => {
    const file = event.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const resUpload = await api.post('/api/v1/image/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('Imagem salva com sucesso!');

        await api.pacth('/api/v1/users/me/image',
          {
            'image_id': `${resUpload.data.id}`,
          }
        );
        
        setId(resUpload.data.id);

      } catch (error) {
        console.error('Error no upload: ', error);
      }
    }
  };

  useEffect(() => {
    const getImageUserProfile = async () => {
      const response = await api.get('/api/v1/users/me');
      if (response.data.image) {
        setLink(imageApiService.getUserProfileImageUrl(response.data.image));
      }
    };
    getImageUserProfile();
  }, [id]);

  const handleAvatarButtonClick = () => {
    if(fileInputRef.current){
      (fileInputRef.current as any).click();
    }
  };

  return (
    <Flex justify={'space-between'} p={10}>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <Button variant="transparent" w={50} p={0} onClick={handleAvatarButtonClick} >
        <Avatar size="45" radius="md" src={link} />
      </Button>

      <Flex direction={'column'}>
        <Text>{localStorage.getItem('username')}</Text>
        <Text c='#999' size="xs">Peças e Serviços</Text>
      </Flex>
      <Center>
        <Button variant="transparent" component={Link} to={'/login'} onClick={logout}>
          <img src={logoutIco} alt="Sair" />
        </Button>
      </Center>

    </Flex>
  );
}