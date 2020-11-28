import {UserModel} from './UserModel';

export class ProductModel {
  id?: number;
  productName?: string;
  productDescription?: string;
  productBrand?: string;
  productPrice?: number;
  productSeller?: UserModel;
}
