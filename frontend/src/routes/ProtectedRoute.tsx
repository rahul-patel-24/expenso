import { Navigate } from 'react-router-dom'
import { useAppSelector } from '@/app/hooks'
import type { JSX } from 'react'

/**
 * ProtectedRoute component checks if the user is authenticated.
 * If authenticated, it renders the children components.
 * If not authenticated, it redirects to the login page.
 */

export function ProtectedRoute({ children }: { children: JSX.Element }) {
  const user = useAppSelector((state) => state.auth.user) || localStorage.getItem("user")
  return user ? children : <Navigate to="/login" replace />
}
