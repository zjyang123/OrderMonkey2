export interface OptionsItem {
    id: string;
    item_group_id: string;
    options_name: string;
    options_price: string;
    multi_select: boolean;
    order_place: number;
}

export interface OptionsNode {
    [key: string]: OptionsItem
}
