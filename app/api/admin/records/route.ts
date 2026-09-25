import { nextId, readAdminStore, writeAdminStore } from "../../../../lib/local-admin-store";
import { requestHasAdminSession } from "../../../../lib/admin-auth";
const types = ["content", "menu", "event", "review", "footer"];

export async function GET(request:Request) {
  if(!requestHasAdminSession(request))return Response.json({error:"Unauthorised"},{status:401});
  const store=await readAdminStore(); return Response.json({ records: store.records.sort((a,b)=>a.type.localeCompare(b.type)||a.position-b.position||a.id-b.id) });
}

export async function POST(request: Request) {
  if(!requestHasAdminSession(request))return Response.json({error:"Unauthorised"},{status:401});
  const body = await request.json() as Record<string, unknown>;
  const type = String(body.type ?? ""); const title = String(body.title ?? "").trim();
  if (!types.includes(type) || !title || title.length > 180) return Response.json({ error: "Invalid record" }, { status: 400 });
  const store=await readAdminStore(),now=new Date().toISOString();const record={id:nextId(store.records),type,title,subtitle:String(body.subtitle??"").slice(0,300),body:String(body.body??"").slice(0,3000),metadata:JSON.stringify(body.metadata??{}),position:Number(body.position??0),active:body.active!==false,createdAt:now,updatedAt:now};store.records.push(record);await writeAdminStore(store);
  return Response.json({ record }, { status: 201 });
}

export async function PATCH(request: Request) {
  if(!requestHasAdminSession(request))return Response.json({error:"Unauthorised"},{status:401});
  const body = await request.json() as Record<string, unknown>; const id = Number(body.id);
  if (!id) return Response.json({ error: "Invalid id" }, { status: 400 });
  const store=await readAdminStore(),record=store.records.find(item=>item.id===id);if(!record)return Response.json({error:"Record not found"},{status:404});Object.assign(record,{title:String(body.title??"").trim().slice(0,180),subtitle:String(body.subtitle??"").slice(0,300),body:String(body.body??"").slice(0,3000),metadata:JSON.stringify(body.metadata??{}),position:Number(body.position??0),active:body.active!==false,updatedAt:new Date().toISOString()});await writeAdminStore(store);
  return Response.json({ ok: true });
}

export async function DELETE(request: Request) {
  if(!requestHasAdminSession(request))return Response.json({error:"Unauthorised"},{status:401});
  const id = Number(new URL(request.url).searchParams.get("id")); if (!id) return Response.json({ error: "Invalid id" }, { status: 400 });
  const store=await readAdminStore();store.records=store.records.filter(item=>item.id!==id);await writeAdminStore(store);
  return Response.json({ ok: true });
}
