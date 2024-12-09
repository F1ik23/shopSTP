package com.example.shop.services;

import com.example.shop.entity.Order;
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
        orderRepository.save(order);
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
