export interface LeadModel {
  readonly companySize: {
    readonly total: number;
    readonly dev: number;
    readonly fe: number;
  };
  readonly linkedinLink: string;
  readonly activityIds: string[];
  readonly annualRevenue: number;
  readonly name: string;
  readonly industry: string;
  readonly hiring: {
    readonly talentProgram: boolean;
    readonly active: boolean;
    readonly junior: boolean;
  };
  readonly location: string;
  readonly websiteLink: string;
}
