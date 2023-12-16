# Node.js Backend Documentation

Welcome to the documentation for the Node.js backend of our application. This backend is designed to provide a secure and scalable foundation for user management, post handling, and comment functionalities using MongoDB as the database.

## Table of Contents

1. [Authentication](#authentication)
   - [Sign Up](#sign-up)
   - [Login](#login)
   - [Logout](#logout)

2. [User Management](#user-management)
   - [Get User Profile](#get-user-profile)
   - [Update User Profile](#update-user-profile)
   - [Change Password](#change-password)
   - [Delete User Account](#delete-user-account)

3. [Post Management](#post-management)
   - [Create a New Post](#create-a-new-post)
   - [Get All Posts](#get-all-posts)

4. [Comment Management](#comment-management)
   - [Add Comment](#add-comment)
   - [Get Comments for a Post](#get-comments-for-a-post)

5. [Error Handling](#error-handling)

6. [Setup Instructions](#setup-instructions)

---

## Authentication

### Sign Up

Create a new user account.

- **Endpoint:** `POST /api/auth/signup`
- **Request:**
  - **Headers:** `Content-Type: application/json`
  - **Body:**
    ```json
    {
      "username": "yourUsername",
      "email": "your.email@example.com",
      "password": "yourSecurePassword"
    }
```
- **Response:**
  - **Status Code:** 201
  - **Body:**
    ```json
    {
      "message": "Signup successful",
      "user": {
        "id": 1,
        "username": "yourUsername",
        "email": "your.email@example.com"
      },
      "token": "<yourAuthToken>"
    }
    ```


### Login

Authenticate an existing user and generate a session.

- **Endpoint:** `POST /api/auth/login`
- **Request:**
  - **Headers:** `Content-Type: application/json`
  - **Body:**
    ```json
    {
      "email": "your.email@example.com",
      "password": "yourSecurePassword"
    }
   ```
- **Response:**
  - **Status Code:** 200
  - **Body:**
    ```json
    {
      "message": "Login successful",
      "user": {
        "id": 1,
        "username": "yourUsername",
        "email": "your.email@example.com"
      },
      "token": "<yourAuthToken>"
    }
    ```

### Logout

Destroy the user session to logout.

- **Endpoint:** `POST /api/auth/logout`
- **Response:**
  - **Status Code:** 200
  - **Body:**
    ```json
    {
      "message": "Logout successful"
    }
    ```

---

## User Management

### Get User Profile

Retrieve the user profile based on the provided userId.

- **Endpoint:** `GET /api/user/:userId`
- **Request:**
  - **Headers:** `Authorization: Bearer <yourAuthToken>`
- **Response:**
  - **Status Code:** 200
  - **Body:**
    ```json
    {
      "user": {
        "id": 1,
        "username": "yourUsername",
        "email": "your.email@example.com"
      }
    }
    ```

### Update User Profile

Update the user profile information.

- **Endpoint:** `PUT /api/user/:userId`
- **Request:**
  - **Headers:** `Authorization: Bearer <yourAuthToken>`, `Content-Type: application/json`
  - **Body:**
    ```json
    {
      "username": "newUsername",
      "email": "new.email@example.com"
    }
    ```
- **Response:**
  - **Status Code:** 200
  - **Body:**
    ```json
    {
      "message": "User profile updated successfully",
      "user": {
        "id": 1,
        "username": "newUsername",
        "email": "new.email@example.com"
      }
    }
    ```

### Change Password

Change the user's password.

- **Endpoint:** `PUT /api/user/change-password/:userId`
- **Request:**
  - **Headers:** `Authorization: Bearer <yourAuthToken>`, `Content-Type: application/json`
  - **Body:**
    ```json
    {
      "oldPassword": "oldSecurePassword",
      "newPassword": "newSecurePassword"
    }
    ```
- **Response:**
  - **Status Code:** 200
  - **Body:**
    ```json
    {
      "message": "Password changed successfully"
    }
    ```

### Delete User Account

Delete the user account.

- **Endpoint:** `DELETE /api/user/:userId`
- **Request:**
  - **Headers:** `Authorization: Bearer <yourAuthToken>`
- **Response:**
  - **Status Code:** 200
  - **Body:**
    ```json
    {
      "message": "User account deleted successfully"
    }
    ```

---

## Post Management

### Create a New Post

Create a new post with the provided title and content.

- **Endpoint:** `POST /api/posts`
- **Request:**
  - **Headers:** `Authorization: Bearer <yourAuthToken>`, `Content-Type: application/json`
  - **Body:**
    ```json
    {
      "title": "New Post Title",
      "content": "This is the content of the new post."
    }
    ```
- **Response:**
  - **Status Code:** 201
  - **Body:**
    ```json
    {
      "message": "Post created successfully",
      "post": {
        "id": 123,
        "title": "New Post Title",
        "content": "This is the content of the new post."
      }
    }
    ```

### Get All Posts

Get a list of all posts.

- **Endpoint:** `GET /api/posts`
- **Request:**
  - **Headers:** `Authorization: Bearer <yourAuthToken>`
- **Response:**
  - **Status Code:** 200
  - **Body:**
    ```json
    {
      "posts": [
        {
          "id": 123,
          "title": "Post Title 1",
          "content": "Content of Post 1"
        },
        {
          "id": 124,
          "title": "Post Title 2",
          "content": "Content of Post 2"
        },
        // ... other posts
      ]
    }
    ```

---

## Comment Management

### Add Comment

Add a new comment to a post.

- **Endpoint:** `POST /api/comments/:postId`
- **Request:**
  - **Headers:** `Authorization: Bearer <yourAuthToken>`, `Content-Type: application/json`
  - **Body:**
    ```json
    {
      "content": "This is a new comment."
    }
    ```
- **Response:**
  - **Status Code:** 201
  - **Body:**
    ```json
    {
      "message": "Comment added successfully",
      "comment": {
        "id": 456,
        "postId": 123,
        "content": "This is a new comment."
      }
    }
    ```

### Get Comments for a Post

Retrieve all comments for a specific post.

- **Endpoint:** `GET /api/comments/:postId`
- **Request:**
  - **Headers:** `Authorization: Bearer <yourAuthToken>`
- **Response:**
  - **Status Code:** 200
  - **Body:**
    ```json
    {
      "comments": [
        {
          "id": 456,
          "postId": 123,
          "content": "Comment 1 for Post 123"
        },
        {
          "id": 457,
          "postId": 123,
          "content": "Comment 2 for Post 123"
        },
        // ... other comments
      ]
    }
    ```

## Error Handling

In case of errors, the API will provide detailed information to help diagnose the issue.

- **Status Code:** 400
  - **Body:**
    ```json
    {
      "error": "Bad Request",
      "message": "Invalid input. Please check your request payload."
    }
    ```

- **Status Code:** 401
  - **Body:**
    ```json
    {
      "error": "Unauthorized",
      "message": "Authentication failed. Please provide valid credentials."
    }
    ```

- **Status Code:** 404
  - **Body:**
    ```json
    {
      "error": "Not Found",
      "message": "Resource not found. Please check your request URL."
    }
    ```

- **Status Code:** 500
  - **Body:**
    ```json
    {
      "error": "Internal Server Error",
      "message": "An unexpected error occurred. Please try again later."
    }
    ```

...
