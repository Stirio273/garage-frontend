import { Service } from './service';

export interface Facture {
    _id?: string;
    clientEmail?: string;
    dateHeureFacture?: Date;
    listService?: { service: Service; quantite: number }[];
    TotalAPayer?: number;
    historiquePaiementEffectue?: { datePaiement: Date; paiement: number }[];
    paiementEffectue?: number;
    resteAPayer?: number;
    paiementAcheve?: boolean;
    factureClos?: boolean;
    idClient?: string;
    status?: string;
}
