import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card.component';
import { AnswerComponent } from './answer/answer.component';
import { MultipleComponent } from './multiple/multiple.component';
import { PromptComponent } from './prompt/prompt.component';
import { ResposeComponent } from './respose/respose.component';
import { SelfassessmentComponent } from './selfassessment/selfassessment.component';
import { TruefalseComponent } from './truefalse/truefalse.component';
import { FooterCountComponent } from './footer-count.component';
import { AudioPlayerComponent } from './audio-player.component';
import { routing } from './cards.routing';

@NgModule({
    imports: [
        CommonModule,
        routing
    ],
    declarations: [
        CardComponent,
        AnswerComponent,
        MultipleComponent,
        PromptComponent,
        ResposeComponent,
        SelfassessmentComponent,
        TruefalseComponent,
        FooterCountComponent,
        AudioPlayerComponent
    ]
})
export class CardsModule {
}
