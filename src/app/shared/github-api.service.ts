import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})

export class GithubApiService {

  apiURL = 'https://api.github.com'
  token = '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'
  user = 'NVlabs'
  repo = 'stylegan'

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      authorization: `token ${this.token}`
    }),
  };

  constructor(private http: HttpClient) { }

  getPullRequests(): Observable<PullRequest[]> {
    return this.http.get<PullRequest[]>(
      this.apiURL + `/repos/${this.user}/${this.repo}/pulls?state=all`,
      this.httpOptions
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
