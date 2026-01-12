import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Volquetes } from '../models/volquetes.model';

@Injectable({
  providedIn: 'root'
})
export class VolquetesService {

  private readonly endpoint = 'volquetes';

  constructor(private apiService: ApiService) {}

  getAll(): Observable<Volquetes[]> {
    return this.apiService.getDatos(this.endpoint);
  }
}
