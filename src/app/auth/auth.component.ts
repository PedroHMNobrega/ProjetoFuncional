import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router } from "@angular/router";
import { __values } from "tslib";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss']
})

export class AuthComponent implements OnInit {
    constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {}

    accessToken: any;

    public authenticate() {}

    ngOnInit() {
        console.log("oi")
        const a = this.http.get("https://api.github.com/zen",
        {headers: {'content-type': 'application/json',
                   responseType: 'application/json',
                   'Access-Control-Allow-Origin': '*'
                }}).subscribe(x => console.log(x))
    }
}