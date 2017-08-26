import { ComponentFixture, TestBed } from '@angular/core/testing';
import {} from 'jasmine';
import { MockBackend } from '@angular/http/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { LanguageMenuComponent } from './language.component';
import { authTestingProviders, testingPlatformModules } from '../../../testing/core-stubs';

describe('LanguageMenuComponent', () => {
    let router: Router;
    let location: Location;
    let xhr: MockBackend;
    let comp: LanguageMenuComponent;
    let fixture: ComponentFixture<LanguageMenuComponent>;

    // mock everything the SharedModule includes because we need to override AuthService
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [],
            imports: [ ...testingPlatformModules ],
            providers: [ ...authTestingProviders ]
        });
        fixture = TestBed.createComponent(LanguageMenuComponent);
        comp = fixture.componentInstance;
        router = fixture.debugElement.injector.get(Router);
        xhr = fixture.debugElement.injector.get(MockBackend);
        location = fixture.debugElement.injector.get(Location);
    });

    it('should load LanguageComponent', done => {
        fixture.whenStable().then(() => {
            expect(comp instanceof LanguageMenuComponent).toBeTruthy();
            done();
        });
    });

    it('can change the language', done => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            comp.changeLanguage('fr');
            expect(comp.translate.currentLang).toBe('fr');
            done();
        });
    });
});

