import { Controller, Get, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { rainbows } from './rainbows';

@Controller('api')
export class UsersController {

  constructor() {}

  @Get('rainbows')
    @UseGuards(AuthGuard())
    getRainbowsList() {
        return {
            rainbows,
        };
    }
}
