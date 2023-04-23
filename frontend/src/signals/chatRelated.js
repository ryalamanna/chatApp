import {signal} from '@preact/signals-react';

export const isChatOpen = signal(false);
export const partnerName = signal('');
export const partnerId = signal('');
export const chatMessages = signal([]);
export const last_displayed_timestamp = signal(0);