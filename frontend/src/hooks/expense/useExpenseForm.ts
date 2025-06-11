import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useCreateExpenseMutation,
  useUpdateExpenseMutation,
} from "@/features/expense/expenseAPI";
import type { Expense } from "@/types/expenses";
import { expenseSchema, type ExpenseFormValues } from "@/utils/validation";
import { toast } from "sonner";

/**
 * useExpenseForm Hook
 *
 * Custom hook to handle expense form logic.
 * - Initializes form with Zod validation
 * - Handles both create and update flows
 * - Auto-populates default values for edit mode
 * - Manages form state (errors, submission, dirty check)
 * - Integrates with RTK Query mutations
 */

export const useExpenseForm = (
  defaultValues?: Expense | null,
  onClose?: () => void
) => {
  const [createExpense, { isLoading: creating }] = useCreateExpenseMutation();
  const [updateExpense, { isLoading: updating }] = useUpdateExpenseMutation();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isDirty },
  } = useForm<ExpenseFormValues>({
    resolver: zodResolver(expenseSchema),
  });

  const category_id = watch("category_id");

  useEffect(() => {
    if (defaultValues) {
      reset({
        title: defaultValues.title,
        amount: defaultValues.amount,
        category_id: defaultValues.category_id,
        description: defaultValues.description ?? "",
        date: defaultValues.date.split("T")[0],
      });
    } else {
      reset({
        title: "",
        amount: 0,
        category_id: undefined,
        description: "",
        date: "",
      });
    }
  }, [defaultValues, reset]);

  const onSubmit = async (data: ExpenseFormValues) => {
    try {
      console.log("form data:", data);
      if (defaultValues) {
        await updateExpense({ id: defaultValues.id, ...data }).unwrap();
        toast.success("Expense updated successfully");
      } else {
        await createExpense(data).unwrap();
        toast.success("Expense created successfully");
        reset();
      }
      onClose?.();
    } catch (error) {
      console.error("Error submitting expense:", error);
      toast.error("Failed to submit expense");
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    setValue,
    category_id,
    errors,
    isSubmitting: creating || updating,
    isDirty,
  };
};
