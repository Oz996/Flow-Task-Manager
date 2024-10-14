"use client";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useLocation } from "@/hooks/useLocation";

export default function ProjectModal() {
  const searchParams = useSearchParams();
  const modal = searchParams.get("modal");

  const type = searchParams.get("type");
  const addModal = type === "add";

  const { closeModal } = useLocation();

  return (
    <Dialog open={modal === "true"} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-[30rem]">
        <DialogHeader>
          <DialogTitle>{addModal ? "Add Project" : "Edit Project"}</DialogTitle>
        </DialogHeader>
        <form>
          <Label htmlFor="name">Name</Label>
          <Input name="name" id="name" placeholder="Project Name" />
        </form>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
