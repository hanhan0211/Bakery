import app from "./app.js";
import dotenv from "dotenv";
import dbConnection from "./util/db.js";

dotenv.config();

// 👉 Kết nối MongoDB TRƯỚC khi chạy server
dbConnection();

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
