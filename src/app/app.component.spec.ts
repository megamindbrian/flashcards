import { AppComponent } from './app.component';
import {} from 'jasmine';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { authTestingProviders, testingPlatformModules } from '../testing/core-stubs';

describe('AppComponent', () => {
    let fixture: ComponentFixture<AppComponent>;
    let comp: AppComponent;
    let router: Router;
    let route: ActivatedRoute;
    let location: Location;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ AppComponent ],
            imports: [
                RouterTestingModule.withRoutes([
                    {
                        path: 'trial',
                        loadChildren: './trial/trial.module#TrialModule'
                    }
                ]),
                ...testingPlatformModules
            ],
            providers: [
                ...authTestingProviders
            ]
        });
        fixture = TestBed.createComponent(AppComponent);
        comp = fixture.componentInstance;
        router = fixture.debugElement.injector.get(Router);
        location = fixture.debugElement.injector.get(Location);
        route = fixture.debugElement.injector.get(ActivatedRoute);
    });

    it('should create AppComponent', () => {
        expect(comp).not.toBeNull('should be created successfully');
    });

    it('should navigate and load the trial page', done => {
        fixture.whenStable().then(() => {
            router.navigate([ '/trial' ]).then(() => {
                expect(location.path()).toBe('/trial');
                done();
            });
        });
    });

});




