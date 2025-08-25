require("dotenv").config();

const { PORT } = require("./configs/env.config");

const path = require("path");
const cors = require("cors");
const express = require("express");
const route = require("./routes/index.route");
const cookieParser = require("cookie-parser");
const sequelize = require("./configs/database.config");
const errorHandler = require("./middlewares/errorHandler.middleware");

const port = PORT;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));
app.use(
	cors({
		origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
		credentials: true,
	})
);

app.set("trust proxy", true);

// Check connect Database
sequelize
	.authenticate()
	.then(() => console.log("Kết nối MySQL thành công"))
	.catch((err) => console.error("Lỗi kết nối MySQL:", err));

// Route init
route(app);

app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`);
});

app.use(errorHandler);
