const transporter = require("./emailConfig");

const sendReminderEmail = async (userEmail, bookTitle, returnDate) => {
  try {
    const mailOptions = {
      from: "your-email@gmail.com",
      to: userEmail,
      subject: "Return Reminder: Please Return the Borrowed Book",
      text: `Dear User,\n\nThis is a reminder that you borrowed the book '${bookTitle}' from the library. The return date is ${returnDate}. Please return the book by then to avoid late fees.\n\nThank you.`,
    };

    await transporter.sendMail(mailOptions);
    console.log("Reminder email sent successfully");
  } catch (error) {
    console.error("Error sending reminder email:", error);
  }
};

module.exports = { sendReminderEmail };
