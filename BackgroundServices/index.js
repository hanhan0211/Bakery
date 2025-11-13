import express from "express";
import dotenv from "dotenv";
import dbConnection from "./utils/db.js";
import cron from "node-cron";
import sendWelcomeEmail from "./EmailServices/sendWelcomeEmail.js";
import sendPendingOrderEmail from "./emailservices/sendPendingOrderEmail.js";
import sendDeliveredOrderEmail from "./emailservices/sendDeliveveredOrderEmail.js";
import sendPromotionEmail from "./emailservices/sendPromotionEmail.js";
dotenv.config();
const app = express();

const PORT = process.env.PORT;

//Schedule Services
const services = () => {
  cron.schedule("* * * * *", () => {});
  sendWelcomeEmail();
  sendPendingOrderEmail();
  sendDeliveredOrderEmail();
};

const promotion = () => {
  // chạy 5:30 sáng thứ 6 hằng tuần
  cron.schedule("30 5 * * 5", () => {
    //console.log("⏰ Đến giờ gửi mail khuyến mãi rồi!");
    sendPromotionEmail();
  });
};


services();
promotion();

app.listen(PORT, () => {
  console.log(`Backgroundservices is running on port ${PORT}`);
  dbConnection();
});
