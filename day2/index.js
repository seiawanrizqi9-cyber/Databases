import http from "http";

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");

  const url = req.url;

  switch (url) {
    case "/CariKota":
      res.write(
        JSON.stringify({
          DestinasiKota: [
            "Jogja",
            "Banyuwangi",
            "Kalimantan",
            "Bandung",
            "Jakarta",
            "Surabaya",
            "Bali",
            "Medan",
            "Makassar",
            "Lombok",
          ],
        })
      );
      break;

    // 10 kota
    case "/Jogja":
      res.write(
        JSON.stringify({
          Kota: "Jogja",
          Wisata: "Candi Prambanan, Malioboro, Taman Sari",
        })
      );
      break;

    case "/Banyuwangi":
      res.write(
        JSON.stringify({
          Kota: "Banyuwangi",
          Wisata: "Kawah Ijen, Pulau Merah, Baluran",
        })
      );
      break;

    case "/Kalimantan":
      res.write(
        JSON.stringify({
          Kota: "Kalimantan",
          Wisata: "Sungai Kapuas, Taman Nasional Tanjung Puting",
        })
      );
      break;

    case "/Bandung":
      res.write(
        JSON.stringify({
          Kota: "Bandung",
          Wisata: "Lembang, Kawah Putih, Braga",
        })
      );
      break;

    case "/Jakarta":
      res.write(
        JSON.stringify({ Kota: "Jakarta", Wisata: "Monas, Ancol, Kota Tua" })
      );
      break;

    case "/Surabaya":
      res.write(
        JSON.stringify({
          Kota: "Surabaya",
          Wisata: "Tugu Pahlawan, Kenjeran, Submarine Museum",
        })
      );
      break;

    case "/Bali":
      res.write(
        JSON.stringify({
          Kota: "Bali",
          Wisata: "Kuta, Uluwatu, Ubud, Tanah Lot",
        })
      );
      break;

    case "/Medan":
      res.write(
        JSON.stringify({ Kota: "Medan", Wisata: "Danau Toba, Istana Maimun" })
      );
      break;

    case "/Makassar":
      res.write(
        JSON.stringify({
          Kota: "Makassar",
          Wisata: "Pantai Losari, Fort Rotterdam",
        })
      );
      break;

    case "/Lombok":
      res.write(
        JSON.stringify({
          Kota: "Lombok",
          Wisata: "Gili Trawangan, Rinjani, Kuta Mandalika",
        })
      );
      break;

    default:
      res.write(
        JSON.stringify({
          message:
            "Cek daftar kota di: http://localhost:3000/CariKota",
        })
      );
  }

  res.end();
});

const hostname = "127.0.0.1";
const port = 3000;

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
