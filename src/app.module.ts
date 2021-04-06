import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq'
import { CacheModule, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import * as redisStore from 'cache-manager-redis-store'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { RabbitmqService } from './commons/rabbitmq/rabbitmq.service'
import { ExampleModule } from './modules/example/example.module'

@Module({
    imports: [
        ConfigModule.forRoot(),
        RabbitMQModule.forRoot(RabbitMQModule, {
            uri: process.env.RABBIT_URI,
            prefetchCount: 20,
            // connectionInitOptions: { wait: false },
        }),
        MongooseModule.forRoot(process.env.MONGO_URI, {
            replicaSet: process.env.MONGO_REPLICA_SET,
        }),
        CacheModule.register({
            store: redisStore,
            host: 'localhost',
            port: 6379,
        }),
        ExampleModule,
    ],
    controllers: [AppController],
    providers: [AppService, RabbitmqService],
})
export class AppModule {}
