import ejs from "ejs";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import sendMail from "../helpers/sendMail.js";
import User from "../models/user.model.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sendPromotionEmail = async () => {
  try {
    const users = await User.find(); // hoặc lọc user cần gửi

    for (const user of users) {
      const templatePath = path.join(__dirname, "..", "templates", "promotion.ejs");

      // ⚠️ THÊM dòng này — truyền biến name vào
      const html = await ejs.renderFile(templatePath, {
        name: user.name, // ← thêm dòng này
      });

      const messageoption = {
        from: process.env.EMAIL,
        to: user.email,
        subject: `🎀 Ưu đãi ngọt ngào dành riêng cho bạn, ${user.name}!`,
        html: html,
      };

      await sendMail(messageoption);
      console.log(`✅ Promotion email sent to ${user.email}`);
    }
  } catch (error) {
    console.error("❌ Error sending promotion email:", error);
  }
};

export default sendPromotionEmail;
