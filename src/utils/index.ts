export function stringifyJSON(json: JSON) {
  try {
    const jsonStr = JSON.stringify(json);
    return jsonStr;
  } catch (error) {
    console.error("Error parsing JSON:", error);
  }
}
