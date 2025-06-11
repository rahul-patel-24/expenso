
import { BrowserRouter } from "react-router-dom"
import AppRoutes from "@/routes/AppRoutes"
import { useAutoAuth } from "@/features/auth/useAutoAuth"

function App() {
  useAutoAuth()
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
