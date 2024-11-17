
# Backend (NestJS)

# Approach

## Problem-Solving Strategy:

### User-Centric Design:
The application was built with simplicity and usability in mind, using modern design principles like atomic design for reusable components and responsive design with Tailwind CSS.

### Scalable Architecture:
The backend follows the modularized NestJS structure and implements the Repository Pattern for separation of concerns, making it maintainable and scalable.

### AI Integration:
Leveraged an external AI API to generate motivational messages based on user activity, providing personalized insights and improving user engagement.

### State Management:
Managed local state using React's useState for simplicity in the frontend, with efficient API integration to update the backend state.

## Key Features:
Habit CRUD operations with streak calculations.
AI powered motivational messages.
Habit search and sorting.
Realtime UI updates with error handling.
Modularized frontend and backend for extensibility.

## Setup Instructions

## Prerequisites

1. Node.js (v16 or later)
2. MongoDB (local or cloud)
3. API Key for AI integration (Google Generative-AI).

## Set up environment variables in .env

```bash
MONGO_URI=<YOUR_MONGO_DATABASE_URL>
GOOGLEAIAPI=<YOUR_AI_API_KEY>
```

## First, run the development server:

```bash
git clone https://github.com/Nazeerahmad1996/habitBE
npm install
npm start
```

### API will be available at http://localhost:4000.

## Postman collection

```bash
Habit tracker.postman_collection.json
```
