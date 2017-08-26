import { ComponentFixture, TestBed } from '@angular/core/testing';
import {} from 'jasmine';
import { MockBackend } from '@angular/http/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { SupportMenuComponent } from './support.component';
import { authTestingProviders, testingPlatformModules } from '../../../testing/core-stubs';

describe('SupportComponent', () => {
    let router: Router;
    let location: Location;
    let xhr: MockBackend;
    let comp: SupportMenuComponent;
    let fixture: ComponentFixture<SupportMenuComponent>;

    // mock everything the SharedModule includes because we need to override AuthService
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [],
            imports: [ ...testingPlatformModules ],
            providers: [ ...authTestingProviders ]
        });
        fixture = TestBed.createComponent(SupportMenuComponent);
        comp = fixture.componentInstance;
        router = fixture.debugElement.injector.get(Router);
        xhr = fixture.debugElement.injector.get(MockBackend);
        location = fixture.debugElement.injector.get(Location);
    });

    it('should load SupportComponent', done => {
        fixture.whenStable().then(() => {
            done();
        });
    });
});

