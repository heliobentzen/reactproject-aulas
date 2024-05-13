import { Anchor, Button, Center, Checkbox, PasswordInput, Text, TextInput, Title, } from '@mantine/core';
import axios from 'axios';
import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export function Signup() {

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [nome, setNome] = useState('');
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const token = '';
  const api = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  const salvar = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const dados = {
      "username": user,
      "password": password,
      "fullname": nome,
      "email": email,
      "role": "ADMIN"
    }

    api.post('/api/v1/users', dados)
      .then(response => {
        console.log('Resposta da API:', response.data);
        navigate('/dashboard');
      })
      .catch(error => {
        // Manipular erros aqui
        console.error('Erro ao fazer cadastro:', error);
      });

  };

  const validateEmail = (email: string) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    if (event.target.value === '') {
      setEmailError('');
    } else if (!validateEmail(event.target.value)) {
      setEmailError('Por favor, insira um e-mail válido.');
    } else {
      setEmailError('');
    }
  };

  return (
    <>
      <Center>
        <Title order={2} mt="32" mb={32}>
          Registro de Usuário
        </Title>
      </Center>

      <form onSubmit={salvar}>
        <TextInput
          variant="filled"
          label="Nome"
          placeholder="John Doe"
          size="md"
          withAsterisk
          value={nome}
          onChange={(event) => setNome(event.target.value)}
        />

        <TextInput
          variant="filled"
          label="Email"
          placeholder="johndoe@pensalab.com.br"
          size="md"
          mt="md"
          withAsterisk
          value={email}
          onChange={handleEmailChange}
          error={emailError}
        />

        <TextInput
          variant="filled"
          label="Nome de usuário"
          placeholder="johndoe"
          size="md"
          mt="md"
          withAsterisk
          value={user}
          onChange={(event) => setUser(event.target.value)}
        />
        <PasswordInput
          variant="filled"
          label="Senha"
          placeholder="••••••••"
          size="md"
          mt="md"
          withAsterisk
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <Checkbox
          mt="xl"
          label={
            <>
              Ao criar a conta você concorda com os{' '}
              <Anchor href="#" target="_blank" inherit>
                termos de uso e políticas de privacidade.
              </Anchor>
            </>
          }
        />

        <Button radius={'md'} fullWidth mt="xl" size="md" type="submit">
          Criar conta
        </Button>
      </form>

      <Center mt="md">
        <Text size="lg">
          Já tem uma conta? Faça o{' '}
          <Anchor component={Link} to={'/login'}>
            Log in
          </Anchor>
        </Text>
      </Center>
    </>
  );
}