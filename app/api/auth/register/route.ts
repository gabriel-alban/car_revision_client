import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const {email, username, password} = await req.json();

        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/auth/register`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({email, username, password})
        });

        const data = await response.json();

        return NextResponse.json(data, { status: response.status });
    } catch(err) {
        console.log(err);
        return NextResponse.json({message: "Bad request"}, {status:  400});
    }
}