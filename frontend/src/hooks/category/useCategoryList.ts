import { useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { useGetCategoriesQuery } from "@/features/category/categoryAPI";
import type { Category } from "@/types/category";

export const useCategoryList = () => {
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | number | null>(null);
  const [editData, setEditData] = useState<Category | undefined>(undefined);

  const debouncedSearch = useDebounce(search);
  const { data: categories, isLoading } = useGetCategoriesQuery(
    debouncedSearch
  ) as {
    data: Category[] | undefined;
    isLoading: boolean;
  };

  return {
    search,
    setSearch,
    modalOpen,
    setModalOpen,
    deleteId,
    setDeleteId,
    editData,
    setEditData,
    debouncedSearch,
    categories,
    isLoading,
  };
};
