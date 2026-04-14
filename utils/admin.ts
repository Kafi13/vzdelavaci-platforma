const ADMIN_EMAIL = 'mkaufman@fst.zcu.cz';

export function isAdminEmail(email?: string | null) {
  return email?.toLowerCase() === ADMIN_EMAIL;
}

export { ADMIN_EMAIL };
