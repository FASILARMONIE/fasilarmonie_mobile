import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { HarmonyPage } from '../pages/harmony/harmony';
import { TabsPage } from '../pages/tabs/tabs';
import { AboutPage } from '../pages/about/about';
import { HowtousePage } from '../pages/howtouse/howtouse';
import { SearchPage } from '../pages/search/search';
import { AudioProvider } from '../providers/audio/audio';
import { SpotifyProvider } from '../providers/spotify/spotify';
import { NoteProvider } from '../providers/note/note';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ToolsMusicProvider } from '../providers/tools-music/tools-music';
import { AccordPage } from '../pages/accord/accord';
import { FormsModule } from '@angular/forms';
import { SearchPageModule } from '../pages/search/search.module';
import { HTTP } from '@ionic-native/http';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SettingsPage } from '../pages/settings/settings';
import { IonicStorageModule } from '@ionic/storage';

/*
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}*/

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AboutPage,
    HowtousePage,
    HarmonyPage,
    TabsPage,
    SearchPage,
    AccordPage,
    SearchPage,
    SettingsPage
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    FormsModule,
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AboutPage,
    HowtousePage,
    HarmonyPage,
    TabsPage,
    SearchPage,
    AccordPage,
    SearchPage,
    SettingsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AudioProvider,
    SpotifyProvider,
    NoteProvider,
    ToolsMusicProvider,
    HTTP,
  ]
})
export class AppModule { }
