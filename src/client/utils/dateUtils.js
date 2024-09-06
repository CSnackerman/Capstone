export function getDateTimeString(when = new Date()) {
  const options = {
    timeZone: 'America/Chicago',
    hour12: true,
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: undefined,
    timeZoneName: undefined,
  };

  return new Date(when).toLocaleString('en-US', options);
}
