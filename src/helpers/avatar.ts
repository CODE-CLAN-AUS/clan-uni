export function generateAvatarUrl(username: string = 'CODE-CLAN-AUS'): Promise<string> {
  return `https://github.com/${username}.png`;
}