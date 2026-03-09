import { IsString, IsNumber, IsISO8601, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

class ItemUpdateDto {
  @IsString()
  idItem: string;

  @IsNumber()
  quantidadeItem: number;

  @IsNumber()
  valorItem: number;
}

export class UpdateOrderDto {

  @IsOptional()
  @IsString()
  numeroPedido?: string;

  @IsOptional()
  @IsNumber()
  valorTotal?: number;

  @IsOptional()
  @IsISO8601()
  dataCriacao?: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ItemUpdateDto)
  items?: ItemUpdateDto[];
}