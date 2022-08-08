import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";

interface SelectRepoData {
    user: string,
    repo: string
}

@Component({
    selector: 'app-select-repo',
    templateUrl: './select-repo.component.html',
    styleUrls: ['./select-repo.component.scss']
})

export class SelectRepoComponent {
    constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {}

    selectRepo (data: SelectRepoData) {
        if(data.repo && data.user) {
            this.router.navigate([`/${data.user}/${data.repo}`])
        }
    }
}
