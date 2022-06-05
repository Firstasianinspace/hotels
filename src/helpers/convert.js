export const convertMeters = (meters) => {
  if (!Number.isInteger(meters)) return;
  const km = meters / 1000;
  return km.toFixed(1) + "km";
};
