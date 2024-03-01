import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { Report } from './pages/Report'
import { DefaultLayout } from './layouts/DefaultLayout'

interface RouterProps {
  changeTheme: () => void
}

export function Router({ changeTheme }: RouterProps) {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout changeTheme={changeTheme} />}>
        <Route path="/" element={<Home />} />
        <Route path="/report" element={<Report />} />
      </Route>
    </Routes>
  )
}
