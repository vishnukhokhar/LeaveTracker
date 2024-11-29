import { ApplicationConfig, Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiResponse, Employee, ParentDept,ChildDept } from '../../model/master';
import { MasterService } from '../../services/master.service';

@Component({
  selector: 'app-employee',
  imports: [FormsModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit {

  employeeObj: Employee=new Employee();
  parentDeptId:string='';
  mastSrv =inject(MasterService);
  parentDeptList: ParentDept[]=[];
  childDeptList:ChildDept[]=[];
  employeeList:Employee[]=[];

  ngOnInit(): void {
    this.loadEmployee();
   this.loadParentDept(); 
  }

  loadParentDept(){

    this.mastSrv.getDepartment().subscribe((res:ApiResponse)=>{
      this.parentDeptList=res.data;
    })
  }
  getAllChild(){
    this.mastSrv.GetAllChildDept().subscribe((res:ApiResponse)=>{
      this.childDeptList=res.data;
    })
  }



  loadEmployee(){
    this.mastSrv.GetAllEmployee().subscribe((res:Employee[])=>{
      this.employeeList=res;
    })
  }

  onDeptChange(){
    this.mastSrv.getChildDeptIdByParentId(this.parentDeptId).subscribe((res:ApiResponse)=>{
      this.childDeptList=res.data;
    })
  }
  onSaveEmployee(){
    this.mastSrv.createNewEmployee(this.employeeObj).subscribe((res:Employee)=>{
      alert("New Employe added sucessfully");
      this.employeeObj=new Employee();
      this.loadEmployee();
    })
  }

onUpdateEmployee(){
  this.mastSrv.updateEmp(this.employeeObj).subscribe((res:ApiResponse)=>{
    alert("Employee updated sucessfully");
    this.employeeObj=new Employee();
    this.loadEmployee();

  })
}
  onDelete(id:number){
    const isDelete=confirm("Are you sure to delete");
    if(isDelete){
      this.mastSrv.deleteEmp(id).subscribe((res:Employee[])=>{
        this.loadEmployee(); 
      })
    }
  }

  onEdit(item:Employee){
    this.employeeObj=item; 
    this.getAllChild(); 
  }

}
