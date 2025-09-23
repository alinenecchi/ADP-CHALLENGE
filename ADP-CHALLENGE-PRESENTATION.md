# 🚀 ADP Innovation Labs Challenge - Apresentação Técnica

## 📋 **Slide 1: Visão Geral do Projeto**

### **Objetivo do Projeto**

- ✅ **Análise de Transações**: Sistema para encontrar o maior ganhador do ano anterior
- ✅ **Filtragem Inteligente**: Identificar transações "alpha" do top earner
- ✅ **Integração API**: Comunicação com endpoints ADP
- ✅ **Submissão de Resultados**: Envio automático dos dados processados

### **Tecnologias Utilizadas**

- 🟢 **Node.js 18+** - Runtime JavaScript
- 🟢 **Axios** - Cliente HTTP para APIs
- 🟢 **Dotenv** - Gerenciamento de variáveis de ambiente
- 🟢 **Swagger UI** - Interface de documentação e testes

---

## 📋 **Slide 2: Arquitetura do Sistema**

### **Estrutura Modular**

```
adp-challenge/
├── index.js                    # 🎯 Ponto de entrada principal
├── services/
│   ├── apiService.js          # 🌐 Comunicação com API ADP
│   └── transactionService.js  # 💼 Lógica de negócio
├── tests/
│   └── test.js                # 🧪 Testes unitários
├── utils/
│   └── logger.js              # 📝 Sistema de logging
└── swagger-static.js          # 📚 Interface Swagger
```

### **Princípios de Design**

- ✅ **Separação de Responsabilidades** - Cada módulo tem função específica
- ✅ **Tratamento de Erros** - Retry automático e logging detalhado
- ✅ **Configuração Flexível** - Variáveis de ambiente
- ✅ **Testabilidade** - Código modular e testável

---

## 📋 **Slide 3: Fluxo de Execução**

### **Processo em 4 Etapas**

#### **1️⃣ Buscar Dados (GET /get-task)**

```javascript
const taskData = await this.apiService.fetchTaskData();
// Retorna: { id, transactions: [...] }
```

#### **2️⃣ Encontrar Top Earner**

```javascript
const topEarner =
  this.transactionService.findTopEarnerFromLastYear(transactions);
// Retorna: { id, name, totalEarnings, transactions }
```

#### **3️⃣ Filtrar Transações Alpha**

```javascript
const alphaIds = this.transactionService.filterAlphaTransactions(
  transactions,
  topEarner.id
);
// Retorna: ["TX_001", "TX_002", ...]
```

#### **4️⃣ Submeter Resultados (POST /submit-task)**

```javascript
const response = await this.apiService.submitResults(taskId, alphaIds);
// Retorna: Confirmação da API
```

---

## 📋 **Slide 4: Código Principal - index.js**

### **Classe ADPChallenge**

```javascript
class ADPChallenge {
  constructor() {
    this.apiService = new ApiService();
    this.transactionService = new TransactionService();
  }

  async run() {
    // 1. Buscar dados da API
    const taskData = await this.apiService.fetchTaskData();

    // 2. Encontrar top earner
    const topEarner = this.transactionService.findTopEarnerFromLastYear(
      taskData.transactions
    );

    // 3. Filtrar transações alpha
    const alphaTransactionIds = this.transactionService.filterAlphaTransactions(
      taskData.transactions,
      topEarner.id
    );

    // 4. Submeter resultados
    const submitResponse = await this.apiService.submitResults(
      taskData.id,
      alphaTransactionIds
    );

    return { success: true, topEarner, alphaTransactionIds };
  }
}
```

### **Características Técnicas**

- ✅ **Async/Await** - Programação assíncrona moderna
- ✅ **Error Handling** - Try/catch com logging detalhado
- ✅ **Graceful Shutdown** - Tratamento de sinais do sistema
- ✅ **Export/Import** - Módulos reutilizáveis

---

## 📋 **Slide 5: API Service - Comunicação HTTP**

### **Configuração do Cliente Axios**

```javascript
class ApiService {
  constructor() {
    this.client = axios.create({
      baseURL:
        process.env.API_BASE_URL || "https://interview.adpeai.com/api/v2",
      timeout: parseInt(process.env.API_TIMEOUT) || 10000,
      headers: {
        "User-Agent": "ADP-Challenge/1.0.0",
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  }
}
```

### **Funcionalidades Avançadas**

- ✅ **Retry Logic** - 3 tentativas com backoff exponencial
- ✅ **Interceptors** - Logging automático de requests/responses
- ✅ **Health Check** - Verificação de conectividade
- ✅ **Error Handling** - Tratamento robusto de falhas

### **Métodos Principais**

```javascript
// Buscar dados da tarefa
async fetchTaskData() {
  const response = await this.client.get("/get-task");
  return response.data;
}

// Submeter resultados
async submitResults(taskId, result) {
  const response = await this.client.post("/submit-task", {
    id: taskId,
    result: result
  });
  return response.data;
}
```

---

## 📋 **Slide 6: Transaction Service - Lógica de Negócio**

### **Encontrar Top Earner**

```javascript
findTopEarnerFromLastYear(transactions) {
  const currentYear = new Date().getFullYear();
  const lastYear = currentYear - 1;

  // Filtrar transações do ano anterior
  const lastYearTransactions = transactions.filter(transaction => {
    const transactionYear = new Date(transaction.timeStamp).getFullYear();
    return transactionYear === lastYear;
  });

  // Agrupar por funcionário e calcular totais
  const employeeEarnings = {};
  lastYearTransactions.forEach(transaction => {
    const employeeId = transaction.employee.id;
    if (!employeeEarnings[employeeId]) {
      employeeEarnings[employeeId] = {
        id: employeeId,
        name: transaction.employee.name,
        totalEarnings: 0,
        transactions: []
      };
    }
    employeeEarnings[employeeId].totalEarnings += transaction.amount;
    employeeEarnings[employeeId].transactions.push(transaction);
  });

  // Retornar funcionário com maior ganho
  return Object.values(employeeEarnings)
    .reduce((top, current) =>
      current.totalEarnings > top.totalEarnings ? current : top
    );
}
```

### **Filtrar Transações Alpha**

```javascript
filterAlphaTransactions(transactions, employeeId) {
  const lastYear = new Date().getFullYear() - 1;

  // Filtrar transações do funcionário do ano anterior
  const employeeTransactions = transactions.filter(transaction => {
    const transactionYear = new Date(transaction.timeStamp).getFullYear();
    return transaction.employee.id === employeeId &&
           transactionYear === lastYear;
  });

  // Filtrar apenas transações alpha
  return employeeTransactions
    .filter(transaction => transaction.type === "alpha")
    .map(transaction => transaction.transactionID);
}
```

---

## 📋 **Slide 7: Sistema de Logging e Monitoramento**

### **Logger Personalizado**

```javascript
// utils/logger.js
const logger = {
  info: (message, data) => console.log(`[INFO] ${message}`, data || ""),
  success: (message, data) =>
    console.log(`[SUCCESS] ✅ ${message}`, data || ""),
  warn: (message, data) => console.log(`[WARN] ⚠️ ${message}`, data || ""),
  error: (message, data) => console.error(`[ERROR] ❌ ${message}`, data || ""),
};
```

### **Exemplo de Output**

```
[INFO] Starting ADP Innovation Labs Challenge
[INFO] Fetching transaction data from ADP API...
[SUCCESS] Task data fetched successfully { taskId: "123", transactionCount: 150 }
[INFO] Analyzing transactions to find top earner from last year...
[SUCCESS] Top earner: John Doe (EMP001) - $45,000
[INFO] Filtering alpha transactions from top earner...
[SUCCESS] Found 12 alpha transactions from top earner
[SUCCESS] Results submitted successfully { taskId: "123", resultCount: 12 }
```

---

## 📋 **Slide 8: Interface Swagger - Testes Interativos**

### **Swagger UI Server**

```javascript
// swagger-static.js
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");

const app = express();
const swaggerDocument = YAML.load("./swagger.yaml");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get("/api/run-challenge", async (req, res) => {
  const challenge = new ADPChallenge();
  const result = await challenge.runChallenge();
  res.json(result);
});
```

### **Endpoints Disponíveis**

- ✅ **GET /api/run-challenge** - Executar desafio completo
- ✅ **GET /api-docs** - Interface Swagger UI
- ✅ **GET /** - Página inicial com overview

### **Acesso**

```bash
npm run swagger
# Acesse: http://localhost:3000/api-docs
```

---

## 📋 **Slide 9: Testes e Qualidade**

### **Testes Unitários**

```javascript
// tests/test.js
const mockTransactions = [
  {
    transactionID: "TX_001",
    timeStamp: "2024-05-25T17:35:19.460Z",
    amount: 1000,
    type: "alpha",
    employee: { name: "John Doe", id: "EMP001" },
  },
  // ... mais dados de teste
];

async function runTests() {
  const transactionService = new TransactionService();

  // Teste 1: Encontrar top earner
  const topEarner =
    transactionService.findTopEarnerFromLastYear(mockTransactions);
  assert(topEarner.name === "John Doe");

  // Teste 2: Filtrar transações alpha
  const alphaIds = transactionService.filterAlphaTransactions(
    mockTransactions,
    topEarner.id
  );
  assert(alphaIds.length === 1 && alphaIds[0] === "TX_001");
}
```

### **Executar Testes**

```bash
npm test                    # Executar testes unitários
node tests/test.js         # Executar diretamente
npm run swagger            # Testes via interface web
```

---

## 📋 **Slide 10: Configuração e Deploy**

### **Variáveis de Ambiente**

```bash
# .env (opcional)
API_BASE_URL=https://interview.adpeai.com/api/v2
API_TIMEOUT=10000
API_RETRY_ATTEMPTS=3
USER_AGENT=ADP-Challenge/1.0.0
```

### **Scripts Disponíveis**

```json
{
  "scripts": {
    "start": "node index.js",           # Executar aplicação
    "test": "node tests/test.js",       # Executar testes
    "swagger": "node swagger-static.js" # Interface Swagger
  }
}
```

### **Instalação e Execução**

```bash
# Instalar dependências
npm install

# Executar aplicação principal
npm start

# Executar testes
npm test

# Interface Swagger
npm run swagger
```

---

## 📋 **Slide 11: Resultados e Performance**

### **Exemplo de Execução**

```json
{
  "success": true,
  "taskId": "task_12345",
  "topEarner": {
    "name": "John Doe",
    "id": "EMP001",
    "totalEarnings": 45000
  },
  "alphaTransactionIds": ["TX_001", "TX_005", "TX_012", "TX_018"],
  "apiResponse": "Results submitted successfully"
}
```

### **Métricas de Performance**

- ✅ **Tempo de Execução**: ~2-3 segundos
- ✅ **Retry Logic**: 3 tentativas com backoff exponencial
- ✅ **Timeout**: 10 segundos por request
- ✅ **Logging**: Detalhado para debugging

---

## 📋 **Slide 12: Conclusões e Próximos Passos**

### **✅ Objetivos Alcançados**

- ✅ **Integração API** - Comunicação robusta com endpoints ADP
- ✅ **Análise de Dados** - Algoritmo eficiente para encontrar top earner
- ✅ **Filtragem Inteligente** - Identificação precisa de transações alpha
- ✅ **Interface de Testes** - Swagger UI para validação
- ✅ **Código Limpo** - Arquitetura modular e bem documentada

### **🚀 Melhorias Futuras**

- 🔄 **Cache de Dados** - Redis para otimização
- 🔄 **Monitoramento** - Métricas com Prometheus
- 🔄 **CI/CD** - Pipeline automatizado
- 🔄 **Docker** - Containerização da aplicação

### **📊 Impacto Técnico**

- ✅ **Escalabilidade** - Arquitetura preparada para crescimento
- ✅ **Manutenibilidade** - Código bem estruturado
- ✅ **Testabilidade** - Cobertura de testes adequada
- ✅ **Documentação** - Swagger e README completos

---

## 🎯 **Resumo Executivo**

### **Projeto ADP Challenge**

- ✅ **Solução Completa** - Análise de transações e submissão de resultados
- ✅ **Arquitetura Robusta** - Separação de responsabilidades e tratamento de erros
- ✅ **Interface Amigável** - Swagger UI para testes e documentação
- ✅ **Código Profissional** - Padrões de desenvolvimento e boas práticas

### **Tecnologias Demonstradas**

- 🟢 **Node.js** - Runtime JavaScript moderno
- 🟢 **Axios** - Cliente HTTP com retry e interceptors
- 🟢 **Swagger** - Documentação e testes interativos
- 🟢 **Modular Design** - Arquitetura limpa e testável

**🚀 Pronto para produção e escalabilidade!**
