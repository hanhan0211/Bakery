

import ejs from "ejs";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import sendMail from "../helpers/sendMail.js";
import User from "../models/user.model.js";

dotenv.config();

// Tạo __dirname cho ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sendWelcomeEmail = async () => {
  try {
    const users = await User.find({ status: 0 });

    if (users.length === 0) {
      // console.log("Không có user mới để gửi email.");
      return;
    }

    for (const user of users) {
      // Lấy đường dẫn tuyệt đối tới template
      const templatePath = path.join(
        __dirname,
        "..",
        "templates",
        "welcome.ejs"
      );

      try {
        // Render EJS thành HTML
        const data = await ejs.renderFile(templatePath, {
          name: user.name,
          supportLink: "bakeryhannie@gmail.com",
        });

        const messageoption = {
          from: process.env.EMAIL,
          to: user.email,
          subject: `Welcome to Bakery Hannie, ${user.name}`,
          html: data,
        };

        // Gửi mail
        await sendMail(messageoption);

        // Update status trong DB
        await User.findByIdAndUpdate(user._id, { $set: { status: 1 } });

        // console.log(`✅ Đã gửi mail cho: ${user.email}`);
      } catch (err) {
        // console.error(`❌ Lỗi khi xử lý user ${user.email}:`, err);
        console.log(err);
      }
    }
  } catch (dbError) {
    // console.error("❌ Lỗi khi lấy user từ DB:", dbError);
    console.log(dbError);
  }
};

export default sendWelcomeEmail;
