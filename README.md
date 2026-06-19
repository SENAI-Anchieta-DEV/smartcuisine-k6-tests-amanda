# SmartCuisine - Testes de Performance com k6

Repositório destinado aos testes de performance da aplicação **SmartCuisine**, utilizando a ferramenta **k6**.

Os testes têm como objetivo validar comportamento, estabilidade e desempenho da API em diferentes cenários de carga.

---

## Tecnologias utilizadas

- [k6](https://k6.io/)
- JavaScript
- API SmartCuisine hospedada no Render

---

## Objetivos dos testes

Os testes realizados avaliam:

- Tempo de resposta da API
- Quantidade de requisições suportadas
- Comportamento com múltiplos usuários
- Resistência a cargas elevadas
- Estabilidade durante longos períodos

---

# Estrutura do projeto

```
smartcuisine-k6-tests

├── config
│   └── environments.js
│
├── helpers
│   ├── auth.js
│   ├── checks.js
│   └── payloads.js
│
├── tests
│
│   ├── Smoke
│   │   ├── 01-smoke-login.js
│   │   └── 02-smoke-cadastro.js
│   │
│   ├── Load
│   │   ├── 01-load-login.js
│   │   └── 02-load-cadastro.js
│   │
│   ├── Stress
│   │   └── Stress-fluxo-completo.js
│   │
│   ├── Spike
│   │   ├── 01-spike-login.js
│   │   └── 02-spike-cadastro.js
│   │
│   └── Soak
│       └── Soak-fluxo-completo.js
│
└── README.md
```

---

# Configuração de ambiente

Os testes utilizam configuração de ambiente através do arquivo:

```
config/environments.js
```

Exemplo:

```javascript
const environments = {

    local: {
        BASE_URL: "http://localhost:8080"
    },

    production: {
        BASE_URL: "https://abcgjl-smartcusine-backend-api.onrender.com"
    }

};
```

Por padrão os testes executam utilizando o ambiente de produção.

---

# Instalação

## Instalar k6

### Windows (Chocolatey)

```bash
choco install k6
```

Verificar instalação:

```bash
k6 version
```

---

# Executando os testes

## Smoke Test

Testes rápidos para validar se a API está funcionando.

### Login

```bash
k6 run tests/Smoke/01-smoke-login.js
```

### Cadastro

```bash
k6 run tests/Smoke/02-smoke-cadastro.js
```

---

## Load Test

Avalia o comportamento da aplicação com carga esperada.

### Login

```bash
k6 run tests/Load/01-load-login.js
```

### Cadastro

```bash
k6 run tests/Load/02-load-cadastro.js
```

---

## Stress Test

Valida o limite da aplicação aumentando a quantidade de usuários simultâneos.

```bash
k6 run tests/Stress/Stress-fluxo-completo.js
```

---

## Spike Test

Simula aumento repentino de usuários.

### Login

```bash
k6 run tests/Spike/01-spike-login.js
```

### Cadastro

```bash
k6 run tests/Spike/02-spike-cadastro.js
```

---

## Soak Test

Mantém uma carga constante por um período maior para verificar estabilidade.

```bash
k6 run tests/Soak/Soak-fluxo-completo.js
```

---

# Alterando a URL da API

Para testar outro ambiente:

## Local

```bash
k6 run -e ENV=local tests/Smoke/01-smoke-login.js
```

## Produção (Render)

```bash
k6 run -e ENV=production tests/Smoke/01-smoke-login.js
```

---

# Helpers

## payloads.js

Responsável pelos dados enviados nas requisições:

- login
- cadastro

## checks.js

Centraliza as validações dos retornos:

Exemplos:

- status HTTP esperado
- existência de token
- resposta da API

## auth.js

Responsável por funções relacionadas à autenticação.

---

# Cenários testados

| Teste | Objetivo |
|---|---|
| Smoke | Validar funcionamento básico |
| Load | Testar carga esperada |
| Stress | Testar limite da aplicação |
| Spike | Testar picos repentinos |
| Soak | Testar estabilidade prolongada |

---

# API utilizada

Backend:

```
https://abcgjl-smartcusine-backend-api.onrender.com
```

---

# Projeto SmartCuisine

Testes desenvolvidos para validação de qualidade e desempenho da aplicação SmartCuisine.