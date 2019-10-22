import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GithubApiService {
  private basePath = 'https://api.github.com/search/repositories';

  constructor(private http: HttpClient) {
  }

  public findByLanguage(lang: string, limit: number, page: number) {
    const params = new HttpParams({fromString: `q=language:${lang}&sort=stars&order=desc&per_page=${limit}&page=${page}`});
    return this.http.get(this.basePath, {params: params});
  }

  public findByTopic(topic: string, limit: number, page: number) {
    const params = new HttpParams({fromString: `q=topic:${topic}&sort=stars&order=desc&per_page=${limit}&page=${page}`});
    return this.http.get(this.basePath, {params: params});
  }
}
