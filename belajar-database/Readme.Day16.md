# **🎯 POSTMAN Testing**

## **📝 STEP 1: REGISTER USER**

### **Request:**
```http
POST http://localhost:5000/api/auth/password/register
Content-Type: application/json
X-API-Key: katasandi123

{
  "name": "Rizqi Setiawan",
  "email": "rizqi@example.com",
  "password": "password123",
  "role": "ADMIN"
}
```

### **Response Success (201):**
```json
{
  "success": true,
  "message": "Register berhasil!",
  "data": {
    "email": "rizqi@example.com",
    "name": "Rizqi Setiawan",
    "role": "ADMIN"
  }
}
```

---

## **🔐 STEP 2: LOGIN**

### **Request:**
```http
POST http://localhost:5000/api/auth/password/login
Content-Type: application/json
X-API-Key: katasandi123

{
  "email": "rizqi@example.com",
  "password": "password123"
}
```

### **Response Success (200):**
```json
{
  "success": true,
  "message": "Login berhasil!",
  "data": {
    "userReturn": {
      "email": "rizqi@example.com",
      "name": "Rizqi Setiawan",
      "role": "ADMIN"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzM0MjQwMDAwLCJleHAiOjE3MzQyNDM2MDB9.testtoken123456"
  }
}
```

**TOKEN:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

---

## **🏪 STEP 3: CREATE CATEGORY**

### **Request:**
```http
POST http://localhost:5000/api/categories
Content-Type: application/json
X-API-Key: katasandi123
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

{
  "name": "Electronics"
}
```

### **Response Success (201):**
```json
{
  "success": true,
  "message": "Kategori berhasil ditambahkan",
  "data": {
    "id": 1,
    "name": "Electronics",
    "createdAt": "2024-12-15T10:35:00.000Z"
  }
}
```

---

## **📦 STEP 4: CREATE PRODUCTS**

### **Request 1: iPhone**
```http
POST http://localhost:5000/api/products
Content-Type: application/json
X-API-Key: katasandi123
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

{
  "name": "iPhone 15 Pro",
  "description": "iPhone terbaru",
  "price": 1599.99,
  "stock": 50,
  "categoryId": 1
}
```

### **Request 2: MacBook**
```http
POST http://localhost:5000/api/products
Content-Type: application/json
X-API-Key: katasandi123
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

{
  "name": "MacBook Air M3",
  "description": "Laptop tipis",
  "price": 1299.99,
  "stock": 30,
  "categoryId": 1
}
```

---

## **🎯 STEP 5: TEST PAGINATION**

### **5.1 PRODUCTS PAGINATION**
```http
GET http://localhost:5000/api/products?page=1&limit=2&search=iPhone&min_price=1000&max_price=2000&sortBy=price&sortOrder=asc
X-API-Key: katasandi123
```

**Response:**
```json
{
  "success": true,
  "message": "Produk berhasil diambil",
  "data": [
    {
      "id": 1,
      "name": "iPhone 15 Pro",
      "price": "1599.99",
      "stock": 50,
      "categoryId": 1
    }
  ],
  "meta": {
    "page": 1,
    "limit": 2,
    "total": 1,
    "totalPages": 1
  }
}
```

### **5.2 CATEGORIES PAGINATION**
```http
GET http://localhost:5000/api/categories?page=1&limit=5&search=Elec&sortBy=name&sortOrder=asc
X-API-Key: katasandi123
```

**Response:**
```json
{
  "success": true,
  "message": "Kategori berhasil diambil",
  "data": [
    {
      "id": 1,
      "name": "Electronics",
      "createdAt": "2024-12-15T10:35:00.000Z"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 5,
    "total": 1,
    "totalPages": 1
  }
}
```

---

## **🛒 STEP 6: CREATE ORDER**

### **Checkout Request:**
```http
POST http://localhost:5000/api/orders/checkout
Content-Type: application/json
X-API-Key: katasandi123
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

{
  "orderItems": [
    {
      "product_id": 1,
      "quantity": 2
    },
    {
      "product_id": 2,
      "quantity": 1
    }
  ]
}
```

### **Response Success (201):**
```json
{
  "success": true,
  "message": "Checkout berhasil",
  "data": {
    "order_id": 1,
    "user_id": 1,
    "total": "4499.97",
    "items": [...]
  }
}
```

---

## **🎯 STEP 7: TEST MORE PAGINATION**

### **7.1 ORDERS PAGINATION**
```http
GET http://localhost:5000/api/orders?page=1&limit=3&min_total=1000&sortBy=createdAt&sortOrder=desc
X-API-Key: katasandi123
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response:**
```json
{
  "success": true,
  "message": "Order berhasil diambil",
  "data": [
    {
      "id": 1,
      "total": "4499.97",
      "user_id": 1,
      "user": {
        "username": "Rizqi Setiawan",
        "email": "rizqi@example.com"
      }
    }
  ],
  "meta": {
    "page": 1,
    "limit": 3,
    "total": 1,
    "totalPages": 1
  }
}
```

### **7.2 ORDER ITEMS PAGINATION**
```http
GET http://localhost:5000/api/order-items?page=1&limit=4&order_id=1&sortBy=quantity&sortOrder=desc
X-API-Key: katasandi123
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response:**
```json
{
  "success": true,
  "message": "Order items berhasil diambil",
  "data": [
    {
      "id": 1,
      "order_id": 1,
      "product_id": 1,
      "quantity": 2,
      "product": {
        "name": "iPhone 15 Pro",
        "price": "1599.99"
      }
    },
    {
      "id": 2,
      "order_id": 1,
      "product_id": 2,
      "quantity": 1,
      "product": {
        "name": "MacBook Air M3",
        "price": "1299.99"
      }
    }
  ],
  "meta": {
    "page": 1,
    "limit": 4,
    "total": 2,
    "totalPages": 1
  }
}
```

---

## **👤 STEP 8: CREATE PROFILE**

### **Request:**
```http
POST http://localhost:5000/api/profiles
Content-Type: application/json
X-API-Key: katasandi123
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

{
  "name": "Rizqi Setiawan",
  "gender": "MALE",
  "address": "Jogja, Indonesia"
}
```

### **Response Success (201):**
```json
{
  "success": true,
  "message": "Profile berhasil dibuat",
  "data": {
    "id": 1,
    "name": "Rizqi Setiawan",
    "gender": "MALE",
    "address": "Jogja, Indonesia",
    "user_id": 1
  }
}
```

---

## **🎯 STEP 9: PROFILES PAGINATION**

### **Request:**
```http
GET http://localhost:5000/api/profiles?page=1&limit=3&search=Rizqi&gender=MALE&sortBy=name&sortOrder=asc
X-API-Key: katasandi123
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### **Response Success (200):**
```json
{
  "success": true,
  "message": "Semua profile berhasil diambil",
  "data": [
    {
      "id": 1,
      "name": "Rizqi Setiawan ",
      "gender": "MALE",
      "address": "jogja, Indonesia",
      "user": {
        "username": "Rizqi Setiawan",
        "email": "rizqi@example.com",
        "role": "ADMIN"
      }
    }
  ],
  "meta": {
    "page": 1,
    "limit": 3,
    "total": 1,
    "totalPages": 1
  }
}
```
## **Selesai**