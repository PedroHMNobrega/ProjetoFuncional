import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})

export class GithubApiService {

  apiURL = 'https://api.github.com'
  token = ''

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      authorization: `token ${this.token}`
    }),
  };

  constructor(private http: HttpClient) { }

  getPullRequests(user: string, repo: string): Observable<PullRequest[]> {
    return this.http.get<PullRequest[]>(
      this.apiURL + `/repos/${user}/${repo}/pulls?state=all`,
      this.httpOptions
    ).pipe(retry(1), catchError(this.handleError))
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else if (error.error.message === 'Bad credentials') {
      errorMessage = `Token inválido`;
    } else {
      errorMessage = `Usuário ou repositório não existe`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
