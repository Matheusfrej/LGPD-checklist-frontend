import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { Report } from './pages/Report'
import { DefaultLayout } from './layouts/DefaultLayout'
import { ChecklistFamilies } from './pages/ChecklistFamilies'
import { MandatoryItems } from './pages/MandatoryItems'
import { NonMandatoryItems } from './pages/NonMandatoryItems'

interface RouterProps {
  changeTheme: () => void
}

export function Router({ changeTheme }: RouterProps) {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout changeTheme={changeTheme} />}>
        <Route path="/" element={<Home />} />
        <Route path="/checklist-families" element={<ChecklistFamilies />} />
        <Route path="/mandatory-items" element={<MandatoryItems />} />
        <Route path="/non-mandatory-items" element={<NonMandatoryItems />} />
        <Route path="/report" element={<Report />} />
      </Route>
    </Routes>
  )
}
