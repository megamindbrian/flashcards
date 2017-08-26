import { ComponentFixture, TestBed } from '@angular/core/testing';
import {} from 'jasmine';
import { MockBackend } from '@angular/http/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ToolbarComponent } from './toolbar.component';
import { authTestingProviders, testingPlatformModules } from '../../../testing/core-stubs';

describe('ToolbarComponent', () => {
    let router: Router;
    let location: Location;
    let xhr: MockBackend;
    let comp: ToolbarComponent;
    let fixture: ComponentFixture<ToolbarComponent>;

    // mock everything the SharedModule includes because we need to override AuthService
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [],
            imports: [ ...testingPlatformModules ],
            providers: [ ...authTestingProviders ]
        });
        fixture = TestBed.createComponent(ToolbarComponent);
        comp = fixture.componentInstance;
        router = fixture.debugElement.injector.get(Router);
        xhr = fixture.debugElement.injector.get(MockBackend);
        location = fixture.debugElement.injector.get(Location);
    });

    it('should load ToolbarComponent', done => {
        fixture.whenStable().then(() => {
            done();
        });
    });
});

