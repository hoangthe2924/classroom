import React from "react";
import ClassList from "../components/Class/ClassList";
import StudentList from "../components/Student/StudentList";
import DashboardContent from "../components/dashboard/DashboardText";
const routes = {
    "/class-list": () => <ClassList />,
    // "/student-list": () => <StudentList />,
    "/dashboard": () => <DashboardContent />
};
export default routes;