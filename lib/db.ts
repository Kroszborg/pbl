import { sql } from '@vercel/postgres';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';
import { or, ilike } from 'drizzle-orm';

export const students = pgTable('students', {
  id: serial('id').primaryKey(),
  registrationNo: varchar('registration_no', { length: 20 }).notNull().unique(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  gender: varchar('gender', { length: 10 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  phoneNo: varchar('phone_no', { length: 20 }).notNull(),
  department: varchar('department', { length: 50 }).notNull(),
});

export const db = drizzle(sql);

export async function searchStudents(query: string) {
  const searchQuery = `%${query}%`;
  
  return db.select()
    .from(students)
    .where(
      or(
        ilike(students.firstName, searchQuery),
        ilike(students.lastName, searchQuery),
        ilike(students.registrationNo, searchQuery),
        ilike(students.email, searchQuery),
        ilike(students.phoneNo, searchQuery)
      )
    )
    .limit(20);
}