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
import com.example.shop.entity.Order;
import com.example.shop.repository.OrderRepository;
import com.example.shop.entity.ItemOrder;
import com.example.shop.entity.Item;
import com.example.shop.repository.ItemRepository;

@ExtendWith(MockitoExtension.class)
class OrderServiceTest {
    @Mock
    private OrderRepository orderRepository;
    
    @Mock
    private ItemRepository itemRepository;
    
    @InjectMocks
    private OrderService orderService;
    
    @Test
    void getAllOrders_ShouldReturnListOfOrders() {
        // Создаем тестовый список заказов
        List<Order> expectedOrders = Arrays.asList(new Order(), new Order());
        when(orderRepository.getAllOrders()).thenReturn(expectedOrders);
        
        // Вызываем тестируемый метод
        List<Order> actualOrders = orderService.getAllOrders();
        
        // Проверяем результат
        assertEquals(expectedOrders, actualOrders);
        verify(orderRepository).getAllOrders();
    }
    
    @Test
    void getAllOrders_WhenExceptionOccurs_ShouldThrowResponseStatusException() {
        // Настраиваем мок на выброс исключения
        when(orderRepository.getAllOrders()).thenThrow(new RuntimeException());
        
        // Проверяем, что метод выбросит ResponseStatusException
        assertThrows(ResponseStatusException.class, () -> orderService.getAllOrders());
    }
    
    @Test
    void getAllOrders_WhenNoOrders_ShouldReturnEmptyList() {
        // Настраиваем мок, чтобы он возвращал пустой список
        when(orderRepository.getAllOrders()).thenReturn(Collections.emptyList());
        
        // Вызываем метод
        List<Order> actualOrders = orderService.getAllOrders();
        
        // Проверяем, что возвращается пустой список
        assertTrue(actualOrders.isEmpty());
        verify(orderRepository).getAllOrders();
    }
    
    @Test
    void setOrder_ShouldSaveOrderAndUpdateItems() {
        // Создаем тестовые объекты
        Order order = new Order();
        ItemOrder itemOrder = new ItemOrder();
        Item item = new Item();
        // Устанавливаем начальные значения количества товара
        item.setCount(10);
        item.setCountUnit(10.0);
        // Настраиваем связи между объектами
        itemOrder.setItem(item);
        itemOrder.setCount(5);
        itemOrder.setCountUnit(5.0);
        order.setItems(Collections.singletonList(itemOrder));
        
        // Вызываем тестируемый метод
        orderService.setOrder(order);
        
        // Проверяем, что все объекты были сохранены
        verify(orderRepository).save(order);
        verify(orderRepository).save(itemOrder);
        verify(itemRepository).save(item);
        // Проверяем, что количество товара уменьшилось правильно
        assertEquals(5, item.getCount());
        assertEquals(5.0, item.getCountUnit());
    }
    
    @Test
    void setOrder_WhenItemCountExceedsAvailableStock_ShouldThrowIllegalArgumentException() {
        // Создаем тестовые объекты
        Order order = new Order();
        ItemOrder itemOrder = new ItemOrder();
        Item item = new Item();
        // Устанавливаем начальные значения количества товара
        item.setCount(5);
        item.setCountUnit(5.0);
        itemOrder.setItem(item);
        itemOrder.setCount(10);
        itemOrder.setCountUnit(10.0);
        order.setItems(Collections.singletonList(itemOrder));
        
        // Проверяем, что будет выброшено исключение
        assertThrows(IllegalArgumentException.class, () -> orderService.setOrder(order));
    }
    
    @Test
    void deleteOrder_WhenExceptionOccurs_ShouldThrowResponseStatusException() {
        // Создаем тестовый заказ
        Order order = new Order();
        // Настраиваем мок, чтобы он бросал исключение при попытке удаления
        doThrow(new RuntimeException()).when(orderRepository).delete(order);
        
        // Проверяем, что при удалении будет выброшено ResponseStatusException
        assertThrows(ResponseStatusException.class, () -> orderService.deleteOrder(order));
    }
}