import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Profile } from '../state/profile/profile.feature';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private base_url = 'http://localhost:8080/profiles/';

  constructor(private httpClient: HttpClient) {}

  getProfile(id: number) {
    return this.httpClient.get<Profile>(this.base_url + `get/${id}`).pipe(
      catchError((err) => {
        return throwError(() => err);
      })
    );
  }

  updateProfile(profile: any) {
    return this.httpClient.put<Profile>(this.base_url + 'update', profile).pipe(
      catchError((err) => {
        return throwError(() => err);
      })
    );
  }

  getAllProfiles() {
    return this.httpClient
      .get<Profile[]>(this.base_url + 'getAllProfiles')
      .pipe(
        catchError((err) => {
          return throwError(() => err);
        })
      );
  }
}
