import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { createRequestOption } from '../../util/request-util';
import { IUser } from './user.model';
import { Urls } from '../url'

@Injectable({ providedIn: 'root' })
export class UserService {
    private resourceUrl = Urls.users;

    constructor(private http: HttpClient) { }

    create(user: IUser): Observable<HttpResponse<IUser>> {
        return this.http.post<IUser>(this.resourceUrl, user, { observe: 'response' });
    }

    update(user: IUser): Observable<HttpResponse<IUser>> {
        return this.http.put<IUser>(this.resourceUrl, user, { observe: 'response' });
    }

    find(login: string): Observable<HttpResponse<IUser>> {
        return this.http.get<IUser>(`${this.resourceUrl}/${login}`, { observe: 'response' });
    }

    query(req?: any): Observable<HttpResponse<IUser[]>> {
        const options = createRequestOption(req);
        return this.http.get<IUser[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(login: string): Observable<HttpResponse<any>> {
        return this.http.delete(`${this.resourceUrl}/${login}`, { observe: 'response' });
    }

    isRegister(phoneOrEmail: string): Observable<HttpResponse<any>> {
        return this.http.get(`${this.resourceUrl}/isRegister/${phoneOrEmail}`, { observe: 'response' });
    }

    authorities(): Observable<string[]> {
        return this.http.get<string[]>('${this.resourceUrl}/authorities');
    }


    save(keyAndPassword: any): Observable<any> {
        return this.http.post('/api/account/reset-password/finish', keyAndPassword);
    }

    resetPwd(email: string): Observable<any> {
        return this.http.post('/api/account/reset-password/init', email, { observe: 'response' });
    }

    clearCache(): Observable<string[]> {
        return this.http.get<string[]>('/api/clearCache');
    }

}
