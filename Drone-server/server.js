import dotenv from "dotenv";
import express from "express";
import cors from "cors";
// import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";
import { consumeDroneStateMessage, consumeMarkMessage } from "./consume func/funcNew_ver2.js";
import droneRouter from "./router/router.js";

dotenv.config();
const root = process.cwd();
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static(root + `/public`));
// 로그 미들웨어
// app.use(morgan("combined"));

// Swagger setup
const swaggerDocument = YAML.load(path.join(root, "openapi.yaml"));
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// RabbitMQ 메세지 소비
consumeDroneStateMessage(); // 매개변수제거
consumeMarkMessage();

// 라우터
const router = droneRouter(); 
app.use("/", router); // 상수추가

// 서버오픈
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`API doc is http://localhost:${PORT}/docs`);
});
