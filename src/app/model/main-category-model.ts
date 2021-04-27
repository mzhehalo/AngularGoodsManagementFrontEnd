import {SubCategoryModel} from './sub-category-model';

export class MainCategoryModel {
  id: number;
  mainCategory: string;
  subCategories: SubCategoryModel[];
}
