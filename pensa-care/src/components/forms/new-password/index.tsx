import {
  Anchor,
  Button,
  Center,
  PasswordInput,
  Text,
  Title,
} from '@mantine/core';
import { FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export function NewPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLElement>) => {
    event.preventDefault();

    if (password.length < 8) {
      setPasswordError("A senha deve ter pelo menos 8 caracteres.");
    } else if (password !== passwordConfirm) {
      setPasswordError("As senhas não coincidem.");
    } else {
      navigate('/login')
      try {
        await axios.post(`/`);
        console.log('nova senha enviada');
      } catch (error) {
        console.error('Falhou ao enviar nova senha:', error);
      }
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

  const noBorder = {
    input: {
      border: 'none',
      outline: 'none',
    },
    visibilityToggle: { display: 'none' },
  };

  return (
    <>
      <Title size={'h2'} mb={20}>
        Criação de nova senha
      </Title>
      <form onSubmit={handleSubmit}>
        <PasswordInput
          miw={'350px'}
          maw={'400px'}
          styles={noBorder}
          withAsterisk
          mb={'md'}
          label="Nova senha"
          placeholder="Nova senha"
          radius={'md'}
          size="md"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        ></PasswordInput>
        <PasswordInput
          styles={noBorder}
          withAsterisk
          mb={'md'}
          label="Confirme a nova senha"
          placeholder="Repetir nova senha"
          radius={'md'}
          size="md"
          value={passwordConfirm}
          onChange={(event) => setPasswordConfirm(event.target.value)}
          error={passwordError}
        ></PasswordInput>
        <Center>
          <Button size="md" radius="md" mt={'md'} type="submit">
            Salvar nova senha
          </Button>
        </Center>
        <Text ta={'center'} mt={28}>
          Retornar para a página de{' '}
          <Anchor component={Link} to={'/login'}>
            Log in
          </Anchor>
        </Text>
      </form>
    </>
  );
}
