# API Specification website SCIT

## Overview

Deskripsi singkat mengenai API ini: tujuan, use case, dan siapa yang akan menggunakannya.

- **Base URL**: `https://scit.uin-suka.ac.id/api/v1`
- **Auth Method**: Bearer Token / Cookie
- **Content Type**: `application/json`

---

## Authentication

Mekanisme autentikasi yang digunakan API ini:

- **Type**: Bearer Token
- **Header**:
  ```http
  Authorization: Bearer <token>
  ```

---

**Semua response jika Error Internal Server**

```json
{
  "status": 500,
  "validationErrors": null,
  "error": "INTERNAL_SERVER_ERROR"
}
```

## Endpoints

### Login

| Method | Endpoint      | Description              | Auth Required |
| ------ | ------------- | ------------------------ | ------------- |
| POST   | `/auth/login` | Mendapatkan access token | No            |

**Request Body**

```json
{
  "username": "string",
  "password": "string"
}
```

**Response 200**

```json
{
  "meta": null,
  "data": {
    "session_id": "token",
    "expires_in": 3600
  }
}
```

**Response 401**

```json
{
  "status": 401,
  "validationErrors": null,
  "error": "INVALID_CREDENTIALS"
}
```

**Response 400**

```json
{
  "status": 400,
  "validationErrors": ["Email is required", "Password must be at least 8 characters"],
  "error": "VALIDATION_ERRORS"
}
```

---

### Logout

| Method | Endpoint       | Description      | Auth Required |
| ------ | -------------- | ---------------- | ------------- |
| POST   | `/auth/logout` | Melakukan logout | Yes           |

**Parameters**

- **Cookie**

**Response 200**

```json
{
  "success": true
}
```

**Response 401**

```json
{
  "status": 401,
  "validationErrors": null,
  "error": "INVALID_CREDENTIALS"
}
```

### Get Current Session

| Method | Endpoint        | Description              | Auth Required |
| ------ | --------------- | ------------------------ | ------------- |
| GET    | `/auth/session` | Mendapatkan data session | Yes           |

**Parameters**

- **Cookie**

**Response 200**

```json
{
  "meta": null,
  "data": {
    "id": "uuid v7",
    "name": "Ahmad Zidni",
    "email": "ahmad@gmail.com",
    "avatarUrl": "s3 or file server.jpg"
  }
}
```

---

### Update User

| Method | Endpoint      | Description          | Auth Required |
| ------ | ------------- | -------------------- | ------------- |
| PUT    | `/users/{id}` | Mengupdate data user | Yes           |

**Request Body**

```json
{
  "name": "string",
  "email": "string"
}
```

**Response 200**

```json
{
  "id": "u123",
  "name": "Updated Name",
  "email": "updated@example.com"
}
```
