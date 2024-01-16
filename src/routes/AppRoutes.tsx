import { Routes, Route } from 'react-router-dom'

import { DefaultLayout } from '@/pages/_layouts/DefaultLayout'
import { Enterprises } from '@/pages/Enterprises'
import { Error } from '@/pages/Error'
import { Home } from '@/pages/Home'
import { Login } from '@/pages/Login'

import { Protected } from './Protected'

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<Protected isProtected />}>
        <Route path="/" element={<DefaultLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/enterprises" element={<Enterprises />} />
        </Route>

        <Route path="/*" element={<Error />} />
      </Route>

      <Route element={<Protected isProtected={false} />}>
        <Route path="/sign-in" element={<Login />} />
      </Route>
    </Routes>
  )
}
