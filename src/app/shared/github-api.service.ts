import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})

export class GithubApiService {

  apiURL = 'https://api.github.com'

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // add github token
      authorization: 'token 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'
    }),
  };

  constructor(private http: HttpClient) { }

  getUserRepos(): Observable<Repository> {
    return this.http.get<Repository>(
      this.apiURL + '/user/repos?per_page=60',
      this.httpOptions
    ).pipe(retry(1), catchError(this.handleError))
  }

  getUserFollowers(): Observable<User[]> {
    return this.http.get<User[]>(
      this.apiURL + '/user/followers',
      this.httpOptions
    ).pipe(retry(1), catchError(this.handleError))
  }

  getUserFollows(): Observable<User[]> {
    return this.http.get<User[]>(
      this.apiURL + '/user/following',
      this.httpOptions
    ).pipe(retry(1), catchError(this.handleError))
  }

  getUser(): Observable<Repository> {
    return this.http.get<Repository>(
      this.apiURL + '/user',
      this.httpOptions
    ).pipe(retry(1), catchError(this.handleError))
  }

  createRepo(name: string): Observable<Repository> {
    return this.http.post<Repository>(
      this.apiURL + '/user/repos',
      {
        name,
      },
      this.httpOptions,
    ).pipe(retry(1), catchError(this.handleError))
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
