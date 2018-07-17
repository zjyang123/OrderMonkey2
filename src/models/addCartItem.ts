export interface CartItemOption {
    optionID: string; 
}

export interface CartItem {
    clientID: any;
    clientMenuID: any;
    menuItemID: any;
    price: any;
    [key: string]: CartItemOption;
}
