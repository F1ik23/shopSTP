package com.example.shop.controllers;

import com.example.shop.entity.Client;
import com.example.shop.entity.Order;
import com.example.shop.repository.OrderRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import java.util.List;

@RestController
public class GetRestController {
    OrderRepository or;

    @PersistenceContext
    private EntityManager entityManager;

    @GetMapping("/get-clients")
    public List<Client> getAllClients() {
        return entityManager.createQuery("SELECT * FROM Clients", Client.class).getResultList();
    }

//    @GetMapping("/get-orders")
//    public List<Order> getOrdersFromClient(Integer id) {
//        return entityManager.createQuery("SELECT * FROM Orders o where o.client_id = :id", Client.class).getResultList();
//    }
    @GetMapping("/get-all-orders")
    public List<Order> getAllOrders() {
        return or.findAllOrders();
    }
}
