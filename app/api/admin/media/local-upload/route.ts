import { mkdir,writeFile } from "node:fs/promises";
import path from "node:path";
import { requestHasAdminSession } from "../../../../../lib/admin-auth";

export async function POST(request:Request){
  if(process.env.NODE_ENV==="production")return Response.json({error:"Local uploads are disabled"},{status:403});
  if(!requestHasAdminSession(request))return Response.json({error:"Unauthorised"},{status:401});
  const data=await request.formData(),file=data.get("file");if(!(file instanceof File))return Response.json({error:"File is required"},{status:400});
  const allowed=["image/jpeg","image/png","image/webp","image/avif","image/svg+xml","video/mp4","video/webm"];if(!allowed.includes(file.type)||file.size>200*1024*1024)return Response.json({error:"Unsupported file"},{status:400});
  const extension=path.extname(file.name).toLowerCase().replace(/[^.a-z0-9]/g,"");const name=`${Date.now()}-${Math.random().toString(36).slice(2,8)}${extension}`;const dir=path.join(process.cwd(),"public","uploads");await mkdir(dir,{recursive:true});await writeFile(path.join(dir,name),Buffer.from(await file.arrayBuffer()));return Response.json({url:`/uploads/${name}`},{status:201});
}
