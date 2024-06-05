import {
  Alert,
  Anchor,
  Button,
  Center,
  Paper,
  PasswordInput,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthenticationApiService from '../../../services/AuthenticationApiService';

export function Login() {
  const authentication = new AuthenticationApiService()
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      username: '',
      password: ''
    },

    validate: {
      username: (val) => (!val ? 'Username é necessário' : null),
      password: (val) => (!val ? 'Senha é necessária' : val.length <= 6 ? 'Senha deve conter pelo menos 6 caracteres' : null),
    }
  });

  const [error, setError] = useState<null | string>(null);
  
  const auth = async () => {

      const { username, password } = form.values;

      if (!form.values.username || !form.values.password) {
        setError('Por favor, preencha todos os campos.');
        return;
      }

      try {
        await authentication.login(
          username,
          password
      );
  
      // Redirect to /dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('An error occurred:', error);
      setError("Falha na autenticação. Por favor, tente novamente.");
    }
  };

  return (
    <Paper>
      {error && <Alert color="red" style={{ marginTop: '1em' }}>{error}</Alert>}
      <Center>
        <Title order={2} mt="48" mb={50}>
          Login
        </Title>
      </Center>

      <form onSubmit={form.onSubmit(() => {})}>
          <TextInput
            value={form.values.username}
            onChange={(event) => form.setFieldValue('username', event.currentTarget.value)}
            variant="filled"
            label="Nome de usuário"
            placeholder="johndoe"
            size="md"
            error={form.errors.username}
          />       
        <PasswordInput
          value={form.values.password}
          onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
          variant="filled"
          label="Senha"
          placeholder="••••••••"
          mt="md"
          size="md"
          error={form.errors.password}
        />

        <Center mt={'md'}>
          <Anchor component={Link} to={'/recover'}>
            <strong>Esqueceu sua senha?</strong>
          </Anchor>
        </Center>

        <Button
          radius={'md'}
          fullWidth
          mt="xl"
          size="md"
          type="submit"
          onClick={auth}

        >
          Entrar
        </Button>
        {/* 
          <Button
          variant="outline"
          radius={'md'}
          fullWidth
          mt="sm"
          size="md"
          component={Link}
          to={'/signup'}
        >
          Cadastre-se
        </Button>
      
        */}
        
      </form>
    </Paper>
  );
}
