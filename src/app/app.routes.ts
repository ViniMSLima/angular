import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { EditComponent } from './edit/edit.component';

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
  },
  {
    path: 'edit/:produto',
    component: EditComponent,
  },
  // { path: '**', component: NotFoundComponent}
];
