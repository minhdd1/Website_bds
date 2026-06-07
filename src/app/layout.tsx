import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

// Layout gốc này đóng vai trò chuyển tiếp cho các route đa ngôn ngữ [locale]
export default function RootLayout({ children }: Props) {
  return children;
}
