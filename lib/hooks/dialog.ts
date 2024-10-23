import { useRef } from 'react';

export default function useDialog() {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const openDialog = (): void => dialogRef.current?.showModal();

  const closeDialog = (): void => dialogRef.current?.close();

  return {
    dialogRef,
    openDialog,
    closeDialog
  }
}