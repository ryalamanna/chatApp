import { signal } from '@preact/signals-react';
const messages = signal([
    {
        message: 'Enter R to register or L to login',
        from: 'Other',
    },
]);
export const isLogedin = signal(false);
export default messages;
