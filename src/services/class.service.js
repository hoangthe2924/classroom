import http from "axios-config";
import authHeader from "services/auth-header";

export function fetchAllClasses() {
  return http.get("/classes", { headers: authHeader() });
}

export function fetchClassDetail(classId, strQuery) {
  return http.get(`/classes/${classId}` + strQuery, { headers: authHeader() });
}

export function addClass(values) {
  return http.post("/classes/", values, { headers: authHeader() });
}
