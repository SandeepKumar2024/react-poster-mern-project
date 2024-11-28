# PosTer - CMS (Content Management System) 

PosTer is a CMS developed using the MERN stack, featuring JWT-based authentication, authorization, and role-based access control. It allows users with different roles (Admin, Editor, Viewer) to interact with posts according to their permissions.

## Features

1. **Authentication & Authorization**
   - JWT-based secure login system.
   - Role-based access control for Admin, Editor, and Viewer roles.

2. **Role-Based Functionality**
   - **Admin**: Full access (Create, Read, Update, Delete posts).
   - **Editor**: Can Create, Read, and Update posts, but cannot delete them.
   - **Viewer**: Read-only access to posts.

3. **CRUD Operations**
   - Create, Read, Update, and Delete posts through REST APIs.

4. **Secure Backend**
   - Uses middleware to validate JWTs and enforce role-based restrictions.

## Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Install dependencies:
   ```bash
   cd api
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the `api` directory and configure the following:
     ```env
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_secret_key
     ```

4. Start the application:
   ```bash
   npm start
   ```

## API Endpoints

| Method | Endpoint         | Description                | Access     |
|--------|------------------|----------------------------|------------|
| GET    | /api/v2/post/all       | Fetch all posts            | All Roles  |
| POST   | /api/v2/post       | Create a new post          | Admin, Editor |
| PUT    | /api/v2/post/:id   | Update an existing post    | Admin, Editor |
| DELETE | /apiv2//post/:id   | Delete a post              | Admin      |

## Folder Structure

```
PosTer/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── .env
│   └── server.js
└── frontend/
    ├── src/
    ├── public/
    └── package.json
```

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.


