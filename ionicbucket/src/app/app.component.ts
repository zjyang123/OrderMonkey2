import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { AdmobFreeProvider } from '../providers/admob-free/admob-free';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'FirstLandingPage';

  pages: Array<{ title: string, component: any, leftIcon: string }>;

  constructor(public platform: Platform, public statusBar: StatusBar,
    public splashScreen: SplashScreen, public translateService: TranslateService,
    public http: HttpClient, private admobFree: AdmobFreeProvider) {
    this.initializeApp();

    // Default Language
    translateService.setDefaultLang('en');
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.getSidebarList();

      // Show Video Ad After 2 Minutes
      setInterval(() => {
        this.prepareAdmobVideo();
      }, 120000);

      // Show Interstitial Ad After 1 Minutes
      setInterval(() => {
        this.prepareInterstitial();
      }, 60000);
    });
  }

  /**
   * --------------------------------------------------------------
   * Get Sidebar List
   * --------------------------------------------------------------
   */
  getSidebarList() {
    this.http.get('assets/i18n/en.json').subscribe((data: any) => {
      this.pages = data.SIDEBAR_List;
    }, error => {
      console.error(error);
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page);
  }

  /**
   * Prepare and show admob Video ad
   */
  prepareAdmobVideo() {
    this.admobFree.prepareAdmobVideo();
  }

  /**
   * Prepare and show admob Interstitial Ad
   */
  prepareInterstitial() {
    this.admobFree.prepareInterstitial();
  }
}