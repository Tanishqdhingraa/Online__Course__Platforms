import amqp from "amqplib";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

// import dotenv from "dotenv";
dotenv.config();



const EXCHANGE = "USER_EVENTS";

dotenv.config();
console.log("EMAIL USER:", process.env.EMAIL_USER);
console.log("EMAIL PASS EXISTS:", !!process.env.EMAIL_PASS);
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
  user: process.env.EMAIL_USER,
  pass: process.env.EMAIL_PASS
}
});


async function sendWelcomeMail(email, name) {
  await transporter.sendMail({
    from: "EduSphere - <dhingratanishq58@gmail.com>",
    to: email,
    subject: "EduSphere - World of learning 📰",
    html:`
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: auto; padding: 20px;">
  
  <h2 style="color:#2563eb; margin-bottom: 10px;">
    Welcome Back, Learner 👋
  </h2>

  <p style="font-size: 16px;">
    You’ve successfully logged in to <strong>Your Learning Platform</strong> 🎓
  </p>

  <p>
    We're excited to have you continue your learning journey with us. New skills, new knowledge, and new opportunities are waiting for you!
  </p>

  <div style="background:#f1f5f9; padding:16px; border-radius:10px; margin:20px 0;">
    <p style="margin:0; font-size:15px;">
      🚀 Explore your courses, track your progress, and start learning something new today.
    </p>
  </div>

  <p>
    If this login wasn’t made by you, please reset your password immediately to keep your account secure.
  </p>

  <hr style="border:none; border-top:1px solid #e2e8f0; margin:24px 0;" />

  <p style="margin-top:10px;">
    Happy Learning,<br/>
    <strong>Team Your Learning Platform</strong> 💙
  </p>

  <p style="font-size:12px; color:#777; margin-top:20px;">
    This is an automated message. Please do not reply to this email.
  </p>

</div>
`

  });

  console.log("📧 Welcome email sent to", email);
}

export async function startConsumer() {
  
  const connection = await amqp.connect("amqp://admin:admin123@localhost:5672")
  const channel = await connection.createChannel();
  await channel.assertExchange(EXCHANGE, "topic", { durable: true });
  const q = await channel.assertQueue("NOTIFICATION_QUEUE_LMS");
  await channel.bindQueue(q.queue, EXCHANGE, "user.login");

  
  channel.consume(q.queue, async (msg) => {
    const data = JSON.parse(msg.content.toString());

    if (data.event === "USER_LOGGED_IN") {
      await sendWelcomeMail(data.email, data.name);
    }

    channel.ack(msg);
  });

  console.log("📩 Notification Service listening...");
}

