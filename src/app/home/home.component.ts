import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit{
    constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {}

    ngOnInit () {
        this.http.get("https://api.github.com/user/repos",
        {headers: {
            authorization: 'token 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'
        }}).subscribe(x => console.log(x))
    }
}