import { Component } from '@angular/core';

import { HomePage } from '../home/home';

import { AboutPage } from '../about/about';

@Component({
    selector: 'page-tabs',
   template: `
      <ion-tabs>
    <ion-tab [root]="homePage" tabTitle="Accueil" tabIcon="home"></ion-tab>
    <ion-tab [root]="aboutPage" tabTitle="A propos" tabIcon="information"></ion-tab>
    </ion-tabs>
    `
})

export class TabsPage {
    homePage = HomePage;
    aboutPage = AboutPage;
}
