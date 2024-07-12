import { Anchor, Button, Card, Center, Checkbox, Group, PasswordInput, Radio, Text, TextInput, Title, } from '@mantine/core';
import { FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ApiService from '../../../services/ApiService';

export function Signup(props: any) {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [nome, setNome] = useState('');
  const [user, setUser] = useState('');
  const [userError, setUserError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [role, setRole] = useState('ADMIN');
  const [situacao, setSituacao] = useState('false');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const api = new ApiService('');

  useEffect(() => {
    if (props.isEdit) {
      setNome(props.user.name);
      setEmail(props.user.email);
      setUser(props.user.username);
      setRole(props.user.role.toString());
      setSituacao(props.user.active.toString());
    }
  }, [])

  useEffect(() => {
    const validarSenha = (password: string) => {
      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      return regex.test(password);
    };

    if (passwordConfirm && password !== passwordConfirm) {
      setPasswordError("As senhas não coincidem.");
    } else if (password && !validarSenha(password)) {
      setPasswordError("A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma minúscula, um número e um caractere especial.");
    } else {
      setPasswordError("");
    }
  }, [password, passwordConfirm]);

  useEffect(() => {
    if (user && user.length < 3) {
      setUserError("O usuário deve ter pelo menos 3 caracteres.");
    } else {
      setUserError("");
    }
  }, [user]);

  const salvar = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validarCampos()) {
      if (props.isLogin) {

        const dados = {
          "name": nome,
          "username": user,
          "email": email,
          "password": password,
          "password_confirmation": passwordConfirm
        }
        api.post('/api/v1/auth/signup', dados)
          .then(response => {
            console.log('Resposta da API:', response.data);
            navigate('/dashboard');
          })
          .catch(error => {
            console.error('Erro ao fazer cadastro:', error);
          });
      }
      else if (props.isEdit) {
        const headers = {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        };

        if(situacao.toString() === "true" && props.user.active.toString() === "false" ){
          api.pacth(`/api/v1/users/${props.user.id}/activate`, { headers })
          .then(response => {
            console.log('(Situação atualizada) Resposta da API:', response.data);
            navigate('/users');
            //window.location.reload();
          })
          .catch(error => {
            console.error('Erro ao fazer cadastro:', error);
          });
        }

        const dados = {
          "fullname": nome,
          "username": user,
          "email": email,
          "role": role
        }

        api.pacth(`/api/v1/users/${props.user.id}`, dados, { headers })
          .then(response => {
            console.log('(User atualizado) Resposta da API:', response.data);
            navigate('/users');
            window.location.reload();
          })
          .catch(error => {
            console.error('Erro ao fazer cadastro:', error);
          });

        if(situacao.toString() === "true" && props.user.active.toString() === "false"){
          api.pacth(`/api/v1/users/${props.user.id}/activate`, { headers })
          .then(response => {
            console.log('(Situação atualizada) Resposta da API:', response.data);
            navigate('/users');
            window.location.reload();
          })
          .catch(error => {
            console.error('Erro ao fazer cadastro:', error);
          });
        }

      }
      else {
        const dados = {
          "username": user,
          "password": password,
          "fullname": nome,
          "email": email,
          "role": role
        }

        const headers = {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        };

        api.post('/api/v1/users', dados, { headers })
          .then(response => {
            console.log('Resposta da API:', response.data);
            navigate('/config');
            window.location.reload();
          })
          .catch(error => {
            console.error('Erro ao fazer cadastro:', error);
          });
      }

    }
  };

  const validarCampos = () => {
    if (nome == '') {
      setError('Nome vazio, preencha o campo nome.');
      return false;
    }
    else if (email == '') {
      setError('E-mail vazio, preencha o campo e-mail.');
      return false;
    }
    else if (user == '') {
      setError('Usuário vazio, preencha o campo usuário.');
      return false;
    }
    else if (user.length < 3) {
      setError('');
      return false;
    }
    else if (password == '' && !props.isEdit) {
      setError('Senha vazio, preencha o campo de senha.');
      return false;
    }
    else if (passwordConfirm == '' && !props.isEdit) {
      setError('Confirmar senha vazio, preencha o campo de confirmar senha.');
      return false
    }
    else if (password.length < 8 && !props.isEdit) {
      setError('');
      return false
    }
    else {
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

  return (
    <>

      {props.isLogin ?
        <Center>
          <Title order={2} mt="32" mb={32}>
            Registro de Usuário
          </Title>
        </Center>
        : ''}

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
          value={email}
          withAsterisk
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
          disabled={props.isEdit ? true : false}
          error={userError}
        />

        {props.isEdit ?
          ''
          :
          <>
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
          </>}

        {props.isLogin ?
          ''
          :
          <>
            <Text mt={10} mb={10} size="mg">Tipo do usuário</Text>

            <Card shadow="sm" padding="sm" radius="md" withBorder>
              <Radio.Group
                name="tipo usuario"
                label="Selecione o tipo do usuário"
                withAsterisk
                value={role}
                onChange={(event) => setRole(event.toString())}
              >
                <Group mt="xs">
                  <Radio value="ADMIN" label="Administrador" />
                  <Radio value="SALES" label="Vendedor" />
                </Group>
              </Radio.Group>
            </Card>

            <Text mt={10} mb={10} size="mg">Situação</Text>

            <Card shadow="sm" padding="sm" radius="md" withBorder>
              <Radio.Group
                name="situacao usuario"
                label="Selecione a situação do usuário"
                withAsterisk
                value={situacao}
                onChange={(event) => setSituacao(event.toString())}
              >
                <Group mt="xs">
                  <Radio value='true' label="Ativo" />
                  <Radio value='false' label="Inativo" />
                </Group>
              </Radio.Group>
            </Card>
          </>
        }

        {props.isLogin ?
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
          : ''}
        <Button radius={'md'} fullWidth mt="xl" size="md" type="submit">
          {props.isLogin === true ? 'Criar conta'
            : props.isEdit === true ? 'Atualizar'
              : 'Salvar'}
        </Button>
      </form>

      {props.isLogin ?
        <Center mt="md">
          <Text size="lg">
            Já tem uma conta? Faça o{' '}
            <Anchor component={Link} to={'/login'}>
              Log in
            </Anchor>
          </Text>
        </Center>
        : ''}

    </>
  );
}