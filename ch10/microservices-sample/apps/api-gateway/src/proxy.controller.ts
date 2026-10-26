import {Body, Controller, HttpStatus, Post, Res,} from '@nestjs/common';
import {HttpService} from '@nestjs/axios';
import type {Response} from 'express';
import {firstValueFrom} from 'rxjs';
import {isAxiosError} from 'axios';

@Controller()
export class ProxyController {
    constructor(
        private readonly httpService: HttpService,
    ) {
    }

    @Post('orders')
    async forwardToOrdersService(
        @Body() body: any,
        @Res() res: Response,
    ): Promise<void> {
        try {
            const {data, status} = await firstValueFrom(
                this.httpService.post<unknown>(
                    'http://localhost:3001/create-order',
                    body,
                    {timeout: 5000},
                ),
            );

            res.status(status).json(data);
        } catch (error: unknown) {
            if (isAxiosError(error)) {
                const status =
                    error.response?.status ?? HttpStatus.BAD_GATEWAY;

                const data =
                    error.response?.data ?? {
                        message: 'Orders service unavailable',
                    };

                res.status(status).json(data);
                return;
            }

            throw error;
        }
    }
}
