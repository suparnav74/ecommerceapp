import { lucia,invalidateRequest } from "@/lib/auth";

export async function POST(req:Request) {
    try {
        // Extract session cookie
        const cookies = req.headers.get("cookie");
        const sessionId = cookies?.split("; ").find((c) => c.startsWith("auth_session="))?.split("=")[1];

        if (!sessionId) {
            return new Response(JSON.stringify({ error: "No session found" }), { status: 400 });
        }

        // Invalidate the session
        await lucia.invalidateSession(sessionId);

        // Clear the session cookie
        return new Response(
            JSON.stringify({ success: true }),
            {
                status: 200,
                headers: {
                    "Set-Cookie": `auth_session=; Path=/; HttpOnly; Max-Age=0`, // Expire the session cookie
                },
            }
        );
    } catch (error) {
        console.error("Error logging out:", error);
        return new Response(
            JSON.stringify({ error: "Failed to log out" }),
            { status: 500 }
        );
    }
}

// export async function GET(request: Request) {
//     const message = await invalidateRequest()
//     return Response.json({ message })
// }