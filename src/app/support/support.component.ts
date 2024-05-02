import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxCaptchaService } from '@binssoft/ngx-captcha';


@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent {

  captchaStatus:any = null;
  captchaConfig:any = {
   type: 1, // 1 or 2 or 3 or 4
   length:6,
   cssClass:'custom',
   back: {
     stroke:"#2F9688",
     solid:"#f2efd2"
   } ,
   font:{
    color:"#000000",
    size:"35px"
   }
  }

  employees: any[] = [{
    Ticket_ID: 2404251,
    Title: 'AIMS',
    Description: 'Alarm alerts and sm s email configuration Bugs',
    Priority: 'High',
    Status: 'Open',
    Products: 'AIMS',
    Types:"Alarm Alerts",
    CreatesdBy:"admin",
    UpdatedBy:"suresh",
    CreatedDate: '2024/04/20',
    UpdatedDate: '2024/04/21',
  }, {
    Ticket_ID: 2404252,
    Title: 'Mobile App',
    Description: 'Mobile App support for Ios Devices',
    Priority: 'Medium',
    Status: 'In Processing',
    Products: 'PIMS/UHN/EMS',
    Types:"Mobile App",
    CreatesdBy:"admin",
    UpdatedBy:"suresh",
    CreatedDate: '2024/04/25',
    UpdatedDate: '2024/04/25',
  }, 
  {
    Ticket_ID: 2404253,
    Title: 'ANALYTICS',
    Description: 'Analysis, RCA ans web graphics problem ',
    Priority: 'Low',
    Status: 'Closed',
    Products: 'ANALYTICS',
    Types:"RCA",
    CreatesdBy:"admin",
    UpdatedBy:"suresh",
    CreatedDate: '2024/04/25',
    UpdatedDate: '2024/04/25',
  },
  ]

  products: any[] = [
    'AIMS',
    'PIMS/UHN/EMS',
    'ANALYTICS',
    'DMS',
    'ERP'
  ]
  priorities: any[] = ['High','Medium','Low'];
  status: any[] = ['Open','In Processing','Closed'];
  types: any[] = [
    'Alarm Alerts',
    'RCA',
    'CCTV',
    'DON',
    'Mobile App',
    'Web AE Client',
    'Reporters',
    'Historian',
    'Web Dashboard'
  ];

  constructor(
    private router: Router,
    private captchaService:NgxCaptchaService
    ) { }

  // username: string | undefined;
  // password: string | undefined;

  tag_seletion: any;
  hide = true;
  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  companyname = new FormControl('', [Validators.required]);
  areas = new FormControl('', [Validators.required]);
  loginSubmitted: boolean = false;

  login() {
    // console.log(this.loginForm?.value);
    this.loginSubmitted = true;
  }

  ngOnInit() {
    this.captchaService.captchStatus.subscribe((status)=>{
      this.captchaStatus= status;
      if (status == false) {
        alert("Opps!\nCaptcha mismatch");
      } else  if (status == true) {
        alert("Success!\nYou are right");
      }
    });
}


}
