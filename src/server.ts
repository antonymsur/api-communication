import { Express } from "express-serve-static-core";
import bodyParser from "body-parser";
import defaultRoutes from "./routes/default";
import express from "express";
import morgan from "morgan";
import postRoutes from "./routes/posts";
import userRoutes from "./routes/users";
export async function createServer(): Promise<Express> {
  const server = express();

  server.use(bodyParser.json());
  server.use(
    morgan(":method :url :status :response-time ms - :res[content-length]")
  );

  server.use(
    (
      err: any,
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      res.status(err.status).json({
        error: {
          type: "request_validation",
          message: err.message,
          errors: err.errors,
        },
      });
    }
  );

  /** Logging */
  server.use(morgan("dev"));
  /** Parse the request */
  server.use(express.urlencoded({ extended: false }));
  /** Takes care of JSON data */
  server.use(express.json());

  server.use(express.static("public"));
  /** RULES OF OUR API */
  server.use((req, res, next) => {
    // set the CORS policy
    res.header("Access-Control-Allow-Origin", "*");
    // set the CORS headers
    res.header(
      "Access-Control-Allow-Headers",
      "origin, X-Requested-With,Content-Type,Accept, Authorization"
    );
    // set the CORS method headers
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "GET PATCH DELETE POST");
      return res.status(200).json({});
    }
    next();
  });

  /** Routes */
  server.use(defaultRoutes, postRoutes, userRoutes);

  /** Error handling */
  server.use((req, res, next) => {
    const error = new Error("not found");
    return res.status(404).json({
      message: error.message,
    });
  });

  return server;
}
