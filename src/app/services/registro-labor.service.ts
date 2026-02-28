// services/registro-labor.service.ts

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { RegistroLabor } from '../models/registro-labor.model';

@Injectable({
  providedIn: 'root'
})
export class RegistroLaborService {

  private readonly endpoint = 'registro-labor';

  constructor(private apiService: ApiService) {}

  // =========================
  // ====== GET BASE =========
  // =========================

  getAll(): Observable<RegistroLabor[]> {
    return this.apiService.getDatos(this.endpoint);
  }

  // =========================
  // ====== GET POR ETAPA ====
  // =========================

  getPorEtapa(etapa: number): Observable<RegistroLabor[]> {
    return this.apiService.getDatos(`${this.endpoint}/etapa/${etapa}`);
  }

  // =========================
  // ====== UPDATE FILTROS ===
  // =========================

  updateFiltro1(id: number, payload: any): Observable<any> {
    return this.apiService.putDatos(`${this.endpoint}/filtro1/${id}`, payload);
  }

  updateFiltro2(id: number, payload: any): Observable<any> {
    return this.apiService.putDatos(`${this.endpoint}/filtro2/${id}`, payload);
  }

  updateFiltro3(id: number, payload: any): Observable<any> {
    return this.apiService.putDatos(`${this.endpoint}/filtro3/${id}`, payload);
  }
}