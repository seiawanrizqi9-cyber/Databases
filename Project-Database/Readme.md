## This is my code in day 7

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