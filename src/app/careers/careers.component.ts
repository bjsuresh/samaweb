import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-careers',
  templateUrl: './careers.component.html',
  styleUrls: ['./careers.component.css']
})
export class CareersComponent {
  emailForm:any = FormGroup;
  submitted = false;
  constructor( private formBuilder: FormBuilder,private http: HttpClient){}
  //Add user form actions
  get f() { return this.emailForm.controls; }
  onSubmit() {

    this.submitted = true;
    // stop here if form is invalid
    if (this.emailForm.invalid) {
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
      this.emailForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required,Validators.email, this.emailValidator,this.emailDomainValidator]],
      mobile: ['', [Validators.required,this.mobileValidator]],
      message: ['']
      });
    }

    files: File[] = [];

    onFileChange(event: any): void {
      this.files = Array.from(event.target.files);
    }
    emailValidator(control: AbstractControl): ValidationErrors | null {
      const value = control.value;
      if (value && (!value.includes('@'))) {
        return { invalidEmail: true }; // Custom error key
      }
      return null; // No error
    }
    emailDomainValidator(control: AbstractControl): ValidationErrors | null {
      const value = control.value;
      const domainRegex = /^[^\s@]+@[^\s@]+\.(com|in|net|org|edu|gov|tech|dev|club|geeks|community|jp|uk|cn|io)$/; // Ensures email ends with .com, .in, or .net
      if (value && !domainRegex.test(value)) {
        return { invalidDomain: true }; // Custom error key
      }
      return null; // No error
    }
    mobileValidator(control: AbstractControl): ValidationErrors | null {
      const value = control.value;
      const mobileRegex = /^[6-9]\d{9}$/; // Starts with 6-9 and has 10 digits
      if (value && !mobileRegex.test(value)) {
        return { invalidFormat: true }; // Custom error key
      }
      return null; // No error
    }
    submitForm(): void {
      this.submitted = true;
      console.log(this.emailForm.value);

      if(this.emailForm.valid) {
        const formData = new FormData();
        formData.append('email', this.emailForm.get('email')?.value);
        formData.append('name', this.emailForm.get('name')?.value);
        formData.append('mobile', this.emailForm.get('mobile')?.value);
        formData.append('message', this.emailForm.get('message')?.value);
    
        this.files.forEach((file) => formData.append('attachments', file));
    
        // this.http.post('http://localhost:3000/send-email', formData).subscribe((response) => {
        //   console.log('Email sent successfully:', response);
        //   window.location.reload();
        // });
        this.http.post('http://localhost:3000/careers-email', formData, { responseType: 'text' }).subscribe({
          next: (response) => {
            console.log('Email sent successfully:', response);
            window.location.reload();
          },
          error: (error) => {
            console.error('Error sending email:', error);
            window.location.reload();
          },
        });
        
      }
    }
}
