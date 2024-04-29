import { Routes, Route, Navigate } from 'react-router-dom'
import { Home } from './pages/Home'
import { Report } from './pages/Report'
import { DefaultLayout } from './layouts/DefaultLayout'
import { ChecklistFamilies } from './pages/ChecklistFamilies'
import { MandatoryItems } from './pages/MandatoryItems'
import { NonMandatoryItems } from './pages/NonMandatoryItems'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { NotFound } from './pages/NotFound'
import { Profile } from './pages/Profile'
import { Systems } from './pages/Systems'
import { Checklists } from './pages/Checklists'
import { useAuth } from './contexts/AuthContext'

export function Router() {
  const { isLogged } = useAuth()

  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={!isLogged ? <Login /> : <Navigate replace to="/" />}
        />
        <Route
          path="/register"
          element={!isLogged ? <Register /> : <Navigate replace to="/" />}
        />
        <Route path="/checklist-families" element={<ChecklistFamilies />} />
        <Route path="/mandatory-items" element={<MandatoryItems />} />
        <Route path="/non-mandatory-items" element={<NonMandatoryItems />} />
        <Route path="/report" element={<Report />} />
        <Route path="/checklist-families/:id" element={<ChecklistFamilies />} />
        <Route path="/mandatory-items/:id" element={<MandatoryItems />} />
        <Route
          path="/non-mandatory-items/:id"
          element={<NonMandatoryItems />}
        />
        <Route path="/report/:id" element={<Report />} />
        <Route
          path="/profile"
          element={isLogged ? <Profile /> : <Navigate replace to="/login" />}
        />
        <Route
          path="/systems"
          element={isLogged ? <Systems /> : <Navigate replace to="/login" />}
        />
        <Route
          path="/checklists"
          element={isLogged ? <Checklists /> : <Navigate replace to="/login" />}
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
