import { put } from "@vercel/blob";
import { mkdir,writeFile } from "node:fs/promises";
import path from "node:path";
import { defaultMedia,getMediaSettings,type MediaSettings } from "../../../../lib/media";
import { requestHasAdminSession } from "../../../../lib/admin-auth";
const slots:(keyof MediaSettings)[]=["logoImage","heroVideo","duetVideo","heroImage","foodImage"];
function authorised(request:Request){return requestHasAdminSession(request)}
export async function GET(request:Request){if(!authorised(request))return Response.json({error:"Incorrect admin password"},{status:401});return Response.json({settings:await getMediaSettings(),storageReady:process.env.NODE_ENV!=="production"||Boolean(process.env.BLOB_READ_WRITE_TOKEN)})}
export async function PUT(request:Request){if(!authorised(request))return Response.json({error:"Incorrect admin password"},{status:401});const input=await request.json() as Partial<MediaSettings>;const settings={...defaultMedia};for(const slot of slots){const value=String(input[slot]??"").trim();if(slot!=="logoImage"&&!value)return Response.json({error:`${slot} is required`},{status:400});if(value&&(value.length>2000||(!value.startsWith("/")&&!/^https:\/\//i.test(value))))return Response.json({error:`Invalid ${slot} URL`},{status:400});settings[slot]=value}if(process.env.BLOB_READ_WRITE_TOKEN)await put("site-config/media-settings.json",JSON.stringify(settings),{access:"public",contentType:"application/json",addRandomSuffix:false,allowOverwrite:true,cacheControlMaxAge:60});else{const dir=path.join(process.cwd(),".data");await mkdir(dir,{recursive:true});await writeFile(path.join(dir,"media-settings.json"),JSON.stringify(settings,null,2)+"\n","utf8")}return Response.json({settings})}
