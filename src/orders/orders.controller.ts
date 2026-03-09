import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Patch,
    Delete,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@ApiTags('orders')
@Controller('order')
export class OrdersController {
    constructor(private readonly service: OrdersService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Create a new order' })
    @ApiResponse({ status: 201, description: 'Order created' })
    @ApiResponse({ status: 409, description: 'Order already exists' })
    async create(@Body() dto: CreateOrderDto) {
        return this.service.create(dto);
    }

    @Get('list')
    @ApiOperation({ summary: 'List all orders' })
    async findAll() {
        console.log('Fetching all orders');
        return this.service.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get order by ID' })
    @ApiParam({ name: 'id', description: 'Order ID / numeroPedido' })
    async findOne(@Param('id') id: string) {
        return this.service.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update an existing order' })
    @ApiParam({ name: 'id', description: 'Order ID / numeroPedido' })
    async update(@Param('id') id: string, @Body() dto: UpdateOrderDto) {
        return this.service.update(id, dto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Delete an order' })
    @ApiParam({ name: 'id', description: 'Order ID / numeroPedido' })
    async remove(@Param('id') id: string) {
        await this.service.remove(id);
        return { message: 'Order deleted successfully' };
    }
}