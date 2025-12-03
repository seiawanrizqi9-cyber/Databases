Berdasarkan modul di atas, berikut jawaban untuk soal Day 2:

---

### **1. Apa itu routing dalam konteks Express.js?**
**Routing** dalam Express.js adalah mekanisme untuk menangani **permintaan HTTP** (seperti GET, POST, PUT, DELETE) dari klien ke **jalur (path) tertentu** pada server. Setiap rute terdiri dari:
- **HTTP method** (GET, POST, dll.)
- **Path/URL** yang didefinisikan
- **Handler function** yang akan dieksekusi ketika rute tersebut cocok dengan permintaan.

Contoh dalam modul:
```javascript
app.get('/', (req, res) => {
  res.send('Hello World!');
});
```
Artinya: Ketika ada permintaan **GET** ke path **/** , server akan menjalankan fungsi handler dan mengirim respons `Hello World!`.

---

### **2. Jelaskan perbedaan antara route static dan route dinamis!**
- **Route Static:**
  - Path-nya **tetap** (statis) dan **harus persis** sama dengan yang didefinisikan.
  - Contoh: `/berita`, `/categories`, `/page/categories`.

- **Route Dinamis:**
  - Path-nya **dapat berubah-ubah** karena mengandung **parameter** yang dapat diganti nilai.
  - Ditandai dengan tanda **`:`** di depan nama parameter.
  - Contoh: `/berita/:id` → dapat diakses dengan `/berita/1`, `/berita/100`, dll.
  - Berguna untuk menangani data yang bervariasi (misalnya artikel berdasarkan ID).

---

### **3. Bagaimana cara menangkap parameter route di Express.js? Berikan contoh singkat!**
Parameter route dinamis ditangkap melalui objek **`req.params`**.

**Contoh:**
```javascript
// Definisi route
app.get('/berita/:id', (req, res) => {
  const idBerita = req.params.id; // Menangkap nilai parameter 'id'
  res.send(`Anda membuka berita dengan ID: ${idBerita}`);
});
```
- Jika diakses: `GET /berita/123` → Output: `Anda membuka berita dengan ID: 123`.

---

### **4. Apa fungsi middleware dalam proses routing di Express.js?**
Middleware dalam Express.js berfungsi sebagai **penengah (interceptor)** yang:
- Dapat **mengeksekusi kode** sebelum atau setelah proses routing.
- **Mengubah objek request (`req`)** atau **response (`res`)**.
- **Menghentikan request** (misalnya jika tidak terautentikasi) atau **melanjutkan ke proses berikutnya** dengan `next()`.

**Contoh dalam modul:**
- Middleware `myLogger` mencetak log setiap ada permintaan.
- Middleware `body-parser` untuk memparsing body request (JSON atau form).
- Middleware `cors` untuk mengizinkan permintaan dari origin berbeda.

---

### **5. Jelaskan bagaimana Express.js menentukan route mana yang akan dijalankan saat menerima request!**
Express.js menentukan rute dengan **mencocokkan** dua hal:
1. **HTTP Method** (GET, POST, dll.)
2. **Path/URL** yang diminta.

**Alur pencocokan:**
- Express akan **membaca rute dari atas ke bawah** (sesuai urutan penulisan kode).
- Jika ditemukan rute dengan **method dan path yang cocok**, maka handler-nya akan dieksekusi.
- Jika **tidak cocok**, Express akan melanjutkan ke rute berikutnya.
- Jika **tidak ada yang cocok** hingga akhir, maka akan masuk ke **middleware 404** (jika didefinisikan).

**Contoh:**
```javascript
app.get('/berita', (req, res) => {
  res.send('Daftar berita');
});

app.get('/berita/:id', (req, res) => {
  res.send(`Detail berita ID: ${req.params.id}`);
});
```
- Request `GET /berita` → cocok dengan rute pertama.
- Request `GET /berita/5` → cocok dengan rute kedua (dinamis).
- Request `POST /berita` → tidak cocok (akan error `Cannot POST /berita`).

---

**Kesimpulan:**
Routing di Express.js fleksibel, mendukung **static** dan **dynamic routes**, dengan middleware sebagai alat bantu untuk menangani logika tambahan dalam alur permintaan.