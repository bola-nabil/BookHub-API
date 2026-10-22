
# 📚 BookHub API

A RESTful Book Management API built with **Node.js, Express.js, MongoDB, and Mongoose**. This project provides a structured backend for managing books, authors, categories, user authentication, reviews, and favorite books.

## 🚀 Features

- 🔐 **Authentication:** User registration and login using JWT.
- 🔒 **Password Security:** Password hashing with bcrypt.
- 👥 **Role-Based Authorization:** Admin permissions for administrative operations.
- 📚 **Book Management:** Create, retrieve, update, and delete books.
- ✍️ **Author Management:** Manage authors and their associated books.
- 🗂️ **Category Management:** Organize books into categories.
- ⭐ **Reviews:** Create, retrieve, update, and delete book reviews.
- ❤️ **Favorites:** Add and remove favorite books.
- 🔎 **Search & Filtering:** Filter books by title, author, category, price, and language.
- 📄 **Pagination & Sorting:** Retrieve and organize book collections efficiently.
- ✅ **Validation & Error Handling:** Validate requests and handle API errors.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| Express.js | REST API and routing |
| MongoDB | NoSQL database |
| Mongoose | Database modeling and queries |
| JWT | Authentication |
| bcrypt | Password hashing |
| dotenv | Environment configuration |

## 📁 Project Structure

```text
BookHub-API/
├── src/
│   ├── config/
│   ├── middlewares/
│   ├── modules/
│   │   ├── auth/
│   │   ├── author/
│   │   ├── book/
│   │   ├── category/
│   │   ├── review/
│   │   └── favorite/
│   ├── utils/
│   ├── app.js
│   └── server.js
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

Each module separates responsibilities into routes, controllers, services, models, and validation where applicable.

## ⚙️ Installation

### Prerequisites

- [Node.js](https://nodejs.org/)
- npm
- [MongoDB](https://www.mongodb.com/products/platform/atlas) or a local MongoDB instance

### 1. Clone the repository

```bash
git clone https://github.com/bola-nabil/BookHub-API.git
cd BookHub-API
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
PORT=5000
DB_URL=mongodb://127.0.0.1:27017/bookhub
JWT_SECRET=your_long_random_secret
```

Replace the database URL with your actual MongoDB connection string if needed. Never commit your real `.env` file or expose secrets publicly.

### 4. Start the server

```bash
npm start
```

The default port is `5000`.

**API Base URL:**

```text
http://localhost:5000/api/v1
```

## 🔑 Authentication

BookHub API uses JSON Web Tokens (JWT) to authenticate users.

1. Register a new account.
2. Log in to receive an authentication token.
3. Include the token in the `Authorization` header when accessing protected endpoints.

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

Administrative operations require the appropriate role. Review updates and deletions should be restricted to the review owner or an admin.

## 📡 API Endpoints

All endpoints use the `/api/v1` base path.

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/register` | Register a new user |
| POST | `/auth/login` | Log in and receive a JWT |

### Books

| Method | Endpoint | Description |
|---|---|---|
| GET | `/books` | Retrieve books |
| GET | `/books/:id` | Retrieve a book by ID |
| POST | `/books` | Create a book (Admin) |
| PATCH | `/books/:id` | Update a book (Admin) |
| DELETE | `/books/:id` | Delete a book (Admin) |

**Available filters:** `search`, `author`, `category`, `minPrice`, `maxPrice`, and `language`.

### Authors

| Method | Endpoint | Description |
|---|---|---|
| GET | `/authors` | Retrieve all authors |
| GET | `/authors/:id` | Retrieve an author |
| GET | `/authors/:id/books` | Retrieve an author's books |
| POST | `/authors` | Create an author (Admin) |
| PATCH | `/authors/:id` | Update an author (Admin) |
| DELETE | `/authors/:id` | Delete an author (Admin) |

### Categories

| Method | Endpoint | Description |
|---|---|---|
| GET | `/categories` | Retrieve all categories |
| GET | `/categories/:id` | Retrieve a category |
| GET | `/categories/:id/books` | Retrieve books in a category |
| POST | `/categories` | Create a category (Admin) |
| PATCH | `/categories/:id` | Update a category (Admin) |
| DELETE | `/categories/:id` | Delete a category (Admin) |

### Reviews

| Method | Endpoint | Description |
|---|---|---|
| POST | `/books/:bookId/reviews` | Create a book review |
| GET | `/books/:bookId/reviews` | Retrieve a book's reviews |
| PATCH | `/reviews/:id` | Update a review |
| DELETE | `/reviews/:id` | Delete a review |

### Favorites

| Method | Endpoint | Description |
|---|---|---|
| POST | `/books/:bookId/favorite` | Add a book to favorites |
| GET | `/users/me/favorites` | Retrieve the current user's favorites |
| DELETE | `/books/:bookId/favorite` | Remove a book from favorites |

> **Note:** Protected endpoints require a valid JWT. Confirm that the access permissions documented above match your implemented middleware.

## 🧪 Example Requests

### Register a user

```http
POST /api/v1/auth/register
Content-Type: application/json
```

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "StrongPassword123!"
}
```

### Log in

```http
POST /api/v1/auth/login
Content-Type: application/json
```

```json
{
  "email": "john@example.com",
  "password": "StrongPassword123!"
}
```

The login response includes a JWT that can be used to access protected endpoints.

### Retrieve books

```http
GET /api/v1/books?page=1&limit=10&search=javascript
Authorization: Bearer YOUR_JWT_TOKEN
```

Use [Postman](https://www.postman.com/) to test the endpoints.

## ⚠️ Error Handling

| Status Code | Description |
|---|---|
| `200` | Request successful |
| `201` | Resource created |
| `400` | Invalid request data |
| `401` | Missing or invalid authentication |
| `403` | Insufficient permissions |
| `404` | Resource or route not found |
| `500` | Internal server error |

## 🔮 Future Improvements

- [ ] Automated unit and integration tests
- [ ] API documentation with Swagger/OpenAPI
- [ ] Rate limiting and additional security hardening
- [ ] Docker support
- [ ] CI/CD integration with GitHub Actions

## 👨‍💻 Author

**Bola Nabil**

- GitHub: [@bola-nabil](https://github.com/bola-nabil)
- LinkedIn: [Bola Nabil](https://www.linkedin.com/in/bolanabil/)

---

⭐ If you find this project useful, consider giving the repository a star!
