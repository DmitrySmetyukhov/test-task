import {Component, OnInit} from '@angular/core';
import {SearchPanelDto, RepositoryItem, SearchVariants} from '../models/interfaces';
import {GithubApiService} from '../providers/github.api.service';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-github-search',
  templateUrl: './github-search.component.html',
  styleUrls: ['./github-search.component.scss']
})
export class GithubSearchComponent implements OnInit {
  public repositoryItems: RepositoryItem[] = [];
  public total = 0;
  private limit = 10;
  private page = 1;
  private searchState: SearchPanelDto;
  private availableResultsNumber = 1000;  // "Only the first 1000 search results are available", "documentation_url": "https://developer.github.com/v3/search/"
  private selectedItems: RepositoryItem[] = [];

  constructor(private githubApi: GithubApiService) {

  }

  ngOnInit() {
  }

  public search(searchState: SearchPanelDto) {
    if (this.searchState && this.searchState.variant !== searchState.variant) {
      this.page = 0;
      this.repositoryItems = [];
    }

    this.searchState = searchState;
    switch (searchState.variant) {
      case SearchVariants.byLang: {
        this.findByLanguage(searchState.query, this.limit, this.page);
        break;
      }
      case SearchVariants.byTopic: {
        this.findByTopic(searchState.query, this.limit, this.page);
        break;
      }
      default:
        return;
    }
  }

  public onPagination(page: number) {
    this.page = page;
    this.search(this.searchState);
  }

  public onItemCheckBoxCheck(item: RepositoryItem) {
    if (item.checked) {
      return this.selectedItems.push(item);
    }

    this.selectedItems = this.selectedItems.filter(i => i.id !== item.id);
  }


  private findByLanguage(language: string, limit: number, page: number) {
    this.responseObserver(this.githubApi.findByLanguage(language, limit, page));
  }

  private findByTopic(language: string, limit: number, page: number) {
    this.responseObserver(this.githubApi.findByTopic(language, limit, page));
  }


  // *** response processing block

  private convertItems = (results: any[]): RepositoryItem[] => {
    return results.map(item => {
      return {
        id: item.id,
        fullName: item.full_name,
        language: item.language,
        description: item.description,
        url: item.html_url,
        checked: false
      };
    });
  };

  private getTotal(response: any) {
    if (response.total_count > this.availableResultsNumber) {
      return this.availableResultsNumber;
    }

    return response.total_count;
  }

  private responseObserver(resp: Observable<any>) {
    resp
      .pipe(map((response: any) => {
        this.total = this.getTotal(response);
        return response;
      }))
      .subscribe((response: any) => {
        this.repositoryItems = this.convertItems(response.items);
      });
  }

  // *** end response processing block
}
