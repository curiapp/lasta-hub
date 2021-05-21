export class FacultyStructure {
    name: string;
    departments: string[];
    constructor(facultyName: string, departmentList: string[]) {
        this.name = facultyName;
        this.departments = departmentList;
    }
}
