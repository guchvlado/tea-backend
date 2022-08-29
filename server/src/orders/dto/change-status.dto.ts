import { ApiProperty } from "@nestjs/swagger";

export class ChangeStatusDto {
    @ApiProperty({example: 'done', description: 'статус заказа'})
    readonly status: string;
}