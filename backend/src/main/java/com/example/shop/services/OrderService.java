package com.example.shop.services;

import com.example.shop.entity.Item;
import com.example.shop.entity.Item_Order;
import com.example.shop.entity.Order;
import com.example.shop.repository.ItemRepository;
import com.example.shop.repository.OrderRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@AllArgsConstructor
@Service
public class OrderService {

    private OrderRepository orderRepository;
    private ItemRepository itemRepository;

    public List<Order> getAllOrders() {
        try {
            List<Order> allOrders = orderRepository.getAllOrders();
            return allOrders;
        }
        catch (Exception ex) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage());
        }
    }

    public void setOrder(Order order) {

        try {
            Long id = orderRepository.save(order);
            for (Item_Order ios : order.getItems()) {
                ios.setOrders(order);
                Item item = ios.getItem();
                ios.setItem(item);
                orderRepository.save(ios);
                if (ios.getCountUnit() == null) {
                    ios.setCountUnit(0.0);
                }
                if (ios.getCount() == null) {
                    ios.setCount(0);
                }
                item.setCount(item.getCount() - ios.getCount());
                item.setCountUnit(item.getCountUnit() - ios.getCountUnit());
                itemRepository.save(item);
            }
        }
        catch (Exception ex) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage());
        }
    }

    public void deleteOrder(Order order) {
        try {
            orderRepository.delete(order);
        }
        catch (Exception ex) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage());
        }
    }
}
