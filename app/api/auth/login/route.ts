import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        const upstream = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });


        if (!upstream.ok) {
            return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
        }

        const data = await upstream.json();
        console.log("DATA", data);
        const token = data.token || data.accessToken;

        if (!token) {
            return NextResponse.json({ message: "Token missing in server response" }, { status: 500 });
        }

        const res = NextResponse.json({ ok: true });

        res.cookies.set("access_token", token, {
            httpOnly: false,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24,
        });

        return res;
    } catch {
        return NextResponse.json({ message: "Bad request" }, { status: 400 });
    }
}