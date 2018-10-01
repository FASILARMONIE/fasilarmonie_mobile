import { Component, ViewChild } from '@angular/core';

import { Platform, NavController, MenuController } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';

import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';

import { AboutPage } from '../pages/about/about';

import { HowtousePage } from '../pages/howtouse/howtouse';

import { TabsPage } from '../pages/tabs/tabs';
import { SpotifyProvider } from '../providers/spotify/spotify';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  tabsPage = TabsPage;
  rootPage = HomePage;
  aboutPage = AboutPage;
  howtousePage = HowtousePage;

  @ViewChild('nav') nav: NavController;

  constructor(public platform: Platform, private menuCtrl: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private spotifyProvider: SpotifyProvider) {

  }


  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    this.spotifyProvider.getToken();
   

    



  }


  onLoad(page: any) {
    this.nav.setRoot(page);
    this.menuCtrl.close();
  }
}

