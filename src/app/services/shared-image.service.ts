import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class SharedImageService {
  private imageUrl = new BehaviorSubject<string>('');

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.create();
    const storedImageUrl = await this.storage.get('profileImage');
    if (storedImageUrl) {
      this.imageUrl.next(storedImageUrl);
    }
  }

  setImageUrl(url: string) {
    this.imageUrl.next(url);
    this.storage.set('profileImage', url);
  }

  clearImageUrl() {
    this.imageUrl.next('');
    this.storage.remove('profileImage');
  }

  getImageUrl() {
    return this.imageUrl.asObservable();
  }
}
