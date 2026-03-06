// initialize strapi client
import { strapi  } from '@strapi/client';

const strapiClient = strapi({
  baseURL: process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337/api' ,
  auth: process.env.NEXT_PUBLIC_STRAPI_API_TOKEN || '',
});

export default strapiClient;

