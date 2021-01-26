import {Inject, Injectable} from '@angular/core';
import {LOCAL_STORAGE, StorageService} from 'ngx-webstorage-service';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) { }

  public getStorage(key: string): Observable<any> {
    const source = of(this.storage.get(key) || []);
    source.subscribe(projects =>
    { return; });
    return source;
  }

  public setStorage(key: string, newProjects): void {
    this.storage.set(key, newProjects);
  }
}
