import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const HOST = process.env.HOST;
const PORT = process.env.PORT;
app.use(express.json());
let products = [
    { id: 1, nama: "Laptop Gaming", deskripsi: "Intel i7, RTX 3060", harga: 15000000 },
    { id: 2, nama: "Keyboard Mekanikal", deskripsi: "Blue Switch, RGB", harga: 800000 },
    { id: 3, nama: "Mouse Wireless", deskripsi: "Ergonomic, Silent Click", harga: 300000 }
];
app.listen(PORT, () => {
    console.log(`Server running at http://${HOST}:${PORT}/`);
});
//# sourceMappingURL=index.js.map