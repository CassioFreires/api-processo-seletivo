import { IsString, IsNumber, IsISO8601, ValidateNested, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ItemDto {
  @ApiProperty({ example: '2434' })
  @IsString()
  idItem: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  quantidadeItem: number;

  @ApiProperty({ example: 1000 })
  @IsNumber()
  valorItem: number;
}

export class CreateOrderDto {
  @ApiProperty({ example: 'v10089015vdb-01' })
  @IsString()
  numeroPedido: string;

  @ApiProperty({ example: 10000 })
  @IsNumber()
  valorTotal: number;

  @ApiProperty({ example: '2023-07-19T12:24:11.5299601+00:00' })
  @IsISO8601()
  dataCriacao: string;

  @ApiProperty({ type: [ItemDto] })
  @ValidateNested({ each: true })
  @Type(() => ItemDto)
  @ArrayMinSize(0)
  items: ItemDto[];
}