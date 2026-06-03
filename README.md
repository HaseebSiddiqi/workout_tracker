========================================================================================================================

Muscle Up | Workout Tracker

Muscleup.live
========================================================================================================================
Summary: 

Muscle Up is a full-stack workout tracking web application designed to help users log workouts and visualize training consistency over time.

The project was inspired by my own experience using spreadsheets to track workouts, which became tedious and error-prone as workout structures changed and formatting issues made tracking inefficient.

Muscle Up provides a simple and responsive interface for creating workouts, logging sets and reps, and reviewing training history across mobile and desktop devices. The goal is to make workout tracking more structured, flexible, and consistent, enabling users to clearly understand their training volume and progress over time. 
========================================================================================================================
Features: 
- Users can create workout templates (workout types), allowing fast logging by entering sets, reps, and optional notes during each session
- When logging a workout, users can view their previous workout as a reference to help maintain training consistency and goals
- Calendar visualization highlights completed workout days in blue, enabling users to track training consistency over time
- Users can click on highlighted calendar days to view detailed workout history for that specific date
- Secure account system allows users to access their workouts across multiple devices
- Users can delete workouts as needed to maintain and manage their workout history
========================================================================================================================
Architecture Overview
========================================================================================================================
Muscle Up is a full-stack web application built with a React frontend and a Node.js/Express backend, integrated with AWS Cognito for authentication and DynamoDB for persistent data storage. The system is designed around secure, user-specific REST APIs that enable cross-device workout tracking and real-time data persistence.
========================================================================================================================
Tech Stack
========================================================================================================================
- Frontend: React, deployed on Vercel for fast and reliable client-side hosting
- Backend: Node.js with Express.js, deployed on Railway to handle API requests, authentication-aware routing, and core application logic including workout CRUD operations, data validation, and user-specific data handling
- Authentication: AWS Cognito for secure user sign-up, login, and account management, ensuring user data privacy
- Database: AWS DynamoDB for scalable storage and retrieval of user workouts, enabling cross-device access
- API Layer: Express.js exposes secure REST API endpoints that connect the frontend with AWS services (Cognito and DynamoDB) and enforce user-level access control
  

