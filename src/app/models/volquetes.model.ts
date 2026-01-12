// ======================================================
// ======================= PADRE =========================
// ======================= VOLQUETES =====================
// ======================================================

export interface Volquetes {
  id?: number;

  fecha: string;

  horometro_inicia: number;
  horometro_final: number;

  kilometraje_inicia: number;
  kilometraje_final: number;

  operador: string;
  turno: string;
  jefe_guardia: string;
  equipo: string;

  codigo?: string;
  empresa?: string;

  firma_operador?: string;
  firma_jefe_guardia?: string;

  estado?: string; // activo | inactivo
  envio?: number;  // 0 | 1

  fecha_mina?: string;

  // ================= RELACIÓN HIJOS ===================
  detalles?: InterVolquetes[];
}


// ======================================================
// ======================== HIJO =========================
// ==================== INTER_VOLQUETES =================
// ======================================================

export interface InterVolquetes {
  id?: number;

  volquetes_id: number;
  it: number;

  // ===================== OPERADOR =====================
  operador_hora_inicial?: string;
  operador_hora_final?: string;
  operador_codigo?: string;
  operador_estado?: string;

  horometro_inicia?: number;
  horometro_final?: number;

  operador_nivel?: string;
  operador_zona?: string;
  operador_labor?: string;
  operador_hora_llegada?: string;

  operador_hora_carguio_inicio?: string;
  operador_hora_carguio_final?: string;
  operador_destino?: string;
  operador_hora_descarga?: string;
}
