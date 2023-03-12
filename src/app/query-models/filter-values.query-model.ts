import { CompanySizeOptionQueryModel } from './company-size-option.query-model';

export interface FilterValuesQueryModel {
  readonly scopes: Set<string>;
  readonly sizes: CompanySizeOptionQueryModel[];
}
