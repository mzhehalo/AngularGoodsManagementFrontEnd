import {UserModel} from './UserModel';

export class ProductModel {
  id?: number;
  productImg?: string;
  mainCategory: string;
  subCategory?: string;
  productName?: string;
  productDescription?: string;
  productBrand?: string;
  productPrice?: number;
  productSeller?: UserModel;
}
