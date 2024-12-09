package com.example.shop.controllers;


import com.example.shop.entity.Order;
import com.example.shop.services.OrderService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/orders")
public class OrderController {

    private OrderService orderService;

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/get")
    public List<Order> getAllClients() {
        return orderService.getAllOrders();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/set")
    public void setClient(@RequestBody Order order) {
        orderService.setOrder(order);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping("/delete")
    public void deleteClient(@RequestBody Order order) { orderService.deleteOrder(order); }
}
