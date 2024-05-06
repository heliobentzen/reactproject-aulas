status: Accepted
date: 2024-04-10
deciders: marcio@tds.company

# AD: Qual o design pattern mais adequado para o Pensacare

## Context
Qual o padrão de codificação adequado para a aplicação do Pensacare?
## Considered Options
* O MVP consiste em exibição de cadastros de clientes, usuários, itens e serviços.
* Há também entregas constantes a cada 15 dias com poucas horas disponíveis para implementação por parte do time de desenvolvimento

## Decision Outcome
Por questão de simplicidade fica decidido pelo uso do MVC para criação da API do Pensacare

### Consequences
O código não ficará tão modularizado como em outros tipos de arquitetura como clean ou hexagonal.


---
status: Accepted
date: 2024-04-24
deciders: marcio@tds.company
consulted: daniel.sena@tds.company
---

# AD: Qual a forma de comunicação com o banco de dados do Pensacare do Protheus?

## Context
A aplicação Pensacare API precisa se comunicar com um banco de dados Microsoft SQL Server que é acessível 
apenas através de uma VPN. 

## Considered Options
* Inclusão na aplicação de mais um conector JPA para conectar diretamente ao Microsoft SQL Server
* Inclusão de script externo que conecta no Microsoft SQL Server 

## Decision Outcome
A configuração de dois datasources no Springdata JPA para fazer com que a aplicação se conectasse no banco MSSQL seria
mais complexa do que disponibilizar um script python externo que conecta na bases e extrai os dados para um outro schema no Postgres
ao qual a aplicação já teria acesso.

## Consequences
Será necessário desenvoolver um script python simples que exporta o dado do MSSQL Server para o Postgres schema external

---
Foi necessário modificar o arquivo .ovpn para, ao invés de cipher para data-ciphers-fallback 