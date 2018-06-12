import { Injectable } from '@angular/core';

import { Item } from '../../models/item';

@Injectable()
export class Items {
  items: Item[] = [];

  defaultItem: any = {
    "name": "Burt Bear",
    "profilePic": "assets/img/speakers/bear.jpg",
    "about": "Burt is a Bear.",
  };


  constructor() {
    let items = [
      {
        "name": "Crusted Pizza",
        "profilePic": "https://media1.popsugar-assets.com/files/thumbor/D0OYajmdcatHUC1-b4Axbf-uNxo/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2017/02/08/859/n/1922195/a7a42800589b73af54eda9.99423697_edit_img_image_43136859_1486581354/i/KFC-Fried-Chicken-Pizza.jpg",
        "about": "Burt is a Bear."
      },
      {
        "name": "Cheese Burger",
        "profilePic": "https://www.seriouseats.com/recipes/images/2015/07/20150728-homemade-whopper-food-lab-35-1500x1125.jpg",
        "about": "Charlie is a Cheetah."
      },
      {
        "name": "Calimari",
        "profilePic": "https://img.sndimg.com/food/image/upload/w_896,h_504,c_fill,fl_progressive,q_80/v1/img/recipes/15/25/8/xQIJfbS2TQ65n58K9Q45_breaded-calamari-rings-4809.jpg",
        "about": "Donald is a Duck."
      },
      {
        "name": "Crusted Pizza",
        "profilePic": "https://media1.popsugar-assets.com/files/thumbor/D0OYajmdcatHUC1-b4Axbf-uNxo/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2017/02/08/859/n/1922195/a7a42800589b73af54eda9.99423697_edit_img_image_43136859_1486581354/i/KFC-Fried-Chicken-Pizza.jpg",
        "about": "Burt is a Bear."
      },
      {
        "name": "Cheese Burger",
        "profilePic": "https://www.seriouseats.com/recipes/images/2015/07/20150728-homemade-whopper-food-lab-35-1500x1125.jpg",
        "about": "Charlie is a Cheetah."
      },
      {
        "name": "Calimari",
        "profilePic": "https://img.sndimg.com/food/image/upload/w_896,h_504,c_fill,fl_progressive,q_80/v1/img/recipes/15/25/8/xQIJfbS2TQ65n58K9Q45_breaded-calamari-rings-4809.jpg",
        "about": "Donald is a Duck."
      }
      ,      {
        "name": "Crusted Pizza",
        "profilePic": "https://media1.popsugar-assets.com/files/thumbor/D0OYajmdcatHUC1-b4Axbf-uNxo/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2017/02/08/859/n/1922195/a7a42800589b73af54eda9.99423697_edit_img_image_43136859_1486581354/i/KFC-Fried-Chicken-Pizza.jpg",
        "about": "Burt is a Bear."
      },
      {
        "name": "Cheese Burger",
        "profilePic": "https://www.seriouseats.com/recipes/images/2015/07/20150728-homemade-whopper-food-lab-35-1500x1125.jpg",
        "about": "Charlie is a Cheetah."
      },
      {
        "name": "Calimari",
        "profilePic": "https://img.sndimg.com/food/image/upload/w_896,h_504,c_fill,fl_progressive,q_80/v1/img/recipes/15/25/8/xQIJfbS2TQ65n58K9Q45_breaded-calamari-rings-4809.jpg",
        "about": "Donald is a Duck."
      }
      ,      {
        "name": "Crusted Pizza",
        "profilePic": "https://media1.popsugar-assets.com/files/thumbor/D0OYajmdcatHUC1-b4Axbf-uNxo/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2017/02/08/859/n/1922195/a7a42800589b73af54eda9.99423697_edit_img_image_43136859_1486581354/i/KFC-Fried-Chicken-Pizza.jpg",
        "about": "Burt is a Bear."
      },
      {
        "name": "Cheese Burger",
        "profilePic": "https://www.seriouseats.com/recipes/images/2015/07/20150728-homemade-whopper-food-lab-35-1500x1125.jpg",
        "about": "Charlie is a Cheetah."
      },
      {
        "name": "Calimari",
        "profilePic": "https://img.sndimg.com/food/image/upload/w_896,h_504,c_fill,fl_progressive,q_80/v1/img/recipes/15/25/8/xQIJfbS2TQ65n58K9Q45_breaded-calamari-rings-4809.jpg",
        "about": "Donald is a Duck."
      }
      ,      {
        "name": "Crusted Pizza",
        "profilePic": "https://media1.popsugar-assets.com/files/thumbor/D0OYajmdcatHUC1-b4Axbf-uNxo/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2017/02/08/859/n/1922195/a7a42800589b73af54eda9.99423697_edit_img_image_43136859_1486581354/i/KFC-Fried-Chicken-Pizza.jpg",
        "about": "Burt is a Bear."
      },
      {
        "name": "Cheese Burger",
        "profilePic": "https://www.seriouseats.com/recipes/images/2015/07/20150728-homemade-whopper-food-lab-35-1500x1125.jpg",
        "about": "Charlie is a Cheetah."
      },
      {
        "name": "Calimari",
        "profilePic": "https://img.sndimg.com/food/image/upload/w_896,h_504,c_fill,fl_progressive,q_80/v1/img/recipes/15/25/8/xQIJfbS2TQ65n58K9Q45_breaded-calamari-rings-4809.jpg",
        "about": "Donald is a Duck."
      }
      ,      {
        "name": "Crusted Pizza",
        "profilePic": "https://media1.popsugar-assets.com/files/thumbor/D0OYajmdcatHUC1-b4Axbf-uNxo/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2017/02/08/859/n/1922195/a7a42800589b73af54eda9.99423697_edit_img_image_43136859_1486581354/i/KFC-Fried-Chicken-Pizza.jpg",
        "about": "Burt is a Bear."
      },
      {
        "name": "Cheese Burger",
        "profilePic": "https://www.seriouseats.com/recipes/images/2015/07/20150728-homemade-whopper-food-lab-35-1500x1125.jpg",
        "about": "Charlie is a Cheetah."
      },
      {
        "name": "Calimari",
        "profilePic": "https://img.sndimg.com/food/image/upload/w_896,h_504,c_fill,fl_progressive,q_80/v1/img/recipes/15/25/8/xQIJfbS2TQ65n58K9Q45_breaded-calamari-rings-4809.jpg",
        "about": "Donald is a Duck."
      }
      ,      {
        "name": "Crusted Pizza",
        "profilePic": "https://media1.popsugar-assets.com/files/thumbor/D0OYajmdcatHUC1-b4Axbf-uNxo/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2017/02/08/859/n/1922195/a7a42800589b73af54eda9.99423697_edit_img_image_43136859_1486581354/i/KFC-Fried-Chicken-Pizza.jpg",
        "about": "Burt is a Bear."
      },
      {
        "name": "Cheese Burger",
        "profilePic": "https://www.seriouseats.com/recipes/images/2015/07/20150728-homemade-whopper-food-lab-35-1500x1125.jpg",
        "about": "Charlie is a Cheetah."
      },
      {
        "name": "Calimari",
        "profilePic": "https://img.sndimg.com/food/image/upload/w_896,h_504,c_fill,fl_progressive,q_80/v1/img/recipes/15/25/8/xQIJfbS2TQ65n58K9Q45_breaded-calamari-rings-4809.jpg",
        "about": "Donald is a Duck."
      }
      ,      {
        "name": "Crusted Pizza",
        "profilePic": "https://media1.popsugar-assets.com/files/thumbor/D0OYajmdcatHUC1-b4Axbf-uNxo/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2017/02/08/859/n/1922195/a7a42800589b73af54eda9.99423697_edit_img_image_43136859_1486581354/i/KFC-Fried-Chicken-Pizza.jpg",
        "about": "Burt is a Bear."
      },
      {
        "name": "Cheese Burger",
        "profilePic": "https://www.seriouseats.com/recipes/images/2015/07/20150728-homemade-whopper-food-lab-35-1500x1125.jpg",
        "about": "Charlie is a Cheetah."
      },
      {
        "name": "Calimari",
        "profilePic": "https://img.sndimg.com/food/image/upload/w_896,h_504,c_fill,fl_progressive,q_80/v1/img/recipes/15/25/8/xQIJfbS2TQ65n58K9Q45_breaded-calamari-rings-4809.jpg",
        "about": "Donald is a Duck."
      }
    ];

    for (let item of items) {
      this.items.push(new Item(item));
    }
  }

  query(params?: any) {
    if (!params) {
      return this.items;
    }

    return this.items.filter((item) => {
      for (let key in params) {
        let field = item[key];
        if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
          return item;
        } else if (field == params[key]) {
          return item;
        }
      }
      return null;
    });
  }

  add(item: Item) {
    this.items.push(item);
  }

  delete(item: Item) {
    this.items.splice(this.items.indexOf(item), 1);
  }
}
