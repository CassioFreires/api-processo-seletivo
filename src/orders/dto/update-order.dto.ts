import { IsString, IsNumber, IsISO8601, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

class ItemUpdateDto {
  @ApiPropertyOptional({ example: '2434' })
  @IsString()
  idItem: string;

  @ApiPropertyOptional({ example: 1 })
  @IsNumber()
  quantidadeItem: number;

  @ApiPropertyOptional({ example: 1000 })
  @IsNumber()
  valorItem: number;
}

export class UpdateOrderDto {

  @ApiPropertyOptional({ example: 'v10089015vdb-01' })
  @IsOptional()
  @IsString()
  numeroPedido?: string;

  @ApiPropertyOptional({ example: 10000 })
  @IsOptional()
  @IsNumber()
  valorTotal?: number;

  @ApiPropertyOptional({ example: '2023-07-19T12:24:11.5299601+00:00' })
  @IsOptional()
  @IsISO8601()
  dataCriacao?: string;

  @ApiPropertyOptional({ type: [ItemUpdateDto] })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ItemUpdateDto)
  items?: ItemUpdateDto[];
}