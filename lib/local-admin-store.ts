import { createCipheriv, createDecipheriv, createHash, randomBytes } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { menuSections } from "./menu-data";

export type SiteRecord = { id:number; type:string; title:string; subtitle:string; body:string; metadata:string; position:number; active:boolean; createdAt:string; updatedAt:string };
export type Integration = { id:number; provider:string; label:string; baseUrl:string; secretEncrypted:string; secretHint:string; enabled:boolean; createdAt:string; updatedAt:string };
export type CrmLead = { id:number; name:string; email:string; phone:string; eventType:string; eventDate:string; guests:number|null; message:string; status:string; marketingConsent:boolean; processingRestricted:boolean; retentionUntil:string; createdAt:string; updatedAt:string };
type Store = { records:SiteRecord[]; integrations:Integration[]; leads:CrmLead[] };

const directory = path.join(process.cwd(), ".data");
const filename = path.join(directory, "admin-data.json");
const empty:Store = { records:[], integrations:[], leads:[] };

function addDefaultMenu(store:Store):Store{
  const names=new Set(store.records.filter((record)=>record.type==="menu").map((record)=>record.title.trim().toLocaleLowerCase("en-GB")));
  let id=store.records.reduce((max,record)=>Math.max(max,record.id),0);
  let position=store.records.filter((record)=>record.type==="menu").reduce((max,record)=>Math.max(max,record.position),-1);
  const now=new Date().toISOString();
  for(const section of menuSections){
    for(const item of section.items){
      const key=item.name.trim().toLocaleLowerCase("en-GB");
      if(names.has(key))continue;
      id+=1;position+=1;names.add(key);
      store.records.push({id,type:"menu",title:item.name,subtitle:item.price,body:item.description||"",metadata:JSON.stringify({category:section.title}),position,active:true,createdAt:now,updatedAt:now});
    }
  }
  return store;
}

export async function readAdminStore():Promise<Store>{
  try { return addDefaultMenu({ ...empty, ...JSON.parse(await readFile(filename, "utf8")) as Store }); }
  catch { return addDefaultMenu(structuredClone(empty)); }
}

export async function writeAdminStore(store:Store){
  await mkdir(directory,{recursive:true});
  await writeFile(filename,JSON.stringify(store,null,2)+"\n","utf8");
}

export function nextId(items:{id:number}[]){ return items.reduce((max,item)=>Math.max(max,item.id),0)+1; }

export function encryptIntegrationSecret(value:string){
  const key=createHash("sha256").update(process.env.ADMIN_PASSWORD||"local-yaz-admin").digest();
  const iv=randomBytes(12);const cipher=createCipheriv("aes-256-gcm",key,iv);
  const encrypted=Buffer.concat([cipher.update(value,"utf8"),cipher.final()]);
  return `${iv.toString("base64")}.${cipher.getAuthTag().toString("base64")}.${encrypted.toString("base64")}`;
}

export function decryptIntegrationSecret(value:string){
  try{
    const [iv,tag,encrypted]=value.split(".");
    const key=createHash("sha256").update(process.env.ADMIN_PASSWORD||"local-yaz-admin").digest();
    const decipher=createDecipheriv("aes-256-gcm",key,Buffer.from(iv,"base64"));
    decipher.setAuthTag(Buffer.from(tag,"base64"));
    return Buffer.concat([decipher.update(Buffer.from(encrypted,"base64")),decipher.final()]).toString("utf8");
  }catch{return ""}
}
