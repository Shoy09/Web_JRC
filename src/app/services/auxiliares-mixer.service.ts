import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { AuxiliaresMixer } from '../models/auxiliares-mixer.model';

@Injectable({
  providedIn: 'root'
})
export class AuxiliaresMixerService {

  private readonly endpoint = 'auxiliares-mixer';

  constructor(private apiService: ApiService) {}

  getAll(): Observable<AuxiliaresMixer[]> {
    return this.apiService.getDatos(this.endpoint);
  }
}
