import { ApiProperty } from "@nestjs/swagger";

interface dataItem {
    teaId: number;
    teaQuantity: number;
}

const example = {
    items: [{teaId: 1, teaQuantity: 123}],
    name: "Олег",
    phone: '8 800 555 35 35',
    address: 'Москва, Кремлёвская набережная, д. 1, кв. 1',
    time: 'morning'
}

export class CreateOrderDto {
    @ApiProperty({example, description: 'Данные заказа'})
    readonly items: dataItem[];
    readonly name: string;
    readonly phone: string;
    readonly address: string;
    readonly time: string;
}