# Weather App

A minimal, aesthetic weather application built with React, Vite, and Tailwind CSS v4. Features real-time weather data, 5-day forecasts, and air quality information powered by the OpenWeather API.

## Features

- **Current Weather**: Temperature, feels like, humidity, wind, pressure, visibility, sunrise/sunset
- **5-Day Forecast**: Daily overview with high/low temperatures and precipitation probability
- **Hourly Forecast**: 3-hour interval forecasts for the next 48 hours
- **Air Quality Index**: Real-time air pollution data with health recommendations
- **Location Search**: Search for any city worldwide with autocomplete suggestions
- **Geolocation**: Automatically detect and display weather for your current location
- **Unit Toggle**: Switch between Celsius (metric) and Fahrenheit (imperial)
- **Dark/Light Mode**: Theme toggle with system preference detection
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Data Caching**: React Query for efficient API caching and state management

## Tech Stack

- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui (customized with no rounded corners)
- **State Management**: React Query (TanStack Query)
- **HTTP Client**: Axios
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- OpenWeather API key (free tier available)

### Installation

1. Clone the repository and navigate to the project:
   ```bash
   cd Weather
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the project root:
   ```bash
   cp .env.example .env
   ```

4. Add your OpenWeather API key to the `.env` file:
   ```
   VITE_OPENWEATHER_API_KEY=your_api_key_here
   ```

   Get a free API key from [OpenWeatherMap](https://openweathermap.org/api)

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:5173](http://localhost:5173) in your browser

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## API Endpoints Used

This app uses the following OpenWeather APIs:

- **Current Weather Data**: `/data/2.5/weather`
- **5 Day / 3 Hour Forecast**: `/data/2.5/forecast`
- **Air Pollution**: `/data/2.5/air_pollution`
- **Geocoding**: `/geo/1.0/direct`

## Project Structure

```
src/
├── api/            # API service functions
├── components/     # React components
│   └── ui/         # shadcn/ui base components
├── hooks/          # Custom React hooks
├── lib/            # Utility functions
├── types/          # TypeScript type definitions
├── App.tsx         # Main application component
├── main.tsx        # Application entry point
└── index.css       # Global styles and Tailwind config
```

## Design Philosophy

- **Minimal**: Clean interface with essential information
- **Sharp**: No rounded corners for a modern, brutalist aesthetic
- **Functional**: All data from the API is displayed and accessible
- **Accessible**: Semantic HTML and proper contrast ratios

## License

MIT