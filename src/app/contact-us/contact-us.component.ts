import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {
  //Form variables
  registerForm:any = FormGroup;
  submitted = false;
  constructor( private formBuilder: FormBuilder){}
  //Add user form actions
  get f() { return this.registerForm.controls; }
  onSubmit() {
    
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }
    //True if all the fields are filled
    if(this.submitted)
    {
      alert("Great!!");
    }
   
  }
    ngOnInit() {
      //Add form validations
       this.registerForm = this.formBuilder.group({
         fname: ['', [Validators.required]],
        lname: ['', [Validators.required]],
        email: ['', [Validators.required]],
        phone: ['', [Validators.required]],
        date: ['', [Validators.required]],
        message: ['', [Validators.required]],
        
        });
    }
}
