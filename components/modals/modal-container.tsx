import { Dialog } from "@/components/ui/dialog";
import { useModal } from "@/hooks/useModal";
import { useSearchParams } from "next/navigation";
import { ReactNode } from "react";

export default function ModalContainer({ children }: { children: ReactNode }) {
  const searchParams = useSearchParams();
  const modal = searchParams.get("modal");

  const { closeModal } = useModal();

  return (
    <Dialog open={modal === "true"} onOpenChange={closeModal}>
      {children}
    </Dialog>
  );
}
