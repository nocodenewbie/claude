# PRD — Sistema de Força de Vendas
## Product Requirements Document · Versão 1.0

---

| Campo            | Valor                                      |
|------------------|--------------------------------------------|
| **Produto**      | VendaMax — Sistema de Força de Vendas      |
| **Versão**       | 1.0 (MVP — Fase 1)                         |
| **Status**       | Em aprovação                               |
| **Data**         | 2026-08-01                                 |
| **Product Owner**| —                                          |
| **Tech Lead**    | —                                          |
| **Revisão**      | 2026-08-15 (Sprint Planning)               |

---

## Sumário

1. [Resumo Executivo](#1-resumo-executivo)
2. [Contexto de Mercado](#2-contexto-de-mercado)
3. [Stakeholders e Matriz RACI](#3-stakeholders-e-matriz-raci)
4. [Personas e Jornadas](#4-personas-e-jornadas)
5. [Escopo — Fase 1 (MVP)](#5-escopo--fase-1-mvp)
6. [Requisitos Funcionais](#6-requisitos-funcionais)
7. [Requisitos Não-Funcionais](#7-requisitos-não-funcionais)
8. [Modelo de Dados](#8-modelo-de-dados)
9. [Arquitetura Técnica](#9-arquitetura-técnica)
10. [Wireframes Descritivos](#10-wireframes-descritivos)
11. [Épicos e User Stories — Backlog Inicial](#11-épicos-e-user-stories--backlog-inicial)
12. [Critérios de Aceite e Definição de Pronto](#12-critérios-de-aceite-e-definição-de-pronto)
13. [Roadmap de Fases](#13-roadmap-de-fases)
14. [Riscos e Mitigações](#14-riscos-e-mitigações)
15. [Glossário](#15-glossário)

---

## 1. Resumo Executivo

### 1.1 Problema de Negócio

Equipes de vendas externas de indústrias, distribuidoras e atacadistas enfrentam
três problemas críticos no processo de comercialização:

1. **Processo manual e descentralizado**: Vendedores anotam pedidos em papel,
   planilhas ou WhatsApp. O risco de erro de digitação, preço desatualizado e
   produto sem estoque é alto e só é descoberto no back-office.

2. **Falta de visibilidade gerencial em tempo real**: O gerente só toma
   conhecimento de pedidos horas ou dias depois do contato com o cliente. Não há
   dashboard consolidado de desempenho por vendedor, produto ou região.

3. **Catálogo e tabela de preços desatualizados**: Vendedores carregam catálogos
   físicos ou PDFs desatualizados. Promoções e rupturas de estoque não chegam ao
   campo em tempo hábil.

### 1.2 Solução Proposta

**VendaMax** é um sistema de força de vendas composto por:

- **Painel Gerencial Web**: Interface para gestores cadastrarem e controlarem
  produtos, clientes, pedidos, estoque, vendedores e resultados.
- **App Mobile (tablet/smartphone)**: Aplicativo para vendedores externos
  consultarem catálogo atualizado, registrarem pedidos em tempo real e
  acompanharem suas metas.

### 1.3 Valor Esperado (KPIs de Negócio)

| KPI                                    | Baseline (hoje) | Meta (6 meses) |
|----------------------------------------|-----------------|----------------|
| Tempo médio para registrar um pedido   | 15 min          | 3 min          |
| Taxa de erro em pedidos                | ~12%            | < 2%           |
| Visibilidade de pedidos em tempo real  | 0%              | 100%           |
| Tempo de resposta ao cliente           | 48h             | 2h             |
| Pedidos por vendedor/dia               | 8               | 14             |

---

## 2. Contexto de Mercado

### 2.1 Benchmarking de Players

| Player        | Mercado-alvo     | Diferencial                            | Fraqueza                        |
|---------------|------------------|----------------------------------------|---------------------------------|
| **Mercos**    | B2B Brasil       | Integração com 200+ ERPs, offline-first| Preço elevado para PMEs         |
| **Agendor**   | PME Brasil       | CRM mobile + mapa de clientes          | Fraco em gestão de estoque      |
| **Pipedrive** | Global/Brasil    | UX mobile excelente, rápido onboarding | Sem catálogo de produtos nativo |
| **Moskit**    | PME Brasil       | Pipeline visual + WhatsApp integrado   | Sem app de campo robusto        |
| **M-Force**   | Indústria Brasil | Tabela de preço por cliente offline    | Interface datada                |
| **WebMais SFA**| Distribuição BR | Roteirização + checklist de visita     | Dependente do ERP WebMais       |
| **inOne CRM** | Brasil           | Automação WhatsApp + IA                | Novo no mercado, less proven    |
| **Salesforce Field Service** | Enterprise | Robusto, configurável        | Complexidade e custo proibitivos|

### 2.2 Posicionamento do VendaMax

O VendaMax nasce para o segmento de **PMEs e médias empresas brasileiras** que:
- Têm 3 a 50 vendedores externos
- Vendem B2B (para revendas, varejistas ou outros negócios)
- Não possuem ou não querem depender de um ERP na Fase 1
- Precisam de **onboarding rápido** (< 1 semana) e **preço acessível**

**Diferencial competitivo na Fase 1:**
- Zero dependência de ERP — funciona standalone
- Interface mobile otimizada para campo (telas grandes, poucos cliques)
- Painel gerencial com visão consolidada em tempo real
- Configuração de múltiplas tabelas de preço por cliente

---

## 3. Stakeholders e Matriz RACI

### 3.1 Papéis e Responsabilidades

| Role                  | Descrição                                                                  |
|-----------------------|----------------------------------------------------------------------------|
| **CPO**               | Define visão de produto, aprova roadmap e priorizações macro               |
| **Product Manager**   | Escreve PRD, mantém backlog, prioriza sprints, aceita entregas             |
| **UX Designer**       | Pesquisa de usuário, wireframes, protótipos, design system, testes de usabilidade |
| **Tech Lead**         | Define arquitetura, revisa PRs críticos, garante decisões técnicas         |
| **Back-End Engineer** | Desenvolve API REST, banco de dados, regras de negócio, autenticação       |
| **Front-End Engineer**| Desenvolve Painel Gerencial Web (Next.js/React)                            |
| **Mobile Engineer**   | Desenvolve app mobile (React Native), offline sync, push notifications     |
| **QA Engineer**       | Escreve e executa testes funcionais, de regressão e de carga               |
| **Data Analyst**      | Define métricas, modela relatórios, cria dashboards de acompanhamento      |
| **Scrum Master**      | Facilita cerimônias ágeis, remove impedimentos, monitora velocidade de squad|
| **Gerente de Vendas** | Usuário-chave do Painel; valida fluxos, participa de testes de aceitação   |
| **Vendedor Externo**  | Usuário-final do App Mobile; participa de testes de campo                  |

### 3.2 Matriz RACI

*R = Responsável · A = Aprovador · C = Consultado · I = Informado*

| Entregável / Módulo               | CPO | PM  | UX  | Tech Lead | BE  | FE  | Mobile | QA  | DA  | SM  |
|-----------------------------------|-----|-----|-----|-----------|-----|-----|--------|-----|-----|-----|
| PRD e Requisitos                  | A   | R   | C   | C         | I   | I   | I      | C   | C   | I   |
| Pesquisa de Usuário               | I   | A   | R   | I         | I   | I   | I      | I   | C   | I   |
| Wireframes e Protótipos           | C   | A   | R   | C         | I   | C   | C      | I   | I   | I   |
| Design System / UI Kit            | I   | C   | R   | I         | I   | A   | A      | I   | I   | I   |
| Arquitetura e Modelo de Dados     | I   | C   | I   | A         | R   | C   | C      | I   | C   | I   |
| API REST (endpoints)              | I   | C   | I   | A         | R   | C   | C      | C   | I   | I   |
| Painel Gerencial Web              | I   | A   | C   | C         | C   | R   | I      | C   | I   | I   |
| App Mobile                        | I   | A   | C   | C         | C   | I   | R      | C   | I   | I   |
| Offline Sync                      | I   | C   | I   | A         | C   | I   | R      | C   | I   | I   |
| Testes Funcionais (QA)            | I   | A   | I   | C         | C   | C   | C      | R   | I   | I   |
| Relatórios e Dashboards           | I   | A   | C   | I         | C   | R   | I      | C   | R   | I   |
| Deploy e Infraestrutura           | I   | I   | I   | A         | R   | I   | I      | C   | I   | I   |
| Testes de Aceitação com Usuário   | A   | R   | C   | I         | I   | I   | I      | C   | I   | I   |
| Lançamento (Go-to-Market)         | A   | R   | I   | I         | I   | I   | I      | I   | C   | I   |

---

## 4. Personas e Jornadas

### 4.1 Persona 1 — Gerente de Vendas

**Nome fictício:** Ricardo Alves, 42 anos
**Cargo:** Gerente Comercial, distribuidora de produtos de limpeza, 18 vendedores externos
**Dispositivo:** Desktop (Chrome), eventualmente tablet

**Dores:**
- Recebe pedidos por WhatsApp e planilha; consolidação manual leva 2h/dia
- Não sabe em tempo real quanto cada vendedor vendeu no dia
- Tabela de preços é uma planilha Excel enviada por e-mail — vendedores usam versões antigas
- Dificuldade de identificar quais produtos têm mais ruptura de estoque

**Objetivos:**
- Ver num dashboard consolidado: faturamento do dia, pedidos pendentes e estoque crítico
- Cadastrar produtos e atualizar preços sem precisar de TI
- Acompanhar desempenho individual dos vendedores vs. meta
- Emitir relatório de vendas por período para a diretoria

**Frequência de uso:** Diária, 6-8 horas (Painel Web)

---

### 4.2 Persona 2 — Vendedor Externo

**Nome fictício:** Carla Mendes, 29 anos
**Cargo:** Representante Comercial, rota de 60 clientes ativos, São Paulo interior
**Dispositivo:** Smartphone Android mid-range + tablet Samsung ocasionalmente

**Dores:**
- Perde tempo ligando para o escritório para checar estoque e preço
- Catálogo físico pesa e desatualiza rápido
- Já perdeu venda por colocar produto que estava em falta
- Dificuldade de saber quanto falta para bater a meta

**Objetivos:**
- Registrar pedido em até 3 minutos na frente do cliente
- Consultar histórico de compras do cliente sem papel
- Ver em tempo real se o produto está disponível
- Acompanhar sua comissão e meta mensal

**Frequência de uso:** Diária, 8-10 horas fora do escritório (App Mobile)

---

### 4.3 Jornadas Principais

#### Jornada A — Vendedor fazendo um pedido no campo

```
[1] Vendedor chega ao cliente
    → Abre o app → Busca cliente por nome ou CNPJ

[2] Consulta histórico do cliente
    → Vê últimos pedidos → Identifica produtos recorrentes

[3] Monta o pedido
    → Adiciona produtos ao carrinho → Preço da tabela do cliente aplicado automaticamente
    → App avisa se produto está com estoque baixo

[4] Aplica condições comerciais
    → Seleciona prazo de pagamento → Aplica desconto autorizado

[5] Confirma e envia
    → Revisa resumo do pedido → Confirma → Pedido enviado via API
    → Cliente recebe confirmação por e-mail (opcional)
    → Vendedor vê comissão estimada atualizada
```

#### Jornada B — Gerente monitorando o dia

```
[1] Gerente abre o painel às 8h
    → Dashboard: pedidos registrados hoje, faturamento parcial, alertas de estoque

[2] Verifica vendedores em campo
    → Lista de vendedores com # pedidos e valor vendido até o momento

[3] Aprova pedido com desconto fora da política
    → Pedido marcado como "aguardando aprovação" → Gerente aprova ou rejeita com comentário

[4] Atualiza tabela de preços
    → Módulo Produtos → Seleciona tabela → Edita preço → Salva
    → App dos vendedores sincroniza automaticamente na próxima conexão

[5] Emite relatório
    → Relatórios → Vendas por período → Exporta PDF/XLSX
```

---

## 5. Escopo — Fase 1 (MVP)

### 5.1 O que está IN no MVP

#### Painel Gerencial Web
- [ ] Módulo de Autenticação (login, perfis, permissões básicas)
- [ ] Módulo de Produtos (CRUD completo com categorias e múltiplas tabelas de preço)
- [ ] Módulo de Clientes (CRUD com CNPJ/CPF, limite de crédito, condições comerciais)
- [ ] Módulo de Pedidos (visualização, aprovação, histórico, status)
- [ ] Módulo de Vendedores (CRUD, metas, territórios)
- [ ] Módulo de Estoque (controle de quantidade, alertas de estoque mínimo)
- [ ] Módulo de Relatórios (vendas por período, por vendedor, por produto, margem)
- [ ] Módulo de Configurações (empresa, usuários, roles)

#### App Mobile (React Native — iOS e Android)
- [ ] Autenticação e perfil do vendedor
- [ ] Catálogo de produtos com busca e filtro (offline-first)
- [ ] Lista de clientes da carteira do vendedor
- [ ] Histórico de pedidos por cliente
- [ ] Criação e envio de pedidos
- [ ] Dashboard pessoal (meta, pedidos do dia, comissão estimada)
- [ ] Sincronização automática ao recuperar conexão

### 5.2 O que está FORA do MVP (Fase 2+)

- Integração com ERP (TOTVS, SAP, Omie, Conta Azul, etc.)
- Emissão de NF-e / NFS-e
- Roteirização e otimização de rotas
- Assinatura digital de pedido pelo cliente
- Integração com meios de pagamento (Pix, boleto)
- CRM avançado (funil, oportunidades, follow-up automatizado)
- App para iOS — priorizamos Android no MVP (> 85% do mercado-alvo)
- BI e analytics avançado (Power BI embed, etc.)
- Multi-empresa / multi-filial

---

## 6. Requisitos Funcionais

*Prioridade: M=Must · S=Should · C=Could · W=Won't (MoSCoW)*

### 6.1 Autenticação e Controle de Acesso

| ID     | Requisito                                                          | Prior. | Role Responsável |
|--------|--------------------------------------------------------------------|--------|------------------|
| RF-001 | Sistema deve ter login por e-mail e senha com JWT                  | M      | BE Engineer      |
| RF-002 | Deve suportar roles: Admin, Gerente, Vendedor                      | M      | BE Engineer      |
| RF-003 | Admin pode criar, editar e desativar usuários                      | M      | FE + BE          |
| RF-004 | Sessão expira em 8h; refresh token válido por 30 dias              | M      | BE Engineer      |
| RF-005 | Log de auditoria de logins (usuário, IP, horário)                  | S      | BE Engineer      |
| RF-006 | Recuperação de senha por e-mail                                    | M      | BE Engineer      |
| RF-007 | Autenticação de dois fatores (2FA) via TOTP                        | C      | BE Engineer      |

### 6.2 Módulo de Produtos

| ID     | Requisito                                                          | Prior. | Role Responsável |
|--------|--------------------------------------------------------------------|--------|------------------|
| RF-010 | CRUD de produtos com: nome, SKU, descrição, categoria, unidade     | M      | FE + BE          |
| RF-011 | Upload de imagem do produto (máx 3 fotos, 5MB cada)               | M      | FE + BE          |
| RF-012 | CRUD de categorias e subcategorias (hierarquia 2 níveis)           | M      | FE + BE          |
| RF-013 | Produto deve ter status: Ativo, Inativo, Sem estoque               | M      | BE               |
| RF-014 | Suporte a múltiplas tabelas de preço (ex: Varejo, Atacado, VIP)    | M      | FE + BE          |
| RF-015 | Preço pode ser diferente por tabela por produto                    | M      | BE               |
| RF-016 | Estoque mínimo configurável por produto com alerta visual          | M      | FE + BE          |
| RF-017 | Importação de produtos via XLSX (template fornecido)               | S      | BE               |
| RF-018 | Exportação da lista de produtos em XLSX e PDF                      | S      | BE               |
| RF-019 | Histórico de alterações de preço por produto                       | S      | BE               |
| RF-020 | Campo de custo do produto (visível apenas para Admin/Gerente)      | M      | FE + BE          |

### 6.3 Módulo de Clientes

| ID     | Requisito                                                          | Prior. | Role Responsável |
|--------|--------------------------------------------------------------------|--------|------------------|
| RF-030 | CRUD de clientes com: razão social, CNPJ/CPF, endereço, contato   | M      | FE + BE          |
| RF-031 | Validação de CNPJ e CPF no cadastro                               | M      | FE + BE          |
| RF-032 | Busca de dados por CNPJ via API pública (Receita Federal)          | S      | BE               |
| RF-033 | Limite de crédito por cliente (valor monetário)                    | M      | FE + BE          |
| RF-034 | Condição de pagamento padrão por cliente (ex: 30/60/90 dias)       | M      | FE + BE          |
| RF-035 | Tabela de preço associada ao cliente                               | M      | BE               |
| RF-036 | Vendedor responsável associado ao cliente                          | M      | BE               |
| RF-037 | Status do cliente: Ativo, Inativo, Bloqueado                      | M      | BE               |
| RF-038 | Histórico de pedidos do cliente no painel                         | M      | FE + BE          |
| RF-039 | Classificação de cliente: categoria A/B/C (configurável)           | S      | FE + BE          |
| RF-040 | Importação de clientes via XLSX                                    | S      | BE               |
| RF-041 | Múltiplos endereços de entrega por cliente                         | S      | FE + BE          |

### 6.4 Módulo de Pedidos

| ID     | Requisito                                                          | Prior. | Role Responsável |
|--------|--------------------------------------------------------------------|--------|------------------|
| RF-050 | Visualização de todos os pedidos com filtros (status, data, vendedor) | M   | FE + BE          |
| RF-051 | Status do pedido: Rascunho, Aguardando Aprovação, Aprovado, Faturado, Cancelado | M | BE     |
| RF-052 | Gerente pode aprovar ou rejeitar pedido com comentário             | M      | FE + BE          |
| RF-053 | Pedido aprovado reserva estoque automaticamente                    | M      | BE               |
| RF-054 | Cancelamento de pedido reverte reserva de estoque                  | M      | BE               |
| RF-055 | Detalhe do pedido: itens, preços, descontos, total, condição       | M      | FE               |
| RF-056 | Regra de desconto máximo por vendedor (configurável pelo gerente)   | M      | BE               |
| RF-057 | Pedido com desconto acima do limite vai para aprovação automática   | M      | BE               |
| RF-058 | Exportação de pedido em PDF (folha de pedido)                      | S      | BE               |
| RF-059 | Envio de confirmação de pedido por e-mail para o cliente           | S      | BE               |
| RF-060 | Numeração automática de pedidos (sequencial com prefixo)           | M      | BE               |

### 6.5 Módulo de Vendedores

| ID     | Requisito                                                          | Prior. | Role Responsável |
|--------|--------------------------------------------------------------------|--------|------------------|
| RF-070 | CRUD de vendedores com: nome, e-mail, telefone, código             | M      | FE + BE          |
| RF-071 | Associar carteira de clientes ao vendedor                          | M      | BE               |
| RF-072 | Definir meta mensal de faturamento por vendedor                    | M      | FE + BE          |
| RF-073 | Percentual de comissão por vendedor (pode variar por produto/categoria) | S | BE             |
| RF-074 | Painel de desempenho do vendedor: pedidos, faturamento, meta %     | M      | FE + BE          |
| RF-075 | Desativar vendedor (mantém histórico, libera licença)              | M      | BE               |
| RF-076 | Território/região associada ao vendedor (campo livre)              | S      | FE + BE          |

### 6.6 Módulo de Estoque

| ID     | Requisito                                                          | Prior. | Role Responsável |
|--------|--------------------------------------------------------------------|--------|------------------|
| RF-080 | Quantidade em estoque por produto visível no painel               | M      | FE + BE          |
| RF-081 | Gerente pode ajustar estoque manualmente (entrada/saída com motivo)| M      | FE + BE          |
| RF-082 | Pedido aprovado deduz estoque automaticamente                      | M      | BE               |
| RF-083 | Alerta de estoque mínimo no dashboard do gerente                   | M      | FE + BE          |
| RF-084 | Histórico de movimentação de estoque por produto                   | S      | BE               |
| RF-085 | Relatório de estoque atual exportável em XLSX                      | S      | BE               |

### 6.7 Módulo de Relatórios

| ID     | Requisito                                                          | Prior. | Role Responsável |
|--------|--------------------------------------------------------------------|--------|------------------|
| RF-090 | Relatório de vendas por período (dia, semana, mês, customizado)    | M      | FE + BE + DA     |
| RF-091 | Relatório de vendas por vendedor com comparativo de meta           | M      | FE + BE + DA     |
| RF-092 | Relatório de vendas por produto (quantidade e valor)               | M      | FE + BE + DA     |
| RF-093 | Relatório de margem bruta por produto (custo vs. preço de venda)   | M      | FE + BE + DA     |
| RF-094 | Relatório de clientes inativos (sem pedido há X dias)              | S      | BE + DA          |
| RF-095 | Exportação de relatórios em PDF e XLSX                             | M      | BE               |
| RF-096 | Dashboard com cards: faturamento do dia, pedidos pendentes, estoque crítico | M | FE + BE + DA |

### 6.8 App Mobile — Catálogo e Pedido

| ID     | Requisito                                                          | Prior. | Role Responsável |
|--------|--------------------------------------------------------------------|--------|------------------|
| RF-100 | Autenticação com e-mail e senha; sessão persistente               | M      | Mobile           |
| RF-101 | Catálogo de produtos com busca por nome e SKU                      | M      | Mobile           |
| RF-102 | Catálogo disponível offline (última sincronização)                 | M      | Mobile + BE      |
| RF-103 | Imagens de produtos carregadas com lazy load; cache offline        | S      | Mobile           |
| RF-104 | Lista de clientes da carteira do vendedor logado                   | M      | Mobile + BE      |
| RF-105 | Busca de cliente por nome ou CNPJ/CPF                             | M      | Mobile           |
| RF-106 | Histórico dos últimos N pedidos do cliente selecionado             | M      | Mobile + BE      |
| RF-107 | Criação de pedido: seleção de cliente → adição de itens → revisão → envio | M | Mobile + BE |
| RF-108 | Preço da tabela correta aplicado automaticamente ao cliente        | M      | Mobile + BE      |
| RF-109 | Desconto manual no item (respeitando limite do vendedor)           | M      | Mobile + BE      |
| RF-110 | Indicador de estoque baixo no item (vermelho/amarelo)             | M      | Mobile           |
| RF-111 | Pedido criado offline armazenado localmente e sincronizado ao conectar | M  | Mobile + BE      |
| RF-112 | Indicador visual de modo offline no app                           | M      | Mobile           |
| RF-113 | Dashboard pessoal: meta do mês, faturamento, pedidos do dia       | M      | Mobile + BE      |
| RF-114 | Comissão estimada atualizada a cada pedido enviado                 | S      | Mobile + BE      |

---

## 7. Requisitos Não-Funcionais

### 7.1 Performance

| RNF    | Requisito                                                         | Responsável      |
|--------|-------------------------------------------------------------------|------------------|
| RNF-01 | Tempo de resposta da API < 300ms para 95% das requisições (p95)  | BE + Tech Lead   |
| RNF-02 | Dashboard do painel carrega em < 2s em conexão 10 Mbps           | FE               |
| RNF-03 | App mobile inicia e exibe catálogo em < 3s no modo offline        | Mobile           |
| RNF-04 | Sincronização de dados ao reconectar completa em < 10s (delta)    | Mobile + BE      |
| RNF-05 | API suporta até 500 requisições simultâneas sem degradação        | BE + Tech Lead   |

### 7.2 Segurança

| RNF    | Requisito                                                         | Responsável      |
|--------|-------------------------------------------------------------------|------------------|
| RNF-10 | Todas as comunicações via HTTPS/TLS 1.3                          | BE + Infra       |
| RNF-11 | Senhas armazenadas com bcrypt (cost factor >= 12)                 | BE               |
| RNF-12 | JWT com expiração; refresh token em cookie httpOnly               | BE               |
| RNF-13 | Rate limiting na API: 100 req/min por IP                          | BE               |
| RNF-14 | RBAC: vendedor não acessa dados de outros vendedores              | BE               |
| RNF-15 | Dados sensíveis (custo, margem) visíveis apenas para Admin/Gerente| BE + FE          |
| RNF-16 | Logs de auditoria imutáveis para operações críticas               | BE               |
| RNF-17 | Validação de input server-side para todos os endpoints            | BE               |

### 7.3 Disponibilidade e Confiabilidade

| RNF    | Requisito                                                         | Responsável      |
|--------|-------------------------------------------------------------------|------------------|
| RNF-20 | SLA de 99,5% de disponibilidade (excluindo janelas de manutenção) | Infra + Tech Lead|
| RNF-21 | Backup automático do banco de dados a cada 6h                     | Infra            |
| RNF-22 | App mobile funcional 100% offline para criação de pedidos         | Mobile           |
| RNF-23 | Recovery Time Objective (RTO): < 1h em caso de falha             | Infra + Tech Lead|

### 7.4 Usabilidade e Acessibilidade

| RNF    | Requisito                                                         | Responsável      |
|--------|-------------------------------------------------------------------|------------------|
| RNF-30 | App mobile segue guidelines HIG (iOS) e Material Design (Android) | Mobile + UX      |
| RNF-31 | Tamanho mínimo de elementos tocáveis: 44x44 dp                    | Mobile + UX      |
| RNF-32 | Painel web responsivo para telas >= 1024px                        | FE               |
| RNF-33 | Contraste de cores >= 4.5:1 (WCAG AA)                            | UX               |
| RNF-34 | Formulários com mensagens de erro claras e in-line                | FE + Mobile + UX |
| RNF-35 | App mobile suporta modo escuro (dark mode)                        | Mobile           |

### 7.5 Manutenibilidade

| RNF    | Requisito                                                         | Responsável      |
|--------|-------------------------------------------------------------------|------------------|
| RNF-40 | Cobertura de testes unitários >= 80% no back-end                  | BE + QA          |
| RNF-41 | Cobertura de testes de integração nas rotas críticas (pedidos)    | BE + QA          |
| RNF-42 | API documentada no padrão OpenAPI 3.0                             | BE               |
| RNF-43 | CI/CD pipeline com deploy automatizado em staging                 | Tech Lead + Infra|

---

## 8. Modelo de Dados

### 8.1 Diagrama Entidade-Relacionamento (textual)

```
┌──────────────┐     ┌──────────────────┐     ┌──────────────┐
│   Categoria  │1──N │     Produto      │1──N │  ProdutoFoto │
│──────────────│     │──────────────────│     └──────────────┘
│ id           │     │ id               │
│ nome         │     │ sku              │     ┌──────────────────┐
│ pai_id (FK)  │     │ nome             │1──N │ TabelaPrecoItem  │
└──────────────┘     │ descricao        │     │──────────────────│
                     │ categoria_id(FK) │     │ id               │
                     │ unidade_medida   │     │ produto_id (FK)  │
                     │ custo            │     │ tabela_id (FK)   │
                     │ estoque_atual    │     │ preco            │
                     │ estoque_minimo   │     └──────────────────┘
                     │ status           │            |
                     └──────────────────┘            |
                                               ┌─────┴──────────┐
┌──────────────┐                               │  TabelaPreco   │
│   Territorio │     ┌──────────────┐          │────────────────│
│──────────────│1──N │  Vendedor    │          │ id             │
│ id           │     │──────────────│          │ nome           │
│ nome         │     │ id           │          │ descricao      │
│ descricao    │     │ nome         │          └────────────────┘
└──────────────┘     │ email        │
                     │ telefone     │     ┌──────────────┐
                     │ codigo       │     │    Meta      │
                     │ territorio_id│1──N │──────────────│
                     │ comissao_pct │     │ id           │
                     │ desconto_max │     │ vendedor_id  │
                     │ usuario_id   │     │ mes_ano      │
                     │ status       │     │ valor_meta   │
                     └──────────────┘     └──────────────┘
                           |
                     ┌─────┴──────────────────────────────┐
                     │                                    │
              ┌──────┴───────┐                  ┌─────────┴──────┐
              │    Cliente   │                  │     Pedido     │
              │──────────────│                  │────────────────│
              │ id           │1──N pedidos      │ id             │
              │ razao_social │                  │ numero         │
              │ nome_fantasia│     ┌────────────│ cliente_id(FK) │
              │ cnpj_cpf     │     │            │ vendedor_id(FK)│
              │ email        │     │            │ tabela_id (FK) │
              │ telefone     │     │            │ status         │
              │ endereco_...│     │            │ desconto_total │
              │ limite_credito     │            │ total_bruto    │
              │ prazo_pagamento    │            │ total_liquido  │
              │ tabela_preco_id    │            │ obs            │
              │ vendedor_id(FK)    │            │ criado_em      │
              │ categoria_abc      │            │ aprovado_em    │
              │ status             │            │ aprovado_por   │
              └──────────────┘     │            └────────────────┘
                                   │                   |1
                                   │                   |N
                                   │            ┌──────┴──────────┐
                                   │            │   ItemPedido    │
                                   │            │─────────────────│
                                   │            │ id              │
                                   └────────────│ pedido_id (FK)  │
                                                │ produto_id (FK) │
                                                │ quantidade      │
                                                │ preco_unitario  │
                                                │ desconto_pct    │
                                                │ total           │
                                                └─────────────────┘

┌──────────────┐     ┌──────────────────┐     ┌───────────────────┐
│   Usuario    │     │  MovEstoque      │     │    AuditLog       │
│──────────────│     │──────────────────│     │───────────────────│
│ id           │     │ id               │     │ id                │
│ nome         │     │ produto_id (FK)  │     │ usuario_id (FK)   │
│ email        │     │ tipo (entrada/   │     │ acao              │
│ senha_hash   │     │       saida/ajuste│    │ entidade          │
│ role         │     │ quantidade       │     │ entidade_id       │
│ ativo        │     │ saldo_anterior   │     │ dados_antes       │
│ criado_em    │     │ saldo_apos       │     │ dados_depois      │
└──────────────┘     │ motivo           │     │ criado_em         │
                     │ pedido_id (FK)   │     └───────────────────┘
                     │ usuario_id (FK)  │
                     │ criado_em        │
                     └──────────────────┘
```

### 8.2 Definição das Entidades Principais

#### Produto
| Campo             | Tipo            | Regra                                      |
|-------------------|-----------------|--------------------------------------------|
| id                | UUID            | PK, gerado automaticamente                 |
| sku               | VARCHAR(50)     | Único, obrigatório                         |
| nome              | VARCHAR(200)    | Obrigatório                                |
| descricao         | TEXT            | Opcional                                   |
| categoria_id      | UUID FK         | Obrigatório                                |
| unidade_medida    | VARCHAR(20)     | Ex: UN, CX, KG, LT                         |
| custo             | DECIMAL(12,2)   | Visível apenas para Admin/Gerente          |
| estoque_atual     | DECIMAL(12,3)   | Atualizado automaticamente por pedidos     |
| estoque_minimo    | DECIMAL(12,3)   | Default 0; alerta quando estoque_atual <= minimo |
| status            | ENUM            | ATIVO, INATIVO, SEM_ESTOQUE                |
| criado_em         | TIMESTAMPTZ     | Auto                                       |
| atualizado_em     | TIMESTAMPTZ     | Auto                                       |

#### Cliente
| Campo             | Tipo            | Regra                                      |
|-------------------|-----------------|--------------------------------------------|
| id                | UUID            | PK                                         |
| razao_social      | VARCHAR(200)    | Obrigatório                                |
| nome_fantasia     | VARCHAR(200)    | Opcional                                   |
| cnpj_cpf          | VARCHAR(18)     | Validado; único                            |
| email             | VARCHAR(200)    | Para envio de confirmação de pedido        |
| telefone          | VARCHAR(20)     | —                                          |
| end_logradouro    | VARCHAR(200)    | —                                          |
| end_numero        | VARCHAR(20)     | —                                          |
| end_bairro        | VARCHAR(100)    | —                                          |
| end_cidade        | VARCHAR(100)    | —                                          |
| end_uf            | CHAR(2)         | —                                          |
| end_cep           | VARCHAR(9)      | —                                          |
| limite_credito    | DECIMAL(12,2)   | 0 = sem limite                             |
| prazo_pagamento   | VARCHAR(50)     | Ex: "30/60/90"                             |
| tabela_preco_id   | UUID FK         | Tabela padrão associada ao cliente         |
| vendedor_id       | UUID FK         | Vendedor responsável                       |
| categoria_abc     | CHAR(1)         | A, B ou C; classificação manual            |
| status            | ENUM            | ATIVO, INATIVO, BLOQUEADO                  |

#### Pedido
| Campo             | Tipo            | Regra                                      |
|-------------------|-----------------|--------------------------------------------|
| id                | UUID            | PK                                         |
| numero            | BIGINT          | Sequencial, único, gerado pelo backend     |
| cliente_id        | UUID FK         | Obrigatório                                |
| vendedor_id       | UUID FK         | Obrigatório                                |
| tabela_preco_id   | UUID FK         | Tabela usada no momento do pedido          |
| status            | ENUM            | RASCUNHO, AGUARDANDO_APROVACAO, APROVADO, FATURADO, CANCELADO |
| desconto_total    | DECIMAL(5,2)    | Percentual de desconto global (opcional)   |
| total_bruto       | DECIMAL(12,2)   | Calculado (soma dos itens antes do desconto)|
| total_liquido     | DECIMAL(12,2)   | Total após descontos                       |
| prazo_pagamento   | VARCHAR(50)     | Herdado do cliente; editável               |
| obs               | TEXT            | Observações do vendedor                    |
| criado_em         | TIMESTAMPTZ     | Auto                                       |
| aprovado_em       | TIMESTAMPTZ     | Preenchido na aprovação                    |
| aprovado_por_id   | UUID FK         | Usuário que aprovou                        |

---

## 9. Arquitetura Técnica

### 9.1 Stack Tecnológica Recomendada

| Camada             | Tecnologia                   | Justificativa                                      |
|--------------------|------------------------------|----------------------------------------------------|
| **API / Back-End** | Node.js + NestJS             | Tipagem forte (TypeScript), modular, amplo ecossistema |
| **Banco de Dados** | PostgreSQL 15                | ACID, JSON nativo, suporte a UUID, extenso mercado |
| **Cache / Session**| Redis                        | Cache de catálogo, sessões, rate limiting           |
| **Storage**        | S3 (ou compatível, ex: MinIO)| Imagens de produtos, arquivos gerados               |
| **Painel Web**     | Next.js 14 + Tailwind CSS    | SSR para SEO (futuro), React ecosystem, rápido     |
| **App Mobile**     | React Native + Expo          | Code sharing, acesso nativo a câmera, boa DX       |
| **DB Mobile**      | SQLite (via expo-sqlite)     | Offline-first, leve, eficiente                     |
| **E-mail**         | Resend (ou AWS SES)          | Transacional confiável, baixo custo                |
| **Autenticação**   | JWT + bcrypt                 | Stateless, amplamente testado                       |
| **Deploy**         | Railway ou Render (MVP)      | Simplicidade, custo-benefício para MVP             |
| **CI/CD**          | GitHub Actions               | Integrado ao repositório, gratuito para projetos   |
| **Monitoramento**  | Sentry + Datadog (ou Grafana)| Erros em produção + métricas de infraestrutura     |

### 9.2 Diagrama de Arquitetura

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENTES                              │
│                                                             │
│  ┌─────────────────┐         ┌────────────────────────┐    │
│  │  Painel Web     │         │    App Mobile          │    │
│  │  (Next.js)      │         │    (React Native)      │    │
│  │  browser        │         │    Android/iOS         │    │
│  └────────┬────────┘         └───────────┬────────────┘    │
│           │ HTTPS                        │ HTTPS           │
└───────────┼──────────────────────────────┼─────────────────┘
            │                              │
            ▼                              ▼
┌───────────────────────────────────────────────────────────┐
│                   API REST (NestJS)                        │
│                   JWT Authentication                       │
│                                                           │
│  /auth  /produtos  /clientes  /pedidos  /vendedores       │
│  /estoque  /relatorios  /tabelas-preco  /usuarios         │
│                                                           │
│  Rate Limiting · RBAC · Audit Log · Input Validation      │
└───────────────┬───────────────────────────────────────────┘
                │
        ┌───────┴────────────────────────────────┐
        │               │                        │
        ▼               ▼                        ▼
┌──────────────┐  ┌──────────┐          ┌───────────────┐
│  PostgreSQL  │  │  Redis   │          │  S3 Storage   │
│  (principal) │  │  (cache) │          │  (imagens)    │
└──────────────┘  └──────────┘          └───────────────┘

        ▼
┌──────────────────┐
│  E-mail Service  │
│  (Resend)        │
└──────────────────┘
```

### 9.3 Estratégia de Sincronização Offline (App Mobile)

```
ONLINE                              OFFLINE
─────                               ───────
App inicia → GET /sync/delta        App inicia → carrega SQLite local
  recebe: produtos, clientes,       
  pedidos recentes → salva SQLite   Vendedor cria pedido → salva
                                    em fila local (status: PENDING)

Pedido criado → POST /pedidos       
  → resposta 201 OK                 App detecta conexão → drena fila
  → atualiza SQLite                 → POST /pedidos para cada item
                                    → marca como SYNCED no SQLite

Sync delta a cada 30min (background)
  → busca mudanças desde last_sync_at
  → atualiza SQLite local
```

**Campos de controle de sync:**
- `last_sync_at`: timestamp da última sincronização bem-sucedida
- `sync_status`: SYNCED | PENDING | ERROR por entidade local
- `local_id`: UUID gerado no device antes do sync (resolvido pelo servidor)

---

## 10. Wireframes Descritivos

### 10.1 Painel Gerencial Web

#### Dashboard Principal (/)
```
┌──────────────────────────────────────────────────────────┐
│ [Logo VendaMax]          Ricardo Alves ▼    🔔  ?        │
├──────────────────────────────────────────────────────────┤
│ ← Sidebar    │  BOM DIA, RICARDO — Sex 01 Ago 2026       │
│              │                                           │
│ Dashboard ●  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ │
│ Produtos     │  │ R$ 48.2k │ │  34 ped. │ │  5 alert.│ │
│ Clientes     │  │ faturado │ │  hoje    │ │ estoque  │ │
│ Pedidos      │  │   hoje   │ │          │ │  baixo   │ │
│ Vendedores   │  └──────────┘ └──────────┘ └──────────┘ │
│ Estoque      │                                           │
│ Relatórios   │  PEDIDOS AGUARDANDO APROVAÇÃO (3)         │
│ Config       │  ┌─────────────────────────────────────┐  │
│              │  │ #1042 · Carlos Silva · R$ 3.200 ...│  │
│              │  │ #1041 · Farmácia Boa Vida · R$ 890 │  │
│              │  │ #1039 · Padaria Central · R$ 1.450 │  │
│              │  └─────────────────────────────────────┘  │
│              │                                           │
│              │  DESEMPENHO HOJE — VENDEDORES             │
│              │  ┌─────────────────────────────────────┐  │
│              │  │ Carla Mendes   ████████░░  80%  R$ 9.6k│
│              │  │ João Ferreira  ██████░░░░  60%  R$ 7.2k│
│              │  │ Ana Costa      █████░░░░░  50%  R$ 6.0k│
│              │  └─────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────┘
```

#### Lista de Produtos (/produtos)
```
┌──────────────────────────────────────────────────────────┐
│ Produtos                           [+ Novo Produto]      │
├──────────────────────────────────────────────────────────┤
│ Buscar...  [Categoria ▼] [Status ▼]      Exportar XLSX   │
├──────────────────────────────────────────────────────────┤
│ □  Foto  SKU        Nome              Estoque  Status  ⋮ │
│ □  [img] SKU-001    Detergente 500ml   240 UN  Ativo   ⋮ │
│ □  [img] SKU-002    Amaciante 2L        12 UN  ⚠Baixo  ⋮ │
│ □  [img] SKU-003    Sabão Pó 1kg         0 UN  SemEst  ⋮ │
├──────────────────────────────────────────────────────────┤
│ Mostrando 1-20 de 158    [<] 1 2 3 ... 8 [>]            │
└──────────────────────────────────────────────────────────┘
```

#### Formulário de Novo/Editar Pedido — Painel (/pedidos/novo)
```
┌────────────────────────────────────────────────────────────┐
│ Pedido #1043 · RASCUNHO             [Cancelar] [Aprovar ▶]│
├──────────────┬─────────────────────────────────────────────┤
│ CLIENTE      │ Farmácia Saúde Total                        │
│              │ CNPJ 12.345.678/0001-99 · Limite R$ 10.000 │
│              │ Tabela: Varejo · Prazo: 30/60 dias          │
├──────────────┴─────────────────────────────────────────────┤
│ ITENS DO PEDIDO                                            │
│ [+ Adicionar produto]                                      │
│ ─────────────────────────────────────────────────────────  │
│ Detergente 500ml (SKU-001)  Qtd: [10]  R$ 3,50 = R$ 35,00│
│ Amaciante 2L (SKU-002)      Qtd: [5 ]  R$ 8,90 = R$ 44,50│
│ ─────────────────────────────────────────────────────────  │
│ Desconto geral: [0]%        Subtotal:          R$ 79,50   │
│                             Desconto:          R$  0,00   │
│                             TOTAL:             R$ 79,50   │
├────────────────────────────────────────────────────────────┤
│ Obs: Entregar até dia 05/08                                │
└────────────────────────────────────────────────────────────┘
```

---

### 10.2 App Mobile

#### Tela de Home / Dashboard do Vendedor
```
┌─────────────────────┐
│ Boa tarde, Carla ☀ │
│ Sex, 01 Ago 2026    │
├─────────────────────┤
│  META DO MÊS        │
│  ████████░░  78%    │
│  R$ 31.2k / R$ 40k  │
├─────────────────────┤
│  HOJE               │
│  12 pedidos  R$ 9.6k│
│  Comissão: R$ 288   │
├─────────────────────┤
│ [📋 Novo Pedido]    │
│ [👥 Clientes]       │
│ [📦 Catálogo]       │
│ [📊 Meus Pedidos]   │
└─────────────────────┘
```

#### Tela de Seleção de Cliente (ao iniciar pedido)
```
┌─────────────────────┐
│ ← Novo Pedido       │
│ 🔍 Buscar cliente.. │
├─────────────────────┤
│ Recentes            │
│ ─────────────────── │
│ Farmácia Saúde Total│
│ CNPJ 12.345.678...  │
│ Últ. pedido: ontem  │
│ ─────────────────── │
│ Mercadinho São João │
│ CNPJ 98.765.432...  │
│ Últ. pedido: 25/07  │
│ ─────────────────── │
│ Padaria Central     │
│ CNPJ 11.222.333...  │
│ Últ. pedido: 23/07  │
└─────────────────────┘
```

#### Tela de Adição de Itens ao Pedido
```
┌─────────────────────┐
│ ← Farmácia S. Total │
│ 🔍 Buscar produto.. │
│ [Todos ▼] [A-Z ▼]  │
├─────────────────────┤
│ Detergente 500ml    │
│ SKU-001 · 240 em est│
│ R$ 3,50    [+] [−] 0│
│ ─────────────────── │
│ Amaciante 2L        │
│ SKU-002 · ⚠ 12 est  │
│ R$ 8,90    [+] [−] 0│
│ ─────────────────── │
│ Sabão Pó 1kg        │
│ SKU-003 · ✖ Sem est │
│ R$ 4,20    indispon.│
├─────────────────────┤
│ 3 itens  R$ 79,50   │
│ [Ver Carrinho ▶]    │
└─────────────────────┘
```

---

## 11. Épicos e User Stories — Backlog Inicial

### 11.1 Épicos

| ID   | Épico                               | Módulo          | Prioridade |
|------|-------------------------------------|-----------------|------------|
| EP-1 | Autenticação e Controle de Acesso   | Painel + Mobile | Alta       |
| EP-2 | Gestão de Produtos e Preços         | Painel          | Alta       |
| EP-3 | Gestão de Clientes                  | Painel + Mobile | Alta       |
| EP-4 | Criação e Gestão de Pedidos (Web)   | Painel          | Alta       |
| EP-5 | App Mobile — Catálogo e Pedidos     | Mobile          | Alta       |
| EP-6 | Gestão de Vendedores e Metas        | Painel          | Média      |
| EP-7 | Controle de Estoque                 | Painel          | Média      |
| EP-8 | Relatórios e Dashboard              | Painel          | Média      |
| EP-9 | Offline Sync e Push Notifications   | Mobile          | Alta       |

---

### 11.2 User Stories — Sprint 1 (Semanas 1-2)

*Foco: Fundação — autenticação, CRUD de produtos e clientes*

---

**US-001** · EP-1 · [M]
> **Como** administrador do sistema,
> **quero** criar usuários com roles (Admin, Gerente, Vendedor),
> **para que** cada pessoa acesse apenas as funcionalidades do seu perfil.

**Critérios de aceite:**
- [ ] Admin pode criar usuário informando nome, e-mail, role e senha temporária
- [ ] Usuário novo recebe e-mail com link de primeiro acesso (expira em 24h)
- [ ] Role Admin: acesso total; Gerente: sem Config de usuários; Vendedor: sem painel gerencial
- [ ] Usuário desativado não consegue logar

---

**US-002** · EP-2 · [M]
> **Como** gerente de vendas,
> **quero** cadastrar produtos com nome, SKU, categoria, custo e imagens,
> **para que** os vendedores tenham catálogo atualizado no app.

**Critérios de aceite:**
- [ ] Formulário valida SKU único; exibe erro inline se duplicado
- [ ] Aceita até 3 imagens (JPG/PNG, máx 5MB cada); mostra preview antes de salvar
- [ ] Custo é campo obrigatório mas visível apenas para Admin e Gerente
- [ ] Produto salvo com status ATIVO por padrão
- [ ] Produto aparece imediatamente na listagem após salvar

---

**US-003** · EP-2 · [M]
> **Como** gerente de vendas,
> **quero** criar e gerenciar tabelas de preço (ex: Varejo, Atacado),
> **para que** clientes diferentes vejam preços distintos.

**Critérios de aceite:**
- [ ] Posso criar N tabelas de preço com nome e descrição
- [ ] Em cada tabela, posso definir preço de venda para cada produto
- [ ] Produto sem preço definido em uma tabela herda preço da tabela padrão
- [ ] Alteração de preço em uma tabela não afeta outras tabelas

---

**US-004** · EP-3 · [M]
> **Como** gerente de vendas,
> **quero** cadastrar clientes com CNPJ/CPF, limite de crédito e tabela de preço,
> **para que** os vendedores façam pedidos com condições corretas para cada cliente.

**Critérios de aceite:**
- [ ] CNPJ validado pelo algoritmo da Receita Federal; CPF validado também
- [ ] Campo "Tabela de Preço" exibe as tabelas cadastradas no módulo Produtos
- [ ] Limite de crédito 0 significa "sem limite"
- [ ] Status ATIVO por padrão; gerente pode bloquear cliente (vendedor vê aviso no app)

---

### 11.3 User Stories — Sprint 2 (Semanas 3-4)

*Foco: Pedidos no painel web e app mobile básico*

---

**US-010** · EP-4 · [M]
> **Como** gerente de vendas,
> **quero** visualizar todos os pedidos com filtros de status e data,
> **para que** eu possa monitorar o funil de pedidos em tempo real.

**Critérios de aceite:**
- [ ] Lista exibe: número, cliente, vendedor, valor total, status, data
- [ ] Filtros: por status (multi-select), por vendedor, por período de data
- [ ] Pedidos em "Aguardando Aprovação" exibem badge em destaque
- [ ] Clicar no pedido abre detalhe com todos os itens

---

**US-011** · EP-4 · [M]
> **Como** gerente de vendas,
> **quero** aprovar ou rejeitar pedidos que ultrapassam o desconto máximo do vendedor,
> **para que** eu mantenha controle sobre a margem das vendas.

**Critérios de aceite:**
- [ ] Pedido com desconto acima do limite do vendedor vai automaticamente para "Aguardando Aprovação"
- [ ] Gerente vê desconto aplicado, desconto máximo do vendedor e diferença
- [ ] Ao rejeitar, gerente obrigatoriamente informa motivo (textarea, min 10 chars)
- [ ] Vendedor recebe notificação push ao ter pedido aprovado ou rejeitado
- [ ] Aprovação registra usuário aprovador e horário no pedido

---

**US-020** · EP-5 · [M]
> **Como** vendedor externo,
> **quero** visualizar o catálogo completo de produtos no meu smartphone,
> **para que** eu possa apresentar produtos ao cliente sem precisar de sinal de internet.

**Critérios de aceite:**
- [ ] Catálogo sincronizado no primeiro login e atualizado a cada 30 min em background
- [ ] Busca por nome e SKU funciona 100% offline
- [ ] Produto com estoque zero exibe badge "Sem Estoque" e não pode ser adicionado ao pedido
- [ ] Produto com estoque abaixo do mínimo exibe badge amarelo "Estoque Baixo"
- [ ] Imagens carregam do cache offline; ícone placeholder se sem cache

---

**US-021** · EP-5 · [M]
> **Como** vendedor externo,
> **quero** criar um pedido selecionando um cliente e adicionando produtos com quantidades,
> **para que** eu registre a venda diretamente no sistema sem papel ou planilha.

**Critérios de aceite:**
- [ ] Fluxo: Selecionar cliente → Adicionar itens → Revisar → Confirmar envio
- [ ] Preço aplicado automaticamente conforme tabela do cliente selecionado
- [ ] Desconto por item: máximo definido pelo gerente para o vendedor; alerta se exceder
- [ ] Total atualizado em tempo real a cada item adicionado/removido
- [ ] Em modo offline: pedido salvo localmente com status "Pendente de envio"
- [ ] Ao reconectar: pedido é enviado automaticamente; vendedor recebe confirmação toast

---

### 11.4 User Stories — Sprint 3 (Semanas 5-6)

*Foco: Estoque, metas de vendedores e relatórios*

---

**US-030** · EP-6 · [M]
> **Como** gerente de vendas,
> **quero** definir meta mensal de faturamento por vendedor,
> **para que** eu e o vendedor acompanhem o progresso no painel e no app.

---

**US-031** · EP-7 · [M]
> **Como** gerente de vendas,
> **quero** fazer ajuste manual de estoque (entrada ou saída) com motivo,
> **para que** o estoque no sistema reflita o estoque físico após inventário.

---

**US-032** · EP-8 · [M]
> **Como** gerente de vendas,
> **quero** ver um relatório de vendas por período com filtro por vendedor e produto,
> **para que** eu apresente resultados para a diretoria com dados confiáveis.

---

## 12. Critérios de Aceite e Definição de Pronto

### 12.1 Definição de Pronto (DoD) — Geral

Uma User Story só é considerada PRONTA quando:

- [ ] Código desenvolvido e revisado via Pull Request (mínimo 1 aprovação)
- [ ] Testes unitários escritos para a lógica de negócio (cobertura >= 80% no módulo)
- [ ] Testes de integração escritos para o(s) endpoint(s) envolvidos
- [ ] QA executou testes funcionais e não há bugs críticos ou bloqueadores abertos
- [ ] Critérios de aceite da story verificados por QA e Product Manager
- [ ] Sem regressão em funcionalidades já entregues (smoke test)
- [ ] Código deployado em staging e validado pelo PM
- [ ] Documentação da API atualizada (OpenAPI) se endpoint novo/alterado
- [ ] Aprovação do Gerente de Vendas em caso de features de negócio crítico

### 12.2 DoD Adicional — App Mobile

- [ ] Testado em dispositivo físico Android (mínimo 1 device mid-range)
- [ ] Testado em modo avião (offline) e testado retomando conexão
- [ ] Performance: sem janks visíveis ao scrollar listas de 100+ itens

### 12.3 DoD Adicional — Relatórios

- [ ] Dados validados com query manual no banco de dados
- [ ] Exportação testada (PDF e XLSX abrem sem erros)
- [ ] Data Analyst validou que métricas estão corretas

---

## 13. Roadmap de Fases

```
2026        AGO         SET         OUT         NOV         DEZ
            ────────────────────────────────────────────────────
FASE 1      ████████████████████████████████████████
(MVP)
            Sprint 1    Sprint 2    Sprint 3    QA/UAT   Launch
            Fundação    Pedidos     Relat.      Stress    MVP
            Auth+CRUD   Mobile+Web  Estoque     Test

2027        JAN         FEV         MAR         ABR
            ────────────────────────────────────────
FASE 2      ████████████████████████████████████████
(Integração)
            Integração  NF-e        Pagamento   iOS App
            ERP APIs    Fiscal      (Pix/boleto)
            Webhook     DANFE       

2027        MAI         JUN         JUL         AGO
            ────────────────────────────────────────
FASE 3      ████████████████████████████████████████
(Inteligência)
            Roteirização  BI Embed  AI Suggest  Multi-filial
            GPS/Mapas     Dashboards Recompra   RBAC avançado
```

### 13.1 Marcos (Milestones)

| Marco | Data       | Entrega                                    | Aprovador |
|-------|------------|--------------------------------------------|-----------|
| M1    | 2026-08-15 | PRD aprovado, design system iniciado       | CPO + PM  |
| M2    | 2026-08-29 | Sprint 1 entregue em staging (auth + CRUD) | PM + QA   |
| M3    | 2026-09-12 | Sprint 2 entregue (pedidos web + app MVP)  | PM + QA   |
| M4    | 2026-09-26 | Sprint 3 entregue (estoque + relatórios)   | PM + QA   |
| M5    | 2026-10-10 | UAT com Gerente de Vendas + Vendedores     | PM + PO   |
| M6    | 2026-10-24 | Go-live Fase 1 (produção)                  | CPO       |

---

## 14. Riscos e Mitigações

| ID  | Risco                                              | Prob. | Impacto | Score | Mitigação                                                   | Owner        |
|-----|----------------------------------------------------|-------|---------|-------|-------------------------------------------------------------|--------------|
| R01 | Sincronia offline com conflitos de dados           | Alta  | Alto    | 9     | Estratégia last-write-wins com flag de conflito para revisão do gerente | Mobile Eng + BE |
| R02 | Resistência dos vendedores em adotar o app        | Média | Alto    | 6     | Onboarding presencial; app intuitivo; treinar campeões internos | PM + Gerente |
| R03 | Performance degradada com catálogo > 500 produtos  | Média | Médio   | 4     | Paginação virtual no app; índices no banco; lazy load imagens | BE + Mobile  |
| R04 | Escopo expandido durante desenvolvimento          | Alta  | Alto    | 9     | Change control rigoroso; novas features vão para Fase 2     | PM           |
| R05 | Dados de clientes/pedidos vazados                  | Baixa | Alto    | 3     | RBAC estrito; HTTPS; JWT; audit log; pentest antes do go-live | Tech Lead    |
| R06 | Prazo de desenvolvimento subestimado               | Média | Alto    | 6     | Buffer de 10% em cada sprint; QA paralelo ao desenvolvimento | PM + SM      |
| R07 | Custo de infraestrutura acima do orçado            | Baixa | Médio   | 2     | Começar com Railway (fixo); monitorar uso; escalar sob demanda | Tech Lead    |
| R08 | Desafio de validação de CNPJ sem API confiável     | Média | Baixo   | 2     | Validação por algoritmo local (não depende de API externa no MVP) | BE           |

---

## 15. Glossário

| Termo               | Definição                                                                           |
|---------------------|-------------------------------------------------------------------------------------|
| **SFA**             | Sales Force Automation — automação de força de vendas                               |
| **B2B**             | Business-to-Business — venda entre empresas                                          |
| **SKU**             | Stock Keeping Unit — código único de identificação de produto                        |
| **Tabela de Preço** | Conjunto de preços por produto, podendo ser diferente por tipo de cliente            |
| **Offline-first**   | Arquitetura onde o app funciona completamente sem internet e sincroniza depois       |
| **Delta sync**      | Sincronização apenas das mudanças desde a última sync (não re-envia tudo)           |
| **CNPJ**            | Cadastro Nacional de Pessoas Jurídicas — identificador fiscal de empresas no Brasil  |
| **CPF**             | Cadastro de Pessoas Físicas — identificador fiscal de pessoas físicas no Brasil      |
| **RBAC**            | Role-Based Access Control — controle de acesso baseado em papéis                    |
| **JWT**             | JSON Web Token — token de autenticação stateless                                     |
| **MoSCoW**          | Método de priorização: Must, Should, Could, Won't                                   |
| **DoD**             | Definition of Done — critérios que definem uma entrega como completa                |
| **UAT**             | User Acceptance Testing — teste de aceitação com usuários reais                     |
| **PRD**             | Product Requirements Document — documento de requisitos de produto                   |
| **RACI**            | Responsible, Accountable, Consulted, Informed — matriz de responsabilidades          |
| **MVP**             | Minimum Viable Product — versão mínima viável do produto                            |
| **p95**             | Percentil 95 — 95% das requisições respondem abaixo deste tempo                     |
| **CI/CD**           | Continuous Integration/Continuous Delivery — integração e entrega contínua          |
| **Carteira**        | Conjunto de clientes sob responsabilidade de um vendedor específico                  |
| **Comissão**        | Percentual do valor vendido pago ao vendedor como remuneração variável              |
| **Ruptura**         | Falta de um produto no estoque (ruptura de estoque)                                 |
| **Aprovação**       | Fluxo em que pedidos acima do desconto máximo aguardam liberação do gerente         |
| **Tabela Padrão**   | Tabela de preço usada quando o cliente não tem tabela específica associada          |
