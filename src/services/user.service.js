import http from "axios-config";
import authHeader from "services/auth-header";

export function getUserInfo() {
  return http.get("/users/info", { headers: authHeader() });
}
