import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector : "app-login",
  templateUrl : "./login.component.html"
})
export class LoginComponent implements OnInit {

  loginSelected : boolean = true;
  loginForm : FormGroup;
  registerForm : FormGroup;

  constructor() {
    this.loginForm = new FormGroup({
      email : new FormControl('', [Validators.required, Validators.email]),
      password : new FormControl('', [Validators.required])
    });

    this.registerForm = new FormGroup({
      firstname : new FormControl('', [Validators.required]),
      lastname : new FormControl(''),
      email : new FormControl('', [Validators.required, Validators.email]),
      password : new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {

  }

  loginClicked() : void {
    if(!this.loginForm.valid)
      return;

    console.log(this.loginForm.value);
  }

  RegisterClicked() : void {
    if(!this.registerForm.valid)
      return;

    console.log(this.registerForm.value);
  }
}
