import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {
  //Form variables
  registerForm:any = FormGroup;
  submitted = false;
  constructor( private formBuilder: FormBuilder,private http: HttpClient,private router: Router){}
  //Add user form actions
  get f() { return this.registerForm.controls; }
  ngOnInit() {
    //Add form validations
     this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required,Validators.email, this.emailValidator]],
      subject: ['', [Validators.required]],
      message: ['', [Validators.required]]
      
      });
  }

  emailValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value && (!value.includes('@') || !value.includes('.com'))) {
      return { invalidEmail: true }; // Custom error key
    }
    return null; // No error
  }
  files: File[] = [];
  
  onFileChange(event: any): void {
    this.files = Array.from(event.target.files);
  }
  
  onSubmit(): void {
    
    this.submitted = true;
    // // stop here if form is invalid
    // if (this.registerForm.invalid) {
    //     return;
    // }
    console.log(this.registerForm.value);
    if(this.registerForm.valid) {
      const formData = new FormData();
      formData.append('email', this.registerForm.get('email')?.value);
      formData.append('name', this.registerForm.get('name')?.value);
      formData.append('message', this.registerForm.get('message')?.value);
      formData.append('subject', this.registerForm.get('subject')?.value);

      this.files.forEach((file) => formData.append('attachments', file));
      this.http.post('http://localhost:3000/contact-email', formData, { responseType: 'text' }).subscribe({
        next: (response) => {
          console.log('Email sent successfully:', response);
          window.location.reload();
        },
        error: (error) => {
          console.error('Error sending email:', error);
          window.location.reload();
        },
      });
      
      // this.http.post('http://localhost:3000/contact-email', formData).subscribe((response) => {
      //   console.log('Email sent successfully:', response);
      //   this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      //     this.router.navigate([this.router.url]);
      //   });
      // });

    }

    // if(this.submitted)
    // {
    //   alert("Great!!");
    // }
   
  }
    
}
