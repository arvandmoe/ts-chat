import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Controller, Get } from "@nestjs/common";

@Controller("health")
@ApiTags("Health")
export class HealthController {
    @ApiOperation(
        {
            summary: "Retrieves the service's health status",
        }
    )
    @ApiResponse({ status: 200, description: "OK", type: String })
    @Get()
    public getHealth(): string {
        return "GOOD";
    }
}
