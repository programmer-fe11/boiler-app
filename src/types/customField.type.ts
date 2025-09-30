export interface CustomFieldItemName {
  _id: string;
  name: string;
  key: number;
}

export interface CustomField {
  _id: string;
  name: string;
  type: string; //this type should change to be "global" | "specific"
  dataType: string;
  isRequired: boolean;
  optionValue: string[];
  itemName: CustomFieldItemName[];
}
