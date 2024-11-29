import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MasterService } from '../../services/master.service';
import { ApiResponse, EarnedLeave, Employee } from '../../model/master';
import { Observable } from 'rxjs';
import { AsyncPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-earnedleave',
  imports: [ReactiveFormsModule,AsyncPipe,DatePipe],
  templateUrl: './earnedleave.component.html',
  styleUrl: './earnedleave.component.css'
})
export class EarnedleaveComponent implements OnInit {


  form:FormGroup=new FormGroup({});
  masterSrv=inject(MasterService);
  employee$:Observable<Employee[]>=new Observable<Employee[]>();
  earnedLeaves:EarnedLeave[]=[];

  constructor(){
    this.initializeForm();
    this.employee$=this.masterSrv.GetAllEmployee();
  }


  ngOnInit(): void {
    this.getData();
  }

  initializeForm(){
    this.form=new FormGroup({
      earnedLeaveId:new FormControl(0),
      employeeId: new FormControl(0),
      totalEarnedLeave:new FormControl(0),
      lastUpdatedDate:new FormControl(new Date())
    });
  }

  onSave(){
    console.log('Form Submitted:', this.form.value);
    const formValue=this.form.value;
    this.masterSrv.addEarnedLeave(formValue).subscribe((res:ApiResponse)=>{
      if(res.result){
        alert("Leaves modified");
      }else{
        alert(res.message);
      }
    })
  }

  getData(){
    this.masterSrv.GetAllEarnedLeaves().subscribe((res:ApiResponse)=>{
      this.earnedLeaves=res.data;
    })
  }

}
