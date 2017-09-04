import { ComponentFixture, TestBed } from '@angular/core/testing';
import {} from 'jasmine';
import { MockBackend } from '@angular/http/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AccountLinksComponent } from './account-links.component';
import { By } from '@angular/platform-browser';
import { authTestingProviders, testingPlatformModules } from '../../../testing/core-stubs';

describe('AccountLinksComponent', () => {
    let fixture: ComponentFixture<AccountLinksComponent>;
    let router: Router;
    let location: Location;
    let xhr: MockBackend;
    let comp: AccountLinksComponent;

    // mock everything the SharedModule includes because we need to override AuthService
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [],
            imports: [ ...testingPlatformModules ],
            providers: [ ...authTestingProviders ]
        });
        fixture = TestBed.createComponent(AccountLinksComponent);
        comp = fixture.componentInstance;
        comp.ngAfterViewInit();
        router = fixture.debugElement.injector.get(Router);
        xhr = fixture.debugElement.injector.get(MockBackend);
        location = fixture.debugElement.injector.get(Location);
    });

    it('should load AccountLinksComponent', () => {
        expect(comp).not.toBeNull();
    });

    it('should show login link with unauthenticated', done => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            const button = fixture.debugElement.query(By.css('button'));
            expect(button.nativeElement.innerText).toContain('LOGIN');
            done();
        });
    });

    it('should show logout link with authenticated', done => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            const button = fixture.debugElement.query(By.css('button'));
            expect(button.nativeElement.innerText).toContain('LOGOUT');
            done();
        });
    });

});
