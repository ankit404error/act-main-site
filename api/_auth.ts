export function getAdminTokenFromHeader(authHeader: string | undefined): string {
  const auth = authHeader || '';
  return auth.startsWith('Bearer ') ? auth.slice(7) : '';
}

export function isAuthorizedAdmin(authHeader: string | undefined): boolean {
  return getAdminTokenFromHeader(authHeader) === 'admin-token';
}
