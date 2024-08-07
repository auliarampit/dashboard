import { toast } from 'react-toastify';

type ToastType = 'success' | 'error' | 'warning';

const showToast = (type: ToastType, message: string) => {
  switch (type) {
    case 'success':
      toast.success(message);
      break;
    case 'error':
      toast.error(message);
      break;
    case 'warning':
      toast.warn(message);
      break;
  }
};

export default showToast;
export {};
