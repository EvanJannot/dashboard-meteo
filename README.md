# Weather Dashboard

Interactive dashboard application built with Next.js and NestJS, displaying real-time weather data using OpenWeather API.

## Technologies

- Frontend: Next.js, TypeScript, Tailwind CSS, Recharts
- Backend: NestJS, TypeScript
- API: OpenWeather

## Prerequisites

- Node.js >= 18
- npm >= 9

## Installation

Clone the repository:
```bash
git clone https://github.com/your-username/weather-dashboard.git
cd weather-dashboard
```

## Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## Backend Setup
```bash
cd backend
npm install
npm run start:dev
```

## Environment Variables
Create a `.env` file in the backend directory:
```
OPENWEATHER_API_KEY=your_api_key
PORT=3001
```

## Features
* Real-time weather data visualization
* Interactive charts and graphs
* Responsive design
* RESTful API integration

## API Documentation
The backend API runs on `http://localhost:3001` with the following endpoints:
* GET `/weather/:city` - Get current weather data for a specific city
