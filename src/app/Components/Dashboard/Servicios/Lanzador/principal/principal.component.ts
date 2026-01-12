import { Component, OnInit } from '@angular/core';

import { NgApexchartsModule } from 'ng-apexcharts';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import * as XLSX from 'xlsx-js-style';

import { ExcelExportAuxiliaresLanzadorService } from
  '../../../../../services/export/excel-export-auxiliares-lanzador.service';

import {
  AuxiliaresLanzador
} from '../../../../../models/auxiliares-lanzador.model';

import {
  AuxiliaresLanzadorService
} from '../../../../../services/auxiliares-lanzador.service';
import { SchedulerComponent } from "../scheduler/scheduler.component";

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [NgApexchartsModule, CommonModule, FormsModule, SchedulerComponent],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export class PrincipalComponentLanzador implements OnInit {

  datosOperaciones: AuxiliaresLanzador[] = [];
  datosOperacionesExport: AuxiliaresLanzador[] = [];
  datosOperacionesOriginal: AuxiliaresLanzador[] = [];

  fechaDesde: string = '';
  fechaHasta: string = '';
  turnoSeleccionado: string = '';
  turnos: string[] = ['DÍA', 'NOCHE'];
ganttData: any[] = [];

  constructor(
    private excelExportAuxiliaresLanzadorservice: ExcelExportAuxiliaresLanzadorService,
    private auxiliaresLanzadorService: AuxiliaresLanzadorService
  ) {}

  ngOnInit(): void {
    const fechaISO = this.obtenerFechaLocalISO();
    this.fechaDesde = fechaISO;
    this.fechaHasta = fechaISO;
    this.turnoSeleccionado = this.obtenerTurnoActual();

    this.obtenerDatos();
  }

  // ======================================================
  // =================== FECHA MINA =======================
  // ======================================================
  private calcularFechaMina(fechaOriginal?: string, turno?: string): string {
    if (!fechaOriginal) return '';

    if (turno?.toLowerCase() === 'noche') {
      const fecha = new Date(fechaOriginal);
      fecha.setDate(fecha.getDate() + 1);
      return fecha.toISOString().split('T')[0];
    }

    return fechaOriginal.split('T')[0];
  }

  obtenerTurnoActual(): string {
    const ahora = new Date();
    const hora = ahora.getHours();

    return (hora >= 7 && hora < 19) ? 'DÍA' : 'NOCHE';
  }

  // ======================================================
  // ===================== FILTROS ========================
  // ======================================================
  quitarFiltros(): void {
    const fechaISO = this.obtenerFechaLocalISO();
    this.fechaDesde = fechaISO;
    this.fechaHasta = fechaISO;
    this.turnoSeleccionado = this.obtenerTurnoActual();

    const filtros = {
      fechaDesde: this.fechaDesde,
      fechaHasta: this.fechaHasta,
      turnoSeleccionado: this.turnoSeleccionado
    };

    this.datosOperaciones = this.filtrarDatos(
      this.datosOperacionesOriginal,
      filtros
    );

    this.construirGanttData(this.datosOperaciones);


  }

  private construirGanttData(datos: AuxiliaresLanzador[]) {

  const fechaMap: any = {};

  datos.forEach(padre => {
    const fecha = padre.fecha_mina!;
    const equipoCodigo = `${padre.equipo} - ${padre.codigo}`;

    if (!fechaMap[fecha]) {
      fechaMap[fecha] = {};
    }

    if (!fechaMap[fecha][equipoCodigo]) {
      fechaMap[fecha][equipoCodigo] = {};
    }

    padre.detalles?.forEach(det => {
      const labor = det.operador_labor ?? 'SIN LABOR';

      if (!fechaMap[fecha][equipoCodigo][labor]) {
        fechaMap[fecha][equipoCodigo][labor] = [];
      }

      fechaMap[fecha][equipoCodigo][labor].push({
        start: det.operador_hora_inicial,
        end: det.operador_hora_final,
        estado: det.operador_estado,
        description: det.operador_codigo
      });
    });
  });

  // 🔁 Normalizar a array
  this.ganttData = Object.entries(fechaMap).map(
    ([fecha, equipos]: any) => ({
      fecha,
      groups: Object.entries(equipos).map(
        ([equipoCodigo, labores]: any) => ({
          equipoCodigo,
          rows: Object.entries(labores).map(
            ([labor, tasks]: any) => ({
              labor,
              tasks
            })
          )
        })
      )
    })
  );

  console.log('📊 GANTT DATA FINAL:', this.ganttData);
}


  obtenerFechaLocalISO(): string {
    const hoy = new Date();
    const año = hoy.getFullYear();
    const mes = (hoy.getMonth() + 1).toString().padStart(2, '0');
    const dia = hoy.getDate().toString().padStart(2, '0');
    return `${año}-${mes}-${dia}`;
  }

  aplicarFiltrosLocales(): void {
    // Crear objeto con los filtros actuales
    const filtros = {
      fechaDesde: this.fechaDesde,
      fechaHasta: this.fechaHasta,
      turnoSeleccionado: this.turnoSeleccionado
    };
  
    // Aplicar filtros a los datos ORIGINALES (this.datosOperacionesOriginal)
    const datosFiltrados = this.filtrarDatos(this.datosOperacionesOriginal, filtros);
  
    // Actualizar los datos filtrados
    this.datosOperaciones = datosFiltrados;

    this.construirGanttData(this.datosOperaciones);

  
  }
  
  filtrarDatos(
    datos: AuxiliaresLanzador[],
    filtros: any
  ): AuxiliaresLanzador[] {

    return datos.filter(op => {
      const fechaOperacion = new Date(
        (op as any).fecha_mina ?? op.fecha
      );

      if (filtros.fechaDesde &&
          fechaOperacion < new Date(filtros.fechaDesde)) {
        return false;
      }

      if (filtros.fechaHasta &&
          fechaOperacion > new Date(filtros.fechaHasta)) {
        return false;
      }

      if (filtros.turnoSeleccionado &&
          op.turno !== filtros.turnoSeleccionado) {
        return false;
      }

      return true;
    });
  }

  // ======================================================
  // =================== OBTENER DATOS ====================
  // ======================================================
  obtenerDatos(): void {
    this.auxiliaresLanzadorService.getAll().subscribe({
      next: (data: AuxiliaresLanzador[]) => {

        const dataConFechaMina = data.map(op => ({
          ...op,
          fecha_mina: this.calcularFechaMina(op.fecha, op.turno)
        }));

        this.datosOperacionesOriginal = dataConFechaMina;
        this.datosOperacionesExport = dataConFechaMina;

        const filtros = {
          fechaDesde: this.fechaDesde,
          fechaHasta: this.fechaHasta,
          turnoSeleccionado: this.turnoSeleccionado
        };

        this.datosOperaciones = this.filtrarDatos(
          this.datosOperacionesOriginal,
          filtros
        );
        this.construirGanttData(this.datosOperaciones);

      },
      error: err => {
        console.error('❌ Error al obtener auxiliares lanzador:', err);
      }
    });
  }

  // ======================================================
  // ===================== EXPORT =========================
  // ======================================================
  exportToExcel() {
    this.excelExportAuxiliaresLanzadorservice.exportToExcel(
      this.datosOperacionesExport,
      'Reporte_Auxiliares_Lanzador'
    );
  }

  exportToExcelFiltro() {
    this.excelExportAuxiliaresLanzadorservice.exportToExcel(
      this.datosOperaciones,
      'Reporte_Auxiliares_Lanzador'
    );
  }

}
