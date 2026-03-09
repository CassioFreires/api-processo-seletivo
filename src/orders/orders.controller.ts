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
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@ApiTags('orders')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('order')
export class OrdersController {
    constructor(private readonly service: OrdersService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Roles('admin')
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
    @Roles('admin')
    @ApiOperation({ summary: 'Update an existing order' })
    @ApiParam({ name: 'id', description: 'Order ID / numeroPedido' })
    async update(@Param('id') id: string, @Body() dto: UpdateOrderDto) {
        return this.service.update(id, dto);
    }

    @Delete(':id')
    @Roles('admin')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Delete an order' })
    @ApiParam({ name: 'id', description: 'Order ID / numeroPedido' })
    async remove(@Param('id') id: string) {
        await this.service.remove(id);
        return { message: 'Order deleted successfully' };
    }
}