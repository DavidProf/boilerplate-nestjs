import { Controller, Get, Param } from '@nestjs/common'
import { ExampleService } from './example.service'

@Controller('example')
export class ExampleController {
    constructor(private readonly exampleService: ExampleService) {}

    @Get()
    async get() {
        return await this.exampleService.generate()
    }

    @Get('/:id')
    async getById(@Param() params?: { id: string }) {
        return await this.exampleService.generate(params.id)
    }
}
