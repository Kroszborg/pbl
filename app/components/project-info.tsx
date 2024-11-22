'use client'

import { useState } from 'react'
import { Card, CardContent} from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from "@/components/ui/button"

export function ProjectInfo() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  const sectionVariants = {
    collapsed: { height: 0, opacity: 0 },
    expanded: { height: 'auto', opacity: 1 }
  }

  return (
    <div className="mt-8 w-full max-w-4xl">
      <Button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full justify-between"
        variant="outline"
      >
        About This Project
        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </Button>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="mt-2">
              <CardContent className="p-6">
                <p className="mb-6 text-lg leading-relaxed">
                  This Student Information Website is a project-based learning initiative by 
                  <span className="font-semibold"> Abhiman Panwar </span> and 
                  <span className="font-semibold"> Abhilasha Muskan Jha</span>, 
                  under the mentorship of Sir Chandrapal Singh Dangi.
                </p>

                <div className="space-y-4">
                  {[
                    {
                      title: "Project Vision and Mission",
                      content: "The project aims to create a real-life, industry-ready application that allows users to search and retrieve student information efficiently. It serves as a practical learning experience in using various web development technologies and tools."
                    },
                    {
                      title: "Systems Involved",
                      content: (
                        <ul className="list-disc list-inside">
                          <li>Database Management System (DBMS)</li>
                          <li>Programming Languages</li>
                          <li>Web Framework</li>
                          <li>User Interface</li>
                          <li>Frontend and Backend Technologies</li>
                          <li>Deployment Platforms</li>
                        </ul>
                      )
                    },
                    {
                      title: "Tools and Technologies",
                      content: (
                        <ul className="list-disc list-inside">
                          <li>Frontend: HTML, CSS, JavaScript (Next.js)</li>
                          <li>Backend: Node.js</li>
                          <li>Database: Vercel Postgres</li>
                          <li>Deployment: Vercel</li>
                        </ul>
                      )
                    }
                  ].map((section, index) => (
                    <div key={index} className="border-b border-gray-200 pb-4">
                      <button
                        onClick={() => toggleSection(section.title)}
                        className="flex justify-between items-center w-full text-left font-semibold text-lg text-gray-700 hover:text-blue-600 focus:outline-none transition-colors duration-200"
                      >
                        {section.title}
                        {expandedSection === section.title ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </button>
                      <motion.div
                        variants={sectionVariants}
                        initial="collapsed"
                        animate={expandedSection === section.title ? "expanded" : "collapsed"}
                        transition={{ duration: 0.3 }}
                        className="mt-2 text-gray-600 overflow-hidden"
                      >
                        {typeof section.content === 'string' ? (
                          <p className="leading-relaxed">{section.content}</p>
                        ) : (
                          section.content
                        )}
                      </motion.div>
                    </div>
                  ))}
                </div>

                <p className="mt-6 text-center text-gray-700 font-medium">
                  This project demonstrates the practical application of web development skills.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

