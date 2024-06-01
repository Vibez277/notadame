import db from "@/lib/db";
import { createToken } from "@/lib/jwt";
import User from "@/lib/models/User";
import { NextResponse } from "next/server";

type body = {
  email: string;
  password: string;
};
export async function POST(req: Request, res: NextResponse) {
  await db();
  const body: body = await req.json();
  const user = await User.findOne({ email: body.email });
  if (!user) {
    return NextResponse.json(
      { message: "user does not exist.", success: false },
      { status: 200 }
    );
  }
  const pc = await user.checkPassword(body.password);
  if (!pc) {
    return NextResponse.json(
      { message: "Email or password does not match.", success: false },
      { status: 200 }
    );
  }
  try {
    const token = createToken(user);
    return NextResponse.json(
      { message: "Successful Sign In.", success: true, token,user },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error.", success: false },
      { status: 200 }
    );
  }
}
