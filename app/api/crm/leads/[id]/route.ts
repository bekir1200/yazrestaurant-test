import { readAdminStore, writeAdminStore } from "../../../../../lib/local-admin-store";
import { requestHasAdminSession } from "../../../../../lib/admin-auth";

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  if(!requestHasAdminSession(request))return Response.json({error:"Unauthorised"},{status:401});
  const { id } = await context.params; const leadId = Number(id); const body = await request.json() as { status?: string; restricted?: boolean };
  const allowed = ["new", "contacted", "viewing", "quoted", "booked", "closed"];
  const store=await readAdminStore(),lead=store.leads.find(item=>item.id===leadId);if(!lead)return Response.json({error:"Lead not found"},{status:404});
  if(body.status&&allowed.includes(body.status))lead.status=body.status;if(typeof body.restricted==="boolean")lead.processingRestricted=body.restricted;lead.updatedAt=new Date().toISOString();await writeAdminStore(store);
  return Response.json({ ok: true });
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  if(!requestHasAdminSession(request))return Response.json({error:"Unauthorised"},{status:401});
  const { id } = await context.params; const leadId = Number(id);
  const store=await readAdminStore();store.leads=store.leads.filter(item=>item.id!==leadId);await writeAdminStore(store);
  return Response.json({ ok: true });
}
