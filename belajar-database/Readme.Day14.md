# **📦 E-COMMERCE API - POSTMAN FLOW GUIDE**
---

## **🔐 1. REGISTER & LOGIN (2 CARA)**

### **A. PASSWORD LOGIN (Normal)**

#### **1.1 Register User Baru**
```postman
POST http://localhost:5000/api/auth/password/register
Content-Type: application/json
X-API-Key: katasandi123

{
  "name": "Nama Anda",
  "email": "email_unik@example.com",
  "password": "password123",
  "role": "USER"
}
```

#### **Hasilnya akan seperi ini:**
```postman
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


#### **1.2 Login dengan Password**
```http
POST http://localhost:5000/api/auth/password/login
Content-Type: application/json
X-API-Key: katasandi123

{
  "email": "email_unik@example.com",
  "password": "password123"
}
```

**SIMPAN TOKEN:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

#### **Hasilnya akan seperi ini:**
```postman
{
    "success": true,
    "message": "Login berhasil!",
    "data": {
        "userReturn": {
            "email": "rizqi@example.com",
            "name": "Rizqi Setiawan",
            "role": "USER"
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTEsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzY1ODgwMDQ0LCJleHAiOjE3NjU4ODM2NDR9.SzNOMRp7AK0Fw3gWSFY7K7kGM8ReQ6nydNjag7KEECA"
    }
}
```

---

### **B. MAGIC LOGIN (Passwordless)**

#### **1.3 Request Magic Link**
```http
POST http://localhost:5000/api/auth/magic/request
Content-Type: application/json
X-API-Key: katasandi123

{
  "email": "email_lain@example.com",
  "name": "Nama User"
}
```

**CEK CONSOLE SERVER untuk token magic!**

#### **1.4 Verify Magic Token**
```http
POST http://localhost:5000/api/auth/magic/verify
Content-Type: application/json
X-API-Key: katasandi123

{
  "token": "token_dari_console"
}
```

**SIMPAN TOKEN:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

---

## **🔒 2. AUTHENTIKASI (Semua Endpoint Protected)**

### **Headers Wajib untuk Semua Request:**
```
Content-Type: application/json
Header: X-API-Key || katasandi123
Authorization: Bearer <token_dari_login>
```

---

## **🛍️ 3. BROWSE PRODUCTS (Public)**

```http
GET http://localhost:5000/api/products
X-API-Key: katasandi123
```

**Response akan tampil:**
```json
{
  "id": 1,
  "name": "iPhone 15 Pro",
  "price": 1599.99,
  "stock": 50
}
```

**CATAT:** `product_id` untuk checkout nanti.

---

## **💳 4. CHECKOUT ORDER (Butuh Auth)**

```http
POST http://localhost:5000/api/orders/checkout
Content-Type: application/json
Header: X-API-Key || katasandi123
Authorization: Bearer <token_dari_login>

{
  "orderItems": [
    {
      "product_id": 1,     // ← ID dari GET /products
      "quantity": 2
    },
    {
      "product_id": 3,
      "quantity": 1
    }
  ]
}
```

#### **Hasilnya akan seperi ini:**
```postman
{
    "success": true,
    "message": "Checkout berhasil",
    "data": {
        "order_id": 154,
        "user": [],
        "total": "228.45",
        "items": [
            {
                "product_id": 1,
                "product_name": "Awesome Bamboo Fish",
                "price": "228.45",
                "quantity": 1,
                "subtotal": 228.45
            }
        ],
        "total_items": 1,
        "created_at": "2025-12-16T14:13:14.858Z"
    }
}
```

**CATATAN PENTING:**
- ❌ **Tidak perlu** kirim `user_id` (diambil otomatis dari token)
- ❌ **Tidak perlu** kirim `total` (dihitung otomatis)
- ✅ **Harus** punya token valid dari login

---

## **📋 5. LIHAT ORDER HISTORY**

```http
GET http://localhost:5000/api/orders
X-API-Key: katasandi123
Authorization: Bearer <token_dari_login>
```

**Hanya tampilkan order milik user yang login.**

---

## **❌ 6. ERROR HANDLING**

### **Error 401: Unauthorized**
```json
{
  "success": false,
  "message": "Unauthorized"
}
```
**Solusi:** Pastikan token valid & tidak expired.

### **Error 400: Validation Error**
```json
{
  "success": false,
  "message": "Stok 'iPhone 15 Pro' tidak cukup"
}
```
**Solusi:** Kurangi quantity atau ganti produk.

---

## **🎯 FLOW DIAGRAM**

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   REGISTER  │────▶│    LOGIN    │────▶│  DAPAT TOKEN│
└─────────────┘     └─────────────┘     └─────────────┘
        │                   │                   │
        ▼                   ▼                   ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  MAGIC LINK │────▶│ VERIFY TOKEN│────▶│  DAPAT TOKEN│
└─────────────┘     └─────────────┘     └─────────────┘
                                           │
                                           ▼
                                    ┌─────────────┐
                                    │   CHECKOUT  │◀───┐
                                    └─────────────┘    │
                                           │           │
                                           ▼           │
                                    ┌─────────────┐    │
                                    │   SUCCESS   │────┘
                                    └─────────────┘
```
# **Ready for production!** 🚀 