/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { ConfirmCloseProps, FooterProps } from "../../components/rnd-dialog";
import { DialogFooterProps } from "../../components/dialog/DialogFooter";

type Dialog<T> = {
  idRef: string;
  default?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  component: any;
  propsComponent: T;
  minHeight?: number;
  minWidth?: number;
  footerProps?: FooterProps;
  FooterProps?: DialogFooterProps;
  confirmCloseProps?: ConfirmCloseProps;
  hideControlButton?: boolean;
};

type DialogsStore = {
  dialogs: Dialog<any>[]; // Add type argument to Dialog type
  order: string[];
  addDialog: (dialog: Dialog<any>) => void; // Add type argument to Dialog type
  closeDialog: (idRef: string) => void;
  bringToFront: (idRef: string) => void;
};
export const useDialogsStore = create<DialogsStore>()(
  devtools(
    (set, get) => ({
      dialogs: [],
      order: [],
      addDialog: (dialog) => {
        set((state) => ({
          order: [...state.order, dialog.idRef],
        }));

        // 1. if dialog with idRef already exists, updated it
        const findDialog = get().dialogs.find((d) => d.idRef === dialog.idRef);
        if (findDialog) {
          return set((state) => ({
            dialogs: state.dialogs.map((d) => (d.idRef === dialog.idRef ? dialog : d)),
          }));
        } else {
          // 2. if dialog with idRef does not exist, add it
          return set((state) => ({
            dialogs: [...state.dialogs, dialog],
          }));
        }
      },
      closeDialog: (idRef) => {
        set((state) => ({
          order: state.order.filter((order) => order !== idRef),
          dialogs: state.dialogs.filter((dialog) => dialog.idRef !== idRef),
        }));
      },

      bringToFront: (idRef) => {
        set((state) => ({
          order: [...state.order.filter((order) => order !== idRef), idRef],
        }));
      },
    }),
    {
      name: "DialogsStore",
    }
  )
);
