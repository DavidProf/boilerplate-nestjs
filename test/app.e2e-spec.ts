import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from './../src/app.module'

describe('AppController (e2e)', () => {
    let app: INestApplication

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile()

        app = moduleFixture.createNestApplication()
        await app.init()
    })

    it('/ping (GET)', (done) => {
        return request(app.getHttpServer())
            .get('/ping')
            .expect(200)
            .then((response) => {
                const ping = response.body
                expect(ping).toBeDefined()
                expect(ping.app).toBeTruthy()
                expect(ping.message).toBeTruthy()
                expect(ping.pid).toBeTruthy()
                expect(ping.environment).toBeTruthy()
                done()
            })
    })
})
