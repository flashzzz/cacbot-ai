/* eslint-disable @typescript-eslint/no-unused-vars */

import { TypeOptions, toast } from "react-toastify";

export const ToastContent = (message: string, type: TypeOptions) => {
  return toast(message, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    theme: "dark",
    type: type,
  });
};
