import { Component, ViewChild } from '@angular/core';
import { Facebook } from '@ionic-native/facebook';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
import { Config, Nav, Platform } from 'ionic-angular';

import { FirstRunPage } from '../pages/pages';
import { Settings } from '../providers/providers';
import { NotificationBarService } from './service/notificationbar.service';

interface PageItem {
  title: string,
  component: any
}
type PageList = PageItem[]

@Component({
  templateUrl: 'app.html',
  providers: [
    ScreenOrientation
  ]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  menuList: PageList;
  logoutButton: any;
  rootPage = FirstRunPage;
  menu: string;

  constructor(
    private translate: TranslateService, 
    platform: Platform, settings: Settings, 
    private config: Config, 
    private statusBar: StatusBar, 
    public splashScreen: SplashScreen, 
    public storage: Storage,
    public facebook: Facebook,
    public notificationBar: NotificationBarService
  ) {

    // Set orientation to portrait only works in productio mode-->>>>>> disable when develope mode
    // this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    ///////////

    this.logoutButton = { title: 'Logout', component: 'LogoutPage' };
    this.menuList = [
      // { title: 'Tutorial', component: 'TutorialPage' },
      // { title: 'Breakfast Menu', component: 'BreakfastPage' },
      // { title: 'Lunch Menu', component: 'LunchPage' },
      // { title: 'Dinner', component: 'DinnerPage' },
      // { title: 'Drinks and Dessert', component: 'DrinksPage' },
      // { title: 'Search', component: 'SearchPage' },
      { title: 'Account Settings', component: 'AccountPage' },
      { title: 'Tabs', component: 'TabsPage' }
    ];

    this.splashScreen.show();

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      //this.splashScreen.show();
      this.splashScreen.hide();
    });
    this.initTranslate();
  }

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang();

    if (browserLang) {
      if (browserLang === 'zh') {
        const browserCultureLang = this.translate.getBrowserCultureLang();

        if (browserCultureLang.match(/-CN|CHS|Hans/i)) {
          this.translate.use('zh-cmn-Hans');
        } else if (browserCultureLang.match(/-TW|CHT|Hant/i)) {
          this.translate.use('zh-cmn-Hant');
        }
      } else {
        this.translate.use(this.translate.getBrowserLang());
      }
    } else {
      this.translate.use('en'); // Set your language here
    }

    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });
  }

  openPage(page: PageItem) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component, {}, { animate: true, direction: 'forward' });
  }

  openMenu(menuTitle: string, menuComponent: string) {
    if (menuComponent === 'TutorialPage') {
      this.nav.setRoot('TutorialPage', {}, { animate: true, direction: 'forward' });
    } else if (menuComponent === 'AccountPage') {
      this.nav.setRoot('AccountPage', {}, { animate: true, direction: 'forward' });
    } else {
      this.nav.setRoot('MenuListMasterPage', { menuTitle: menuTitle, menuComponent: menuComponent }, { animate: true, direction: 'forward' });
    }
  }

  logout() {
    this.storage.get('accountType').then((val) => {
      if (val == 'facebook') {
        this.facebook.logout().then(() => {
          // FOR FURTURE, INSTEAD OF CLEARING ALL CLEAR ONLY NEEDED STORAGE PARAMETERS
          this.storage.clear();
          this.nav.setRoot('WelcomePage');
        }, (err)=> {
          alert(err)
        });
      } else {
        this.storage.clear();
        this.nav.setRoot('WelcomePage');
      }
    });

    this.notificationBar.notificationbarTask('You have logged out!', 3000, 'bottom');
    
  }
}
