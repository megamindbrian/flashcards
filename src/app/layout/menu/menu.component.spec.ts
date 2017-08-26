import { ComponentFixture, TestBed } from '@angular/core/testing';
import {} from 'jasmine';
import { MockBackend } from '@angular/http/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MenuComponent } from './menu.component';
import { httpTestingProviders, testingPlatformModules } from '../../../testing/core-stubs';

describe('MenuComponent', () => {
    let router: Router;
    let location: Location;
    let xhr: MockBackend;
    let comp: MenuComponent;
    let fixture: ComponentFixture<MenuComponent>;

    // mock everything the SharedModule includes because we need to override AuthService
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [],
            imports: [ ...testingPlatformModules ],
            providers: [ ...httpTestingProviders ]
        });
        fixture = TestBed.createComponent(MenuComponent);
        comp = fixture.componentInstance;
        router = fixture.debugElement.injector.get(Router);
        xhr = fixture.debugElement.injector.get(MockBackend);
        location = fixture.debugElement.injector.get(Location);
    });

    it('should load MenuComponent', done => {
        fixture.whenStable().then(() => {
            expect(comp instanceof MenuComponent).toBeTruthy();
            done();
        });
    });
});

