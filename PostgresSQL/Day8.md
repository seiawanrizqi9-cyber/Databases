## This is my code in day 8

```Postgres
postgres=# \c toko_laptop_db
You are now connected to database "toko_laptop_db" as user "postgres".
toko_laptop_db=# CREATE TABLE categories (id serial primary key, name VARCHAR(100) NOT NULL);
CREATE TABLE
toko_laptop_db=# alter table ElectronicDisplay rename to items;
ALTER TABLE
toko_laptop_db=# alter table items add column category_id INT, ADD CONSTRAINT fk_items_category FOREIGN KEY (category_id) REFERENCE
S categories(id);
ALTER TABLE
toko_laptop_db=# \d items
                                            Table "public.items"
   Column    |          Type          | Collation | Nullable |                    Default
-------------+------------------------+-----------+----------+-----------------------------------------------
 id          | integer                |           | not null | nextval('electronicdisplay_id_seq'::regclass)
 name        | character varying(100) |           | not null |
 category    | text                   |           |          |
 price       | numeric(10,2)          |           | not null |
 is_active   | boolean                |           |          | true
 category_id | integer                |           |          |
Indexes:
    "electronicdisplay_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:
    "fk_items_category" FOREIGN KEY (category_id) REFERENCES categories(id)


toko_laptop_db=# select * from items
toko_laptop_db-# ;
 id |          name           |  category  |   price    | is_active | category_id
----+-------------------------+------------+------------+-----------+-------------
  1 | Xiaomi Redmi Note 13    | Smartphone | 3299000.00 | t         |
  4 | Lenovo IdeaPad Gaming 3 | Laptop     | 9800000.00 | t         |
  6 | Samsung Galaxy A35 5G   | Smartphone | 4999000.00 | t         |
  7 | Samsung Galaxy Watch6   | Smartwatch | 3999000.00 | t         |
  2 | ASUS Vivobook 15        | Laptop     | 6750000.00 | t         |
  3 | Apple iPad              | Tablet     | 7499000.00 | t         |
(6 rows)

toko_laptop_db=# insert into categories (name) values ('Laptop'), ('Mouse'), ('Keyboard');
INSERT 0 3
toko_laptop_db=# select * from categories;
 id |   name
----+----------
  1 | Laptop
  2 | Mouse
  3 | Keyboard
(3 rows)


toko_laptop_db=# update items
toko_laptop_db-# set category_id = 1 where category = 'Laptop';
UPDATE 2
toko_laptop_db=# select * from categories;
 id |   name
----+----------
  1 | Laptop
  2 | Mouse
  3 | Keyboard
(3 rows)


toko_laptop_db=# select * from items;
 id |          name           |  category  |   price    | is_active | category_id
----+-------------------------+------------+------------+-----------+-------------
  1 | Xiaomi Redmi Note 13    | Smartphone | 3299000.00 | t         |
  6 | Samsung Galaxy A35 5G   | Smartphone | 4999000.00 | t         |
  7 | Samsung Galaxy Watch6   | Smartwatch | 3999000.00 | t         |
  3 | Apple iPad              | Tablet     | 7499000.00 | t         |
  4 | Lenovo IdeaPad Gaming 3 | Laptop     | 9800000.00 | t         |           1
  2 | ASUS Vivobook 15        | Laptop     | 6750000.00 | t         |           1
(6 rows)

postgres=# \c toko_laptop_db
You are now connected to database "toko_laptop_db" as user "postgres".
toko_laptop_db=# insert into categories (name) values ('Tablet'), ('Smartphone'), ('Smartwatch');
INSERT 0 3
toko_laptop_db=# select * from items
toko_laptop_db-# ;
 id |          name           |  category  |   price    | is_active | category_id
----+-------------------------+------------+------------+-----------+-------------
  1 | Xiaomi Redmi Note 13    | Smartphone | 3299000.00 | t         |
  6 | Samsung Galaxy A35 5G   | Smartphone | 4999000.00 | t         |
  7 | Samsung Galaxy Watch6   | Smartwatch | 3999000.00 | t         |
  3 | Apple iPad              | Tablet     | 7499000.00 | t         |
  4 | Lenovo IdeaPad Gaming 3 | Laptop     | 9800000.00 | t         |           1
  2 | ASUS Vivobook 15        | Laptop     | 6750000.00 | t         |           1
(6 rows)

postgres=# \c toko_laptop_db
You are now connected to database "toko_laptop_db" as user "postgres".
toko_laptop_db=#  select * from categories;
 id |    name
----+------------
  1 | Laptop
  2 | Mouse
  3 | Keyboard
  4 | Tablet
  5 | Smartphone
  6 | Smartwatch
(6 rows)

toko_laptop_db=# update items set category_id = 5 where category = 'Smartphone';
UPDATE 2
toko_laptop_db=# update items set category_id = 6 where category = 'Smartwatch';
UPDATE 1
toko_laptop_db=# update items set category_id = 4 where category = 'Tablet';
UPDATE 1

toko_laptop_db=# select * from items;
 id |          name           |  category  |   price    | is_active | category_id
----+-------------------------+------------+------------+-----------+-------------
  1 | Xiaomi Redmi Note 13    | Smartphone | 3299000.00 | t         |
  6 | Samsung Galaxy A35 5G   | Smartphone | 4999000.00 | t         |
  7 | Samsung Galaxy Watch6   | Smartwatch | 3999000.00 | t         |
  3 | Apple iPad              | Tablet     | 7499000.00 | t         |
  4 | Lenovo IdeaPad Gaming 3 | Laptop     | 9800000.00 | t         |           1
  2 | ASUS Vivobook 15        | Laptop     | 6750000.00 | t         |           1
(6 rows)

toko_laptop_db=# select * from items order by id;
 id |          name           |  category  |   price    | is_active | category_id
----+-------------------------+------------+------------+-----------+-------------
  1 | Xiaomi Redmi Note 13    | Smartphone | 3299000.00 | t         |           5
  2 | ASUS Vivobook 15        | Laptop     | 6750000.00 | t         |           1
  3 | Apple iPad              | Tablet     | 7499000.00 | t         |           4
  4 | Lenovo IdeaPad Gaming 3 | Laptop     | 9800000.00 | t         |           1
  6 | Samsung Galaxy A35 5G   | Smartphone | 4999000.00 | t         |           5
  7 | Samsung Galaxy Watch6   | Smartwatch | 3999000.00 | t         |           6
(6 rows)

toko_laptop_db=# select items.id, items.name as nama_barang, categories.name as kategori, items.price as harga_barang from items jo
in categories on items.category_id = categories.id;
 id |       nama_barang       |  kategori  | harga_barang
----+-------------------------+------------+--------------
  4 | Lenovo IdeaPad Gaming 3 | Laptop     |   9800000.00
  2 | ASUS Vivobook 15        | Laptop     |   6750000.00
  1 | Xiaomi Redmi Note 13    | Smartphone |   3299000.00
  6 | Samsung Galaxy A35 5G   | Smartphone |   4999000.00
  7 | Samsung Galaxy Watch6   | Smartwatch |   3999000.00
  3 | Apple iPad              | Tablet     |   7499000.00
(6 rows)

toko_laptop_db=# select categories.name as kategori, count(items.id) as jumlah_barang from items join categories on items.category_
id = categories.id group by categories.name order by categories.name;
  kategori  | jumlah_barang
------------+---------------
 Laptop     |             2
 Smartphone |             2
 Smartwatch |             1
 Tablet     |             1
(4 rows)

toko_laptop_db=# select categories.name as kategori, max(items.price) as harga_tertinggi from items join categories on items.catego
ry_id = categories.id group by categories.name order by harga_tertinggi desc limit 1;
 kategori | harga_tertinggi
----------+-----------------
 Laptop   |      9800000.00
(1 row)
```

## Soal Pilihan Ganda

1. **Relasi antara "Penulis" dan "Buku" (Satu penulis bisa menulis banyak buku) adalah...**  
   **b. One-to-Many**  

2. **Apa fungsi FOREIGN KEY?**  
   **b. Menghubungkan satu tabel ke tabel lain**  

3. **Jika kita ingin mengambil data dari dua tabel yang saling berhubungan, kita menggunakan perintah...**  
   **c. JOIN**

4. **Jenis JOIN yang hanya menampilkan data jika kedua tabel memiliki pasangan adalah...**  
   **c. INNER JOIN**  

5. **Apa yang terjadi pada LEFT JOIN jika data di tabel kanan tidak ditemukan?**  
   **b. Data tabel kanan berisi NULL**  

6. **Fungsi agregasi untuk menghitung jumlah baris data adalah...**  
   **c. COUNT()**

7. **Perintah GROUP BY biasanya digunakan bersamaan dengan...**  
   **c. Fungsi Agregasi (COUNT, SUM, dll)**  

8. **Untuk memfilter hasil setelah melakukan GROUP BY, kita menggunakan...**  
   **b. HAVING**  

9. **Apa kegunaan LIMIT dan OFFSET?**  
   **c. Untuk Pagination (Halaman)**  

10. **Dalam relasi Many-to-Many, kita membutuhkan...**  
    **c. 3 Tabel 1 tabel pivot/penghubung**  
