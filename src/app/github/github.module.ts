import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GithubSearchComponent } from './github-search/github-search.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';
import {SearchPanelComponent} from './github-search/search-panel/search-panel.component';
import { ResultsTableComponent } from './github-search/results-table/results-table.component';
import {GithubApiService} from './providers/github.api.service';
import {PaginationModule} from 'ngx-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    PaginationModule.forRoot()
  ],
  exports: [
    GithubSearchComponent
  ],
  declarations: [SearchPanelComponent, GithubSearchComponent, ResultsTableComponent],
  providers: [
    GithubApiService
  ]
})
export class GithubModule { }
