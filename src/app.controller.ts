import { Controller, Get, Param } from '@nestjs/common'
import {
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiProperty,
    ApiPropertyOptional,
} from '@nestjs/swagger'
import { IsString, Length } from 'class-validator'
import { AppService } from './app.service'

class PingParams {
    @IsString()
    @Length(1, 12)
    @ApiPropertyOptional()
    id: string
}

class PingResponse {
    @ApiProperty({ enum: ['pong'] })
    message: 'pong'
    @ApiProperty()
    app: string
    @ApiProperty()
    pid: number
    @ApiProperty()
    environment: string
}

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get('/ping')
    @ApiOkResponse({
        type: PingResponse,
        description: 'returns some info about the api',
    })
    ping() {
        return this.appService.ping()
    }

    @Get('/ping/:id')
    @ApiOkResponse({
        type: PingResponse,
        description: 'returns some info about the api',
    })
    @ApiNotFoundResponse({ description: 'When not found will return this' })
    pingWithId(@Param() params?: PingParams) {
        return this.appService.ping(params.id)
    }
}
