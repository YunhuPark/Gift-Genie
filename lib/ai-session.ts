let accessToken = '';
export function setAiAccessToken(value: string) { accessToken = value; }
export function aiHeaders(): Record<string, string> {
  return accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
}
