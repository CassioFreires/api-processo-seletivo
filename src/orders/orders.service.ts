import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import db from '../config/db';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
interface OrderPayload {
    order: { orderId: string; value: number; creationDate: string };
    items: Array<{ orderId: string; productId: string; quantity: number; price: number }>;
}

function mapOrderPayload(payload: any): OrderPayload {
    const { numeroPedido, valorTotal, dataCriacao, items } = payload;
    const order = {
        orderId: numeroPedido,
        value: valorTotal,
        creationDate: dataCriacao,
    };
    const mappedItems = (items || []).map((i: any) => ({
        orderId: numeroPedido,
        productId: i.idItem,
        quantity: i.quantidadeItem,
        price: i.valorItem,
    }));
    return { order, items: mappedItems };
}

@Injectable()
export class OrdersService {
    async create(createDto: CreateOrderDto) {
        const { order, items } = mapOrderPayload(createDto);

        const existing = await db('orders').where({ orderId: order.orderId }).first();
        if (existing) {
            throw new ConflictException('Order already exists');
        }

        await db.transaction(async (trx) => {
            await trx('orders').insert(order);
            if (items.length) {
                await trx('items').insert(items);
            }
        });

        return order;
    }

    async findOne(id: string) {
        const order = await db('orders').where({ orderId: id }).first();
        if (!order) return null;
        const items = await db('items').where({ orderId: id });
        return { ...order, items };
    }

    async findAll() {
        const orders = await db('orders').select('*');
        const results: any[] = [];
        for (const o of orders) {
            const items = await db('items').where({ orderId: o.orderId });
            results.push({ ...o, items });
        }
        return results;
    }

    async update(id: string, updateDto: UpdateOrderDto) {
        const updated = await db.transaction(async (trx) => {
            console.log('Updating order', id, updateDto);

            const orderData: any = {};

            if (updateDto.valorTotal !== undefined) {
                orderData.value = updateDto.valorTotal;
            }

            if (updateDto.dataCriacao !== undefined) {
                orderData.creationDate = updateDto.dataCriacao;
            }

            if (updateDto.numeroPedido !== undefined) {
                orderData.orderId = updateDto.numeroPedido;
            }

            const count = await trx('orders')
                .where({ orderId: id })
                .update(orderData);

            if (!count) return null;

            if (updateDto.items) {
                await trx('items').where({ orderId: id }).del();

                const mappedItems = updateDto.items.map((i) => ({
                    orderId: id,
                    productId: i.idItem,
                    quantity: i.quantidadeItem,
                    price: i.valorItem,
                }));

                if (mappedItems.length) {
                    await trx('items').insert(mappedItems);
                }
            }

            return this.findOne(id);
        });

        if (!updated) {
            throw new NotFoundException('Order not found');
        }

        return updated;
    }

    async remove(id: string) {
        const deleted = await db.transaction(async (trx) => {

            await trx('items')
                .where({ orderId: id })
                .del();

            const count = await trx('orders')
                .where({ orderId: id })
                .del();

            return count;
        });

        if (deleted === 0) {
            throw new NotFoundException('Order not found');
        }
    }
}
