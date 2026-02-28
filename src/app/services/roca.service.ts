import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Roca } from '../models/roca.model';

@Injectable({
  providedIn: 'root'
})
export class RocaService {

  private baseUrl = 'rocas';
  private rocasActualizadas = new BehaviorSubject<boolean>(false);

  constructor(private apiService: ApiService) {}

  getRocas(): Observable<Roca[]> {
    return this.apiService.getDatos(`${this.baseUrl}/`);
  }

  getRocaById(id: number): Observable<Roca> {
    return this.apiService.getDatos(`${this.baseUrl}/${id}`);
  }

  createRoca(roca: Roca): Observable<Roca> {
    return this.apiService.postDatos(`${this.baseUrl}/`, roca).pipe(
      tap(() => this.rocasActualizadas.next(true))
    );
  }

  updateRoca(id: number, roca: Roca): Observable<Roca> {
    return this.apiService.putDatos(`${this.baseUrl}/${id}`, roca).pipe(
      tap(() => this.rocasActualizadas.next(true))
    );
  }

  deleteRoca(id: number): Observable<any> {
    return this.apiService.deleteDatos(`${this.baseUrl}/${id}`).pipe(
      tap(() => this.rocasActualizadas.next(true))
    );
  }

  getRocasActualizadas(): Observable<boolean> {
    return this.rocasActualizadas.asObservable();
  }
}
