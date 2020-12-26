import { BaseResourceModel } from "../base-resource.model";

export interface Product extends BaseResourceModel {
    id?: string;
    description: string;
    price: number | null;
}