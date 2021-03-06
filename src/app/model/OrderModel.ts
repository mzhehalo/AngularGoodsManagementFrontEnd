import {CartModel} from './CartModel';
import {UserModel} from './UserModel';

export class OrderModel{
  id?: number;
  customerAddress: string;
  customerNumber: string;
  customerName: string;
  customerCountry: string;
  created?: string;
  paid: boolean;
  customer?: UserModel;
  cartProductListOrder?: CartModel[];
}
