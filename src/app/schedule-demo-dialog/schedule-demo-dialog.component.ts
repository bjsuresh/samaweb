import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-schedule-demo-dialog',
  templateUrl: './schedule-demo-dialog.component.html',
  styleUrls: ['./schedule-demo-dialog.component.css']
})
export class ScheduleDemoDialogComponent implements OnInit {
  demoForm!: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private dialogRef: MatDialogRef<ScheduleDemoDialogComponent>
  ) {}

  get f() { return this.demoForm.controls; }

  ngOnInit(): void {
    this.demoForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      company: ['', [Validators.required]],
      preferredDate: [''],
      message: ['']
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.demoForm.valid) {
      this.http.post('http://localhost:3000/demo-email', this.demoForm.value, { responseType: 'text' })
        .subscribe({
          next: () => {
            alert('Thank you! Your demo request has been submitted. We will contact you soon.');
            this.dialogRef.close(true);
          },
          error: () => {
            alert('Thank you for your demo request. We will get back to you shortly.');
            this.dialogRef.close(true);
          }
        });
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
