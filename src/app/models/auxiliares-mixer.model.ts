// ======================================================
// ===================== PADRE ==========================
// ======================================================

export interface AuxiliaresMixer {
  id?: number;

  fecha: string;

  horometro_diesel_inicia?: number;
  horometro_diesel_final?: number;

  operador?: string;
  turno?: string;
  jefe_guardia?: string;
  equipo?: string;

  codigo?: string;
  empresa?: string;

  firma_operador?: string;
  firma_jefe_guardia?: string;

  estado?: string; // activo | inactivo
  envio?: number;  // 0 | 1
fecha_mina?: string;
  // Relación HIJOS
  detalles?: AuxiliaresInterMixer[];
}


// ======================================================
// ====================== HIJO ===========================
// ======================================================

export interface AuxiliaresInterMixer {
  id?: number;

  padre_id: number;
  it: number;

  // ===================== OPERADOR =====================
  operador_hora_inicial?: string;
  operador_hora_final?: string;
  operador_codigo?: string;
  operador_estado?: string;
  operador_nivel?: string;
  operador_labor?: string;
  operador_ubicacion?: string;
  operador_observacion?: string;
  operador_m3_lanzados?: number;
  operador_labor_origen?: string;
  operador_labor_destino?: string;

  // ===================== GUARDIA ======================
  guardia_hora_inicial?: string;
  guardia_hora_final?: string;
  guardia_codigo?: string;
  guardia_estado?: string;
  guardia_nivel?: string;
  guardia_labor?: string;
  guardia_ubicacion?: string;
  guardia_observacion?: string;
  guardia_m3_lanzados?: number;
  guardia_labor_origen?: string;
  guardia_labor_destino?: string;
}
