import { Button } from "../ui/button";

interface SocialProps {
  label: string;
  icon?: React.ReactNode;
}

export function Social({ label, icon }: SocialProps) {
  return (
    <div className="w-full space-x-2 space-y-2">
      <Button className="w-full gap-2" variant={"outline"} size={"lg"}>
        {icon}
        <p>{label}</p>
      </Button>
    </div>
  );
}
