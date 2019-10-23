import {Component, OnInit} from '@angular/core';
import {SearchPanelDto, RepositoryItem, SearchVariants, GithubModuleState} from '../models/interfaces';
import {GithubApiService} from '../providers/github.api.service';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {GithubStoreService} from '../services/github-store.service';
import {AppConstants} from '../../shared/app-constants';

@Component({
  selector: 'app-github-search',
  templateUrl: './github-search.component.html',
  styleUrls: ['./github-search.component.scss']
})
export class GithubSearchComponent implements OnInit {
  public repositoryItems: RepositoryItem[] = [];
  public total = 0;
  public searchState: SearchPanelDto;
  public limit = AppConstants.GIT_SEARCH_LIMIT;
  public page = 1;
  private availableResultsNumber = AppConstants.GIT_AVAILABLE_RESULTS_NUMBER;  // "Only the first 1000 search results are available", "documentation_url": "https://developer.github.com/v3/search/"
  private selectedItems: RepositoryItem[] = [];
  private initializationComplete: boolean;
  private state: GithubModuleState = <GithubModuleState>{};

  constructor(
    private githubApi: GithubApiService, private toastr: ToastrService,
    private store: GithubStoreService
  ) {

  }

  ngOnInit() {
    this.restoreState();
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
    if (!this.initializationComplete) {
      return;
    }
    this.page = page;
    this.search(this.searchState);
  }

  public onItemCheckBoxCheck(item: RepositoryItem) {
    if (item.checked) {
      this.selectedItems.push(item);
    } else {
      this.selectedItems = this.selectedItems.filter(i => i.id !== item.id);
    }

    this.state.selectedItems = this.selectedItems;
    this.store.setState(this.state);
  }


  private findByLanguage(language: string, limit: number, page: number) {
    this.responseObserver(this.githubApi.findByLanguage(language, limit, page));
  }

  private findByTopic(language: string, limit: number, page: number) {
    this.responseObserver(this.githubApi.findByTopic(language, limit, page));
  }


  // *** response processing block

  private convertItems = (results: any[]): RepositoryItem[] => {
    const convertedResults = results.map(item => {
      return {
        id: item.id,
        fullName: item.full_name,
        language: item.language,
        description: item.description,
        url: item.html_url,
        checked: false
      };
    });

    convertedResults.forEach(item => {
      const selectedItem = this.selectedItems.find(i => i.id === item.id);
      if (selectedItem) {
        item.checked = selectedItem.checked;
      }
    });

    return convertedResults;
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
        this.toastr.success(AppConstants.GIT_SUCCESS_MESSAGE);

        this.state = {
          page: this.page,
          total: this.total,
          searchState: this.searchState,
          repositoryItems: this.repositoryItems,
          selectedItems: this.selectedItems
        };

        this.store.setState(this.state);
      });
  }

  // *** end response processing block

  private restoreState() {
    const state = this.store.getState();
    if (state) {
      this.state = state;
      this.page = state.page;
      this.total = state.total;
      this.searchState = state.searchState;
      this.repositoryItems = state.repositoryItems;
      this.selectedItems = state.selectedItems || [];
    } else {
      this.state.selectedItems = this.selectedItems;
    }

    setTimeout(() => {
      this.initializationComplete = true;
    });
  }
}
