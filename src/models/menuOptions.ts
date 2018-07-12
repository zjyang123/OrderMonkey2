export interface OptionsItem {
    id: string;
    item_group_id: string;
    options_name: string;
    options_price: string;
    multi_select: boolean;
}

export interface OptionsNode {
    [key: string]: OptionsItem
}
