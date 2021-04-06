import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Cache } from 'cache-manager'
import { Model } from 'mongoose'
import { Example } from './schemas/example.schema'

@Injectable()
export class ExampleService {
    constructor(
        @InjectModel('example') private readonly exampleModel: Model<Example>,
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
    ) {}

    findAll() {
        return this.exampleModel.find()
    }

    async generate(id?: string) {
        let document: Example
        if (id) {
            document = await this.cacheManager.get<Example>(id)
        } else {
            document = await this.exampleModel.create({
                id: `${Math.random()}`,
            })
            await this.cacheManager.set(
                document.id,
                { ...JSON.parse(JSON.stringify(document)), cached: true },
                {
                    ttl: 0,
                },
            )
        }
        return document
    }
}
