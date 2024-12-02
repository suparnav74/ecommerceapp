import db from "@/lib/db"; 

export async function GET(req:Request) {
    try {
        // Extract session cookie
        const cookies = req.headers.get("cookie");
        const sessionId = cookies?.split("; ").find((c) => c.startsWith("auth_session="))?.split("=")[1];
        
        // Correctly access the query method from the db pool
        const [users] = await db.query('SELECT id, email, role, created FROM users'); 
        
        return new Response(JSON.stringify(users), { status: 200 });
    } catch (error) {
        console.error('Error fetching users:', error); // Log the error for debugging
        return new Response(JSON.stringify({ error: 'Failed to fetch users' }), { status: 500 });
    }
}
