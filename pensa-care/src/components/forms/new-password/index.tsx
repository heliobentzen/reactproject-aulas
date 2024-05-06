import {
  Anchor,
  Button,
  Center,
  PasswordInput,
  Text,
  Title,
} from '@mantine/core';
import { FormEvent } from 'react';
import { Link } from 'react-router-dom';

export function NewPassword() {
  const handleSubmit = (event: FormEvent<HTMLElement>) => {
    event.preventDefault();

    console.log('submit - new password');
  };

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
        ></PasswordInput>
        <PasswordInput
          styles={noBorder}
          withAsterisk
          mb={'md'}
          label="Confirme a nova senha"
          placeholder="Repetir nova senha"
          radius={'md'}
          size="md"
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
