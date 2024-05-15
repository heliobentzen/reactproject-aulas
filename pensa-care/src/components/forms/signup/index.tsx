import { Anchor, Button, Center, Checkbox, PasswordInput, Text, TextInput, Title, } from '@mantine/core';
import axios from 'axios';
import { FormEvent, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export function Signup() {

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [nome, setNome] = useState('');
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const api = axios.create({
    baseURL: 'http://localhost:8080',

  });

  const salvar = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (validarCampos()){
      const dados = {
        "name": nome,
        "username": user,
        "email": email,
        "password": password,
        "password_confirmation": password
      }
  
      api.post('/api/v1/auth/signup', dados)
        .then(response => {
          console.log('Resposta da API:', response.data);
          navigate('/dashboard');
        })
        .catch(error => {
          // Manipular erros aqui
          console.error('Erro ao fazer cadastro:', error);
        });
    }
  };

  const validarCampos = () => {
    if(nome == ''){
      setError('Nome vazio, preencha o campo nome.');
      return false;
    }
    else if(email == ''){
      setError('E-mail vazio, preencha o campo e-mail.');
      return false;
    }
    else if(user == ''){
      setError('Usuário vazio, preencha o campo usuário.');
      return false;
    }   
    else if(password == ''){
      setError('Senha vazio, preencha o campo de senha.');
      return false;
    }
    else if(passwordConfirm == ''){
      setError('Confirmar senha vazio, preencha o campo de confirmar senha.');
      return false
    }
    else{
      setError('');
      return true;
    }
  }

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

  useEffect(() => {
    if (password !== passwordConfirm) {
      setPasswordError("As senhas não coincidem.");
    } else if (password.length < 8) {
      setPasswordError("A senha deve ter pelo menos 8 caracteres.");
    } else {
      setPasswordError("");
    }
  }, [password, passwordConfirm]);

  return (
    <>
      <Center>
        <Title order={2} mt="32" mb={32}>
          Registro de Usuário
        </Title>
      </Center>

      <Text size="sm" c="red">{error}</Text>

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

        <PasswordInput
          variant="filled"
          label="Confirmar Senha" 
          placeholder="••••••••"
          size="md"
          mt="md"
          withAsterisk
          value={passwordConfirm}
          onChange={(event) => setPasswordConfirm(event.target.value)}
          error={passwordError}
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