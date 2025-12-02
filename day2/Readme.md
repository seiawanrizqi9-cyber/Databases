
## **Jawaban**

1. Node.js adalah sebuah **runtime environment** yang memungkinkan JavaScript dijalankan di luar browser dengan memanfaatkan **V8 Engine** milik Google. Node.js bukanlah bahasa pemrograman, melainkan lingkungan eksekusi yang menyediakan kemampuan server-side untuk JavaScript.

Dalam praktiknya, Node.js biasanya digunakan untuk:

* **Pengembangan backend** seperti REST API, web service, dan sistem autentikasi.
* **Aplikasi real-time**, misalnya fitur chat, notifikasi langsung, atau monitoring sistem.
* **Pembuatan web server** tanpa memerlukan server eksternal tambahan.
* **Fullstack development**, karena frontend dan backend sama-sama menggunakan JavaScript.
* **Tools dan automasi**, seperti CLI tools atau script manajemen proyek.

Node.js memberikan fleksibilitas bagi developer JavaScript untuk bekerja pada sisi server sehingga pengembangan aplikasi menjadi lebih efisien.

2. Walaupun sama-sama menggunakan bahasa JavaScript, keduanya berjalan pada lingkungan yang berbeda sehingga memiliki fungsi serta keterbatasan yang berbeda pula.

**a. Lingkungan Eksekusi:**

* **Browser:** JavaScript dieksekusi dalam konteks browser seperti Chrome atau Firefox.
* **Node.js:** JavaScript dieksekusi langsung pada sistem operasi melalui terminal atau server.

**b. Fitur dan Akses:**

* **Browser:** memiliki akses ke DOM, event browser, window, document, dan fasilitas yang berhubungan dengan antarmuka pengguna.
* **Node.js:** tidak memiliki DOM, tetapi menyediakan akses ke sistem file, jaringan, proses, dan module server-side lainnya.

**c. Kegunaan Utama:**

* **JavaScript di browser:** fokus pada interaksi antarmuka, manipulasi HTML/CSS, dan pengalaman pengguna.
* **Node.js:** fokus pada pengelolaan server, routing, database interaction, dan pemrosesan data backend.

**d. Sistem Modul:**

* **Browser:** menggunakan ES Module (`import/export`).
* **Node.js:** menggunakan sistem modul CommonJS dengan fungsi `require()` (meskipun versi terbaru Node juga mendukung ES Module).

Dengan demikian, meskipun bahasanya sama, implementasi dan perannya berbeda sesuai lingkungan tempat JavaScript dijalankan.

3. Dalam Node.js, `require()` adalah fungsi yang digunakan untuk **mengimpor modul** ke dalam file JavaScript. Modul yang dimaksud dapat berupa:

* **Built-in modules**, seperti `http`, `fs`, atau `path`.
* **Module buatan sendiri**, yaitu file JavaScript yang diekspor menggunakan `module.exports` atau `exports`.
* **NPM modules**, yaitu modul pihak ketiga yang diinstal melalui `npm install`, seperti `moment`, `express`, atau `lodash`.

Fungsi utama `require()` adalah memberikan Node.js kemampuan modular, sehingga kode dapat dipisah menjadi bagian-bagian kecil yang lebih mudah dikelola, digunakan kembali, dan dikembangkan.

Contoh penggunaannya:

```js
const http = require('http');          // built-in module
const message = require('./hello.js'); // module lokal
const moment = require('moment');      // npm module
```

Dengan `require()`, Node.js dapat mengakses berbagai fitur tambahan yang dibutuhkan untuk membangun aplikasi backend secara efektif dan terstruktur.