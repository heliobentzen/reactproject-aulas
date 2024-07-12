import { Anchor, Button, Center, Text, TextInput } from '@mantine/core';
import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ApiService from '../../../services/ApiService';

export function EmailRecover() {
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const navigate = useNavigate();
  const api = new ApiService('');

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const enviarEmail = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (username === '') {
      setUsernameError('Preencha o nome de usuario');
    } else {
      try {
        await api.post('/api/v1/auth/password-recovery/request', { username: username });
        console.log('Codigo enviado');
        navigate('/recover', { state: { username } });
      } catch (error) {
        console.error('Falhou ao enviar codigo:', error);
        setUsernameError('Falha ao enviar código. Tente novamente.');
      }

    }
  };

  
  return (
    <>
      <Text size="xl" mb={20}>
        <strong>Recuperação de senha</strong>
      </Text>
      <Text ta={'center'} mb={20}>
        Enviaremos um código de verificação para o username informado
        para validação e criação de uma nova senha.
      </Text>
      <Text size="sm" mb={20}>
        
      </Text>

      <form onSubmit={enviarEmail}>
        <TextInput
          variant="filled"
          label="Nome de usuário"
          placeholder="johndoe"
          size="md"
          mt="md"
          value={username}
          withAsterisk
          onChange={handleUsernameChange}
          error={usernameError}
          mb={30}
          w={300}
        />

        <Center>
          <Button size="md" radius={'md'} maw={'320px'} type="submit">
            Enviar Código
          </Button>
        </Center>
      </form>

      <Text mt={28}>
        Retornar para a página de{' '}
        <Anchor component={Link} to={'/login'}>
          Log in
        </Anchor>
      </Text>
    </>
  );
}