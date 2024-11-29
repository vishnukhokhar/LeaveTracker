import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MasterService } from '../../services/master.service';
import { ApiResponse, Employee, LeaveRequest, LeaveType } from '../../model/master';
import { Observable } from 'rxjs';
import { AsyncPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-new-leave',
  imports: [ReactiveFormsModule,AsyncPipe,DatePipe],
  templateUrl: './new-leave.component.html',
  styleUrl: './new-leave.component.css'
})
export class NewLeaveComponent implements OnInit {


  leaveForm:FormGroup=new FormGroup({});
  masterSrv=inject(MasterService);
  leaveTypeList= signal<LeaveType[]>([]);
  requestList:LeaveRequest[]=[];
  employee$:Observable<Employee[]>=new Observable<Employee[]>();

  constructor(){
    this.initializeForm();
    this.employee$=this.masterSrv.GetAllEmployee();
  }

  initializeForm(){
    this.leaveForm=new FormGroup({
      leaveId:new FormControl(0),
      employeeId:new FormControl(this.masterSrv.loggedUserData.employeeId),
      leaveTypeId:new FormControl(0),
      startDate:new FormControl(""),
      endDate:new FormControl(""),
      status:new FormControl("New"),
      reason:new FormControl(""),
      requestDate:new FormControl(new Date()),

    })

    if(this.masterSrv.loggedUserData.role=='Employee'){
      this.leaveForm.controls['employeeId'].disable();    }
  }
  ngOnInit(): void {
    this.getLeaveType();
    this.getGridData();
  }

  getGridData(){
    if(this.masterSrv.loggedUserData.role=='Emloyee'){
      this.getData();
    }
    else{
      this.getAllData();
    }
  }
  getData(){
    this.masterSrv.GetAllLeaveRequestByEmpId(this.masterSrv.loggedUserData.employeeId).subscribe((res:ApiResponse)=>{
      this.requestList=res.data;
    })

  }

  getAllData(){
    this.masterSrv.GetAllLeaveRequest().subscribe((res:ApiResponse)=>{
      this.requestList=res.data;
    })
  }

  getLeaveType(){
    this.masterSrv.getLeaveType().subscribe((Res:ApiResponse)=>{
      this.leaveTypeList.set(Res.data);
    })
  }
  onSave(){
    const formValue=this.leaveForm.getRawValue();
    this.masterSrv.newRequest(formValue).subscribe((res:ApiResponse)=>{
      if(res.result){
        alert("request raised");
        this.getGridData();
      }else{
        alert(res.message);
      }
    })
  }

  ChangeStatus(id:number){
    this.masterSrv.changeLeaveReq(id,'Approved').subscribe((Res:ApiResponse)=>{
      this.leaveTypeList.set(Res.data);
      this.getGridData();
    })

  }
}
