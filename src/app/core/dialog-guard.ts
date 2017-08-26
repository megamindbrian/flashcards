import { Injectable, Type } from '@angular/core';
import { ActivatedRouteSnapshot, Route, Router, RouterStateSnapshot } from '@angular/router';
import { MdDialog, MdDialogConfig } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
/**
 * Create a dialog out of any route, must include providers: [DialogGuard] on Lazt-Loaded modules
 */
export class DialogGuard {

    navigated = false;

    constructor(public dialog: MdDialog,
                public translate: TranslateService,
                public router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): boolean {
        return this.redirectDialog(route);
    }

    canActivateChild(route: ActivatedRouteSnapshot,
                     state: RouterStateSnapshot): boolean {
        return this.canActivate(route, state);
    }

    redirectDialog(route: ActivatedRouteSnapshot): boolean {
        const component = route.component;
        const that = this;
        if (route.routeConfig && this.router.config.filter(c => c && c.component && c.component === component
            || this.isChild(c, component, route)
            || this.isLoadedRemote(c, component, route)).length > 0) {
            if (typeof this.dialog._openDialogs[ 0 ] === 'undefined'
                || this.dialog._openDialogs[ 0 ].componentInstance.constructor !== component) {
                that.dialog.closeAll();
                that.dialog.open(component as any, {data: route as any} as MdDialogConfig);
            }
            // router.navigated is unreliable for some reason.
            // https://github.com/angular/router/issues/431
            if (!this.router.navigated && !this.navigated) {
                this.navigated = true;
                this.router.navigate([ '/' ], {replaceUrl: true});
            }
            // For some reason translations aren't loading in dialogs so add this
            this.translate.use(this.translate.currentLang || 'en');
            return false;
        }
        return true;
    }

    isChild(c: Route, component: string | Type<any>, route: ActivatedRouteSnapshot): boolean {
        return c && c.children && c.children.filter(r =>
            r && r.component && r.path
            && r.component === component
            && r.path === route.routeConfig.path).length > 0;
    }

    isLoadedRemote(c: any, component: string | Type<any>, route: ActivatedRouteSnapshot): boolean {
        return typeof c !== 'undefined' && typeof c._loadedConfig !== 'undefined'
            && typeof c._loadedConfig.routes !== 'undefined' && c._loadedConfig.routes.filter((r: Route) => {
                return typeof r !== 'undefined' && typeof r.component !== 'undefined'
                    && typeof r.path !== 'undefined'
                    && r.component === component
                    && r.path === route.routeConfig.path;
            }).length > 0;
    }
}
