import {Injectable} from '@angular/core';
import {AppConstants} from '../app-constants';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  prefix = AppConstants.LOCAL_STORAGE_PREFIX;

  put(key: string, value: any): void {
    localStorage.setItem(this.prefix + key, value);
  }

  get(key: string): any {
    return localStorage.getItem(this.prefix + key);
  }

  remove(key: string): void {
    localStorage.removeItem(this.prefix + key);
  }
}
