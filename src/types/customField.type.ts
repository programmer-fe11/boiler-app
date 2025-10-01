export interface CustomFieldItemName {
  _id: string;
  name: string;
  key: number;
}

/*
 * TODO: Kalau mau nambahin komentar tentang kode yang belum selesai,
 * tambahin 'TODO', biar gampang dicari. Jadi komen di bawah diubah jadi:
 * TODO: this type should change to be "global" | "specific"
 */
export interface CustomField {
  _id: string;
  name: string;
  type: string; //this type should change to be "global" | "specific"
  dataType: string;
  isRequired: boolean;
  optionValue: string[];
  itemName: CustomFieldItemName[];
}
