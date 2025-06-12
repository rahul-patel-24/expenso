import { BrowserRouter } from "react-router-dom";
import AppRoutes from "@/routes/AppRoutes";
import { useAutoAuth } from "@/features/auth/useAutoAuth";
import { Toaster } from "@/components/ui/sonner";

function App() {
  useAutoAuth();
  return (
    <BrowserRouter>
      <Toaster />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
