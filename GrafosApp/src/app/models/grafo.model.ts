export type TipoNodo = 'persona' | 'ciudad';

export interface Persona {
  id: string;
  nombre: string;
  edad: number;
  ciudadId: string;
}

export interface Ciudad {
  id: string;
  nombre: string;
}

export interface NodoGrafo {
  id: string;
  tipo: TipoNodo;
  nombre: string;
  edad?: number;
}

export interface AristaGrafo {
  origen: string;
  destino: string;
}