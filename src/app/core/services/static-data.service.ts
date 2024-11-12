import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StaticDataService {
  public readonly USER_TYPE = {
    ADMIN: '0',
    USER: '1',
  };
  public readonly CATEGORY = {
    RENT: 'RENT',
    SALE: 'SALE',
  };


}

