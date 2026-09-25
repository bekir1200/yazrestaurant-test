import { ADMIN_COOKIE, sessionToken, validPassword } from "../../../../lib/admin-auth";

export async function GET(request:Request) {
  const authenticated=request.headers.get("cookie")?.split(";").some(part=>part.trim()===`${ADMIN_COOKIE}=${sessionToken()}`)??false;
  return Response.json({authenticated});
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({})) as { password?: string };
  if (!validPassword(String(body.password || ""))) return Response.json({ error: "Incorrect password" }, { status: 401 });
  const response = Response.json({ ok: true });
  response.headers.append("Set-Cookie", `${ADMIN_COOKIE}=${sessionToken()}; Path=/; HttpOnly; SameSite=Strict; Max-Age=28800${process.env.NODE_ENV === "production" ? "; Secure" : ""}`);
  return response;
}

export async function DELETE() {
  const response = Response.json({ ok: true });
  response.headers.append("Set-Cookie", `${ADMIN_COOKIE}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0`);
  return response;
}
