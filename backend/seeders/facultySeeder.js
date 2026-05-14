require('dotenv').config();
const mongoose = require('mongoose');
const Faculty = require('../models/Faculty');
const connectDB = require('../config/db');

const faculties = [
  {
    name: 'Dr. Sanjeev Kumar',
    email: 'sanjeev.kumar@college.edu',
    password: 'faculty123',
    employeeId: 'FAC001',
    department: 'Placement Cell',
    phone: '9876543210'
  },
  {
    name: 'Prof. Priti Varshney',
    email: 'priti.varshney@college.edu',
    password: 'faculty123',
    employeeId: 'FAC002',
    department: 'Placement Cell',
    phone: '9876543211'
  }
];

const seedFaculty = async () => {
  await connectDB();
  try {
    await Faculty.deleteMany({});
    for (const f of faculties) {
      await Faculty.create(f);
    }
    console.log('✅ Faculty seeded successfully!');
    console.log('\nFaculty Credentials:');
    faculties.forEach(f => {
      console.log(`  Email: ${f.email} | Password: ${f.password} | ID: ${f.employeeId}`);
    });
  } catch (err) {
    console.error('Seeding error:', err.message);
  } finally {
    mongoose.connection.close();
  }
};

seedFaculty();