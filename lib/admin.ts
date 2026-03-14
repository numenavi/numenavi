import { auth } from "@clerk/nextjs/server"

const allowedIds = [
    "user_394uMn4YBAGbSp3w9AFhQxUdxeF",
    "user_39A0SteccTzKrcFD2xK0zTPL4yf",
    "user_3AuEBemG6a4OLnaTfqYE8doeYyp",
];

export const isAdmin = async () => {
    const { userId } = await auth();

    if (!userId) {
        return false;
    }

    return allowedIds.indexOf(userId) !== -1;
};