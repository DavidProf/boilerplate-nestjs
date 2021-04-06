import { Test, TestingModule } from '@nestjs/testing'
import { AppController } from './app.controller'

describe('AppController', () => {
    let appController: AppController

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [AppController],
            providers: [],
        }).compile()

        appController = app.get<AppController>(AppController)
    })

    describe('root', () => {
        it('should return ping object', (done) => {
            const ping = appController.ping()
            expect(ping).toBeDefined()
            expect(ping.app).toBeTruthy()
            expect(ping.message).toBeTruthy()
            expect(ping.pid).toBeTruthy()
            expect(ping.environment).toBeTruthy()
            done()
        })
    })
})
