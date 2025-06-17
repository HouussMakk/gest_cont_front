export interface DossierJuridique {
    referenceDossier: string;
  qualiteAgence: string;
    natureLitige: string;
    objetLitige: string;
    instanceJudiciaire: string;
    codePort: string;
    partieAdverseId: number;
    stadeLitigeId: number;
    avocatId: number;
  }
export interface DossierJuridiqueListing {
  referenceDossier: string;
  qualiteAgence: string;
  natureLitige: string;
  objetLitige: string;
  instanceJudiciaire: string;
  codePort: string;
  partieAdverse: string;
  stadeLitigeId: number;
  avocat: string;
}
