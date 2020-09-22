export function log(obj: any) {
  const variableName = Object.keys(obj)[0];
  return [variableName, obj[variableName]]
}

export function snapshot(obj: any) {
  return JSON.parse(JSON.stringify(obj));
}
