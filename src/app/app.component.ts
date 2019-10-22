import {Component, OnInit} from '@angular/core';
import {GithubApiService} from './github/providers/github.api.service';
import {map} from 'rxjs/operators';
import {RepositoryItem} from './github/models/interfaces';

// enum SearchVariants {
//   byLang = 1,
//   byTopic
// }
//
// interface SearchItem {
//   id: SearchVariants;
//   name: string;
// }
//
// interface RepositoryItem {
//   id: number;
//   fullName: string;
//   language: string;
//   description: string;
//   url: string;
//   checked: boolean;
// }

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  // public searchItems: SearchItem[] = [
  //   {id: SearchVariants.byLang, name: 'By language'},
  //   {id: SearchVariants.byTopic, name: 'By topic'}
  // ];

  // public RepositoryItems: RepositoryItem[] = [];

  // constructor(private githubApi: GithubApiService) {
  //
  // }

  ngOnInit() {
    // this.githubApi.findByLanguage('ruby', 10, 10)
    //   .pipe(map((response: any) => this.convertItems(response.items)))
    //   .subscribe(convertedResults => {
    //     console.log(convertedResults, 'res');
    //     this.RepositoryItems = convertedResults;
    //   });
  }

  // private convertItems = (results: any[]): RepositoryItem[] => {
  //   return results.map(item => {
  //     return {
  //       id: item.id,
  //       fullName: item.full_name,
  //       language: item.language,
  //       description: item.description,
  //       url: item.html_url,
  //       checked: false
  //     };
  //   });
  // }
}
