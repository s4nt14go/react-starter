export function log(obj: any) {
  const variableName = Object.keys(obj)[0];
  console.log(variableName, obj[variableName]);
}
