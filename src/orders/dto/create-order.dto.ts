import { IsString, IsNumber, IsISO8601, ValidateNested, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';

export class ItemDto {
  @IsString()
  idItem: string;

  @IsNumber()
  quantidadeItem: number;

  @IsNumber()
  valorItem: number;
}

export class CreateOrderDto {
  @IsString()
  numeroPedido: string;

  @IsNumber()
  valorTotal: number;

  @IsISO8601()
  dataCriacao: string;

  @ValidateNested({ each: true })
  @Type(() => ItemDto)
  @ArrayMinSize(0)
  items: ItemDto[];
}