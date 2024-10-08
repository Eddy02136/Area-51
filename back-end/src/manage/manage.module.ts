import {Module} from "@nestjs/common";
import {ManageController} from "./manage.controller";
import {ManageService} from "./manage.service";
import {SystemModule} from "../system/sytem.module";

@Module({
    imports: [SystemModule],
    controllers: [ManageController],
    providers: [ManageService],
})

export class ManageModule {}