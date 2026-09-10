import { list } from "@vercel/blob";

export type MediaSettings = { heroVideo:string; duetVideo:string; heroImage:string; foodImage:string };
export const defaultMedia:MediaSettings={heroVideo:"/yaz-hero.mp4",duetVideo:"/yaz-duet.mp4",heroImage:"https://static.wixstatic.com/media/16ca1a_b5c3a872574b4054af44f6fab16435a8f000.jpg/v1/fill/w_1800,h_1800,al_c,q_90,enc_avif,quality_auto/16ca1a_b5c3a872574b4054af44f6fab16435a8f000.jpg",foodImage:"https://static.wixstatic.com/media/16ca1a_a7a5fe1e979f40efb026481393cddd56f000.jpg/v1/fill/w_1600,h_1600,al_c,q_90,enc_avif,quality_auto/16ca1a_a7a5fe1e979f40efb026481393cddd56f000.jpg"};
const configPath="site-config/media-settings.json";

export async function getMediaSettings():Promise<MediaSettings>{
 if(!process.env.BLOB_READ_WRITE_TOKEN)return defaultMedia;
 try{const result=await list({prefix:configPath,limit:1});const config=result.blobs.find(blob=>blob.pathname===configPath);if(!config)return defaultMedia;const response=await fetch(`${config.url}?v=${config.uploadedAt.getTime()}`,{cache:"no-store"});if(!response.ok)return defaultMedia;return{...defaultMedia,...await response.json() as Partial<MediaSettings>};}catch{return defaultMedia;}
}
