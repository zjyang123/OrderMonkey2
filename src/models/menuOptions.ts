export interface OptionsItem {
    id: string;
    item_group_id: string;
    options_name: string;
    options_price: string;
}

export interface OptionsNode {
    [key: string]: OptionsItem
}
