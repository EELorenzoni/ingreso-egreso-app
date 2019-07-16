

export class IngresoEgreso {
    description: string;
    monto: number;
    tipo: string;
    uid?: string;
    constructor(obj: IngresoEgresoOBJ) {
        this.description = obj && obj.description || null;
        this.monto = obj && obj.monto || null;
        this.tipo = obj && obj.tipo || null;

    }
}

interface IngresoEgresoOBJ {
    description: string;
    monto: number;
    tipo: string;
    uid?: string;
}
