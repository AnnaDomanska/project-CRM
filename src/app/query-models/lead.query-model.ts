export interface LeadQueryModel {
  readonly name: string;
  readonly websiteLink: string;
  readonly linkedinLink: string;
  readonly scopes: string[];
  readonly hiring: {
    readonly active: boolean;
    readonly junior: boolean;
    readonly talentProgram: boolean;
  };
  readonly industry: string;
  readonly location: string;
  readonly size: {
    readonly total: number;
    readonly dev: number;
    readonly fe: number;
  };
  readonly revenue: number;
}
