import * as logger from 'console'
import { Injectable, OnApplicationShutdown } from '@nestjs/common'
import { Nack } from '@golevelup/nestjs-rabbitmq'
import { ConsumeMessage } from 'amqplib'
import { name } from '../package.json'
import { Consumer } from './commons/rabbitmq/consumer.decorator'
import { RabbitmqService } from './commons/rabbitmq/rabbitmq.service'

@Injectable()
export class AppService implements OnApplicationShutdown {
    constructor(private readonly rabbitmqService: RabbitmqService) {}

    ping(id?: string) {
        const ping = {
            message: 'pong',
            app: name,
            pid: process.pid,
            environment: process.env.NODE_ENV ?? 'unknown',
            requestId: id,
        }
        return ping
    }

    /**
     * @example
     * Do not use this method,
     * prefer to use this.rabbitmqService.send directly
     */
    queue() {
        this.rabbitmqService.send('@queue', { hello: 'world' })
    }

    @Consumer('@queue')
    public async consumer(msg: unknown, amqpMsg: ConsumeMessage) {
        console.log(
            `Received message: ${JSON.stringify(
                msg,
            )}\nOriginal:${amqpMsg.content.toString()}`,
        )
        return new Nack()
    }

    onApplicationShutdown(signal: string) {
        return new Promise((resolve) =>
            setTimeout(function () {
                logger.warn(
                    `${signal} ${name}(${process.pid}) - graceful shutdown`,
                    {
                        logAction: 'graceful shutdown',
                        signal,
                    },
                )
                resolve(0)
                process.exit(0)
            }, 3000),
        )
    }
}
