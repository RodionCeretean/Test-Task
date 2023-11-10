import { type Partner } from "./Partner";
import { type FoodItem } from "./FoodItem";

export type brand =
    "food-band" |
    "gusi-lebedi" |
    "palki-skalki" |
    "pizza-burger" |
    "pizza-plus" |
    "tanuki" ;

type Menu = {[key in brand]: FoodItem[]};

export interface Database extends Menu{
      partners: Partner[];
  }

