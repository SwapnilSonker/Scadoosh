// import { getSelf } from "./auth-service";
// import { db } from "./db"

// export const getRecommended = async() => {

//     //for checking the hydration error
//     // await new Promise(resolve => setTimeout(resolve , 5000));


//     let userId;

//     try {
//         const self = await getSelf();
//         userId = self.id;
        
//     } catch {
//         userId = null;  
//     }

// //uncomment the commented query or correct the query when understood

//     let users = [];
//     if (userId) {
//         users = await db.user.findMany({
//           where: {
//             AND: [
//               {
//                 NOT: {
//                   id: userId,
//                 },
//               },
//               {
//                 NOT: {
//                   followedBy: {
//                     some: {
//                       followerId: userId,
//                     },
//                   },
//                 },
//               },
//               {
//                 NOT: {
//                   followedBy: {
//                     some: {
//                       followerId: userId,
//                     },
//                   },
//                 },
//               },
//             ],
//           },
//           include:{
//             stream:true,
//           },
//           orderBy: [
//             {
//               createdAt: "desc"
//             },
//           ]
//         })
//       }
//     else{
//         users = await db.user.findMany({
//           include:{
//             stream:true
//           },
//             orderBy: {
//                 createdAt: "desc"
//             }
//         });
//     }

    

//     return users;
// }
import { getSelf } from "./auth-service";
import { db } from "./db"

export const getRecommended = async() => {
  let userId;
  try {
    const self = await getSelf();
    userId = self.id;
  } catch {
    userId = null;
  }

  let users = [];

  if (userId) {
    const followedUserIds = await db.user.findMany({
      where: {
        followedBy: {
          some: {
            followerId: userId,
          },
        },
      },
      select: {
        id: true,
      },
    }).then((users) => users.map((user) => user.id));

    users = await db.user.findMany({
      where: {
        id: {
          not: userId,
        },
        NOT: {
          id: {
            in: followedUserIds,
          },
        },
      },
      include: {
        stream: {
          select:{
            isLive: true,
          }
        }
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } else {
    users = await db.user.findMany({
      include: {
        stream: {
          select:{
            isLive: true,
          }
        }
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  return users;
}