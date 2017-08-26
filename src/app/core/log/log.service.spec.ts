import { inject, TestBed } from '@angular/core/testing';
import { LogService } from './log.service';

describe('LogService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                LogService
            ]
        });
    });

    it(
        'can instantiate service when service is injected',
        inject([ LogService ], (logService: LogService) => {
            expect(logService instanceof LogService).toBe(true);
        })
    );

    it('can instantiate service with "new"', () => {
        const service = new LogService();
        expect(service instanceof LogService).toBe(true, 'new service should be ok');
    });

    describe('debug', () => {
        let service: LogService;

        beforeEach(inject([ LogService ], (logService: LogService) => {
            service = logService;
        }));

        it('logs debug message to the console', () => {
            const spy = spyOn(console, 'debug').and.returnValue(null);

            const message = 'test 1,2 1,2';
            service.debug(message);

            expect(spy).toHaveBeenCalled();
        });

        it('passes message with "DEBUG: " prefix to console', () => {
            const spy = spyOn(console, 'debug').and.returnValue(null);

            const message = 'test 1,2 1,2';
            service.debug(message);

            expect(spy).toHaveBeenCalledWith('DEBUG: ' + message);
        });
    });

    describe('info', () => {
        let service: LogService;

        beforeEach(inject([ LogService ], (logService: LogService) => {
            service = logService;
        }));

        it('logs info message to the console', () => {
            const spy = spyOn(console, 'info').and.returnValue(null);

            const message = 'test 1,2 1,2';
            service.info(message);

            expect(spy).toHaveBeenCalled();
        });

        it('passes message with "INFO: " prefix to console', () => {
            const spy = spyOn(console, 'info').and.returnValue(null);

            const message = 'test 1,2 1,2';
            service.info(message);

            expect(spy).toHaveBeenCalledWith('INFO: ' + message);
        });
    });

    describe('warn', () => {
        let service: LogService;

        beforeEach(inject([ LogService ], (logService: LogService) => {
            service = logService;
        }));

        it('logs warn message to the console', () => {
            const spy = spyOn(console, 'warn').and.returnValue(null);

            const message = 'test 1,2 1,2';
            service.warn(message);

            expect(spy).toHaveBeenCalled();
        });

        it('passes message with "WARN: " prefix to console', () => {
            const spy = spyOn(console, 'warn').and.returnValue(null);

            const message = 'test 1,2 1,2';
            service.warn(message);

            expect(spy).toHaveBeenCalledWith('WARN: ' + message);
        });
    });

    describe('error', () => {
        let service: LogService;

        beforeEach(inject([ LogService ], (logService: LogService) => {
            service = logService;
        }));

        it('logs error message to the console', () => {
            const spy = spyOn(console, 'error').and.returnValue(null);

            const message = 'test 1,2 1,2';
            service.error(message);

            expect(spy).toHaveBeenCalled();
        });

        it('passes message with "ERROR: " prefix to console', () => {
            const spy = spyOn(console, 'error').and.returnValue(null);

            const message = 'test 1,2 1,2';
            service.error(message);

            expect(spy).toHaveBeenCalledWith('ERROR: ' + message);
        });
    });

});
