# Simple Authentication Backend

A simple RESTful API for user registration and login, with secure password hashing using bcrypt and JWT authentication.

## 🚀 Features

- **User Registration**: Create a new account with hashed password.
- **User Login**: Authenticate existing users and return a JWT token.
- **Secure Password Handling**: Passwords are hashed using bcrypt before storage.

## 🛠️ Technologies Used

- Node.js
- Express.js
- bcryptjs
- jsonwebtoken

## 📦 Installation

1. Clone the repository:

```bash
git clone https://github.com/Pankaj2612/Simple-Auth-Backend.git
cd Simple-Auth-Backend
```

2. Install dependencies:

```bash
npm install
```

3. Set up your MongoDB database URL in .env file (if using MongoDB):

```bash
MONGO_URI=your_mongodb_connection_string
```

4. Start the server:

```bash
node index.js
```

The API will be available at `http://localhost:8000/`.

## 🧪 API Endpoints

### Authentication

- **POST** /register: Register a new user.  
  **Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```
  **Response**:
```json
{
  "message": "User registered successfully."
}
```

- **POST** /login: Log in an existing user.  
  **Body**:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
  **Response**:
```json
{
  "message": "Login successful.",
  "token": "<jwt_token>"
}
```

