# Ray-Dhrubojyoti-AIPlagiarismDetector 🔍

A sophisticated AI plagiarism detection tool that analyzes text content to identify potential AI-generated materials. Using OpenAI's advanced language models, this application provides real-time analysis and detection capabilities.

## Live Demo 🌐

[View the live application](https://rayanswersai.xyz/)

## Features ✨

- Real-time text analysis for AI-generated content detection
- User-friendly web interface
- Integration with OpenAI's powerful language models
- Fast and accurate results
- Clean, modern design

## Tech Stack 💻

- **Frontend**: React.js
- **Backend**: Node.js/Express
- **API Integration**: OpenAI
- **Deployment**: 
  - Frontend: Render
  - Backend: Render

## Getting Started 🚀

### Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)
- OpenAI API key

### Local Installation

1. Clone the repository
```bash
git clone https://github.com/raycoffee/Ray-Dhrubojyoti-AIPlagiarismDetector.git
```

2. Install dependencies for both client and server directories
```bash
# Install client dependencies
cd client
npm install

# Go back to root and install server dependencies
cd ../
cd server
npm install
```

3. Set up environment variables

For the server:
Create a `.env` file in the server directory:
```bash
OPENAI_API_KEY=your_openai_api_key_here
```

For the client:
Create a `.env.development` file in the client directory:
```bash
REACT_APP_API_URL=http://localhost:3001
```

### Running Locally

1. Start the server
```bash
# From root directory
cd server
npm start
```

2. In a new terminal, start the client
```bash
# From root directory
cd client
npm start
```

The application will be running at `http://localhost:3000`

## Project Structure 📁

```
Ray-Dhrubojyoti-AIPlagiarismDetector/
├── client/           # React frontend application
│   ├── public/       # Public assets
│   └── src/          # Source files
│
├── server/           # Node.js/Express backend
│   ├── routes/       # API routes
│   └── server.js     # Server configuration
│
└── README.md
```


---
Made with ❤️ by Ray
