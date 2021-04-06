import { AmqpConnection } from '@golevelup/nestjs-rabbitmq'
import { Injectable } from '@nestjs/common'

@Injectable()
export class RabbitmqService {
    constructor(private readonly amqpConnection: AmqpConnection) {}

    send(queue: string, msg: unknown, stringify = true) {
        let message: string
        if (stringify || typeof msg !== 'string') {
            message = JSON.stringify(msg ?? null)
        } else {
            message = msg
        }
        this.amqpConnection.channel.sendToQueue(queue, Buffer.from(message), {
            appId: process.env.APP_NAME,
        })
    }
}
