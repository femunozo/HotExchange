import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
<<<<<<< HEAD
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then(m => m.PerfilPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then(m => m.RegistroPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'tab1',
    loadChildren: () => import('./tab1/tab1.module').then(m => m.Tab1PageModule)
  },
  {
    path: 'tab2',
    loadChildren: () => import('./tab2/tab2.module').then(m => m.Tab2PageModule)
  },
  {
    path: 'tab3',
    loadChildren: () => import('./tab3/tab3.module').then(m => m.Tab3PageModule)
  },
  {
    path: 'historial',
    loadChildren: () => import('./historial/historial.module').then(m => m.HistorialPageModule)
  },
  {
    path: 'camera',
    loadChildren: () => import('./camera/camera.module').then(m => m.CameraPageModule)
  },
  {
    path: 'camera-options',
    loadChildren: () => import('./camera-options/camera-options.module').then(m => m.CameraOptionsPageModule)
  },
  {
    path: 'camera-scan',
    loadChildren: () => import('./camera-scan/camera-scan.module').then(m => m.CameraScanPageModule)
  },
  {
    path: 'camera-result',
    loadChildren: () => import('./camera-result/camera-result.module').then(m => m.CameraResultPageModule)
  },
  {
    path: 'geolocation-search',
    loadChildren: () => import('./geolocation-search/geolocation-search.module').then(m => m.GeolocationSearchPageModule)
  },
  {
    path: 'geolocation-result',
    loadChildren: () => import('./geolocation-result/geolocation-result.module').then(m => m.GeolocationResultPageModule)
  },
  {
    path: 'wiki-search',
    loadChildren: () => import('./wiki-search/wiki-search.module').then(m => m.WikiSearchPageModule)
=======
  { path: 'maps', 
    loadChildren: () => import('./maps/maps.module').then(m => m.MapsPageModule) 
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'tab1',
    loadChildren: () => import('./tab1/tab1.module').then( m => m.Tab1PageModule)
  },
  {
    path: 'tab2',
    loadChildren: () => import('./tab2/tab2.module').then( m => m.Tab2PageModule)
  },
  {
    path: 'tab3',
    loadChildren: () => import('./tab3/tab3.module').then( m => m.Tab3PageModule)
  },
  {
    path: 'historial',
    loadChildren: () => import('./historial/historial.module').then( m => m.HistorialPageModule)
  },
  {
    path: 'camera',
    loadChildren: () => import('./camera/camera.module').then( m => m.CameraPageModule)
>>>>>>> f520401b931e804657690899b4d34873a81595cb
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
<<<<<<< HEAD
=======



>>>>>>> f520401b931e804657690899b4d34873a81595cb
