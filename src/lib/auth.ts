import { cookies } from 'next/headers';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

export async function isAdminRequest() {
  const cookieStore = await cookies();
  const userEmail = cookieStore.get('userEmail')?.value;
  return userEmail === ADMIN_EMAIL;
}
