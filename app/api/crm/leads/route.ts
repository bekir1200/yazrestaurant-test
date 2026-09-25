import { nextId, readAdminStore, writeAdminStore } from "../../../../lib/local-admin-store";
import { requestHasAdminSession } from "../../../../lib/admin-auth";

export async function GET(request:Request) {
  if(!requestHasAdminSession(request))return Response.json({error:"Unauthorised"},{status:401});
  const store=await readAdminStore();return Response.json({leads:[...store.leads].sort((a,b)=>b.createdAt.localeCompare(a.createdAt)).slice(0,100)});
}

export async function POST(request: Request) {
  const body = await request.json() as Record<string, string>;
  const name = body.name?.trim(); const email = body.email?.trim().toLowerCase(); const eventType = body.eventType?.trim();
  if (!name || !email || !eventType || name.length > 120 || email.length > 254) return Response.json({ error: "Invalid enquiry" }, { status: 400 });
  const marketingConsent = body.marketingConsent === "yes";
  const retentionUntil = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
  const store=await readAdminStore(),now=new Date().toISOString();store.leads.push({id:nextId(store.leads),name,email,phone:body.phone?.trim().slice(0,40)??"",eventType,eventDate:body.eventDate??"",guests:body.guests?Math.min(200,Math.max(1,Number(body.guests))):null,message:body.message?.trim().slice(0,1500)??"",status:"new",marketingConsent,processingRestricted:false,retentionUntil,createdAt:now,updatedAt:now});await writeAdminStore(store);
  return Response.json({ ok: true }, { status: 201 });
}
