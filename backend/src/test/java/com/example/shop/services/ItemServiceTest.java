package com.example.shop.services;

import java.util.List;
import java.util.Arrays;
import java.util.Collections;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.server.ResponseStatusException;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
import com.example.shop.entity.Item;
import com.example.shop.repository.ItemRepository;

@ExtendWith(MockitoExtension.class)
class ItemServiceTest {
    @Mock
    private ItemRepository itemRepository;
    
    @InjectMocks
    private ItemService itemService;
    
    @Test
    void getAllItems_ShouldReturnListOfItems() {
        // Создаем список товаров, который должен вернуть репозиторий
        List<Item> expectedItems = Arrays.asList(new Item(), new Item());
        when(itemRepository.getAllItems()).thenReturn(expectedItems);
        
         // Вызываем тестируемый метод
        List<Item> actualItems = itemService.getAllItems();
        
        // Проверяем, что вернулся ожидаемый список
        assertEquals(expectedItems, actualItems);
        // Проверяем, что метод репозитория был вызван
        verify(itemRepository).getAllItems();
    }
    
    @Test
    void setItem_ShouldSaveItem() {
        // Создаем тестовый товар
        Item item = new Item();
        
        // Вызываем метод сохранения
        itemService.setItem(item);
        
        // Проверяем, что метод save был вызван с нашим товаром
        verify(itemRepository).save(item);
    }
    
    @Test
    void deleteItem_WhenExceptionOccurs_ShouldThrowResponseStatusException() {
        // Создаем тестовый товар
        Item item = new Item();
        doThrow(new RuntimeException()).when(itemRepository).delete(item);
        
        // Проверяем, что при удалении будет выброшено ResponseStatusException
        assertThrows(ResponseStatusException.class, () -> itemService.deleteItem(item));
    }
    
    @Test
    void getAllItems_WhenNoItems_ShouldReturnEmptyList() {
        // Настраиваем мок, чтобы он возвращал пустой список
        when(itemRepository.getAllItems()).thenReturn(Collections.emptyList());
        
        // Вызываем метод
        List<Item> actualItems = itemService.getAllItems();
        
        // Проверяем, что возвращается пустой список
        assertTrue(actualItems.isEmpty());
        verify(itemRepository).getAllItems();
    }
    
    @Test
    void deleteItem_WhenItemDoesNotExist_ShouldThrowResponseStatusException() {
        // Создаем тестовый товар
        Item item = new Item();
        // Настраиваем мок, чтобы он бросал исключение при попытке удаления несуществующего товара
        doThrow(new RuntimeException()).when(itemRepository).delete(item);
        
        // Проверяем, что при удалении будет выброшено ResponseStatusException
        assertThrows(ResponseStatusException.class, () -> itemService.deleteItem(item));
    }
}