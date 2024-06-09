const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/userModel'); // Adjust the path as per your project structure
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

const seedSuperAdmin = async () => {
  await connectDB();

  const superAdminEmail = process.env.SUPER_ADMIN_EMAIL;
  const superAdminPassword = process.env.SUPER_ADMIN_PASSWORD;

  const userExists = await User.findOne({ email: superAdminEmail });

  if (userExists) {
    console.log('Super Admin already exists');
    process.exit();
  }

  const hashedPassword = await bcrypt.hash(superAdminPassword, 10);

  const superAdmin = new User({
    name: 'Super Admin',
    email: superAdminEmail,
    password: hashedPassword,
    isAdmin: true,
    role: 'superadmin' // Add the role field here
  });

  await superAdmin.save();
  console.log('Super Admin created');
  process.exit();
};

seedSuperAdmin();
