import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse, EarnedLeave, Employee, LeaveRequest } from '../model/master';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  apiUrl: string = 'https://projectapi.gerasim.in/api/EmployeeManagement/';
  loggedUserData:any;
  constructor(private http:HttpClient) { 
    const localData=localStorage.getItem('leaveUser');
    if(localData){
      this.loggedUserData=JSON.parse(localData);
    }
  }

  getDepartment():Observable<ApiResponse>{
    return this.http.get<ApiResponse> (this.apiUrl+"GetParentDepartment");
  }
  getChildDeptIdByParentId(id:string):Observable<ApiResponse>{
    return this.http.get<ApiResponse>(this.apiUrl+"GetChildDepartmentByParentId?deptId="+id);
  }

  createNewEmployee(obj:Employee):Observable<Employee>{
    return this.http.post<Employee>(`${this.apiUrl}CreateEmployee`,obj)
  }

  GetAllEmployee():Observable<Employee[]>{
   return  this.http.get<Employee[]>(this.apiUrl + "GetAllEmployees");
  }

  GetAllChildDept():Observable<ApiResponse>{
    return this.http.get<ApiResponse>(this.apiUrl+"GetAllChildDepartment")
  }

  deleteEmp(id:number):Observable<Employee[]>{
    return this.http.delete<Employee[]>(this.apiUrl+"DeleteEmployee/"+id);
  }

  updateEmp(emp:Employee):Observable<ApiResponse>{
    return this.http.put<ApiResponse>(this.apiUrl+"UpdateEmployee/"+emp.employeeId,emp);
  }
  addEarnedLeave(emp:EarnedLeave):Observable<ApiResponse>{
    return this.http.post<ApiResponse>(this.apiUrl +"AddNewEarnedLeave",emp)
  }

  GetAllEarnedLeaves():Observable<ApiResponse>{
    return this.http.get<ApiResponse>(this.apiUrl +"GetAllEarnedLeaves")
  }
  getLeaveType():Observable<ApiResponse>{
    return this.http.get<ApiResponse>(this.apiUrl +"GetLeaveTypes")
  }
  newRequest(emp:EarnedLeave):Observable<ApiResponse>{
    return this.http.post<ApiResponse>(this.apiUrl +"CreateNewLeaveRequest",emp)
  }
  GetAllLeaveRequestByEmpId(id:number):Observable<ApiResponse>{
    return this.http.get<ApiResponse>(this.apiUrl +"GetAllLeaveRequestByEmpId?id="+id)
  }
  GetAllLeaveRequest():Observable<ApiResponse>{
    return this.http.get<ApiResponse>(this.apiUrl +"GetAllLeaveRequest")
  }
  changeLeaveReq(leaveId:number,status:string):Observable<ApiResponse>{
    return this.http.get<ApiResponse>(this.apiUrl+"ChangeLeaveStatus?leaveId="+leaveId+"&status"+status)
  }
}
  