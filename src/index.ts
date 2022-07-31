import * as express from "express"
import * as bodyParser from "body-parser"
import * as path  from "path";
import * as logger from "morgan";
import * as cookieParser from "cookie-parser"
import * as cors from "cors";
import * as http from "http";  
import * as CreateHttpError from "http-errors";
import * as dotenv from "dotenv";
import routes from "./router"
import { db } from "./config/db"

dotenv.config();
var port = process.env.PORT || "3000";

// check database connection
db.initialize().then(async () => {
    console.log("Database connected successfully")
}).catch(error => { 
    console.log(error) 
})

// create express app
const app = express()
app.use(bodyParser.json())
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use("/api", routes);

app.use(function (req, res, next) {
    next(CreateHttpError(404, "URL Not Found"));
});

// error handler
app.use(function (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
    console.error(err);
    res.status(err.status || 500).json({
        status: err.status || 500,
        message: err.message || "Unknown Error",
        stack: err.stack,
    });
});
  
// server 
app.set("port", port);
var server = http.createServer(app);
server.listen(port);

server.on("error", (error: any) => {
    if (error.syscall !== "listen") {
        throw error;
    }

    var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case "EACCES":
        console.error(bind + " requires elevated privileges");
        process.exit(1);
        break;
        case "EADDRINUSE":
        console.error(bind + " is already in use");
        process.exit(1);
        break;
        default:
        throw error;
    }
});

server.on("listening", () => {
    var addr = server.address();
    var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
    console.clear();
    console.log("App is running on " + bind);
});