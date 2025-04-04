# MLA List Finder

![Logo](./Frontend//public//apple-touch-icon.png)

## Overview
MLA List Finder is a web application that allows users to search and view information about Members of the Legislative Assembly (MLAs) based on location. The application provides a user-friendly interface with mapping and listing functionalities.

## Features
- Search for MLAs by location
- Interactive map component
- Detailed MLA information display
- Redux state management for location-based data
- Optimized frontend using Vite and React
- Backend API with TypeScript

## Frontend
The frontend is built using React with Vite for fast development. It includes a Redux store for managing location-based data and uses components for better structure.

### Setup & Installation
```sh
cd Frontend
npm install
npm run dev
```

### Key Components
- **NavBar.jsx**: Navigation bar for easy access
- **Mapcomponent.jsx**: Displays MLAs on an interactive map
- **MlaList.jsx**: Shows a list of MLAs based on the selected location
- **MlaDetails.jsx**: Provides details about a specific MLA

## Backend
The backend is built using TypeScript and provides API endpoints to fetch MLA details.

### Setup & Installation
```sh
cd backend
npm install
npm run dev
```

### Key Files
- **index.ts**: Main entry point for the backend
- **package.json**: Manages dependencies
- **vercel.json**: Configuration for deployment on Vercel

## Deployment
The project is configured for deployment on **Vercel**.

### Deploying the Frontend
```sh
vercel --prod
```

### Deploying the Backend
```sh
vercel --prod
```

## Technologies Used
- **Frontend:** React, Vite, Redux, Tailwind CSS
- **Backend:** Node.js, TypeScript
- **Deployment:** Vercel

## Contributing
1. Fork the repository
2. Create a feature branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -m "Add feature"`)
4. Push to the branch (`git push origin feature-branch`)
5. Create a Pull Request
