interface dataItem {
    teaId: number;
    teaQuantity: number;
}

export class CreateOrderDto {
    readonly items: dataItem[];
}