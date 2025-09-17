/*
 * TODO: Tolong jangan disable rule eslint, bukannya Senin kemarin udah aku kasitau?
 * Yang di bawah ini dihapus ya
 */

/* eslint-disable capitalized-comments */
/* eslint-disable multiline-comment-style */
// export interface Member {
//   _id: string;
//   key: number;
//   profilePictureBig?: string;
//   profilePictureMedium?: string;
//   profilePictureSmall?: string;
//   nickName: string;
//   teams: string[];
//   email: string;
// }

export interface Member {
  _id: string;
  category: string;
  brand: string;
  model: string;
  group: string;
  name: string;
  aliasName: string;
  assetImage: string;
  assetNumber: number;
  userFirstName: string;
  createdAt: string;
  updatedAt: string;
}
