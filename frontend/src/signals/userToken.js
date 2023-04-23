import { signal } from "@preact/signals-react"

export const userToken = signal({
    "user_id": "",
    "username": "",
    "password": "",
    "email": null,
    "phone_num": null,
    "date_joined": null,
    "last_login": null
})