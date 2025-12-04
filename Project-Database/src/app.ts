import express, {
  type Application,
  type NextFunction,
  type Request,
  type Response,
} from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import { erroHandler } from "./middlewares/error.handler";
import productRouter from "./routes/product.route";

const app: Application = express();

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({
    hari: 5,
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
})


app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`Request masuk: ${req.method} ${req.path}`);
  req.startTime = Date.now();
  next();
});

app.use((req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.headers["x-api-key"];
  if (!apiKey) {
    return res.status(401).json({
      success: false,
      message: "Header X-API-Key wajib diisi untuk akses API!",
    });
  }
  if (apiKey !== "katasandi123") {
    return res.status(403).json({
      success: false,
      message: "API-Key tidak valid!",
    });
  }
  next();
});

app.use(/.*/, (req: Request, _res: Response) => {
  throw new Error(`Route ${req.originalUrl} tidak ditemukan`);
});

app.use('/api/productsElectronics', productRouter)

app.use(erroHandler)

export default app