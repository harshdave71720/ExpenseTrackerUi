import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from "@angular/router";
import { SecurityService } from "src/app/services/security.service";

@Component({
  selector : "app-login",
  templateUrl : "./login.component.html"
})
export class LoginComponent implements OnInit {

  loginSelected : boolean = true;
  loginForm : FormGroup;
  registerForm : FormGroup;

  constructor(private securityService : SecurityService,private router : Router, private activatedRoute : ActivatedRoute) {
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
    console.log(this.loginForm.value);
    this.securityService.login(values.email, values.password).subscribe(u => {
      if(u)
      {
        let returnUrl = this.activatedRoute.snapshot.queryParamMap.get('returnUrl');
        if(returnUrl)
          this.router.navigate([returnUrl]);
        else
          this.router.navigate(['']);
      }


    });
  }

  RegisterClicked() : void {
    if(!this.registerForm.valid)
      return;

    let values = this.registerForm.value;
    console.log(values);
    this.securityService.register(this.registerForm.value).subscribe(u => {
      if(u)
      {
        let returnUrl = this.activatedRoute.snapshot.queryParamMap.get('returnUrl');
        if(returnUrl)
          this.router.navigate([returnUrl]);
        else
          this.router.navigate(['']);
      }
    });
  }
}
