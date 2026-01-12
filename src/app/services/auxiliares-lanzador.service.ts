import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import {
  AuxiliaresLanzador
} from '../models/auxiliares-lanzador.model';

@Injectable({
  providedIn: 'root'
})
export class AuxiliaresLanzadorService {

  private readonly endpoint = 'auxiliares-lanzador';

  constructor(private apiService: ApiService) {}

  getAll(): Observable<AuxiliaresLanzador[]> {
    return this.apiService.getDatos(this.endpoint);
  }
}
