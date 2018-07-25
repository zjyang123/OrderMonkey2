export interface CartItem {
    id: Number;
    itemName: string;
    itemImage: string;
    itemPrice: string;
}

export interface CartItems {
    [key: string]: CartItem
}
