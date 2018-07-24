import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule, Pipe } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { Camera } from '@ionic-native/camera';
import { Device } from '@ionic-native/device';
import { Facebook } from '@ionic-native/facebook';
import { Geolocation } from '@ionic-native/geolocation';
import { QRScanner } from '@ionic-native/qr-scanner';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TapticEngine } from '@ionic-native/taptic-engine';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';

import { Api, Settings, User } from '../providers/providers';
import { MyApp } from './app.component';
import { DeviceService } from './service/device.service';
import { LoginService } from './service/login.service';
import { NotificationBarService } from './service/notificationbar.service';
import { UserCommunication } from './service/usercom.service';
import { MenuControllerService } from './service/menu-controller.service';
import { SuperTabsModule } from 'ionic2-super-tabs';
import { OrderModule } from 'ngx-order-pipe';
import { AddToCartService } from './service/cart.service';
// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function provideSettings(storage: Storage) {
  /**
   * The Settings provider takes a set of default settings for your app.
   *
   * You can add new settings options at any time. Once the settings are saved,
   * these values will not overwrite the saved values (this can be done manually if desired).
   */
  // return new Settings(storage, {
  //   option1: true,
  //   option2: 'Ionitron J. Framework',
  //   option3: '3',
  //   option4: 'Hello'
  // });
}

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    OrderModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    IonicModule.forRoot(MyApp,{
      menuType: 'push',
      platforms: {
        ios: {
          menuType: 'overlay',
        }
      }
    }),
    IonicStorageModule.forRoot(),
    SuperTabsModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    Api,
    User,
    SplashScreen,
    StatusBar,
    Camera,
    Device,
    TapticEngine,
    NativePageTransitions,
    LoginService,
    UserCommunication,
    MenuControllerService,
    { provide: Settings, useFactory: provideSettings, deps: [Storage] },
    // Keep this to enable Ionic's runtime error handling during development
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    QRScanner,
    Geolocation,
    NotificationBarService,
    DeviceService,
    AddToCartService,
    Facebook,
    UniqueDeviceID
  ]
})
export class AppModule { }
