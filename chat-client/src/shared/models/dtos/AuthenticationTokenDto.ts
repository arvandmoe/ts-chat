import { UserDto } from "./UserDto"

interface AuthenticationTokenDto {
    user: UserDto
    token: string
}

export type { AuthenticationTokenDto }
