import http from "axios-config";
import authHeader from "services/auth-header";

export function getStudentGrades(assignmentId, classId) {
    return http.get(`/grades/${assignmentId}/studentGrades?classID=${classId}`,{ 
        headers: authHeader(),
        
     });
}

export function updateStudentGrades(assignmentId, values, classId) {
    console.log(values)
    return http.put(`/grades/${assignmentId}/studentGrades?classID=${classId}`, values, {
        headers: authHeader(),
    });
}