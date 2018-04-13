import { Component, ViewChild, animate } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateService } from '@ngx-translate/core';
import { Config, Nav, Platform } from 'ionic-angular';

import { FirstRunPage } from '../pages/pages';
import { Settings } from '../providers/providers';

interface PageItem {
  title: string,
  component: any
}
type PageList = PageItem[]

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  menuList: PageList;
  logoutButton: any;
  rootPage = FirstRunPage;
  menu: string;

  constructor(private translate: TranslateService, platform: Platform, settings: Settings, private config: Config, private statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.logoutButton = {title: 'Logout', component: 'LogoutPage'};
    this.menuList = [
      { title: 'Tutorial', component: 'TutorialPage' },
      { title: 'Welcome', component: 'WelcomePage' }, // will be removed
      { title: 'Tabs', component: 'TabsPage' },
      { title: 'Master Detail', component: 'ListMasterPage' },
      { title: 'Settings', component: 'SettingsPage' },
      { title: 'Search', component: 'SearchPage' }
    ];
    
    this.splashScreen.show();
    
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      //this.splashScreen.show();
      //this.splashScreen.hide();
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

  openMenu(menuTitle:string, menuComponent:string) {
    this.nav.setRoot('MenuListMasterPage', {menuTitle: menuTitle, menuComponent: menuComponent}, { animate: true, direction: 'forward' });
  }

  logout() {
    this.nav.push('LogoutPage', {}, { animate: true, direction: 'forward' });
    
  }
}
