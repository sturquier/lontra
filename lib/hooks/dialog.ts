import { MutableRefObject, RefObject, useRef } from 'react';

export default function useDialog() {
  const CreateDialogRef = (): MutableRefObject<HTMLDialogElement | null> => useRef<HTMLDialogElement | null>(null);

  const openDialog = (dialogRef: RefObject<HTMLDialogElement>): void => dialogRef.current?.showModal();

  const closeDialog = (dialogRef: RefObject<HTMLDialogElement>): void => dialogRef.current?.close();

  return {
    CreateDialogRef,
    openDialog,
    closeDialog
  }
}