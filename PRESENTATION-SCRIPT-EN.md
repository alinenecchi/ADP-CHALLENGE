🎤 **COMPLETE PRESENTATION SCRIPT - ADP INNOVATION LABS CHALLENGE**

## **⏱ TOTAL TIMER: 15-20 MINUTES**

### **⏱ 0:00 – 0:30 | PERSONAL INTRODUCTION**

"Hello everyone! My name is Aline, and I'm very excited to be here today showing my solution for the ADP Innovation Labs Challenge.

Before we start, I'd like to say that this is my first interview in English, and also my first interview in about four years, since I worked at the same company for a long time. So, if at any moment I don't understand something, I kindly ask you to repeat or speak a little slower. And if you don't understand me, feel free to ask me to repeat as well.

I'm very happy to be here and have the chance to talk with you today."

### **⏱ 0:30 – 1:00 | PROJECT INTRODUCTION**

Today I'm going to show how I solved the ADP challenge. When I got the task, the first thing I did was look at what really made sense. I thought: should I build a more complex setup to show everything I know about setup and good practices? Or should I follow the simpler path?

I chose a **simple and direct way**, focusing on solving the problem as it was asked in the task. Although I have knowledge to build more complex setups, I understood that the best here was to follow what was asked: **simplicity and efficiency**."

### Project Philosophy

"I chose a **simple and direct way**, focusing on solving the problem as it was asked in the task. Although I have knowledge to build more complex setups, I understood that the best here was to follow what was asked: **simplicity and efficiency**."

"Because in daily work, tasks often come up that need this type of focus and approach, like solving some problem in production, where we need to act quickly and focus on the main problem without over-engineering."

### Strategic Decisions

- **Focus on what matters**: Solve the problem without over-engineering
- **Clean code**: Easy to read and maintain
- **Clear documentation**: To make review and understanding easier

---

## **⏱ 1:00 – 2:00 | 2. ARCHITECTURE AND STRUCTURE**

"Let me show you the project structure and explain my architectural decisions..."

### Why this architecture?

```
adp-challenge/
├── index.js                    # Main entry point
├── services/                   # Clear separation of jobs
│   ├── apiService.js          # HTTP communication
│   └── transactionService.js  # Business logic
├── utils/                     # Reusable tools
│   └── logger.js              # Logging system
├── tests/                     # Organized tests
└── swagger-static.js          # Documentation interface
```

**Decision**: Clear separation of responsibilities without unnecessary complexity.

---

## **⏱ 2:00 – 4:00 | 3. DEPENDENCY CHOICES**

"Now I'll explain why I chose these specific dependencies and the trade-offs I considered..."

### Package.json - Why only axios and dotenv?

```json
{
  "dependencies": {
    "axios": "^1.12.2",
    "dotenv": "^17.2.2"
  }
}
```

#### Axios

- **Robust HTTP Client**: Better than native fetch for this case because:
  - **Automatic Interceptors**: Logging without additional code
  - **Unified Error Handling**: Consistent HTTP error treatment
  - **Configurable Timeout**: Response time control
  - **JSON Parsing**: Automatic (fetch needs .json())

#### Cons of native fetch:

- **More code**: Need to implement logging, retry and error handling manually
- **JSON parsing**: Need to call .json() on each response
- **Error handling**: HTTP 4xx/5xx are not automatically rejected
- **Timeout**: Need to use AbortController for timeout
- **Interceptors**: Don't exist, need to implement manually

#### Cons of Axios:

- **Extra dependency**: Adds ~50KB to bundle
- **Overhead**: Can be overkill for very simple projects
- **Learning curve**: Need to know Axios API

#### Dotenv

- **Flexible configuration**: Different environments (dev/prod)
- **Best practices**: Industry standard
- **Demonstrates knowledge**: Shows professional experience
- **Scalability**: Easy configuration for production

---

## **⏱ 4:00 – 6:00 | 4. SWAGGER UI - WHY DID I IMPLEMENT IT?**

### Motivation

- **Visual demonstration**: Professional interface for testing
- **Interactive documentation**: Facilitates code review
- **Real-time testing**: Immediate functionality validation
- **Technical differential**: Shows knowledge of modern tools

### Implementation

- **No frameworks**: Using only Node.js native HTTP
- **Auto port detection**: Tries ports 3000, 3001, etc.
- **Clean interface**: Removed search bar for essential focus

---

## **⏱ 4:00 – 6:00 | 5. LOGGING SYSTEM (utils/logger.js)**

### Why a custom logger?

#### Benefits

- **Environment control**: Different logs for dev/prod/test
- **Consistent formatting**: Professional standard
- **Log levels**: INFO, SUCCESS, ERROR, WARNING, DEBUG
- **Performance**: Conditional logs by environment

#### Alternatives considered

- **Simple console.log**: Too basic for professional project
- **Winston**: Over-engineering for this project
- **Custom logger**: Perfect balance

---

## **⏱ 6:00 – 8:00 | 6. API SERVICE (services/apiService.js)**

### Implemented functionalities

#### 1. HTTP Configuration

```javascript
this.client = axios.create({
  baseURL: process.env.API_BASE_URL || "https://interview.adpeai.com/api/v2",
  timeout: parseInt(process.env.API_TIMEOUT) || 10000,
  headers: {
    "User-Agent": process.env.USER_AGENT || "ADP-Challenge/1.0.0",
  },
});
```

#### 2. Interceptors for Logging

- **Request interceptor**: Request logging with timestamp
- **Response interceptor**: Response logging with duration
- **Error interceptor**: Centralized error handling

#### 3. Retry Logic

```javascript
async fetchTaskData() {
  const maxRetries = parseInt(process.env.API_RETRY_ATTEMPTS) || 3;
  // Retry implementation with backoff
}
```

#### 4. Main methods

- **fetchTaskData()**: Fetches data from API
- **submitResults()**: Submits results
- **Automatic retry**: For network failures

---

## **⏱ 6:00 – 8:00 | 7. TRANSACTION SERVICE (services/transactionService.js)**

### Implemented business logic

#### 1. Transaction Analysis

```javascript
findTopEarnerFromLastYear(transactions) {
  const currentYear = new Date().getFullYear();
  const lastYear = currentYear - 1;
  // Filter transactions from previous year
}
```

#### 2. Alpha Filtering

```javascript
filterAlphaTransactions(transactions, employeeId) {
  // Filter only alpha transactions from top earner
  // Consider only previous year
}
```

#### 3. Validations

- **Correct year**: Only transactions from previous year
- **Employee ID**: Filter by specific employee
- **Alpha type**: Only "alpha" type transactions

---

## **⏱ 8:00 – 10:00 | 8. TESTS (tests/test.js)**

### Why simple tests?

```javascript
// Test with mock data
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

#### Test strategy

- **Controlled data**: Mock data for predictable tests
- **Specific scenarios**: Tests business logic
- **Result validation**: Confirms expected behavior

#### Why not more complex tests?

- **Focus on essentials**: Task is about logic, not testing
- **Simplicity**: Tests anyone can understand
- **Functionality**: Validates that code works

---

## **⏱ 8:00 – 10:00 | 9. STEP-BY-STEP SOLUTION**

### How I solved the challenge:

**1. Problem Analysis:**

- ✅ **Understood requirements**: Find top earner from previous year
- ✅ **Identified data**: 699 transactions with different employees
- ✅ **Defined objective**: Filter alpha transactions from top earner

**2. Solution Structuring:**

- ✅ **Separation of responsibilities**: API Service vs Transaction Service
- ✅ **Linear flow**: 4 well-defined steps
- ✅ **Error handling**: Error treatment in each step

**3. Implementation:**

- ✅ **API Service**: Communication with ADP API
- ✅ **Transaction Service**: Business logic
- ✅ **Logger**: Traceability and debugging
- ✅ **Swagger**: Interface for demonstration

**4. Validation:**

- ✅ **Tests**: Validation with mock data
- ✅ **Real API**: Test with real ADP data
- ✅ **Result**: 45 alpha transactions correctly identified

---

## **⏱ 10:00 – 12:00 | 10. MAIN APPLICATION (index.js)**

### Main flow structure

```javascript
// 1. Fetch task data
// 2. Find top earner
// 3. Filter alpha transactions
// 4. Submit results
```

### Simple explanation of each step:

**1. Get task data:**

- **What it does**: Gets 699 transactions from ADP API
- **How it works**: Asks for data and gets it back
- **What we get**: List of transactions with people, money and types

**2. Find top earner:**

- **What it does**: Looks at all transactions from last year (2024)
- **How it works**: Adds up money by person and finds who got the most
- **What we get**: Abram Choi (SED133) with $438.989 in 83 transactions

**3. Get alpha transactions:**

- **What it does**: Gets only "alpha" transactions from the top earner
- **How it works**: Looks for transactions with "alpha" type from last year
- **What we get**: 45 alpha transactions found

**4. Send results:**

- **What it does**: Sends the alpha transaction IDs to ADP API
- **How it works**: Sends the IDs and waits for answer
- **What we get**: API says "Correct" which means it's right

### Why this way?

#### 1. Easy to follow

- **4 clear steps**: Easy to understand and fix
- **Each part has its job**: Each service does one thing
- **Same way to handle errors**: All errors are handled the same way

#### 2. runChallenge() method

- **Can be used again**: Can be called from different places
- **Easy to test**: Can test it by itself
- **Swagger integration**: Used in `/api/run-challenge` endpoint

#### 3. Good logging

- **Can see what happens**: Each step is logged
- **Easy to find problems**: Easy to see where things go wrong
- **Professional**: Good and clear logs

---

## **⏱ 10:00 – 12:00 | 12. PRACTICAL DEMONSTRATION**

"Now I'll show you the application running and the Swagger interface..."

### How to execute

```bash
# Install dependencies
npm install

# Run application
npm start

# Run Swagger UI
npm run swagger

# Run tests
npm test
```

### Important URLs

- **Swagger UI**: http://localhost:3000/api-docs
- **API Endpoint**: http://localhost:3000/api/run-challenge
- **Home**: http://localhost:3000/

---

## **⏱ 12:00 – 15:00 | 11. CONCLUSION**

"To summarize my approach and discuss potential improvements..."

### Decisions made

1. **Simplicity**: Focus on problem resolution
2. **Quality**: Clean and well-documented code
3. **Professionalism**: Appropriate tools (Swagger, Logger)
4. **Flexibility**: Configuration via environment variables

### Technical differentials

- **Swagger UI**: Professional interface for demonstration
- **Logging system**: Environment control and traceability
- **Retry logic**: Robustness in network failures
- **Separation of responsibilities**: Organized and maintainable code

### Next steps

- **Deploy**: Configuration for production
- **Monitoring**: Structured logs for observability
- **Scalability**: Prepared for growth

---

## **⏱ 15:00 – 20:00 | 9. Q&A**

"Now I'm ready for your questions!"

---

**"This project demonstrates balance between simplicity and professionalism, focusing on efficient resolution of the proposed problem."**
