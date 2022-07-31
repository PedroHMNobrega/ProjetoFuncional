import { Component, Input, OnInit } from '@angular/core';
import { GithubApiService } from '../shared/github-api.service';
import { groupBy } from '../shared/utils';
import { userData } from '../user-profile/user-profile.data';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.scss']
})
export class FollowersComponent implements OnInit {
  grouped: Record<string, User[]> = {};
  followers: any;
  @Input('isGetFollowers') isGetFollowers = true;

  constructor(private githubApi: GithubApiService) {}

  userInitialLetter({ login }: User) {
    if (!login) {
      return null
    }
    return login.charAt(0).toUpperCase()
  }

  ngOnInit(): void {
    if (this.isGetFollowers) {
      this.githubApi.getUserFollowers().subscribe(data => {
        this.grouped = groupBy(data, this.userInitialLetter)
        this.followers = data
        console.log(this.grouped)
      })
    } else {
      this.githubApi.getUserFollows().subscribe(data => {
        this.grouped = groupBy(data, this.userInitialLetter)
        this.followers = data
      })
    }
  }

}
