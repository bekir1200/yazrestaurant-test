import { AdminConsole } from "./AdminConsole";
import { AdminLogin } from "./AdminLogin";
import { readAdminStore } from "../../lib/local-admin-store";
import { hasAdminSession } from "../../lib/admin-auth";
export const dynamic="force-dynamic";
export const metadata={title:"Yaz Control",robots:{index:false,follow:false,nocache:true}};
export default async function AdminPage(){if(!await hasAdminSession())return <AdminLogin/>;const store=await readAdminStore();return <AdminConsole initialRecords={store.records} initialIntegrations={store.integrations.map(({secretEncrypted:_,...item})=>item)} initialLeads={[...store.leads].sort((a,b)=>b.createdAt.localeCompare(a.createdAt)).slice(0,100)}/>}
