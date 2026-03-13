import { auth } from "@clerk/nextjs/server"

const allowedIds = [
    "user_394uMn4YBAGbSp3w9AFhQxUdxeF",
    "user_39A0SteccTzKrcFD2xK0zTPL4yf",
];

export const isAdmin = async () => {
    const { userId } = await auth();

    if (!userId) {
        return false;
    }

    return allowedIds.indexOf(userId) !== -1;
};