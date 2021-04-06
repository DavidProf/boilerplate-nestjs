import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { name, description, version, license } from 'package.json'
import { ValidationPipe } from '@nestjs/common'

process.env.APP_NAME = name

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { logger: true })

    app.useGlobalPipes(new ValidationPipe())

    app.enableShutdownHooks()

    const config = new DocumentBuilder()
        .setTitle(`API docs - ${name}`)
        .setDescription(description)
        .setVersion(version)
        .setLicense(license, '')
        .build()
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('doc', app, document, {
        customCss:
            'body,select,input{background:rgb(34, 37, 38)!important;} * :not(.highlight-code *,.model-box *:is(span,.model-title__text)){color:#e2e2e2!important} .opblock-section-header {background:#f0f0f000!important;}' +
            // get
            '.opblock.opblock-get{border-color: rgb(1, 74, 149)!important;background:rgba(1, 73, 145, 0.1)!important;}' +
            '.opblock.opblock-get .opblock-summary-method{background:rgb(1, 73, 145)!important;}' +
            // post
            '.opblock.opblock-post{border-color: rgb(38, 134, 90)!important;background:rgba(42, 149, 112, 0.1)!important;}' +
            '.opblock.opblock-post .opblock-summary-method{background:rgb(42, 149, 112)!important;}' +
            // put
            '.opblock.opblock-put{border-color: rgb(163, 91, 2)!important;background:rgba(174, 98, 3, 0.1)!important;}' +
            '.opblock.opblock-put .opblock-summary-method{background:rgb(174, 98, 3)!important;}' +
            // delete
            '.opblock.opblock-delete{border-color: rgb(157, 5, 5)!important;background:rgba(165, 5, 5, 0.1)!important;}' +
            '.opblock.opblock-delete .opblock-summary-method{background:rgb(165, 5, 5)!important;}' +
            // patch
            '.opblock.opblock-patch{border-color: rgb(22, 140, 114)!important;background:rgba(24, 149, 128, 0.1)!important;}' +
            '.opblock.opblock-patch .opblock-summary-method{background:rgb(24, 149, 128)!important;}',
    })

    await app.listen(process.env.PORT ?? 3141)
}
bootstrap()
