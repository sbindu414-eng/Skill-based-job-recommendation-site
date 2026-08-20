# SkillMatch Backend

Backend API for the SkillMatch job recommendation system.

## Features Implemented

### 1. Advanced Skill Matching Algorithm
- Intelligent skill comparison between user profiles and job requirements
- Match percentage calculation with detailed breakdown
- Missing and weak skill identification
- Personalized learning recommendations

### 2. Real-time Data Integration
- Live salary data by industry and location
- Current industry trends and growth analysis
- Real-time job posting aggregation
- Market insights and analytics

## API Endpoints

### User Management
- `GET /api/user/:id` - Get user profile
- `GET /api/user/:id/recommendations` - Get job recommendations
- `GET /api/user/:id/skill-gap` - Get skill gap analysis

### Market Data
- `GET /api/market/data` - Get real-time market data
- `GET /api/jobs/search/:id` - Search jobs with filters

## Technologies Used

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - Database (planned)
- **JWT** - Authentication (planned)
- **Axios** - HTTP client for external APIs

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. The API will be available at `http://localhost:5000`

## Project Structure

```
backend/
├── controllers/          # Request handlers
├── models/              # Data models
├── routes/              # API routes
├── utils/               # Utility functions
├── middleware/          # Custom middleware
├── server.js            # Main application file
├── .env                 # Environment variables
└── package.json         # Project dependencies
```

## Features Overview

### Advanced Skill Matching
The system uses a sophisticated algorithm to match user skills with job requirements:
- Calculates match percentages based on skill overlap
- Identifies missing skills that prevent job qualification
- Highlights weak skills that need improvement
- Provides personalized learning recommendations

### Real-time Market Data
The system integrates with external APIs to provide:
- Current salary trends by industry and location
- Industry growth rates and market analysis
- Live job postings from multiple sources
- Market insights for career planning

## Future Enhancements

- Database integration with MongoDB
- User authentication and authorization
- Employer dashboard for job posting
- Advanced search and filtering
- Notification system
- Analytics and reporting