import {CartModel} from './CartModel';
import {UserModel} from './UserModel';

export class OrderModel{
  id?: number;
  customerAddress: string;
  customerNumber: number;
  customerName: string;
  customerCountry: string;
  created?: string;
  paid: boolean;
  customer?: UserModel;
  cartProductListOrder?: CartModel[];
}
