import { Component, ViewChild } from '@angular/core';
import { IonicPage, Nav, NavController } from 'ionic-angular';

interface PageItem {
  title: string
  component: any
}
type PageList = PageItem[]

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
})
export class MenuPage {
  // A reference to the ion-nav in our component
  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'ContentPage';

  menuList: PageList;

  constructor(public navCtrl: NavController) {
    // used for an example of ngFor and navigation
    this.menuList = [
      { title: 'Logout', component: 'LogoutPage' },
      { title: 'Tutorial', component: 'TutorialPage' },
      { title: 'Welcome', component: 'WelcomePage' },
      { title: 'Tabs', component: 'TabsPage' },
      { title: 'Cards', component: 'CardsPage' },
      { title: 'Content', component: 'ContentPage' },
      { title: 'Login', component: 'LoginPage' },
      { title: 'Signup', component: 'SignupPage' },
      { title: 'Master Detail', component: 'ListMasterPage' },
      { title: 'Menu', component: 'MenuPage' },
      { title: 'Settings', component: 'SettingsPage' },
      { title: 'Search', component: 'SearchPage' }
    ];
  }

  ionViewDidLoad() {
    console.log('Hello MenuPage Page');
  }

  openPage(page: PageItem) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  test() {
    console.log(this.menuList)
  }
}
