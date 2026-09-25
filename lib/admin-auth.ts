import { createHash, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "yaz_admin_session";

function configuredPassword() { return process.env.ADMIN_PASSWORD || ""; }
export function sessionToken() { return createHash("sha256").update(`yaz-control:${configuredPassword()}`).digest("hex"); }
export function validPassword(value: string) {
  const expected = Buffer.from(configuredPassword());
  const supplied = Buffer.from(value);
  return expected.length > 0 && expected.length === supplied.length && timingSafeEqual(expected, supplied);
}
export async function hasAdminSession() { return (await cookies()).get(ADMIN_COOKIE)?.value === sessionToken(); }
export function requestHasAdminSession(request: Request) {
  const cookie = request.headers.get("cookie") || "";
  return cookie.split(";").some((part) => part.trim() === `${ADMIN_COOKIE}=${sessionToken()}`);
}
