export interface OptionsItem {
    id: string;
    item_group_id: string;
    options_name: string;
    options_price: string;
    multi_select: boolean;
    required: boolean;
    order_place: number;
    option_type: string;
}

export interface OptionsNode {
    [key: string]: OptionsItem
}
