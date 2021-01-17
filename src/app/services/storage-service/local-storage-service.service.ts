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
    source.subscribe(tasks =>
    { return; });
    return source;
  }
  public setStorage(key: string, newTasks): void {
    this.storage.set(key, newTasks);
  }

}
