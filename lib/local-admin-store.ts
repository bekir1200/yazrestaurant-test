import { createCipheriv, createDecipheriv, createHash, randomBytes } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

export type SiteRecord = { id:number; type:string; title:string; subtitle:string; body:string; metadata:string; position:number; active:boolean; createdAt:string; updatedAt:string };
export type Integration = { id:number; provider:string; label:string; baseUrl:string; secretEncrypted:string; secretHint:string; enabled:boolean; createdAt:string; updatedAt:string };
export type CrmLead = { id:number; name:string; email:string; phone:string; eventType:string; eventDate:string; guests:number|null; message:string; status:string; marketingConsent:boolean; processingRestricted:boolean; retentionUntil:string; createdAt:string; updatedAt:string };
type Store = { records:SiteRecord[]; integrations:Integration[]; leads:CrmLead[] };

const directory = path.join(process.cwd(), ".data");
const filename = path.join(directory, "admin-data.json");
const empty:Store = { records:[], integrations:[], leads:[] };

export async function readAdminStore():Promise<Store>{
  try { return { ...empty, ...JSON.parse(await readFile(filename, "utf8")) as Store }; }
  catch { return structuredClone(empty); }
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
