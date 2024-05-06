import {
  Anchor,
  Button,
  Center,
  Checkbox,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';

export function Signup() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log('submit - signup');
  };

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

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

      <form onSubmit={handleSubmit}>
        <TextInput
          variant="filled"
          label="Nome"
          placeholder="John Doe"
          size="md"
          withAsterisk
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
        />
        <PasswordInput
          variant="filled"
          label="Senha"
          placeholder="••••••••"
          size="md"
          mt="md"
          withAsterisk
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
function setEmailError(arg0: string) {
  throw new Error('Function not implemented.');
}

