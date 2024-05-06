import { Anchor, Button, Center, PinInput, Text } from '@mantine/core';
import axios from 'axios';
import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export function Recover() {
  const [code, setCode] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await axios.post('/send-code', { email: 'user-email@gmail.com' });
      console.log('Código enviado');
    } catch (error) {
      console.error('Falhou ao enviar código:', error);
    }
    };

  const handleConfirm = async () => {
    try {
      await axios.post('/verify-code', { code });
      console.log('Código confirmado');
      navigate('/new-password');
    } catch (error) {
      console.error('Falhou ao confirmar código:', error);
    }
  };


  return (
    <>
      <Text size="xl" mb={20}>
        <strong>Recuperação de senha</strong>
      </Text>
      <Text ta={'center'} mb={20}>
        Enviamos um código de verificação pro email cadastrado
        (exemplodeemail@gmail.com) para validação e criação de uma nova senha.
        Verifique sua caixa de email.
      </Text>
      <Text size="sm" mb={20}>
        Código de verificação
      </Text>

      <form onSubmit={handleSubmit}>
        <PinInput size="lg" length={6} type="number" mb={40} onChange={(value: string) => setCode(value)} />
        <Center>
          <Button size="md" radius={'md'} maw={'320px'} type="submit">
            Confirmar código
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