const cron = require("node-cron");
const { sendReminderEmail } = require("./service/emailService");
const Book = require("./models/Book"); // Import the Book model

// Get books due for return based on the current date
const getBooksDueForReturn = async () => {
  try {
    const currentDate = new Date();

    // Find books with returnDate on or before the current date
    const booksDue = await Book.find({ returnDate: { $lte: currentDate } });

    return booksDue.map((book) => ({
      userEmail: book.userEmail, // Replace with your user email field
      bookTitle: book.title,
      returnDate: book.returnDate.toDateString(), // Format the date as needed
    }));
  } catch (error) {
    console.error("Error retrieving books due for return:", error);
    return []; // Return an empty array or handle the error as per your requirement
  }
};

// Cron job schedule and sending reminder emails remain the same...

cron.schedule("0 8 * * *", async () => {
  try {
    console.log("Running the reminder cron job...");

    const booksDueForReturn = await getBooksDueForReturn();

    for (const book of booksDueForReturn) {
      const { userEmail, bookTitle, returnDate } = book;
      await sendReminderEmail(userEmail, bookTitle, returnDate);
    }

    console.log("Reminder emails sent!");
  } catch (error) {
    console.error("Error in reminder cron job:", error);
  }
});
