import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormControl, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppointmentService } from '../appointment.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {

  // doctorIdList:any= ['doo1','d002','d003'];
  // f = new FormGroup({
  //   doctor:new FormControl('',Validators.required)
  // });
  doctorId1:string [];
  selected = null;
  appointmentForm:any;
  appointments:any;
  doctors: any;
  closeResult:any;

  constructor( private fb:FormBuilder,private as:AppointmentService,private http:HttpClient,private modalService:NgbModal) { 
    this.appointmentForm= this.fb.group({
      appointmentId:[''],
      patientId:['',Validators.required],
      testId:['',Validators.required],
      appointmentDate:['',Validators.required],
      timeSlot:['',Validators.required],
      doctorId:['',Validators.required]
      
    });
    this.doctorId1 = [];
   



  }

  get form()
  {
    return this.appointmentForm.controls;
  }

  ngOnInit(): void {
    this.as.getAllAppointment().subscribe((data)=>{
      console.log(data);
      this.appointments=data;
    });
    }
   
  // }

  // getAllAppointment()
  // {
  //   this.as.getAllAppointment().subscribe((data)=>{
  //     console.log(data);
  //     this.appointments=data;
  //   })
  // }
  // getAllDoctors()
  // {
  //   this.as.getAllDoctors().subscribe((data)=>
  //   {
  //     console.log(data);
  //     this.doctors= data;
  //   })
  // }

  appointmentAdd()
  {
    var formData = new FormData();
    formData.append('patientId',this.appointmentForm.controls.patientId.value);
    formData.append('testId',this.appointmentForm.controls.testId.value);
    formData.append('appointmentDate',this.appointmentForm.controls.appointmentDate.value);
    formData.append('timeSlot',this.appointmentForm.controls.timeSlot.value);
    formData.append('doctorId',this.appointmentForm.controls.doctorId.value);

    console.log(formData);
    this.as.addAppointment(formData).subscribe((data)=>{
    console.log(data);
    this.ngOnInit();
      });
      this.modalService.dismissAll();
        
    } 

    appointmentModify()
  {
    var formData = new FormData();
    formData.append('appointmentId',this.appointmentForm.controls.appointmentId.value);
    formData.append('patientId',this.appointmentForm.controls.patientId.value);
    formData.append('doctorId',this.appointmentForm.controls.doctorId.value);
    formData.append('testId',this.appointmentForm.controls.testId.value);
    formData.append('appointmentDate',this.appointmentForm.controls.appointmentDate.value);
    formData.append('timeSlot',this.appointmentForm.controls.timeSlot.value);
   
    console.log(formData);
    this.as.modifyAppointment(formData).subscribe((data:any)=>{
    console.log(data);
    this.ngOnInit();
  });
  this.modalService.dismissAll();
        
    } 

    appointmentDelete()
    {
     
      var appointmentId = this.appointmentForm.controls.appointmentId.value;
      this.as.deleteAppointment(appointmentId).subscribe((data)=>{
        console.log(data);
        this.ngOnInit();
      });
      this.modalService.dismissAll();
    }
    open(content) {
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }
    openEdit(contentEdit) {
      this.modalService.open(contentEdit, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }
  
    private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
      } else {
        return `with: ${reason}`;
      }
    
  }
    
  }


   // console.log('hello world')
    // var appointment = this.appointmentForm.value;
    // console.log(appointment);
    // this.as.addAppointment(appointment).subscribe((data)=>{
    //   console.log(data);


//   fnAdd() {
//     var formData=new FormData();
//     formData.append('billingPrice',this.testReportForm.controls.billingPrice.value);
//        formData.append('result',this.testReportForm.controls.result.value);
//            formData.append('medicalTestId',this.testReportForm.controls.medicalTestId.value);
//                formData.append('technicianId',this.testReportForm.controls.technicianId.value);
//                    formData.append('patientId',this.testReportForm.controls.patientId.value);
// //reaining
//     //var testReport = this.testReportForm.value;
//     console.log(formData);
//     this.ts.addTestReport(formData).subscribe((data:any) => {
//       console.log(data);
//       this.getAlltestReports();
//     });
//   }
