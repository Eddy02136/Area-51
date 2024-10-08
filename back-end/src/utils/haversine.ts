export function haversine(myLatitude : number, myLongitude : number, issLatitude : number, issLongitude: number) {
  const R = 6371;
  const dLat = (issLatitude - myLatitude) * Math.PI / 180;
  const dLon = (issLongitude - myLongitude) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(myLatitude * Math.PI / 180) * Math.cos(issLatitude * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}