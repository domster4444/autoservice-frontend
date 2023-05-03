import { toast } from "react-toastify";

const toastConfig = {
  position: "top-center",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
};

/**
 * If the type is true, then show a success message, otherwise show an error message.
 * @param message - The message you want to display
 * @param [type=true] - true or false
 */
const toastMsg = (message, type = true) => {
  type ? toast.success(message, toastConfig) : toast.error(message, toastConfig);
};

export default toastMsg;
