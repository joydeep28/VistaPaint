import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs";

import { User } from "./user.model";
import { ErrorService } from "../errors/error.service";

/**
 * @name AuthService handle signup, signIn and logout
 */
@Injectable()
export class AuthService {
    /**
     * Constructor for AuthService class
     * @param http
     * @param errorService
     */
    constructor(private http: Http, private errorService: ErrorService) {}

    /**
     * @name: signup handle signup
     * @param user
     * @returns {any|Promise<R>|Promise<T|ErrorObservable>|Promise<ErrorObservable>|Promise<T>}
     */
    signup(user: User) {
        const body = JSON.stringify(user);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://localhost:3000/user', body, {headers: headers})
            //TODO map response here and handle error
    }

    /**
     * @name signin handle sign in
     * @param user
     * @returns {any|Promise<R>|Promise<T|ErrorObservable>|Promise<ErrorObservable>|Promise<T>}
     */
    signin(user: User) {
        const body = JSON.stringify(user);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://localhost:3000/user/signin', body, {headers: headers})
        .map((response: Response) =>{
            let user = response.json();
            if(user){
                localStorage.setItem('currentUser', JSON.stringify(user));
            }
            return user;
        });
            //TODO map response here and handle error
    }

    /**
     * @name logout clear local storage
     */
    logout() {
        //TODO clear local storage
        localStorage.removeItem('currentUser');
    }

    /**
     * @name isLoggedIn check user login
     * @returns {boolean}
     */
    isLoggedIn(): boolean {
        //TODO check is user looged in and return 
        if(localStorage.getItem('currentUser') && localStorage.getItem('currentUser') !== null){ // TEMP-R
            return true;
            
        }
        return false; // TEMP-R End
    }
}