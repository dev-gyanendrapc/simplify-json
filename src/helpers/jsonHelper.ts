import { JSONObject } from "../types/commonTypes";
// validate json
function isJSON(input: any): boolean {
    debugger
    try {
        JSON.parse(input);
        return true;
    } catch (error) {
        return false;
    }
}
// get json property count
function getCountOfJsonPropertyValues(jsonObject: JSONObject): number {
    return jsonObject.length;
}
export { getCountOfJsonPropertyValues, isJSON };