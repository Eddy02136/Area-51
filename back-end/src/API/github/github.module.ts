import {Module} from "@nestjs/common";
import {GithubController} from "./github.controller";
import {GithubService} from "./github.service";
import {ConfigModule} from "@nestjs/config";
import {HttpModule} from "@nestjs/axios";
import {UsersModule} from "../../users/users.module";

@Module({
    imports: [
        ConfigModule.forRoot(),
        HttpModule,
        UsersModule,
    ],
    controllers: [GithubController],
    providers: [GithubService],
    exports: [GithubService]
})

export class GithubModule {}
