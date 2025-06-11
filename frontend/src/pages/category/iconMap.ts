import {
  Home,
  Zap,
  Car,
  ShoppingCart,
  Utensils,
  HeartPulse,
  Shield,
  Banknote,
  PiggyBank,
  Film,
  GraduationCap,
  Smile,
  Baby,
  Shirt,
  Plane,
  Gift,
  Newspaper,
  PawPrint,
  Receipt,
  HelpCircle,
  Folder,
} from "lucide-react";

export const ICON_OPTIONS = [
  { label: "Housing", value: "Housing", Icon: Home },
  { label: "Utilities", value: "Utilities", Icon: Zap },
  { label: "Transportation", value: "Transportation", Icon: Car },
  { label: "Groceries", value: "Groceries", Icon: ShoppingCart },
  { label: "Dining Out", value: "Dining Out", Icon: Utensils },
  { label: "Healthcare", value: "Healthcare", Icon: HeartPulse },
  { label: "Insurance", value: "Insurance", Icon: Shield },
  { label: "Debt Payments", value: "Debt Payments", Icon: Banknote },
  { label: "Savings", value: "Savings", Icon: PiggyBank },
  { label: "Entertainment", value: "Entertainment", Icon: Film },
  { label: "Education", value: "Education", Icon: GraduationCap },
  { label: "Personal Care", value: "Personal Care", Icon: Smile },
  { label: "Childcare", value: "Childcare", Icon: Baby },
  { label: "Clothing", value: "Clothing", Icon: Shirt },
  { label: "Travel", value: "Travel", Icon: Plane },
  { label: "Gifts/Donations", value: "Gifts/Donations", Icon: Gift },
  { label: "Subscriptions", value: "Subscriptions", Icon: Newspaper },
  { label: "Pets", value: "Pets", Icon: PawPrint },
  { label: "Taxes", value: "Taxes", Icon: Receipt },
  { label: "Miscellaneous", value: "Miscellaneous", Icon: Folder }, // fallback
];

export const getIconByName = (name: string | undefined) => {
  const found = ICON_OPTIONS.find((i) => i.value === name);
  return found?.Icon || HelpCircle; // default icon
};
