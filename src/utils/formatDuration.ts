export function formatDuration(duration: number): string {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);

  if (hours === 0) {
    return `${minutes}m`;
  }
  return `${hours}h${minutes}m`;
}
