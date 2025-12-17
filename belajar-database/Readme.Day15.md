# ** Postman **

## **🔐 STEP 1: REGISTER USER BARU**

### **Request:**
```http
POST http://localhost:5000/api/auth/password/register
Content-Type: application/json
X-API-Key: katasandi123

{
  "name": "Rizqi Setiawan",
  "email": "rizqi@example.com",
  "password": "password123",
  "role": "USER"
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
        "role": "USER"
    }
}
```

---

## **🔑 STEP 2: LOGIN DAPAT TOKEN**

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
            "role": "USER"
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTEsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzY1OTc4MTQ3LCJleHAiOjE3NjU5ODE3NDd9.siPaGrtIDQiByXpdZj_oQHg1o2D75TldhjM5Qha5rZA"
    }
}
```

---

## **👤 STEP 3: CREATE PROFILE DENGAN FOTO**

### **Request (FORM DATA):**
```http
POST http://localhost:5000/api/profiles
X-API-Key: katasandi123
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

// Body → form-data
Key: name        Value: Rizqi Setiawan
Key: gender      Value: MALE
Key: address     Value: Jogjakarta, Indonesia
Key: image       Value: foto1.jpg
```

### **Response Success (201):**
```json
{
  "success": true,
  "message": "Profile berhasil dibuat",
  "data": {
    "id": 1,
    "gender": "MALE",
    "address": "Jogjakarta, Indonesia",
    "profile_picture_url": "/public/uploads/foto1.jpg",
    "name": "Rizqi Setiawan",
    "user_id": 1,
    "createdAt": "2024-12-15T10:30:00.000Z",
    "updatedAt": "2024-12-15T10:30:00.000Z",
    "deletedAt": null,
    "user": {
      "id": 1,
      "username": "Rizqi Setiawan",
      "email": "rizqi@example.com",
      "role": "USER"
    }
  }
}
```

---

## **🏪 STEP 4: BUAT KATEGORI PRODUK**

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
    "createdAt": "2024-12-15T10:35:00.000Z",
    "updatedAt": "2024-12-15T10:35:00.000Z",
    "deletedAt": null
  }
}
```

---

## **📦 STEP 5: BUAT PRODUK DENGAN GAMBAR**

### **Request (FORM DATA):**
```http
POST http://localhost:5000/api/products
X-API-Key: katasandi123
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

// Body → form-data
Key: name            Value: iPhone 15 Pro Max
Key: description     Value: iPhone terbaru dengan kamera 48MP
Key: price           Value: 1599.99
Key: stock           Value: 50
Key: categoryId      Value: 1
Key: image           Value: iphone15.jpg
```

### **Response Success (201):**
```json
{
  "success": true,
  "message": "Produk berhasil ditambahkan",
  "data": {
    "id": 1,
    "name": "iPhone 15 Pro Max",
    "description": "iPhone terbaru dengan kamera 48MP",
    "price": "1599.99",
    "stock": 50,
    "image": "/public/uploads/iphone15.jpg",
    "categoryId": 1,
    "createdAt": "2024-12-15T10:40:00.000Z",
    "updatedAt": "2024-12-15T10:40:00.000Z",
    "deletedAt": null,
    "category": {
      "id": 1,
      "name": "Electronics"
    }
  }
}
```

---

## **🛍️ STEP 6: CHECKOUT ORDER**

### **Request:**
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
    "items": [
      {
        "product_id": 1,
        "quantity": 2
      },
    ],
    "created_at": "2024-12-15T10:50:00.000Z"
  }
}
```

---

## **📋 STEP 7: LIHAT SEMUA PRODUK**

### **Request:**
```http
GET http://localhost:5000/api/products
X-API-Key: katasandi123
```

### **Response Success (200):**
```json
{
  "success": true,
  "message": "Berhasil mengambil data produk",
  "data": [
    {
      "id": 1,
      "name": "iPhone 15 Pro Max",
      "description": "iPhone terbaru dengan kamera 48MP",
      "price": "1599.99",
      "stock": 48,  
      "image": "/uploads/1702645300000-iphone15.jpg",
      "categoryId": 1,
      "createdAt": "2024-12-15T10:40:00.000Z"
    },
  ]
}
```

---

## **🎯 SUMMARY FLOW:**

```
1. Register User → Dapat User ID
2. Login → Dapat JWT Token
3. Create Profile → Upload Foto Profil
4. Create Category → Electronics
5. Create Product 1 → iPhone dengan gambar
6. Checkout Order → Beli produk
7. View Products → Lihat stok berkurang
```

## **🎉 SELESAI!**