import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


import { Urls } from '../url';

@Injectable({ providedIn: 'root' })
export class LoginService {

    private loginInitUrl = Urls.loginInit;
    private loginUrl=Urls.login;

    constructor(
        private http: HttpClient
    ) { }

    init(aesKeyStr: any): Observable<any> {
        return this.http.post(this.loginInitUrl, aesKeyStr);
    }

    login(loginInfo:any): Observable<any> {
        return this.http.post(this.loginUrl,loginInfo);
    }

}
