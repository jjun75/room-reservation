export class User {
    id: string;
    empNo: string;
    dept: string;
    name: string;
    email: string;
    password: string;

    constructor(){

    }

    getId(): string {
        return this.id;
    }
    setId(id: string) {
        this.id = id;
    }

    getEmpNo(): string {
        return this.empNo;
    }
    setEmpNo(empNo: string) {
        this.empNo = empNo;
    }

    getDept(): string {
        return this.dept;
    }
    setDept(dept: string) {
        this.dept = dept;
    }

    getName(): string {
        return this.name;
    }
    setName(name: string) {
        this.name = name;
    }

    get emailView(): string {
        return this.email;
    }
    getEmail(): string {
        return this.email;
    }
    setEmail(email: string) {
        this.email = email;
    }

    getPassword(): string {
        return this.password;
    }
    setPassword(password: string) {
        this.password = password;
    }
}