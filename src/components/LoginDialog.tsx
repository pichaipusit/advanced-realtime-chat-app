import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { SignInButton } from "@clerk/nextjs";

type LoginDialogProps = {
  isDialogOpen: boolean;
  onClose: () => void;
};
const LoginDialog = ({ isDialogOpen, onClose }: LoginDialogProps) => {
  return (
    <div className="relative">
      <AlertDialog open={isDialogOpen} onOpenChange={onClose}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Login Required</AlertDialogTitle>
            <AlertDialogDescription>
              Please Login to send a message.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <div></div>
            <AlertDialogCancel className="rounded-full focus-visible:ring-0">
              Cancel
            </AlertDialogCancel>

            <SignInButton>
              <AlertDialogAction className="rounded-full bg-teal-400 hover:bg-teal-300 text-white">
                Sign in
              </AlertDialogAction>
            </SignInButton>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default LoginDialog;
