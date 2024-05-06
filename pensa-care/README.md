# PensaCare

PensaCare é um aplicativo desenvolvido em React, com o uso de TypeScript, seguindo uma arquitetura baseada em componentes. O aplicativo adota uma abordagem organizacional conhecida como *Component-based Architecture*, que segue uma estrutura mais detalhada, onde os componentes são agrupados por funcionalidade e por páginas em que são utilizados.

## Estrutura do Projeto

```
/pensacare
├─ __mock__/             # Dados fictícios para desenvolvimento e teste
├─ assets/
│  ├─ icons/             
│  └─ images/            
├─ components/           # Componentes reutilizáveis da aplicação, organizados por funcionalidade e páginas
│  ├─ breadcrumbs/
│  ├─ cards/
│  │  ├─ clients/
│  │  ├─ dashboard/
│  │  └─ modal/
│  ├─ forms/
│  │  ├─ login/
│  │  ├─ new-password/
│  │  ├─ recover/
│  │  └─ signup/
│  ├─ tables/
│  │  ├─ clients/
│  │  │  └─ details/
│  │  ├─ dashboard/
│  │  ├─ itens/
│  │  └─ services/
│  └─ modal/
│     └─ details/
├─ interfaces/           # Interfaces TypeScript para estrutura de dados
├─ layouts/              # Layouts principais da aplicação
├─ pages/                # Componentes de páginas, correlacionados às diferentes rotas
├─ routes/               # Configurações de roteamento usando react-router-dom
├─ app.tsx               
├─ main.tsx              
├─ theme.ts              # Configuração de tema utilizando Mantine
└─ vite-env.d.ts         
```


## Bibliotecas e Ferramentas Utilizadas

-  **React**: Biblioteca JavaScript para construção de interfaces de usuário.
-  **TypeScript**: Superset de JavaScript que adiciona tipagem estática.
-  **Vite**: Ferramenta moderna de construção para aplicativos web rápidos.
-  **Mantine UI**: Biblioteca de componentes React orientada para acessibilidade,
   oferecendo elementos funcionais, estilisticamente neutros e altamente personalizáveis.
-  **React Router**: Gerenciamento de rotas para aplicações React.
-  **ESLint**: Ferramenta de análise de código estática.

## Executando o Projeto

Para rodar o projeto localmente, siga estes passos:
1. Verifique se o Node.js e Yarn estão instalados.
2. Clone o repositório:

```bash
  git clone git@github.com:tdscolab/pensa-care.git
```
4.	Navegue até o diretório do projeto e instale as dependências:
   ```bash
      cd pensacare
      yarn install
   ```
4.	Inicie o servidor de desenvolvimento:
   ```bash
      yarn dev
   ```

## Construindo para Produção

Para construir o aplicativo para produção, execute:
  ```bash
  yarn build
  ```
Os arquivos de produção estarão no diretório `﻿dist`.

## Linting

Execute ESLint para análise de código estática:
  ```bash
  yarn lint
  ```
