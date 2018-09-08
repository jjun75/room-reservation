import { AuthProvider } from './../providers/auth/auth.provider';
import { ComponentsModule } from '../components/components.module';
import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

@NgModule({
  declarations: [
  ],
  imports: [
    IonicModule,
    ComponentsModule,
  ],
  exports: [
    ComponentsModule,
  ],
  providers: [
    AuthProvider
  ]
})

export class SharedModule { }
