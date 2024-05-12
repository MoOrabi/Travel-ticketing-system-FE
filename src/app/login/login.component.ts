import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '@app/_services/authentication.service';


@Component({ 
    selector: 'app-login',
    templateUrl: './login.component.html' , 
    styleUrls: ['./login.component.css'] 
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });;
    loading = false;
    submitted = false;
    error = '';

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        
        // redirect to home if already logged in
        if (this.authenticationService.userValue) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        console.log("Hi");        
    }

    get username() {
      return this.loginForm.controls.username;
    }

    get password() {
      return this.loginForm.controls.password;
    }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.error = '';
        this.loading = true;
        this.authenticationService.login(this.username, this.password)
            // .pipe(first())
            .subscribe({
                next: (res) => {
                    console.log(res);
                    
                    // get return url from route parameters or default to '/'
                    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
                    this.router.navigate([returnUrl]);
                },
                error: (error) => {
                    console.log(error);
                    
                    this.error = error;
                    this.loading = false;
                }
            });
    }
}