import { ComponentFixture, TestBed } from '@angular/core/testing';
import {} from 'jasmine';
import { MockBackend } from '@angular/http/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FooterComponent } from './footer.component';
import { authTestingProviders, testingPlatformModules } from '../../../testing/core-stubs';

describe('FooterComponent', () => {
    let router: Router;
    let location: Location;
    let xhr: MockBackend;
    let comp: FooterComponent;
    let fixture: ComponentFixture<FooterComponent>;

    // mock everything the SharedModule includes because we need to override AuthService
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [],
            imports: [ ...testingPlatformModules ],
            providers: [ ...authTestingProviders ]
        });
        fixture = TestBed.createComponent(FooterComponent);
        comp = fixture.componentInstance;
        router = fixture.debugElement.injector.get(Router);
        xhr = fixture.debugElement.injector.get(MockBackend);
        location = fixture.debugElement.injector.get(Location);
    });

    it('should load FooterComponent', done => {
        fixture.whenStable().then(() => {
            done();
        });
    });
});

