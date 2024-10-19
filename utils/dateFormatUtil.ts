export const dateFormat = (isoTimestamp: Date) => {
  // Create a Date object from the ISO timestamp
  const date = new Date(isoTimestamp);

  // Extract the components
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = date.getUTCFullYear();

  // Format the date and time
  const formattedTime = `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
  return formattedTime;
};
