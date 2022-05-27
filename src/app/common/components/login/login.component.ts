import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { AuthenticationService } from "src/app/core/services/authentication.service";

@Component({
  selector : "app-login",
  templateUrl : "./login.component.html"
})
export class LoginComponent implements OnInit {

  loginSelected : boolean = true;
  loginForm : FormGroup;
  registerForm : FormGroup;

  constructor(private authenticationService : AuthenticationService, private activatedRoute : ActivatedRoute) {
  }

  ngOnInit(): void {
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

  loginClicked() : void {
    if(!this.loginForm.valid)
      return;

    let values = this.loginForm.value;
    this.authenticationService.login(values.email, values.password, this.activatedRoute.snapshot.queryParamMap.get('returnUrl'));
  }

  RegisterClicked() : void {
    if(!this.registerForm.valid)
      return;

    this.authenticationService.register(this.registerForm.value, this.activatedRoute.snapshot.queryParamMap.get('returnUrl'));
  }
}
