import { lucia, validateRequest } from "@/lib/auth";
import db from "@/lib/db";
import { SA_User } from "@/lib/schema";
import type { ResultSetHeader, RowDataPacket } from "mysql2";
import { cookies } from "next/headers";

import bcrypt from "bcrypt";

interface SA_UserDB extends SA_User, RowDataPacket {}

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    console.log("Request body:", { email, password });

    const [rows] = await db.query<SA_UserDB[]>(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (!(Array.isArray(rows) && rows.length > 0)) {
      return new Response("User does not exist!", {
        status: 404,
      });
    }

    console.log("User  role:", rows[0].role);

    if (Array.isArray(rows) && rows.length > 0) {
      const user = rows[0];
      //const valid_pass = (password == user.password)
      const valid_pass = await bcrypt.compare(password, user.password);
      if (!valid_pass) {
        return new Response("Password does not match!", {
          status: 404,
        });
      }
    }
    const result = await validateRequest();
    if (!result) {
      const session = await lucia.createSession(rows[0].id, {});
      console.log("Session created:", session);
      const sessionCookie = lucia.createSessionCookie(session.id);
      (await cookies()).set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
      console.log(sessionCookie);
      return new Response(
        JSON.stringify({
          message: "User  logged in successfully!",
          role: rows[0].role, // Assuming role is a field in the user object
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } else {
      // If the user is already logged in (result is truthy), send a response indicating the user is logged in
      return new Response(
        JSON.stringify({
          message: "User is already logged in.",
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
  } catch (error) {
    return new Response("Something went wrong :(", {
      status: 500,
    });
  }
}
