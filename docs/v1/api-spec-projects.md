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

## Example Error Response

**Response 400**

```json
{
  "status": 400,
  "validationErrors": ["Email is required", "Password must be at least 8 characters"],
  "error": "VALIDATION_ERRORS"
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

**Response 403**

```json
{
  "status": 403,
  "validationErrors": null,
  "error": "FORBIDDEN"
}
```

**Response 404**

```json
{
  "status": 403,
  "validationErrors": null,
  "error": "NOT_FOUND"
}
```

**Response 500**

```json
{
  "status": 500,
  "validationErrors": null,
  "error": "INTERNAL_SERVER_ERROR"
}
```

## Endpoints

### Get All Projects

| Method | Endpoint    | Description                   | Auth Required |
| ------ | ----------- | ----------------------------- | ------------- |
| GET    | `/projects` | Mendapatkan semua data projek | No            |

**Parameters**

- **Cookie**

**Response 200**

```json
{
  "meta": {
    "pagination": {
      "page": 1,
      "limit": 10,
      "totalPages": 1,
      "totalItems": 1
    }
  },
  "data": [
    {
      "id": "uuid v7",
      "title": "Judul Projek",
      "description": "Deskripsi singkat projek",
      "imageUrl": "s3 or file server.jpg",
      "slug": "judul-proyek-ui67d"
    }
  ]
}
```

---

### Get Individual Projects

| Method | Endpoint         | Description                   | Auth Required |
| ------ | ---------------- | ----------------------------- | ------------- |
| GET    | `/projects/{id}` | Mendapatkan semua data projek | No            |

**Response 200**

```json
{
  "meta": null,
  "data": {
    "id": "uuid v7",
    "title": "Judul Projek",
    "description": "Deskripsi singkat projek",
    "imageUrl": "s3 or file server.jpg",
    "slug": "judul-proyek-ui67d"
  }
}
```

---

### Create Projects

| Method | Endpoint    | Description     | Auth Required |
| ------ | ----------- | --------------- | ------------- |
| POST   | `/projects` | Membuat Project | Yes           |

**Request Body**

```json
{
  "title": "tes1t",
  "description": "tes1t",
  "imageUrl": "tes1t"
}
```

**Response 200**

```json
{
  "meta": null,
  "data": {
    "id": "uuid v7",
    "title": "Judul Projek",
    "description": "Deskripsi singkat projek",
    "imageUrl": "s3 or file server.jpg",
    "slug": "judul-proyek-ui67d"
  }
}
```

---

### Update Projects

| Method | Endpoint         | Description      | Auth Required |
| ------ | ---------------- | ---------------- | ------------- |
| PATCH  | `/projects/{id}` | Mengedit Project | Yes           |

**Response 200**

```json
{
  "meta": null,
  "data": {
    "id": "uuid v7",
    "title": "Judul Projek",
    "description": "Deskripsi singkat projek",
    "imageUrl": "s3 or file server.jpg",
    "slug": "judul-proyek-ui67d"
  }
}
```

---

### Update Projects

| Method | Endpoint         | Description       | Auth Required |
| ------ | ---------------- | ----------------- | ------------- |
| DELETE | `/projects/{id}` | Menghapus Project | Yes           |

**Response 200**

```json
{
  "meta": null,
  "data": {
    "id": "uuid v7",
    "title": "Judul Projek",
    "description": "Deskripsi singkat projek",
    "imageUrl": "s3 or file server.jpg",
    "slug": "judul-proyek-ui67d"
  }
}
```
