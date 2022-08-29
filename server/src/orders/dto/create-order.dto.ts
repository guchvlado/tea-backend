import { ApiProperty } from "@nestjs/swagger";

interface dataItem {
    teaId: number;
    teaQuantity: number;
}

export class CreateOrderDto {
    @ApiProperty({example: [{teaId: 1, teaQuantity: 123}], description: 'Массив товаров(чая)'})
    readonly items: dataItem[];
}