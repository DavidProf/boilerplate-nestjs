import { QueueOptions, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq'
import { applyDecorators } from '@nestjs/common'

export const Consumer = (
    queue: string,
    {
        exchange,
        routingKey,
        queueOptions,
    }: {
        exchange?: string
        routingKey?: string | string[]
        queueOptions?: QueueOptions
    } = {},
) => {
    return applyDecorators(
        RabbitSubscribe({
            queue: queue,
            exchange: exchange ?? '*',
            routingKey: routingKey ?? [],
            queueOptions: {
                durable: false,
                ...(queueOptions ?? {}),
            },
            errorHandler: (_channel, _msg, error) => {
                console.error(error)
            },
        }),
    )
}
