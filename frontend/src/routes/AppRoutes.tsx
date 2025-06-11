import { Routes, Route } from "react-router-dom";

// Public pages
import Login from "@/pages/auth/login/login";
import Signup from "@/pages/auth/signup/signup";

// Layout & Route Protection
import { AppLayout } from "@/components/layout/AppLayout";
import { ProtectedRoute } from "./ProtectedRoute";

// Authenticated pages
import CategoryList from "@/pages/category/CategoryList";
import Dashboard from "@/pages/dashboard/Dashboard";
import ExpenseTable from "@/pages/expense/ExpensesTable";

// Not Found page
import NotFound from "@/pages/NotFound/NotFound";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected Routes (only accessible after login) */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        {/* Nested Routes under AppLayout */}
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="categories" element={<CategoryList />} />
        <Route path="expenses" element={<ExpenseTable />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
