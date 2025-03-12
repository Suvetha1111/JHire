const dotenv = require("dotenv");
dotenv.config();
const app = require("./app");
const connectDatabase = require("./config/connectDb");

// Connect to the database properly
(async () => {
  try {
    if(connectDatabase){
      console.log("✅ Database connected successfully in server file");

    }else
    {
      console.log("❌ Database connection failed in server file");
    }
  } catch (error) {
    console.error("❌ Database connection failed in server file", error);
    process.exit(1);
  }
})();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}/jhire`);
});
