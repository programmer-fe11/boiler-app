export interface CustomFieldCategory {
  _id: string;
  name: string;
  key: number;
}

export interface CustomField {
  _id: string;
  name: string;
  type: string;
  dataType: string;
  isRequired: boolean;
  optionValue: string[];
  category: CustomFieldCategory[];
}
