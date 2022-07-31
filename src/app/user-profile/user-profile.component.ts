import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GithubApiService } from '../shared/github-api.service';
import { userData } from './user-profile.data';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: any;
  tab: any;
  tabs = [
    {
      name: 'repos',
      description: 'Repositórios'
    },
    {
      name: 'seguidores',
      description: 'Seguidores'
    },
    {
      name: 'seguindo',
      description: 'Seguindo'
    }
  ];

  constructor(private route: ActivatedRoute, private githubApi: GithubApiService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.tab = params['tab'] || "repos";
    });

    this.githubApi.getUser().subscribe(data => {
      this.user = data
    })
    
    console.log(this.tab);
  }

}
