export interface LeadsQueryModel {
  readonly name: string;
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
