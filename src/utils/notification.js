import { notification } from 'antd';

export const notityMessage = msg => {
  if (msg.type === 'SUCCESS') {
    notification.success({
      description: msg.message,
      duration: 3
    });
  } else if (msg.type === 'ERROR') {
    notification.error({
      description: msg.message,
      duration: 3
    });
  }
};
