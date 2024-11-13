export default function formatGameVersion(gameVersion: string) {
  const foramtVersion = `${gameVersion.split('.').slice(0, 2).join('.')}.1`;
  return foramtVersion;
}
