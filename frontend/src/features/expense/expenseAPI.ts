import type { ExpenseFilters } from "@/types/expenses";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const expensesAPI = createApi({
  reducerPath: "expensesAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://expenso-5vqs.onrender.com/api",
    credentials: "include",
  }),
  tagTypes: ["Expenses"],
  endpoints: (builder) => ({
    getExpenses: builder.query<
      ExpenseFilters,
      {
        page?: number;
        limit?: number;
        search?: string;
        category_id?: string;
        start_date?: string;
        end_date?: string;
        min_amount?: string;
        max_amount?: string;
        sort_by?: string;
        sort_order?: string;
      }
    >({
      query: ({
        page = 1,
        limit = 10,
        search = "",
        category_id,
        start_date,
        end_date,
        min_amount,
        max_amount,
        sort_by = "date",
        sort_order = "DESC",
      }) => {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
          search,
          sort_by,
          sort_order,
        });
        if (category_id) params.append("category_id", category_id);
        if (start_date) params.append("start_date", start_date);
        if (end_date) params.append("end_date", end_date);
        if (min_amount) params.append("min_amount", min_amount);
        if (max_amount) params.append("max_amount", max_amount);
        return `/expenses?${params.toString()}`;
      },
      providesTags: ["Expenses"],
    }),
    createExpense: builder.mutation({
      query: (body) => ({
        url: "/expenses",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Expenses"],
    }),
    updateExpense: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/expenses/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Expenses"],
    }),
    deleteExpense: builder.mutation({
      query: (id) => ({
        url: `/expenses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Expenses"],
    }),
    getTopThreeDays: builder.query<
      {
        rank: number;
        date: string;
        total_expenditure: number;
      }[],
      void
    >({
      query: () => "/expenses/top-three-days",
      transformResponse: (response: {
        data: {
          rank: number;
          date: string;
          total_expenditure: number;
        }[];
      }) => response.data,
    }),
    getMonthlyExpenditureChange: builder.query<
      {
        current_month_total: number;
        previous_month_total: number;
        percent_change: number | null;
      },
      void
    >({
      query: () => "/expenses/monthly-compare",
    }),

    predictNextMonthExpenditure: builder.query<
      {
        predicted_next_month_total: number;
      },
      void
    >({
      query: () => "/expenses/predict-next-month",
    }),
  }),
});

export const {
  useGetExpensesQuery,
  useCreateExpenseMutation,
  useUpdateExpenseMutation,
  useDeleteExpenseMutation,
  useGetTopThreeDaysQuery,
  useGetMonthlyExpenditureChangeQuery,
  usePredictNextMonthExpenditureQuery,
} = expensesAPI;
