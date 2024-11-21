'use client'

import { useState, useEffect } from 'react'
import { useDebounce } from 'use-debounce'
import { search } from '../actions'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useTheme } from 'next-themes'
import { SearchIcon, Sun, Moon } from 'lucide-react'

export function Search() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [error, setError] = useState('')
  const [debouncedQuery] = useDebounce(query, 300)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const fetchResults = async () => {
      if (debouncedQuery) {
        try {
          const searchResults = await search(debouncedQuery)
          setResults(searchResults)
          setError('')
        } catch (err) {
          console.error('Search error:', err)
          setError('An error occurred while searching. Please try again.')
          setResults([])
        }
      } else {
        setResults([])
        setError('')
      }
    }

    fetchResults()
  }, [debouncedQuery])

  const handleSearch = async () => {
    if (query) {
      try {
        const searchResults = await search(query)
        setResults(searchResults)
        setError('')
      } catch (err) {
        console.error('Search error:', err)
        setError('An error occurred while searching. Please try again.')
        setResults([])
      }
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-6">
      <div className="flex items-center space-x-4">
        <div className="relative flex-grow">
          <Input
            type="text"
            placeholder="Search by name, registration no., email, or phone"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pr-10"
          />
          <Button
            size="icon"
            variant="ghost"
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
            onClick={handleSearch}
          >
            <SearchIcon className="h-4 w-4" />
          </Button>
        </div>
        <Button
          size="icon"
          variant="outline"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          {theme === 'dark' ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </Button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {results.length > 0 && (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[180px]">Registration No.</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Department</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.map((student: any) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.registrationNo}</TableCell>
                  <TableCell>{`${student.firstName} ${student.lastName}`}</TableCell>
                  <TableCell>{student.gender}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.phoneNo}</TableCell>
                  <TableCell>{student.department}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}

