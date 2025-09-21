🎤 **ROTEIRO DE APRESENTAÇÃO COMPLETA - ADP INNOVATION LABS CHALLENGE**

## **⏱ CRONÔMETRO TOTAL: 15-20 MINUTOS**

### **⏱ 0:00 – 0:30 | APRESENTAÇÃO PESSOAL**

"Olá a todos! Meu nome é Aline, e estou muito animada para estar aqui hoje apresentando minha solução para o ADP Innovation Labs Challenge.

Antes de começarmos, gostaria de mencionar que esta é minha primeira entrevista em inglês, e também minha primeira entrevista em cerca de quatro anos, já que trabalhei na mesma empresa por muito tempo. Então, se em algum momento eu não entender algo, peço gentilmente que repitam ou falem um pouco mais devagar. E se não me entenderem, sintam-se à vontade para me pedir para repetir também.

Estou muito feliz por estar aqui e ter a oportunidade de conversar com vocês hoje."

### **⏱ 0:30 – 1:00 | INTRODUÇÃO DO PROJETO**

Hoje vou mostrar como resolvi o desafio da ADP. Quando recebi a tarefa, a primeira coisa que fiz foi analisar o que realmente fazia sentido. Pensei: devo construir uma arquitetura mais robusta para mostrar tudo que sei sobre configuração e boas práticas? Ou devo seguir o caminho mais simples?

Escolhi uma **abordagem simples e direta**, focando na resolução do problema como foi definido na tarefa. Embora tenha conhecimento para implementar arquiteturas mais complexas, entendi que o melhor aqui era seguir o que foi pedido: **simplicidade e eficiência**."

### Filosofia do Projeto

"Optei por uma abordagem **simples e direta**, focando na resolução do problema como foi definido na tarefa. Embora tenha conhecimento para implementar arquiteturas mais complexas, entendi que o melhor aqui era seguir o que foi pedido: **simplicidade e eficiência**."

"Até porque no dia a dia surgem muitas vezes tarefas que precisam desse tipo de foco e abordagem, como a resolução de algum problema em produção, onde precisamos agir rapidamente e focar no problema central sem over-engineering."

### Decisões Estratégicas

- **Foco no essencial**: Resolver o problema sem over-engineering
- **Código limpo**: Legibilidade e manutenibilidade
- **Documentação clara**: Para facilitar revisão e entendimento

---

## **⏱ 1:00 – 2:00 | 2. ARQUITETURA E ESTRUTURA**

"Deixe-me mostrar a estrutura do projeto e explicar minhas decisões arquiteturais..."

### Por que esta arquitetura?

```
adp-challenge/
├── index.js                    # Entry point centralizado
├── services/                   # Separação de responsabilidades
│   ├── apiService.js          # Comunicação HTTP
│   └── transactionService.js  # Lógica de negócio
├── utils/                     # Utilitários reutilizáveis
│   └── logger.js              # Sistema de logging
├── tests/                     # Testes organizados
└── swagger-static.js          # Interface de documentação
```

**Decisão**: Separação clara de responsabilidades sem complexidade desnecessária.

---

## **⏱ 2:00 – 4:00 | 3. ESCOLHA DE DEPENDÊNCIAS**

### Package.json - Por que apenas axios e dotenv?

```json
{
  "dependencies": {
    "axios": "^1.12.2",
    "dotenv": "^17.2.2"
  }
}
```

#### Axios

- **HTTP Client robusto**: Melhor que fetch nativo porque:
  - **Interceptors**: Logging automático sem código adicional
  - **Error handling**: Tratamento unificado de erros HTTP
  - **Timeout**: Controle de tempo de resposta
  - **JSON parsing**: Automático (fetch precisa de .json())

#### Contras do Axios:

- **Dependência extra**: Adiciona ~50KB ao bundle
- **Overhead**: Pode ser overkill para projetos muito simples
- **Learning curve**: Precisa conhecer a API do Axios

#### Contras do fetch nativo:

- **Mais código**: Precisa implementar logging, retry e error handling manualmente
- **JSON parsing**: Precisa chamar .json() em cada resposta
- **Error handling**: HTTP 4xx/5xx não são rejeitados automaticamente
- **Timeout**: Precisa usar AbortController para timeout
- **Interceptors**: Não existe, precisa implementar manualmente

#### Dotenv

- **Configuração flexível**: Diferentes ambientes (dev/prod)
- **Best practices**: Padrão da indústria
- **Demonstra conhecimento**: Mostra experiência profissional
- **Escalabilidade**: Fácil configuração para produção

---

## **⏱ 4:00 – 6:00 | 4. SWAGGER UI - POR QUE IMPLEMENTEI?**

### Motivação

- **Demonstração visual**: Interface profissional para testes
- **Documentação interativa**: Facilita revisão do código
- **Testes em tempo real**: Validação imediata da funcionalidade
- **Diferencial técnico**: Mostra conhecimento de ferramentas modernas

### Implementação

- **Sem frameworks**: Usando apenas Node.js HTTP nativo
- **Auto port detection**: Tenta portas 3000, 3001, etc.
- **Interface limpa**: Removida barra de busca para foco no essencial

---

## **⏱ 4:00 – 6:00 | 5. SISTEMA DE LOGGING (utils/logger.js)**

### Por que um logger customizado?

#### Benefícios

- **Controle de ambiente**: Logs diferentes para dev/prod/test
- **Formatação consistente**: Padrão profissional
- **Níveis de log**: INFO, SUCCESS, ERROR, WARNING, DEBUG
- **Performance**: Logs condicionais por ambiente

#### Alternativas consideradas

- **Console.log simples**: Muito básico para projeto profissional
- **Winston**: Over-engineering para este projeto
- **Logger customizado**: Equilíbrio perfeito

---

## **⏱ 6:00 – 8:00 | 6. API SERVICE (services/apiService.js)**

### Funcionalidades implementadas

#### 1. Configuração HTTP

#### 2. Interceptors para Logging

- **Request interceptor**: Log de requisições com timestamp
- **Response interceptor**: Log de respostas com duração
- **Error interceptor**: Tratamento centralizado de erros

#### 3. Retry Logic

// Implementação de retry com backoff

#### 4. Métodos principais

- **fetchTaskData()**: Busca dados da API
- **submitResults()**: Submete resultados
- **Retry automático**: Para falhas de rede

---

## **⏱ 6:00 – 8:00 | 7. TRANSACTION SERVICE (services/transactionService.js)**

### Lógica de negócio implementada

#### 1. Análise de Transações

```javascript
findTopEarnerFromLastYear(transactions) -
// Filtra transações do ano anterior
```

#### 2. Filtragem Alpha

```javascript
filterAlphaTransactions(transactions, employeeId) {
  // Filtra apenas transações alpha do top earner
  // Considera apenas o ano anterior
}
```

#### 3. Validações

- **Ano correto**: Apenas transações do ano anterior
- **Employee ID**: Filtra por funcionário específico
- **Tipo alpha**: Apenas transações do tipo "alpha"

---

## **⏱ 8:00 – 10:00 | 8. TESTES (tests/test.js)**

### Por que testes simples?

```javascript
// Teste com dados mockados
const mockTransactions = [
  {
    transactionID: "TX_001",
    amount: 1000,
    type: "alpha",
    timeStamp: "2024-01-01T00:00:00.000Z",
    employee: { id: "EMP001", name: "John Doe" },
  },
];
```

#### Estratégia de teste

- **Dados controlados**: Mock data para testes previsíveis
- **Cenários específicos**: Testa lógica de negócio
- **Validação de resultados**: Confirma comportamento esperado

#### Por que não testes mais complexos?

- **Foco no essencial**: A tarefa é sobre lógica, não sobre testing
- **Simplicidade**: Testes que qualquer um pode entender
- **Funcionalidade**: Valida que o código funciona

---

## **⏱ 8:00 – 10:00 | 9. PASSO A PASSO DA SOLUÇÃO**

### Como resolvi o desafio:

**1. Análise do Problema:**

- ✅ **Entendi os requisitos**: Encontrar top earner do ano anterior
- ✅ **Identifiquei os dados**: 699 transações com diferentes funcionários
- ✅ **Defini o objetivo**: Filtrar transações alpha do top earner

**2. Estruturação da Solução:**

- ✅ **Separação de responsabilidades**: API Service vs Transaction Service
- ✅ **Fluxo linear**: 4 passos bem definidos
- ✅ **Error handling**: Tratamento de erros em cada etapa

**3. Implementação:**

- ✅ **API Service**: Comunicação com ADP API
- ✅ **Transaction Service**: Lógica de negócio
- ✅ **Logger**: Rastreabilidade e debugging
- ✅ **Swagger**: Interface para demonstração

**4. Validação:**

- ✅ **Testes**: Validação com dados mockados
- ✅ **API real**: Teste com dados reais da ADP
- ✅ **Resultado**: 45 transações alpha identificadas corretamente

## **⏱ 10:00 – 12:00 | 10. MAIN APPLICATION (index.js)**

### Estrutura do fluxo principal

```javascript
// 1. Fetch task data
// 2. Find top earner
// 3. Filter alpha transactions
// 4. Submit results
```

### Explicação de cada passo:

**1. Fetch task data (Buscar dados da tarefa):**

- **O que faz**: Conecta com a API da ADP e busca 699 transações
- **Como funciona**: Faz requisição GET para `/get-task` e recebe dados JSON
- **Resultado**: Lista de transações com funcionários, valores e tipos

**2. Find top earner (Encontrar maior ganhador):**

- **O que faz**: Analisa todas as transações do ano anterior (2024)
- **Como funciona**: Soma os valores por funcionário e encontra quem ganhou mais
- **Resultado**: Abram Choi (SED133) com $438.989 em 83 transações

**3. Filter alpha transactions (Filtrar transações alpha):**

- **O que faz**: Pega apenas as transações "alpha" do maior ganhador
- **Como funciona**: Filtra por employee ID e tipo "alpha" do ano anterior
- **Resultado**: 45 transações alpha identificadas

**4. Submit results (Enviar resultados):**

- **O que faz**: Envia os IDs das transações alpha para a API da ADP
- **Como funciona**: Faz requisição POST para `/submit-task` com os IDs
- **Resultado**: API responde "Correct" confirmando que está certo

### Por que esta estrutura?

#### 1. Fluxo linear e claro

- **4 passos bem definidos**: Fácil de entender e debugar
- **Separação de responsabilidades**: Cada service tem sua função
- **Error handling centralizado**: Tratamento consistente de erros

#### 2. Método runChallenge()

- **Reutilizável**: Pode ser chamado de diferentes contextos
- **Testável**: Fácil de testar isoladamente
- **Swagger integration**: Usado no endpoint `/api/run-challenge`

#### 3. Logging estruturado

- **Rastreabilidade**: Cada passo é logado
- **Debugging**: Fácil identificar onde ocorrem problemas
- **Profissional**: Logs estruturados e informativos

---

## **⏱ 12:00 – 15:00 | 11. CONCLUSÃO**

### Decisões tomadas

1. **Simplicidade**: Foco na resolução do problema
2. **Qualidade**: Código limpo e bem documentado
3. **Profissionalismo**: Ferramentas adequadas (Swagger, Logger)
4. **Flexibilidade**: Configuração via environment variables

### Diferenciais técnicos

- **Swagger UI**: Interface profissional para demonstração
- **Sistema de logging**: Controle de ambiente e rastreabilidade
- **Retry logic**: Robustez em falhas de rede
- **Separação de responsabilidades**: Código organizado e manutenível

### Próximos passos

- **Deploy**: Configuração para produção
- **Monitoramento**: Logs estruturados para observabilidade
- **Escalabilidade**: Preparado para crescimento

---

## **⏱ 10:00 – 12:00 | 12. DEMONSTRAÇÃO PRÁTICA**

"Agora vou mostrar a aplicação rodando e a interface Swagger..."

### Como executar

```bash
# Instalar dependências
npm install

# Executar aplicação
npm start

# Executar Swagger UI
npm run swagger

# Executar testes
npm test
```

### URLs importantes

- **Swagger UI**: http://localhost:3000/api-docs
- **API Endpoint**: http://localhost:3000/api/run-challenge
- **Home**: http://localhost:3000/

## **⏱ 15:00 – 20:00 | 9. Q&A**

"Agora estou pronta para suas perguntas!"
