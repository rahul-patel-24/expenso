import z from "zod";

export const expenseSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Max 100 characters"),
  amount: z.coerce
    .number()
    .min(0.01, "Amount must be positive")
    .max(99999999.99, "Amount must not exceed ₹99,999,999.99"),

  category_id: z.number().optional(),

  description: z.string().max(100, "Max 100 characters").optional(),

  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format")
    .refine(
      (value) => {
        const selected = new Date(value);
        const today = new Date();
        selected.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);
        return selected <= today;
      },
      { message: "Date cannot be in the future" }
    ),
});

export type ExpenseFormValues = z.infer<typeof expenseSchema>;
