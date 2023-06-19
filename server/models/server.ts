import express, { Application } from "express";
import cors from "cors";
import userRoutes from "../routes/users";
import authRoutes from "../routes/auth";
import ordersRoutes from "../routes/orders";
import { dbConnection } from "../db/config";

class Server {
  private app: Application;
  private port: string;
  private apiPaths = {
    users: "/api/users",
    auth: "/api/auth",
    orders: "/api/orders",
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "8000";

    // Connect to database
    this.connectDB();

    // Middlewares
    this.middlewares();

    // App routes
    this.routes();
  }

  async connectDB() {
    await dbConnection();
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // Read body
    this.app.use(express.json());

    // Public folder
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.apiPaths.users, userRoutes);
    this.app.use(this.apiPaths.auth, authRoutes);
    this.app.use(this.apiPaths.orders, ordersRoutes);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}

export default Server;
