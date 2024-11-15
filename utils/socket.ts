import { io } from 'socket.io-client';

const URL = `${process.env.EXPO_PUBLIC_AI_URL}`;

export const socket = io(URL, { autoConnect: false });
