import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { AuthService } from "./auth.service";
import { Router } from "@angular/router";
import { User } from "./user.model";

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit {

    /**
     * @type {FormGroup}
     */
    signUpForm: FormGroup;

    formInvalid:Boolean= false;

    /**
     * Constructor for SignUpComponent class
     * @param authService
     * @param router
     */
    constructor(private authService: AuthService, private router: Router) {}

    /**
     * @name  onSubmit handle signup
     */
    onSubmit() {
        const user = new User(
            this.signUpForm.value.email,
            this.signUpForm.value.password,
            this.signUpForm.value.userName
        );
        if(this.signUpForm.valid){
            this.authService.signup(user)
                .subscribe(
                    //TODO handle response and navigate to sign in  and handle error
                    data => {
                        this.router.navigate(['/', 'signin']);
                    },error => {
                        //this.ErrorService.handleError(error);
                    });
            );
            this.signUpForm.reset();
        }
        else {
            this.formInvalid = true;
        }
    }

    /**
     * @override OnInit lifecycle method
     */
    ngOnInit() {
        this.signUpForm = new FormGroup({
            //TODO add userName, email and password validators here
            email: new FormControl('', Validators.required),
            password: new FormControl('', [Validators.minLength(6), Validators.required]),
            userName: new FormControl('', [Validators.minLength(8), Validators.maxLength(20), Validators.required])
        });
    }
}