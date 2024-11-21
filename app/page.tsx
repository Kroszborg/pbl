import { Search } from './components/search'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-4 md:p-24">
      <h1 className="mb-8 text-3xl md:text-4xl font-bold">Student Search</h1>
      <Search />
    </main>
  )
}

