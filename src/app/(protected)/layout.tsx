import { UserDataProvider } from "@/contexts/UserDataContext";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserDataProvider>
      {children}
    </UserDataProvider>
  );
} 