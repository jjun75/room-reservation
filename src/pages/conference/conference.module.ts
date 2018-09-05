import { SharedModule } from './../../app/shared.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConferencePage } from './conference';

@NgModule({
  declarations: [
    ConferencePage,
  ],
  imports: [
    //해당 모듈에서 사용하는 컴포넌트 임포트
    IonicPageModule.forChild(ConferencePage),
    SharedModule
  ],
  exports: [
    ConferencePage,
  ]
})
export class ConferencePageModule {}
