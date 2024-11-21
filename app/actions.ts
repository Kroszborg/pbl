'use server'

import { searchStudents } from '@/lib/db'

export async function search(query: string) {
  if (query.trim() === '') return []
  return searchStudents(query)
}

