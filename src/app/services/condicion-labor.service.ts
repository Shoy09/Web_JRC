import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { CondicionLabor } from '../models/condicion-labor.model';

@Injectable({
  providedIn: 'root'
})
export class CondicionLaborService {

  private baseUrl = 'condiciones-labor';
  private condicionesLaborActualizadas = new BehaviorSubject<boolean>(false);

  constructor(private apiService: ApiService) {}

  getCondicionesLabor(): Observable<CondicionLabor[]> {
    return this.apiService.getDatos(`${this.baseUrl}/`);
  }

  getCondicionLaborById(id: number): Observable<CondicionLabor> {
    return this.apiService.getDatos(`${this.baseUrl}/${id}`);
  }

  createCondicionLabor(condicion: CondicionLabor): Observable<CondicionLabor> {
    return this.apiService.postDatos(`${this.baseUrl}/`, condicion).pipe(
      tap(() => this.condicionesLaborActualizadas.next(true))
    );
  }

  updateCondicionLabor(id: number, condicion: CondicionLabor): Observable<CondicionLabor> {
    return this.apiService.putDatos(`${this.baseUrl}/${id}`, condicion).pipe(
      tap(() => this.condicionesLaborActualizadas.next(true))
    );
  }

  deleteCondicionLabor(id: number): Observable<any> {
    return this.apiService.deleteDatos(`${this.baseUrl}/${id}`).pipe(
      tap(() => this.condicionesLaborActualizadas.next(true))
    );
  }

  getCondicionesLaborActualizadas(): Observable<boolean> {
    return this.condicionesLaborActualizadas.asObservable();
  }
}
