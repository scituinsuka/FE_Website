import { v7 as uuid } from "uuid";
import { NextResponse } from "next/server";

export const GET = async () => {
  const user = await new Promise<{ id: string; email: string; name: string; avatarUrl: string | null } | null>((resolve) => {
    setTimeout(() => {
      resolve({ name: "John Doe", avatarUrl: "/avatar.png", email: "test@gmail.com", id: uuid() });
    }, 100);
  });

  return NextResponse.json({ data: user }, { status: 200 });
};
