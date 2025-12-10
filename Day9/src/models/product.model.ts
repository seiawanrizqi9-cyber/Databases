export interface Product {
  id: number;
  nama: string;
  deskripsi: string;
  harga: number;
}

export let products: Product[] = [
  {
    id: 1,
    nama: "Smartphone Pro X",
    deskripsi: "AMOLED 120Hz, 8GB RAM, 256GB Storage",
    harga: 6500000,
  },
  {
    id: 2,
    nama: "Smartwatch Ultra",
    deskripsi: "Heart Rate Monitor, GPS, Waterproof",
    harga: 2200000,
  },
  {
    id: 3,
    nama: "Bluetooth Speaker",
    deskripsi: "Bass Boost, 12 Hours Playtime",
    harga: 900000,
  },
  {
    id: 4,
    nama: "Mechanical Keyboard Wireless",
    deskripsi: "Hot-swappable, RGB, Low-latency",
    harga: 1300000,
  },
  {
    id: 5,
    nama: "Portable SSD",
    deskripsi: "1TB, USB-C 3.2, Super Fast Transfer",
    harga: 1700000,
  },
];

