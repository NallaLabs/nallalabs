// The academy is served at its own subdomain. Pages live under app/academy/, and
// next.config.ts rewrites academy.* requests onto them, so in-academy links use root paths
// ("/week/1"). Locally, open http://academy.localhost:3000.
export const ACADEMY_URL = "https://academy.nallalabs.xyz";
export const MAIN_SITE_URL = "https://nallalabs.xyz";
