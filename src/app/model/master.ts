export class Employee {
    employeeId: number;
    employeeName: string;
    contactNo: string;
    emailId: string;
    deptId: number;
    password: string;
    gender: string;
    role: string;
    createdDate: string;

    constructor(){
        this.employeeId=0;
        this.employeeName='';
        this.contactNo='';
        this.emailId='';
        this.deptId=0;
        this.password='';
        this.gender='';
        this.role='employee';
        this.createdDate='';
    }
  }
  
  export interface ParentDept{
    departmentId:number,
    departmentName:string,
    departmentLogo:string
  }
  export interface ChildDept{
    childDeptId:number,
    parentDeptId:number,
    departmentName:string
  }

  export interface ApiResponse{
    message:string,
    result:boolean,
    data:any
  }

  export interface LeaveType {
    leaveTypeId:number,
    typeName:string
  }

  export interface EarnedLeave{
    earnedLeaveId:number,
    employeeId:number,
    totalEarnedLeaves:number,
    totalSickEarnedLeave:number,
    lastUpdatedDate:string,
    employeeName:string 
  }

  export interface LeaveRequest{
    leaveId:number,
    employeeId:number,
    leaveTypeId:number,
    startDate:string,
    endDate:string,
    status:string,
    reason:string,
    requestDate:string,
    employeeName:string,
    contactNo:string,
    typeName:string
  }