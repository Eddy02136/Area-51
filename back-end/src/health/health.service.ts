import {Injectable, Res} from '@nestjs/common';
import {FastifyReply} from "fastify";

@Injectable()
export class HealthService {

    async getPing(): Promise<{ message: string }> {
        return { message: 'Area51 API responded successfully.' };
    }
}