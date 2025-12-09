## This is my code in day 7

``` postgres
postgres=# CREATE DATABASE toko_laptop_db
postgres=# \c toko_laptop_db
You are now connected to database "toko_laptop_db" as user "postgres".
toko_laptop_db=# CREATE TABLE ElectronicDisplay (id SERIAL PRIMARY KEY,name VARCHAR(100) NOT NULL,category TEXT,price DECIMAL(10, 2
) NOT NULL,is_active BOOLEAN DEFAULT true);
CREATE TABLE
toko_laptop_db=# INSERT INTO ElectronicDisplay (name,category, price) VALUES ('Xiaomi Redmi Note 13', 'Smartphone', 3299000), ('ASU
S Vivobook 15', 'Laptop', 67500000), ('Apple iPad', 'Tablet', 74990000), ('Lenovo IdeaPad Gaming 3', 'Laptop', 9800000), ('Samsung
Galaxy Buds2 Pro', 'Earbuds', 2999000), ('Samsung Galaxy A35 5G', 'Smartphone', 4999000), ('Samsung Galaxy Watch6', 'Smartwatch', 3
999000);
INSERT 0 7
toko_laptop_db=# SELECT * FROM ElectronicDisplay;
 id |           name           |  category  |    price    | is_active
----+--------------------------+------------+-------------+-----------
  1 | Xiaomi Redmi Note 13     | Smartphone |  3299000.00 | t
  2 | ASUS Vivobook 15         | Laptop     | 67500000.00 | t
  3 | Apple iPad               | Tablet     | 74990000.00 | t
  4 | Lenovo IdeaPad Gaming 3  | Laptop     |  9800000.00 | t
  5 | Samsung Galaxy Buds2 Pro | Earbuds    |  2999000.00 | t
  6 | Samsung Galaxy A35 5G    | Smartphone |  4999000.00 | t
  7 | Samsung Galaxy Watch6    | Smartwatch |  3999000.00 | t
(7 rows)


toko_laptop_db=# UPDATE ElectronicDisplay SET price = 6750000 WHERE id = 2;
UPDATE 1
toko_laptop_db=# UPDATE ElectronicDisplay SET price = 7499000 WHERE id = 3;
UPDATE 1


toko_laptop_db=# SELECT * FROM ElectronicDisplay order by id;
 id |           name           |  category  |   price    | is_active
----+--------------------------+------------+------------+-----------
  1 | Xiaomi Redmi Note 13     | Smartphone | 3299000.00 | t
  2 | ASUS Vivobook 15         | Laptop     | 6750000.00 | t
  3 | Apple iPad               | Tablet     | 7499000.00 | t
  4 | Lenovo IdeaPad Gaming 3  | Laptop     | 9800000.00 | t
  5 | Samsung Galaxy Buds2 Pro | Earbuds    | 2999000.00 | t
  6 | Samsung Galaxy A35 5G    | Smartphone | 4999000.00 | t
  7 | Samsung Galaxy Watch6    | Smartwatch | 3999000.00 | t
(7 rows)


toko_laptop_db=# SELECT * FROM ElectronicDisplay WHERE price > 5000000;
 id |          name           | category |   price    | is_active
----+-------------------------+----------+------------+-----------
  4 | Lenovo IdeaPad Gaming 3 | Laptop   | 9800000.00 | t
  2 | ASUS Vivobook 15        | Laptop   | 6750000.00 | t
  3 | Apple iPad              | Tablet   | 7499000.00 | t
(3 rows)


toko_laptop_db=# SELECT * FROM ElectronicDisplay WHERE category LIKE '%Laptop%';
 id |          name           | category |   price    | is_active
----+-------------------------+----------+------------+-----------
  4 | Lenovo IdeaPad Gaming 3 | Laptop   | 9800000.00 | t
  2 | ASUS Vivobook 15        | Laptop   | 6750000.00 | t
(2 rows)


toko_laptop_db=# SELECT * FROM ElectronicDisplay order by price;
 id |           name           |  category  |   price    | is_active
----+--------------------------+------------+------------+-----------
  5 | Samsung Galaxy Buds2 Pro | Earbuds    | 2999000.00 | t
  1 | Xiaomi Redmi Note 13     | Smartphone | 3299000.00 | t
  7 | Samsung Galaxy Watch6    | Smartwatch | 3999000.00 | t
  6 | Samsung Galaxy A35 5G    | Smartphone | 4999000.00 | t
  2 | ASUS Vivobook 15         | Laptop     | 6750000.00 | t
  3 | Apple iPad               | Tablet     | 7499000.00 | t
  4 | Lenovo IdeaPad Gaming 3  | Laptop     | 9800000.00 | t
(7 rows)

toko_laptop_db=# SELECT * FROM ElectronicDisplay order by price desc;
 id |           name           |  category  |   price    | is_active
----+--------------------------+------------+------------+-----------
  4 | Lenovo IdeaPad Gaming 3  | Laptop     | 9800000.00 | t
  3 | Apple iPad               | Tablet     | 7499000.00 | t
  2 | ASUS Vivobook 15         | Laptop     | 6750000.00 | t
  6 | Samsung Galaxy A35 5G    | Smartphone | 4999000.00 | t
  7 | Samsung Galaxy Watch6    | Smartwatch | 3999000.00 | t
  1 | Xiaomi Redmi Note 13     | Smartphone | 3299000.00 | t
  5 | Samsung Galaxy Buds2 Pro | Earbuds    | 2999000.00 | t
(7 rows)


toko_laptop_db=# DELETE FROM ElectronicDisplay WHERE id = 5;
DELETE 1
toko_laptop_db=# SELECT * FROM ElectronicDisplay order by price desc;
 id |          name           |  category  |   price    | is_active
----+-------------------------+------------+------------+-----------
  4 | Lenovo IdeaPad Gaming 3 | Laptop     | 9800000.00 | t
  3 | Apple iPad              | Tablet     | 7499000.00 | t
  2 | ASUS Vivobook 15        | Laptop     | 6750000.00 | t
  6 | Samsung Galaxy A35 5G   | Smartphone | 4999000.00 | t
  7 | Samsung Galaxy Watch6   | Smartwatch | 3999000.00 | t
  1 | Xiaomi Redmi Note 13    | Smartphone | 3299000.00 | t
(6 rows)
```

## Soal Pilihan Ganda

1. **Apa kepanjangan dari SQL?**  
   **b. Structured Query Language**

2. **Manakah yang termasuk database Relasional (SQL)?**  
   **c. PostgreSQL**  

3. **Perintah untuk mengambil data dari tabel adalah...**  
   **c. SELECT**

4. **Tipe data yang paling tepat untuk menyimpan harga barang agar presisi adalah...**  
   **c. DECIMAL**  

5. **Apa fungsi PRIMARY KEY pada sebuah tabel?**  
   **b. Sebagai pengenal unik setiap baris data**

6. **Query untuk menampilkan data produk yang stoknya habis (0) adalah...**  
   **a. SELECT * FROM products WHERE stock = 0;**  

7. **Perintah ORDER BY price DESC artinya...**  
   **b. Urutkan harga dari termahal ke termurah**

8. **Apa yang terjadi jika kita menjalankan DELETE FROM products; tanpa WHERE?**  
   **c. Semua data di tabel products akan terhapus**  

9. **Untuk mengubah data yang sudah ada, kita menggunakan perintah...**  
   **c. UPDATE**

10. **Tipe data VARCHAR(50) artinya...**  
    **b. Teks maksimal 50 karakter**