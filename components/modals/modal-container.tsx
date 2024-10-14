import { Dialog } from "@/components/ui/dialog";
import { useLocation } from "@/hooks/useLocation";
import { useSearchParams } from "next/navigation";
import { ReactNode } from "react";

export default function ModalContainer({ children }: { children: ReactNode }) {
  const searchParams = useSearchParams();
  const modal = searchParams.get("modal");

  const { closeModal } = useLocation();

  return (
    <Dialog open={modal === "true"} onOpenChange={closeModal}>
      {children}
    </Dialog>
  );
}
