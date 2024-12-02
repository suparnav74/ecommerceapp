// import { lucia,validateRequest } from "@/lib/auth";

// export async function GET(req :Request) {
//     try {
//         // Extract session cookie
//         // const cookies = req.headers.get("cookie");
//         // console.log(cookies);
//         // const sessionId = cookies?.split("; ").find((c) => c.startsWith("auth_session="))?.split("=")[1];

        
         
//          const { user } = await validateRequest();
//            console.log("user",user)
       
        
//         // if (!sessionId) {
//         //     return new Response(
//         //         JSON.stringify({ error: "Unauthorized", role: null }),
//         //         { status: 401, headers: { "Content-Type": "application/json" } }
//         //     );
//         // }

//         // Validate session using the extracted session ID
//         // const session = await lucia.validateUser();
//         // console.log(session);
//         // if (!session) {
//         //     return new Response(
//         //         JSON.stringify({ error: "Unauthorized", role: null }),
//         //         { status: 401, headers: { "Content-Type": "application/json" } }
//         //     );
//         // }

//         // const user = session.user;
//         if(user){
//             console.log(user.role)
//         return new Response(
//             JSON.stringify({ role: user.role  }),
//             { status: 200, headers: { "Content-Type": "application/json" } }
//         );
//     }
//     } catch (error) {
//         console.error("Error validating session:", error);

//         // Handle unexpected errors
//         return new Response(
//             JSON.stringify({ error: "Internal Server Error" }),
//             { status: 500, headers: { "Content-Type": "application/json" } }
//         );
//     }
// }

import { lucia, validateRequest } from "@/lib/auth";

export async function GET(req:Request) {
  try {
    const { user } = await validateRequest();
    console.log("user", user);

    if (user) {
      console.log(user.role);
      return new Response(
        JSON.stringify({ role: user.role }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    } else {
      // Handle unauthenticated user
      return new Response(
        JSON.stringify({ error: "User not authenticated" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }
  } catch (error) {
    console.error("Error validating session:", error);

    // Handle unexpected errors
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}