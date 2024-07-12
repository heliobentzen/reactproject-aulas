import { Anchor, Button, Center, PinInput, Text } from '@mantine/core';
import { FormEvent, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ApiService from '../../../services/ApiService';

export function Recover() {
  const [code, setCode] = useState('');
  const [codeError, setCodeError] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { username } = location.state || {};
  const api = new ApiService('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (code.length < 6) {
      setCodeError(true);
    } else {

      const dados = {
        "username": username,
        "code": code,
        "password": "12345678",
        "password_confirmation": "12345678"
      }

      try {
        await api.post('/api/v1/auth/password-recovery/verify', { dados });
        console.log('Código verificado');
        navigate('/new-password',  { state: { dados } })
      } catch (error) {
        console.error('Falhou ao verificar código:', error);
      }
    }
  };

  useEffect(() => {
    if (code.length == 0) {
      setCodeError(false);
    } else if (code.length < 6) {
      setCodeError(true);
    } else {
      setCodeError(false);
    }
  }, [code])

  // const handleConfirm = async () => {
  //   try {
  //     await axios.post('/verify-code', { code });
  //     console.log('Código confirmado');
  //     navigate('/new-password');
  //   } catch (error) {
  //     console.error('Falhou ao confirmar código:', error);
  //   }
  // };

  return (
    <>
      <Text size="xl" mb={20}>
        <strong>Recuperação de senha</strong>
      </Text>
      <Text ta={'center'} mb={20}>
        {`Enviamos um código de verificação pro email do usuario cadastrado
        (${username}) para validação e criação de uma nova senha.
        Verifique sua caixa de email.`}
      </Text>
      <Text size="sm" mb={20}>
        Código de verificação
      </Text>

      <form onSubmit={handleSubmit}>
        <PinInput error={codeError} size="lg" length={6} type="number" mb={40} onChange={(value: string) => setCode(value)} />
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