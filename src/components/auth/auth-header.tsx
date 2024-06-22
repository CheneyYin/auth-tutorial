import { CardTitle } from "../ui/card";

interface AuthHeaderProps {
  label: string;
}

export function AuthHeader({ label }: AuthHeaderProps) {
  return <CardTitle>🔑 {label}</CardTitle>;
}
