import {signal} from '@preact/signals-react';

const messages = signal ([        {
    message:'Please Enter Your UserName',
    from:'Other'
},])

export const isLogedin = signal(false);

export default messages;