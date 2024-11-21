"use client";

import { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';
import { 
  Search as SearchIcon, 
  Sun, 
  Moon, 
  Loader2, 
  UserSearch, 
  GraduationCap,
  X as XIcon
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import { search } from '../actions';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface Student {
  id: number;
  registrationNo: string;
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  phoneNo: string;
  department: string;
}

export function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Student[]>([]); // Initialize with proper type
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedQuery] = useDebounce(query, 300);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const fetchResults = async () => {
      if (debouncedQuery) {
        setIsLoading(true);
        try {
          const searchResults = await search(debouncedQuery);
          setResults(searchResults as Student[]); // Type assertion here
          setError('');
        } catch (err) {
          console.error('Search error:', err);
          setError('An error occurred while searching. Please try again.');
          setResults([]);
        } finally {
          setIsLoading(false);
        }
      } else {
        setResults([]);
        setError('');
      }
    };
    fetchResults();
  }, [debouncedQuery]);

  const handleClear = () => {
    setQuery('');
    setResults([]);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-5xl mx-auto p-6 space-y-8"
      >
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ 
                duration: 0.5,
                ease: "easeInOut",
                times: [0, 0.2, 0.5, 0.8],
                repeat: Infinity,
                repeatDelay: 5
              }}
            >
              <GraduationCap className="h-8 w-8" />
            </motion.div>
            <h1 className="text-2xl font-bold">Student Directory</h1>
          </div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Button
              size="icon"
              variant="outline"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="rounded-full transition-all duration-200 hover:shadow-lg"
            >
              <AnimatePresence mode="wait">
                {theme === 'dark' ? (
                  <motion.div
                    key="sun-icon"
                    initial={{ opacity: 0, rotate: -180 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 180 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Sun className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon-icon"
                    initial={{ opacity: 0, rotate: -180 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 180 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Moon className="h-5 w-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </motion.div>
        </motion.div>

        {/* Search Section */}
        <motion.div 
          className="relative"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div className="relative flex items-center">
            <Input
              type="text"
              placeholder="Search by name, registration no., email, or phone..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-12 pr-24 h-12 text-lg rounded-full transition-all duration-200 
                        focus:shadow-lg focus:ring-2 focus:ring-primary/50"
            />
            <UserSearch className="absolute left-4 h-5 w-5 text-muted-foreground" />
            
            <div className="absolute right-4 flex items-center gap-2">
              <AnimatePresence mode="wait">
                {query && (
                  <motion.div
                    key="clear-button"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  >
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={handleClear}
                      className="h-8 w-8 rounded-full hover:bg-destructive/10 hover:text-destructive"
                      title="Clear search"
                    >
                      <XIcon className="h-4 w-4" />
                    </Button>
                  </motion.div>
                )}
                {isLoading && (
                  <motion.div
                    key="loader"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Loader2 className="h-5 w-5 animate-spin text-primary" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Results Section */}
        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              key="error-message"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-destructive/10 text-destructive p-4 rounded-lg text-center"
            >
              {error}
            </motion.div>
          )}

          {results.length > 0 && (
            <motion.div
              key="results-table"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="rounded-lg border bg-card shadow-lg overflow-hidden"
            >
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="w-[180px] font-semibold">Registration No.</TableHead>
                      <TableHead className="font-semibold">Name</TableHead>
                      <TableHead className="font-semibold">Gender</TableHead>
                      <TableHead className="font-semibold">Email</TableHead>
                      <TableHead className="font-semibold">Phone</TableHead>
                      <TableHead className="font-semibold">Department</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {results.map((student: Student) => (
                      <motion.tr
                        key={student.registrationNo}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ 
                          type: "spring",
                          stiffness: 100,
                          damping: 20
                        }}
                        className="group hover:bg-muted/50 transition-colors duration-200"
                      >
                        <TableCell className="font-medium">{student.registrationNo}</TableCell>
                        <TableCell className="font-medium">{`${student.firstName} ${student.lastName}`}</TableCell>
                        <TableCell>{student.gender}</TableCell>
                        <TableCell className="text-primary">{student.email}</TableCell>
                        <TableCell>{student.phoneNo}</TableCell>
                        <TableCell>{student.department}</TableCell>
                      </motion.tr>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </motion.div>
          )}

          {query && !isLoading && results.length === 0 && !error && (
            <motion.div
              key="no-results"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="text-center p-8 text-muted-foreground"
            >
              <UserSearch className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg">No results found</p>
              <p className="text-sm">Try adjusting your search terms</p>
            </motion.div>
          )}
        </AnimatePresence>

        {!query && (
          <motion.div
            key="empty-state"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center p-8 text-muted-foreground"
          >
            <SearchIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg">Enter a search term to begin</p>
            <p className="text-sm">Search by name, registration number, email, or phone</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default Search;