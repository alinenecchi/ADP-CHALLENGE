# 📋 INTERVIEW Q&A GUIDE - ENGLISH

## Questions and Answers for Interview

---

## **1. ARCHITECTURE AND TECHNICAL CHOICES**

### **Q: Why did you choose a simple architecture instead of a more complex one?**

**A:** I chose simplicity because the challenge specifically asked not to use frameworks like React, Angular and Express. I understood that the focus should be on solving the problem, not demonstrating complex architectures. In daily work, we often need to solve production problems quickly, and simplicity is the best approach.

---

### **Q: Why did you use Axios instead of native fetch?**

**A:** Axios offers automatic interceptors for logging, unified HTTP error handling, configurable timeout and automatic JSON parsing. With native fetch, I would have to implement all this manually, adding unnecessary complexity. For this project, Axios saves code and offers ready professional features.

---

### **Q: Why did you create a custom logger?**

**A:** Console.log is not suitable for professional applications. I created a logger with levels (INFO, SUCCESS, ERROR, WARNING, DEBUG) and environment control. This allows structured logs, facilitates debugging and demonstrates knowledge of good logging practices in production.

---

## **2. IMPLEMENTATION AND LOGIC**

### **Q: How does the logic to find the top earner work?**

**A:** First I filter transactions from the previous year (2024). Then I group by employee.id and sum the values. The employee with the highest total is the top earner. In this case, Abram Choi (SED133) with $438.989 in 83 transactions.

---

### **Q: Why 45 alpha transactions and not all?**

**A:** The challenge specifically asked for alpha transactions from the top earner of the previous year. I filtered by top earner's employee.id and "alpha" type only from 2024. This results in 45 transactions, not all alpha transactions from the dataset.

---

### **Q: How did you implement error handling?**

**A:** I implemented automatic retry (3 attempts) for HTTP requests, specific error handling by type (timeout, 4xx, 5xx) and detailed logging. Each service has its own handling, but centralized in the logger for consistency.

---

## **3. TESTING AND QUALITY**

### **Q: How did you test the solution?**

**A:** I created automated tests that verify each service in isolation. I also implemented Swagger UI for visual testing in the browser. The tests verify if the logic is correct and if the API responds "Correct" at the end.

---

### **Q: What would you do if the API returned an error?**

**A:** The system already has automatic retry and detailed logging. If the API fails, I can see exactly where and why in the logs. For production, I would add alerts and metrics for continuous monitoring of API health.

---

## **4. SWAGGER AND DOCUMENTATION**

### **Q: Why did you implement Swagger?**

**A:** Swagger allows visual demonstration of the API, interactive testing and automatic documentation. It's a professional tool that shows knowledge of good API documentation practices. It makes it easier for evaluators to test the solution.

---

### **Q: How does Swagger integrate with the solution?**

**A:** Swagger serves the API documentation and has an endpoint `/api/run-challenge` that executes the entire challenge logic. This allows testing the complete solution through the web interface, without needing to run terminal commands.

---

## **5. PERFORMANCE AND OPTIMIZATION**

### **Q: How would you optimize for large data volumes?**

**A:** For large volumes, I would implement API pagination, result caching, asynchronous processing and data streaming. I would also add indexes on search fields and consider using databases for persistence.

---

### **Q: What would you do differently in production?**

**A:** I would add monitoring (metrics, alerts), structured logs (JSON), rate limiting, authentication, stricter input validation, load testing and automated deployment. I would also consider using TypeScript for greater type safety.

---

## **6. TECHNICAL KNOWLEDGE**

### **Q: Explain the difference between HTTP GET and POST.**

**A:** GET is for fetching data (idempotent, cacheable, parameters in URL). POST is for sending data (not idempotent, not cacheable, data in body). In the challenge, I use GET to fetch transactions and POST to send results.

---

### **Q: What is CORS and why is it important?**

**A:** CORS (Cross-Origin Resource Sharing) allows browsers to make requests between different domains. It's important for security and functionality of web applications. In the project, I configured CORS to allow Swagger access from any origin.

---

## **7. CHALLENGES AND PROBLEMS**

### **Q: What was the biggest technical challenge?**

**A:** The biggest challenge was understanding exactly what the API expected. Initially I sent all alpha transactions, but the API expected only those from the top earner. I needed to adjust the filtering logic to be more specific.

---

### **Q: How did you handle API inconsistencies?**

**A:** I implemented detailed logging to identify patterns and inconsistencies. When the API returned an error, I analyzed the logs to understand what was wrong. This helped me adjust the logic until I got the "Correct" response.

---

## **8. LEARNING AND IMPROVEMENTS**

### **Q: What did you learn from this project?**

**A:** I learned that simplicity is often better than complexity. I also understood the importance of professional logging and clear documentation. The project showed me how to solve problems directly and efficiently.

---

### **Q: How would you improve this solution?**

**A:** I would add more comprehensive unit tests, implement caching for better performance, add stricter data validation and consider using TypeScript for greater safety. I would also implement metrics and monitoring.

---

## **9. BUSINESS KNOWLEDGE**

### **Q: Why is it important to analyze financial transactions?**

**A:** Transaction analysis is crucial for compliance, fraud detection, process optimization and decision making. In ADP's context, this can help companies understand payment patterns and identify anomalies.

---

### **Q: How does this solution apply to the real world?**

**A:** This solution can be used for financial reports, auditing, employee performance analysis, suspicious pattern detection and payment process optimization. It's a solid foundation for more complex systems.

---

## **10. CONCLUSION**

### **Q: What would you most like to highlight about your solution?**

**A:** I highlight the simplicity and efficiency of the solution, professional logging, clear documentation with Swagger and the problem-focused approach. The solution is robust, testable and production-ready.

---

## **📝 INTERVIEW TIPS**

### **🇺🇸 ENGLISH:**

- ✅ **Be specific** - Use real data from logs
- ✅ **Explain the "why"** - Justify your choices
- ✅ **Demonstrate knowledge** - Show you understand the business
- ✅ **Be honest** - Admit limitations and improvements
- ✅ **Practice** - Rehearsing answers helps

---

**🎯 GOOD LUCK IN THE INTERVIEW!**
