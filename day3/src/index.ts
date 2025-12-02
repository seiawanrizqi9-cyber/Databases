import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Application = express();
const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 5000;

app.use(express.json());

let products = [
  {
    id: 1,
    nama: "Laptop Gaming",
    deskripsi: "Intel i7, RTX 3060",
    harga: 15000000,
  },
  {
    id: 2,
    nama: "Keyboard Mekanikal",
    deskripsi: "Blue Switch, RGB",
    harga: 800000,
  },
  {
    id: 3,
    nama: "Mouse Wireless",
    deskripsi: "Ergonomic, Silent Click",
    harga: 300000,
  },
];

app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Selamat Datang Di API E-Commerce!",
    hari: 3,
    status: "Server hidup!",
    endpointsProduct: [
      { path: "/api/products", description: "Get all products" },
      { path: "/api/products/:id", description: "Get product by ID" },
      {
        path: "/api/search",
        description: "Search products",
      },
    ],
    endpointsElectronic: [
      {
        path: "/api/productsElectronics",
        description: "Get all Electronic products",
      },
      {
        path: "/api/productsElectronics/:id",
        description: "Get Electronic product by ID",
      },
      {
        path: "/api/searchElectronics",
        description: "Search Electronic products",
      },
    ],
  });
});

app.get("/api/products", (_req: Request, res: Response) => {
  res.json({
    success: true,
    jumlah: products.length,
    data: products,
  });
});

app.get("/api/products/:id", (req: Request, res: Response) => {
  if (!req.params.id) {
    res.json({
      success: false,
      message: "ID tidak ditemukan",
    });
    return;
  }
  const id = parseInt(req.params.id);
  const product = products.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Produk tidak ditemukan",
    });
  }

  res.json({
    success: true,
    data: product,
  });
});

app.get("/api/search", (req: Request, res: Response) => {
  const { name, max_price, min_price } = req.query;

  let result = products;

  if (name) {
    result = result.filter((p) =>
      p.nama.toLowerCase().includes((name as string).toLowerCase())
    );
  }

  if (max_price) {
    result = result.filter((p) => p.harga <= Number(max_price));
  }

  if (min_price) {
    result = result.filter((p) => p.harga >= Number(min_price));
  }

  res.json({
    success: true,
    filtered_result: result,
  });
});

app.post("/api/products", (req: Request, res: Response) => {
  const { nama, deskripsi, harga } = req.body;

  const number = Number(harga);

  if (isNaN(number)) {
    return res.status(400).json({
      success: false,
      message: "Harga harus berupa angka",
    });
  }

  const newProduct = {
    id: products.length + 1,
    nama,
    deskripsi,
    harga: number,
  };

  products.push(newProduct);

  res.status(201).json({
    success: true,
    message: "Produk berhasil ditambahkan",
    data: newProduct,
  });
});

app.put("/api/products/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id!);
  const index = products.findIndex((p) => p.id === id);

  if (index === -1) {
    return res
      .status(404)
      .json({ success: false, message: "Produk tidak ada" });
  }

  products[index] = { ...products[index], ...req.body };

  res.json({
    success: true,
    message: "Produk berhasil diupdate",
    data: products[index],
  });
});

app.delete("/api/products/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id!);
  const index = products.findIndex((p) => p.id === id);

  if (index === -1) {
    return res
      .status(404)
      .json({ success: false, message: "Produk tidak ada" });
  }

  const deleted = products.splice(index, 1);

  res.json({
    success: true,
    message: "Produk berhasil dihapus",
    data: deleted[0],
  });
});

// Ini untuk E-Commerce Electronic yang baru!
let productsElectronics = [
  {
    id: 1,
    nama: "Smartphone Flagship 2024",
    deskripsi: "Layar 6.7 inch AMOLED, Kamera 200MP, Baterai 5000mAh",
    harga: 15999000,
  },
  {
    id: 2,
    nama: "Smartwatch Pro",
    deskripsi: "GPS, Monitor Detak Jantung, Tahan Air 50m",
    harga: 3499000,
  },
  {
    id: 3,
    nama: "Tablet Premium",
    deskripsi: "Layar 11 inch 120Hz, Stylus Included, 256GB Storage",
    harga: 8999000,
  },
  {
    id: 4,
    nama: "Drone 4K",
    deskripsi: "Kamera 4K 60fps, Flight Time 30 menit, Follow Me Mode",
    harga: 12999000,
  },
  {
    id: 5,
    nama: "Speaker Bluetooth",
    deskripsi: "360° Sound, Waterproof IPX7, 24 jam baterai",
    harga: 1999000,
  },
];

app.get("/api/productsElectronics", (_req: Request, res: Response) => {
  res.json({
    success: true,
    jumlah: productsElectronics.length,
    data: productsElectronics,
  });
});

app.get("/api/productsElectronics/:id", (req: Request, res: Response) => {
  if (!req.params.id) {
    res.json({
      success: false,
      message: "ID harus disertakan",
    });
    return;
  }

  const id = parseInt(req.params.id);
  const product = productsElectronics.find((product) => product.id === id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "ID harus berupa angka",
    });
  }

  res.json({
    success: true,
    data: product,
  });
});

app.get("/api/searchElectronics", (req: Request, res: Response) => {
  const { name, min_price, max_price } = req.query;

  let result = productsElectronics;

  if (name) {
    result = result.filter((product) =>
      product.nama.toLowerCase().includes((name as string).toLowerCase())
    );
  }

  if (min_price) {
    result = result.filter((product) => product.harga >= Number(min_price));
  }

  if (max_price) {
    result = result.filter((product) => product.harga <= Number(max_price));
  }

  res.json({
    success: true,
    filtered_result: result,
  });
});

app.post("/api/productsElectronics", (req: Request, res: Response) => {
  const { nama, deskripsi, harga } = req.body;

  const number = Number(harga);

  if (isNaN(number)) {
    return res.status(400).json({
      success: false,
      message: "Harga harus berupa angka",
    });
  }

  const newProduct = {
    id: productsElectronics.length + 1,
    nama,
    deskripsi,
    harga: number,
  };

  productsElectronics.push(newProduct);

  res.status(201).json({
    success: true,
    message: "Product berhasil ditambahkan",
    data: newProduct,
  });
});

app.put("/api/productsElectronics/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id!);
  const index = productsElectronics.findIndex((p) => p.id === id);

  if (index === -1) {
    return res
      .status(404)
      .json({ success: false, message: "Produk tidak ada" });
  }

  productsElectronics[index] = { ...productsElectronics[index], ...req.body };

  res.json({
    success: true,
    message: "Produk berhasil diupdate",
    data: productsElectronics[index],
  });
});

app.delete("/api/productsElectronics/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id!);
  const index = productsElectronics.findIndex((p) => p.id === id);

  if (index === -1) {
    return res
      .status(404)
      .json({ success: false, message: "Produk tidak ada" });
  }

  const deleted = productsElectronics.splice(index, 1);

  res.json({
    success: true,
    message: "Produk berhasil dihapus",
    data: deleted[0],
  });
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://${HOST}:${PORT}`);
});
