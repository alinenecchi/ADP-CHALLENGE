# ADP Innovation Labs Challenge

A clean, professional JavaScript application that analyzes transaction data to find the top earner from the previous year and filters their alpha transactions.

## Challenge Overview

This application demonstrates:

- **HTTP API Integration** - Fetches data from ADP API
- **Data Analysis** - Finds top earner from previous calendar year
- **Business Logic** - Filters alpha transactions
- **Result Submission** - Submits findings back to ADP API

## Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd adp-challenge

# Install dependencies
npm install

# Run the application
npm start
```

### Environment Variables

Create a `.env` file (optional):

```env
API_BASE_URL=https://interview.adpeai.com/api/v2
API_TIMEOUT=10000
API_RETRY_ATTEMPTS=3
USER_AGENT=ADP-Challenge/1.0.0
```

## Project Structure

```
adp-challenge/
├── index.js                    # Main application entry point
├── services/
│   ├── apiService.js          # HTTP API communication
│   └── transactionService.js  # Business logic
├── tests/
│   └── test.js                # Unit tests
├── package.json               # Dependencies and scripts
└── README.md                 # This file
```

## Available Scripts

```bash
npm start          # Run the main application
npm test           # Run unit tests
npm run dev        # Run in development mode
```

## Testing

```bash
# Run unit tests
npm test

# Test core functionality
node tests/test.js
```

## How It Works

1. **Fetch Data** - Retrieves transaction data from ADP API
2. **Find Top Earner** - Analyzes transactions to find highest earner from previous year
3. **Filter Alpha** - Extracts alpha-type transactions from top earner
4. **Submit Results** - Sends findings back to ADP API

## Technical Details

- **No Frameworks** - Pure Node.js with libraries only
- **Error Handling** - Comprehensive retry logic and error management
- **Logging** - Detailed console output for debugging
- **Modular Design** - Clean separation of concerns
- **Environment Config** - Flexible configuration via environment variables

## API Endpoints

- `GET /get-task` - Fetch transaction data
- `POST /submit-task` - Submit analysis results

## Evaluation Criteria

✅ **No Frameworks** - Uses only libraries (axios, dotenv)  
✅ **Easy Setup** - `npm install` and `npm start`  
✅ **No CORS Issues** - Runs cleanly on localhost  
✅ **Well Commented** - Clear, professional code documentation  
✅ **Error Free** - Robust error handling and validation

## License

MIT License - Feel free to use this code for learning and development.

---

**Built for ADP Innovation Labs**
