import * as ENV from "env/env";

export function getImageUrl(folderName: string, path: string): string {
  return ENV.API_BASE_URL + "/image/" + folderName + "/" + path;
}
