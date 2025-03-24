import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class CatsService {
  constructor(private http: HttpClient) {}

  public getCatsService() {
    return this.http.get(
      `https://api.thecatapi.com/v1/breeds?order=ASC;limit=10`,
      {
        headers: {
          'x-api-key': environment.apiKey,
        },
      },
    );
  }

  public getCatImageService(breed_id: string) {
    return this.http.get(`https://api.thecatapi.com/v1/images/search`, {
      headers: {
        'x-api-key': environment.apiKey,
        breed_ids: breed_id,
      },
    });
  }

  public getCatService(breed_id: string) {
    return this.http.get(`https://api.thecatapi.com/v1/breeds/${breed_id}`, {
      headers: {
        'x-api-key': environment.apiKey,
      },
    });
  }
}
