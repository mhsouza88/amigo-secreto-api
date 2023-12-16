import cors from "cors";
import "dotenv/config";
import express from "express";
import https from "https";
import http from "http";
import siteRoutes from "./routes/site";
import { requestInterceptor } from "./utils/requestInterceptor";
import adminRoutes from "./routes/admin";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.all("*", requestInterceptor);

app.use("/admin", adminRoutes);
app.use("/", siteRoutes);

const runServer = (port: number, server: http.Server) => {
  server.listen(port, () => {
    console.log(`Server running on port ${port}.`);
  });
};

const regularServer = http.createServer(app);
if (process.env.NODE_ENV === "production") {
  // TODO: Add SSL certificate
} else {
  const serverPort: number = process.env.PORT
    ? parseInt(process.env.PORT)
    : 3000;
  runServer(serverPort, regularServer);
}
