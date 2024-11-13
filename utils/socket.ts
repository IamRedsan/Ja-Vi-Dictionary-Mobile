import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL =
  process.env.NODE_ENV === 'production' ? undefined : 'http://10.20.1.78:5000';

export const socket = io(URL, { autoConnect: false });
