package com.example.shop.services;

import com.example.shop.entity.Item;
import com.example.shop.repository.ItemRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@AllArgsConstructor
@Service
public class ItemService {
    private ItemRepository itemRepository;

    public List<Item> getAllItems() {
        try {
            List<Item> allItems = itemRepository.getAllItems();
            return allItems;
        }
        catch (Exception ex) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Невозможно получить список товаров на складе.");
        }
    }

    public void setItem(Item item) {
        itemRepository.save(item);
    }

    public void deleteItem(Item item) {
        try {
            itemRepository.delete(item);
        }
        catch (Exception ex) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Этот товар нельзя удалить, так как существуют заказы, связанные с ним.");
        }
    }
}