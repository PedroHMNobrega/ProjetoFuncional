import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { GithubApiService } from '../shared/github-api.service';
import { orderBy as utilsOrderBy, compose, distinct, fold } from '../shared/utils';

@Component({
    selector: 'app-home',
    templateUrl: './pulls.component.html',
    styleUrls: ['./pulls.component.scss']
})

export class PullsComponent implements OnInit{
    pullRequests: PullRequest[];
    filteredPullRequests: PullRequest[];
    user: string
    repo: string

    constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, private githubApi: GithubApiService) {
        this.pullRequests = []
        this.filteredPullRequests = []
        this.user = route.snapshot.params['user'];
        this.repo = route.snapshot.params['repository'];
    }

    ngOnInit () {
        this.githubApi.getPullRequests(this.user, this.repo).subscribe((data: PullRequest[]) => {
            this.pullRequests = data
            this.filteredPullRequests = data
        })
    }

    getDistinctUsers() {
        const users = fold((init: User[], element: PullRequest) => {
            init.push(element.user);
            return init;
        }, [], this.filteredPullRequests);

        const distinctUsers = distinct(users, 'login');

        return distinctUsers.length;
    }

    isOpen(pulls: PullRequest[], open: boolean | string | null) {
        if (open == null || open === '') {
            return pulls
        }
        return pulls.filter((pull: PullRequest) => {
            if(pull.state == "open") {
                return open;
            } else {
                return !open;
            }
        })
    }

    isLocked(pulls: PullRequest[], locked: boolean | string | null) {
        if (locked == null || locked === '') {
            return pulls
        }
        return pulls.filter((pull: PullRequest) => {
            if(pull.locked) {
                return locked;
            } else {
                return !locked;
            }
        })
    }

    search(pulls: PullRequest[], text: string) {
        return pulls.filter((pull: PullRequest) => pull.title.toLowerCase().includes(text.toLowerCase()));
    }

    composeFilters(...fns : any[]) {
        return (...args: any[]) => {
            return (prs: PullRequest[]) => {
                return fns.reduceRight((currentFilteredRepos, currentFilterFunction, currentIndex) => {
                    return currentFilterFunction(currentFilteredRepos, args[currentIndex])
                }, prs)
            }
        }
    }

    handleFilters(filters: any) {
        const {isOpen, isLocked, search: searchText, orderBy} = filters
        const filtered = this.composeFilters(
          this.search,
          this.isOpen,
          this.isLocked
        )(searchText, isOpen, isLocked)(this.pullRequests);

        this.filteredPullRequests =
          orderBy ?
          utilsOrderBy(filtered, orderBy)
          : filtered
    }
}
