import {Injectable} from '@angular/core';
import {LocalStorageService} from '../../shared/services/local-storage.service';
import {GithubModuleState} from '../models/interfaces';
import {AppConstants} from '../../shared/app-constants';

@Injectable({
  providedIn: 'root'
})
export class GithubStoreService {
  private state: GithubModuleState;

  constructor(private localStorageService: LocalStorageService) {
    this.restoreFromLocalStorage();
  }

  public setState(state: GithubModuleState) {
    this.state = state;
    this.localStorageService.put(AppConstants.GITHUB_MODULE_STATE_PREFIX, JSON.stringify(this.state));
  }

  public getState() {
    return this.state;
  }

  public restoreFromLocalStorage() {
    const state = this.localStorageService.get(AppConstants.GITHUB_MODULE_STATE_PREFIX);

    if (state) {
      this.state = JSON.parse(state);
    }
  }
}
