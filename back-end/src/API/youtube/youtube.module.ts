import {Module} from "@nestjs/common";
import {YouTubeController} from "./youtube.controller";
import {YoutubeService} from "./youtube.service";
import {ConfigModule} from "@nestjs/config";
import {HttpModule} from "@nestjs/axios";
import {UsersModule} from "../../users/users.module";

@Module({
    imports: [
        ConfigModule.forRoot(),
        HttpModule,
        UsersModule,
    ],
    controllers: [YouTubeController],
    providers: [YoutubeService],
    exports: [YoutubeService],
})

export class YoutubeModule {}
