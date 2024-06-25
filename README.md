# MERN Stack Project

## Overview

This is a web application built using the MERN stack (MongoDB, Express, React, Node.js). The project implements user authentication using JWT tokens and is styled using Tailwind CSS. Users can also upload photos as part of their profiles or posts.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Photo Upload](#photo-upload)
- [Technologies](#technologies)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication with JWT tokens
- Protected routes that require authentication
- Responsive design using Tailwind CSS
- RESTful API for backend operations
- Frontend user interface with React
- Photo upload functionality

## Installation

1. Clone the repository:
    ```bash
    git clone <repository-url>
    cd <repository-folder>
    ```

2. Install dependencies for both backend and frontend:
    ```bash
    # Backend dependencies
    cd backend
    npm install

    # Frontend dependencies
    cd ../frontend
    npm install
    ```

3. Set up environment variables:
   - Create a `.env` file in the `backend` directory.
   - Add the following variables:
    ```env
    PORT=4000
    MONGO_URI=<your-mongodb-uri>
    JWT_SECRET=<your-jwt-secret>
    ```

## Usage

1. Start the backend server:
    ```bash
    cd backend
    npm start
    ```

2. Start the frontend development server:
    ```bash
    cd frontend
    npm start
    ```

3. Open your browser and navigate to `http://localhost:3000` to see the application.

## API Endpoints

### Authentication

- **POST** `/register`
  - Registers a new user
  - Request body: `{ "name": "string", "email": "string", "password": "string" }`
  - Response: `201 Created`

- **POST** `/login`
  - Logs in a user and returns a JWT token
  - Request body: `{ "email": "string", "password": "string" }`
  - Response: `200 OK`, `{ "token": "jwt-token" }`

### User

- **GET** `/user`
  - Retrieves the authenticated user's information
  - Headers: `Authorization: Bearer <token>`
  - Response: `200 OK`, `{ "user": { "id": "string", "name": "string", "email": "string" } }`

## Photo Upload

### Backend Setup

1. Install the required packages:
    ```bash
    npm install multer cloudinary multer-storage-cloudinary
    ```

2. Configure Cloudinary in the backend:
    ```javascript
    // backend/config/cloudinary.js
    const cloudinary = require('cloudinary').v2;

    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    module.exports = cloudinary;
    ```

3. Set up Multer and Cloudinary storage:
    ```javascript
    // backend/middleware/multer.js
    const multer = require('multer');
    ```

4. Create an API endpoint for photo uploads:
    ```javascript
    // backend/routes/photo.js
    const express = require('express');
    const router = express.Router();
    const upload = require('../middleware/multer');
    const { isAuthenticated } = require('../middleware/auth');

    router.post('/upload', isAuthenticated, upload.single('photo'), (req, res) => {
      res.status(200).json({ url: req.file.path });
    });

    module.exports = router;
    ```

5. Use the photo upload route in your server setup:
    ```javascript
    // backend/server.js
    const express = require('express');
    const app = express();

    // Other middleware and routes

    const photoRoutes = require('./routes/photo');
    app.use('/api/photos', photoRoutes);

    // Start the server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    ```

### Frontend Usage

1. Install Axios for making HTTP requests:
    ```bash
    npm install axios
    ```

2. Create a function to handle photo uploads:
    ```javascript
    // frontend/src/api/photoApi.js
    import axios from 'axios';

    const uploadPhoto = async (photo) => {
      const formData = new FormData();
      formData.append('photo', photo);

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      };

      const response = await axios.post('/api/photos/upload', formData, config);
      return response.data.url;
    };

    export default uploadPhoto;
    ```

3. Use the photo upload function in your component:
    ```javascript
    // frontend/src/components/PhotoUpload.js
    import React, { useState } from 'react';
    import uploadPhoto from '../api/photoApi';

    const PhotoUpload = () => {
      const [photo, setPhoto] = useState(null);
      const [photoUrl, setPhotoUrl] = useState('');

      const handlePhotoChange = (e) => {
        setPhoto(e.target.files[0]);
      };

      const handlePhotoUpload = async () => {
        if (photo) {
          const url = await uploadPhoto(photo);
          setPhotoUrl(url);
        }
      };

      return (
        <div>
          <input type="file" onChange={handlePhotoChange} />
          <button onClick={handlePhotoUpload}>Upload Photo</button>
          {photoUrl && <img src={photoUrl} alt="Uploaded Photo" />}
        </div>
      );
    };

    export default PhotoUpload;
    ```

## Technologies

- **Frontend:**
  - React
  - Tailwind CSS

- **Backend:**
  - Node.js
  - Express
  - MongoDB
  - Mongoose
  - JWT
  - Multer
  - Cloudinary

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.


---

Feel free to reach out with any questions or suggestions!
