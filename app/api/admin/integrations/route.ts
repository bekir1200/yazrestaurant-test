const unavailable=()=>Response.json({error:"Integrations are disabled in the public demonstration"},{status:503});
export const GET=unavailable;
export const POST=unavailable;
export const PATCH=unavailable;
export const DELETE=unavailable;
