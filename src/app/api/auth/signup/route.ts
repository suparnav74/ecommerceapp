import { lucia } from "@/lib/auth";
import db from "@/lib/db";
import { generateIdFromEntropySize } from "lucia";
import { SA_User } from '@/lib/schema';
import type { ResultSetHeader, RowDataPacket } from 'mysql2';
import { redirect } from 'next/navigation'
import bcrypt from "bcrypt";

interface SA_UserDB extends SA_User, RowDataPacket { }

export async function POST(request: Request) {

    try{
    
    const { name, email ,password} = await request.json()
        
    const [rows] = await db.query<SA_UserDB[]>("SELECT * FROM users WHERE email = ?", [email]);
    
    if (Array.isArray(rows)) { 
        if(rows.length > 0){
        console.log("User exists with email:", email);
        return new Response("User already exists!", { status: 409 });
        }}
  
      // Generate a unique user ID
      const userId = generateIdFromEntropySize(10);

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(password,salt);
  
      // Insert new user into the database
      await db.query(
        "INSERT INTO users (id, name, email, password, role, created) VALUES (?, ?, ?, ?, ?, NOW())",
        [userId, name, email, secPass,"user"]
      );

      console.log("User created successfully:", { userId, name, email }); 
      return new Response("User created successfully!", { status: 201 });
    } catch (error) {
      console.error("Error in signup:", error);
      return new Response("Internal Server Error", { status: 500 });
    }
}