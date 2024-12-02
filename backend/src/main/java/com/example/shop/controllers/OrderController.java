package com.example.shop.controllers;


import com.example.shop.services.OrderService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/orders")
public class OrderController {

    private OrderService orderService;

//    @CrossOrigin(origins = "http://localhost:3000")
//    @GetMapping("/get")
//    public List<Item> getAllItems() {
//        return itemService.getAllItems();
//    }
//
//    @CrossOrigin(origins = "http://localhost:3000")
//    @PostMapping("/set")
//    public void setItem(@RequestBody Item item) {
//        itemService.setItem(item);
//    }
}
