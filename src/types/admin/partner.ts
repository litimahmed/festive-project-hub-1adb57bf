export interface MultilingualField {
  ar: string;
  fr: string;
  en: string;
}

export interface PartnerPayload {
  nom_partenaire: MultilingualField;
  description: MultilingualField;
  adresse: MultilingualField;
  email: string;
  telephone: string;
  site_web: string;
  actif?: boolean;
  facebook?: string | null;
  instagram?: string | null;
  tiktok?: string | null;
  type_partenaire?: string;
  date_deb: string;
  date_fin: string;
  liens_externes?: MultilingualField;
  date_creation_entreprise: string;
  priorite_affichage: number;
}

export interface PartnerResponse extends PartnerPayload {
  id?: number;
  date_creation?: string;
  date_modification?: string;
}

export const TYPE_PARTENAIRE_OPTIONS = [
  "COMMERCIAL",
  "MARKETING",
  "TECHNIQUE",
  "MEDIA",
  "AUTRE"
] as const;
