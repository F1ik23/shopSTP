package com.example.shop.controllers;

import com.example.shop.entity.Item;
import com.example.shop.services.ItemService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/items")
public class ItemController {

    private ItemService itemService;

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/get")
    public List<Item> getAllItems() {
        return itemService.getAllItems();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/set")
    public void setItem(@RequestBody Item item) {
        itemService.setItem(item);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping("/delete")
    public void deleteItem(@RequestBody Item item) { itemService.deleteItem(item); }
}
