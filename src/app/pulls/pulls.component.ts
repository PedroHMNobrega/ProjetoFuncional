import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { GithubApiService } from '../shared/github-api.service';

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

    forked(repos: Repository[], forked: boolean | string | null) {
        if (forked == null || forked === '') {
            return repos
        }
        return repos.filter((repo: any) => repo.fork == forked)
    }

    hasOpenIssues(repos: Repository[], hasOpenIssues: boolean | string | null) {
        if (hasOpenIssues == null || hasOpenIssues === '') {
            return repos
        }
        return repos.filter((repo: Repository) => (hasOpenIssues && repo.open_issues) || (!hasOpenIssues  && !repo.open_issues))
    }

    compareByAttribute(repoA: Repository, repoB: Repository, attr: keyof Repository, order: 'asc' | 'desc') {
        if (!attr) {
            return 0
        }
        if (order == 'asc') {
            //@ts-ignore
            return repoA[attr]?.toString().toLowerCase() > repoB[attr].toString().toLowerCase() ? 1 : -1
        }
        if (order == 'desc') {
            //@ts-ignore
            return repoA[attr].toString().toLowerCase() > repoB[attr].toString().toLowerCase() ? -1 : 1
        }
        return 0
    }

    search(repos: Repository[], text: string) {
        return repos.filter((repo: Repository) => repo.name.toLowerCase().includes(text.toLowerCase()));
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
        const {isForked, hasOpenIssues, search: searchText, orderBy} = filters

        const filtered = this.composeFilters(
          this.search,
          this.forked,
          this.hasOpenIssues
        )(searchText, isForked, hasOpenIssues)(this.pullRequests);

        this.filteredPullRequests = orderBy ? filtered.sort((repoA:Repository, repoB:Repository) => this.compareByAttribute(repoA, repoB, orderBy.attr, orderBy.order)) : filtered
    }
}
