import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreComponent } from './store.component';
import { CartComponent } from './cart/cart.component';
import { SubtotalComponent } from './subtotal/subtotal.component';
import { ThanksComponent } from './thanks/thanks.component';
import { routing } from './store.routing';

@NgModule({
    imports: [
        CommonModule,
        routing
    ],
    declarations: [ StoreComponent, CartComponent, SubtotalComponent, ThanksComponent ]
})
export class StoreModule {
}
