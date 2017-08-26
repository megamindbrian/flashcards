import {} from 'jasmine';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { authTestingProviders, testingPlatformModules } from '../../testing/core-stubs';
import { LayoutComponent } from './layout.component';

describe('LayoutComponent', () => {
    let fixture: ComponentFixture<LayoutComponent>;
    let comp: LayoutComponent;
    let router: Router;
    let route: ActivatedRoute;
    let location: Location;

    // mock everything the SharedModule includes because we need to override AuthService
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [],
            imports: [ ...testingPlatformModules ],
            providers: [ ...authTestingProviders ]
        });
        fixture = TestBed.createComponent(LayoutComponent);
        comp = fixture.componentInstance;
        router = fixture.debugElement.injector.get(Router);
        location = fixture.debugElement.injector.get(Location);
        route = fixture.debugElement.injector.get(ActivatedRoute);
    });

    it('should create LayoutComponent', () => {
        expect(comp).not.toBeNull('should be created successfully');
    });
});




