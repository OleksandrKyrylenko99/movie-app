import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  switchMap,
  tap,
} from 'rxjs';
import { UserData } from '../../types/data-user';
import { Account } from '../../interface/account-model';
import { environment } from '../../../environments/environment';
import { User } from '../../types/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticationSignal = signal(false);
  user = new BehaviorSubject<User | null>(null);
  constructor(private http: HttpClient) {}

  private getRequestToken(): Observable<any> {
    return this.http
      .get<any>(
        `${environment.dbUrl}/authentication/token/new${environment.apiKey}`
      )
      .pipe(
        map((res) => res.request_token),
        catchError((err) => this.handleError(err))
      );
  }

  private validateRequestToken(
    requestToken: string,
    data: UserData
  ): Observable<any> {
    const body = {
      username: data.name,
      password: data.password,
      request_token: requestToken,
    };
    return this.http
      .post<any>(
        `${environment.dbUrl}/authentication/token/validate_with_login${environment.apiKey}`,
        body
      )
      .pipe(catchError((err) => this.handleError(err)));
  }

  private createSession(requestToken: string): Observable<any> {
    const url = `${environment.dbUrl}/authentication/session/new${environment.apiKey}`;
    const body = { request_token: requestToken };
    return this.http.post<any>(url, body).pipe(
      map((response) => response.session_id),
      catchError((err) => this.handleError(err))
    );
  }

  private getAccount(sessionId: string): Observable<any> {
    const url = `${environment.dbUrl}/account${environment.apiKey}&session_id=${sessionId}`;
    return this.http.get<any>(url).pipe(
      tap((response) => this.createUser(response, sessionId)),
      catchError((err) => this.handleError(err))
    );
  }

  public authenticateAndGetAccountId(data: UserData): Observable<number> {
    return this.getRequestToken().pipe(
      switchMap((requestToken) =>
        this.validateRequestToken(requestToken, data).pipe(
          switchMap(() => this.createSession(requestToken)),
          switchMap((sessionToken) => this.getAccount(sessionToken))
        )
      )
    );
  }
  private createUser(account: Account, sessionToken: string) {
    this.setUserData(account, sessionToken);
    const user = this.getUserData();
    this.user.next(user);
    this.isAuthenticationSignal.set(true);
  }

  public autoAuthenticate() {
    const userData = localStorage.getItem('userData');
    if (!userData) return;
    const user: User = JSON.parse(userData);
    this.user.next(user);
    this.isAuthenticationSignal.set(true);
  }
  private setUserData(userData: Account, sessionToken: string) {
    const user = {
      accountId: userData.id,
      sessionToken,
      name: userData.username,
    };
    localStorage.setItem('userData', JSON.stringify(user));
  }
  public getUserData() {
    return JSON.parse(JSON.stringify(localStorage.getItem('userData')));
  }
  public logOut() {
    this.user.next(null!);
    localStorage.removeItem('userData');
    this.isAuthenticationSignal.set(false);
  }

  private handleError(errorRes: HttpErrorResponse): any {
    throw new Error(errorRes.error.status_message);
  }
}
