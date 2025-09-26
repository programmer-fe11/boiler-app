import { QueryParams } from '@fewangsit/workspace-api-services/src/types/fetchResponse.type';

export interface GetCustomFieldParams extends QueryParams {
  search?: string;
  fieldName?: string[];
  dataType?: (
    | 'Text'
    | 'Textarea'
    | 'Dropdown'
    | 'Multi dropdown'
    | 'Date'
    | 'Datetime'
    | 'Currency'
    | 'Numeric'
    | 'Phone'
    | 'Percentage'
    | 'Email'
    | 'URL'
    | 'Document'
  )[];
  active?: boolean;
  required?: boolean;
  itemName?: string[];
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: number | 1 | -1;
  _id?: string;
}
