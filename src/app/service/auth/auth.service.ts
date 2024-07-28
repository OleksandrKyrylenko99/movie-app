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
import { User } from '../user/user.modal';
import { Account } from '../../interface/account-model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthentication = signal(false);
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
      .pipe(
        map(() => {}),
        catchError((err) => this.handleError(err))
      );
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
          switchMap((sessionId) => this.getAccount(sessionId))
        )
      )
    );
  }
  private createUser(account: Account, sessionId: string) {
    const user = new User(account.id, sessionId, account.username);
    this.user.next(user);
    localStorage.setItem('userDate', JSON.stringify(user));
  }

  public autoAuthenticate() {
    const userData = localStorage.getItem('userDate');
    if (!userData) return;
    const user: {
      name: string;
      _accountId: number;
      _sessionToken: string;
    } = JSON.parse(userData);
    const loadedUser = new User(user._accountId, user._sessionToken, user.name);
    if (loadedUser.token) {
      this.user.next(loadedUser);
    }
  }

  public logOut() {
    this.user.next(null!);
    localStorage.removeItem('userDate');
    this.isAuthentication.set(false);
  }

  private handleError(errorRes: HttpErrorResponse): any {
    throw new Error(errorRes.error.status_message);
  }
}
