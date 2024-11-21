import { sql } from '@vercel/postgres';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const db = drizzle(sql);

const students = pgTable('students', {
  id: serial('id').primaryKey(),
  registrationNo: varchar('registration_no', { length: 20 }).notNull().unique(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  gender: varchar('gender', { length: 10 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  phoneNo: varchar('phone_no', { length: 20 }).notNull(),
  department: varchar('department', { length: 50 }).notNull(),
});

const studentData = [
  ["23FE10ITE00001", "ABHIMAN", "PANWAR", 'Male', 'ABHIMAN.23FE10ITE00001@MANIPAL.MUJ.EDU','1446105772','IT'],
  ["23FE10ITE00002","SANCHIT", "JUNEJA", 'Male', 'SANCHIT.23FE10ITE00002@MANIPAL.MUJ.EDU','9053475894','IT'],
  // ... (include all other student data here)
  ["23FE10ITE00373","ASHUTOSH", "BIJALWAN", 'Male', 'ASHUTOSH.23FE10ITE00371@MANIPAL.MUJ.EDU','2984238423','IT']
];

async function createTable() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS students (
        id SERIAL PRIMARY KEY,
        registration_no VARCHAR(20) UNIQUE NOT NULL,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        gender VARCHAR(10) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        phone_no VARCHAR(20) NOT NULL,
        department VARCHAR(50) NOT NULL
      );
    `;
    console.log('Table created successfully');
  } catch (error) {
    console.error('Error creating table:', error);
  }
}

async function seedDatabase() {
  try {
    console.log('Seeding database...');
    await createTable();
    for (const student of studentData) {
      await db.insert(students).values({
        registrationNo: student[0],
        firstName: student[1],
        lastName: student[2],
        gender: student[3],
        email: student[4],
        phoneNo: student[5],
        department: student[6]
      });
    }
    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

seedDatabase();

