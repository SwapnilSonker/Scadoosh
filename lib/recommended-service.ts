import { db } from "./db"

export const getRecommended = async() => {

    //for checking the hydration error
    // await new Promise(resolve => setTimeout(resolve , 5000));
    const users = await db.user.findMany({
        orderBy: {
            createdAt: "desc"
        }
    });

    return users;
}