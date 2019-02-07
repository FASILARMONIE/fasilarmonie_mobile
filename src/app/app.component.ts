import { Component, ViewChild } from "@angular/core";
import { Platform, NavController, MenuController } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { HomePage } from "../pages/home/home";
import { AboutPage } from "../pages/about/about";
import { HowtousePage } from "../pages/howtouse/howtouse";
import { TabsPage } from "../pages/tabs/tabs";
import { SpotifyProvider } from "../providers/spotify/spotify";
import { TranslateService } from "@ngx-translate/core";
import { SettingsPage } from "../pages/settings/settings";
import { Storage } from "@ionic/storage";

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  /*  tabsPage = TabsPage;
  rootPage = HomePage;
  aboutPage = AboutPage;
  howtousePage = HowtousePage;
  settingsPage = SettingsPage; */

  @ViewChild("nav") nav: NavController;
  rootPage: any;
  pages: Array<{ title: string; icon: string; component: any }>;
  subpages: Array<{ title: string; icon: string; component: any }>;

  constructor(
    public platform: Platform,
    private menuCtrl: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private spotifyProvider: SpotifyProvider,
    public translate: TranslateService,
    private storage: Storage
  ) {
    this.initializeApp();
    this.pages = [
      { title: "accueil", icon: "home", component: HomePage },
      {
        title: "comment utiliser FASILA'rmonie",
        icon: "help",
        component: HowtousePage
      },
      {
        title: "A propos",
        icon: "information-circle-outline",
        component: AboutPage
      },
      { title: "Langues", icon: "settings", component: SettingsPage }
    ];
  }

  initializeApp() {
    console.log(this.pages);
    this.platform.ready().then(() => {
      this.rootPage = HomePage;
      this.storage.get("lang").then(lang => {
        if (lang) {
          console.log(lang);
          this.translate.use(lang);
        } else {
          this.translate.setDefaultLang("fr");
        }
      });
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //this.translate.use('fr');
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    this.spotifyProvider.getToken();
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  onLoad(page: any) {
    console.log(page);

    this.nav.setRoot(page);
    this.menuCtrl.close();
  }
}
