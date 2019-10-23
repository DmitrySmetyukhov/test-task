import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GithubSearchComponent} from './github-search/github-search.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';
import {SearchPanelComponent} from './github-search/search-panel/search-panel.component';
import {ResultsTableComponent} from './github-search/results-table/results-table.component';
import {GithubApiService} from './providers/github.api.service';
import {PaginationModule} from 'ngx-bootstrap';
import {ErrorInterceptor} from '../shared/interceptors/error-interceptor';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    PaginationModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-top-left',
      timeOut: 5000
    }),
  ],
  exports: [
    GithubSearchComponent
  ],
  declarations: [SearchPanelComponent, GithubSearchComponent, ResultsTableComponent],
  providers: [
    GithubApiService,
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
  ]
})
export class GithubModule {
}
