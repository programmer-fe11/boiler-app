export interface CustomFieldItemName {
  _id: string;
  name: string;
  key: number;
}

export interface CustomField {
  _id: string;
  name: string;
  type: 'global' | 'specific';
  dataType: string;
  isRequired: boolean;
  optionValue: string[];
  itemName: CustomFieldItemName[];
}

export type ShowOptionBulk = 'deleteBulk' | 'activeBulk' | 'inactiveBulk';
