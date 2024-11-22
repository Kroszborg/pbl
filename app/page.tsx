import { Search } from './components/search'
import { ProjectInfo } from './components/project-info'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-4 md:p-24">
      <Search />
      <ProjectInfo />
    </main>
  )
}

