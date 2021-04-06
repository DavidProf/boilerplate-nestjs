import { CacheModule, Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ExampleController } from './example.controller'
import { ExampleService } from './example.service'
import { ExampleSchema } from './schemas/example.schema'
import * as redisStore from 'cache-manager-redis-store'

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: 'example',
                schema: ExampleSchema,
            },
        ]),
        CacheModule.register({
            store: redisStore,
            host: 'localhost',
            port: 6379,
        }),
    ],
    controllers: [ExampleController],
    providers: [ExampleService],
})
export class ExampleModule {}
