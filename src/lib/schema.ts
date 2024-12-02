import { RowDataPacket } from "mysql2";

export interface SA_User {
    id: string;
    username: string;
    email: string;
    password: string;
    role: "admin" | "user";
    created_at?: Date;
}

export interface SA_Session {
    id: string;
    expires_at: Date;
    user_id: string;
    created: Date;
    user_agent: string
    ip: string;
}

