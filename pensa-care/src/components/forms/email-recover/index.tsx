import { Anchor, Button, Center, Text, TextInput } from '@mantine/core';
import axios from 'axios';
import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export function EmailRecover() {
  const [emailError, setEmailError] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const enviarEmail = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (email === '') {
      setEmailError('Preencha o E-mail');
    } else {
      navigate('/recover', { state: { email: email } });
      try {
        await axios.post('/send-email', { email: 'user-email@gmail.com' });
        console.log('e-mail enviado');
      } catch (error) {
        console.error('Falhou ao enviar e-mail:', error);
      }
    }
  };

  const validaEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    if (event.target.value === '') {
      setEmailError('');
    } else if (!confereEmail(event.target.value)) {
      setEmailError('Por favor, insira um e-mail válido.');
    } else {
      setEmailError('');
    }
  };

  const confereEmail = (email: string) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  return (
    <>
      <Text size="xl" mb={20}>
        <strong>Recuperação de senha</strong>
      </Text>
      <Text ta={'center'} mb={20}>
        Enviaremos um código de verificação pro email informado
        para validação e criação de uma nova senha.
      </Text>
      <Text size="sm" mb={20}>
        E-mail de verificação
      </Text>

      <form onSubmit={enviarEmail}>
        <TextInput
          variant="filled"
          label="Email"
          placeholder="johndoe@pensalab.com.br"
          size="md"
          mt="md"
          value={email}
          withAsterisk
          onChange={validaEmail}
          error={emailError}
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