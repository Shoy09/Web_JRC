export interface RegistroLabor {
  id: number;

  fecha: string;
  turno: string;
  guardia: string;
  nivel: string;
  block: string;
  roca: string;
  labor: string;
  empresa: string;

  op_robot_bolter_nombre: string;
  op_robot_bolter_numero: string;
  op_mixer_ayudante_nombre: string;
  op_mixer_ayudante_numero: string;
  op_mixer_nombre: string;
  op_mixer_numero: string;
  supervisor_nombre: string;
  supervisor_numero: string;

  condiciones_labor: any; // 🔥 En backend es JSON
  ancho: number;
  alto: number;
  longitud: number;

  tipo_sostenimiento: any; // 🔥 JSON

  calibradores_si_no: string;
  espesor: string;
  slump: string;
  presion: string;
  perno: string;
  long_perno: string;

  ejecutado_shotcrete1: number;
  ejecutado_malla1: number;
  ejecutado_pernos1: number;

  ejecutado_shotcrete2: number;
  ejecutado_malla2: number;
  ejecutado_pernos2: number;

  ejecutado_shotcrete3: number;
  ejecutado_malla3: number;
  ejecutado_pernos3: number;

  foto_croquis_path?: string;
  dibujo_croquis_path?: string;

  observaciones: string;
  Operador: string;

  envio: number;
  Estado: number;

  // =========================
  // 🔥 FILTRO 1
  // =========================
  filtro1_estado: 'pendiente' | 'aprobado' | 'rechazado';
  filtro1_usuario?: string;
  filtro1_fecha?: string;
  filtro1_observacion?: string;
  filtro1_cambios?: any;

  // =========================
  // 🔥 FILTRO 2
  // =========================
  filtro2_estado: 'pendiente' | 'aprobado' | 'rechazado';
  filtro2_usuario?: string;
  filtro2_fecha?: string;
  filtro2_observacion?: string;
  filtro2_cambios?: any;

  // =========================
  // 🔥 FILTRO 3
  // =========================
  filtro3_estado: 'pendiente' | 'aprobado' | 'rechazado';
  filtro3_usuario?: string;
  filtro3_fecha?: string;
  filtro3_observacion?: string;
  filtro3_cambios?: any;

  createdAt?: string;
  updatedAt?: string;
}