export interface OptionsItem {
    id: string;
    client_menu_id: string;
    client_id: string;
    item_id: string;
    options_name: string;
    option_type: string;
}

export interface OptionsNode {
    [key: string]: OptionsItem
}
