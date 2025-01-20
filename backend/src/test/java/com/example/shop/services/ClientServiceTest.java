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
import com.example.shop.entity.Client;
import com.example.shop.repository.ClientRepository;

@ExtendWith(MockitoExtension.class)
class ClientServiceTest {
    @Mock
    private ClientRepository clientRepository;
    
    @InjectMocks
    private ClientService clientService;
    
    @Test
    void setClient_ShouldSaveClientSuccessfully() {
        // Подготавливаем тестовые данные
        Client client = new Client();
        client.setName("Иван");
        client.setPhone("+79001234567");
        client.setAge(25);
        client.setSex("M");
        
        // Выполняем тестируемый метод
        clientService.setClient(client);
        
        // Проверяем, что клиент был сохранен через репозиторий
        verify(clientRepository).save(client);
    }
    
    @Test
    void setClient_WhenClientIsNull_ShouldThrowIllegalArgumentException() {
        // Проверяем, что при передаче null-клиента выбрасывается исключение
        assertThrows(IllegalArgumentException.class, () -> clientService.setClient(null));
    }
    
    @Test
    void setClient_WhenClientHasInvalidPhone_ShouldThrowIllegalArgumentException() {
        // Подготавливаем клиента с неверным форматом телефона
        Client client = new Client();
        client.setName("Иван");
        client.setPhone("неверный-формат-телефона");
        client.setAge(25);
        client.setSex("M");
        
        // Проверяем, что при неверном формате телефона выбрасывается исключение
        assertThrows(IllegalArgumentException.class, () -> clientService.setClient(client));
    }
    
    @Test
    void setClient_WhenClientHasInvalidAge_ShouldThrowIllegalArgumentException() {
        // Подготавливаем клиента с недопустимым возрастом
        Client client = new Client();
        client.setName("Иван");
        client.setPhone("+79001234567");
        client.setAge(-1);
        client.setSex("M");
        
        // Проверяем, что при отрицательном возрасте выбрасывается исключение
        assertThrows(IllegalArgumentException.class, () -> clientService.setClient(client));
    }
    
    @Test
    void getAllClients_WhenNoClients_ShouldReturnEmptyList() {
        // Настраиваем мок на возврат пустого списка клиентов
        when(clientRepository.getAllClients()).thenReturn(Collections.emptyList());
        
        // Получаем список клиентов
        List<Client> result = clientService.getAllClients();
        
        // Проверяем, что список пустой
        assertTrue(result.isEmpty());
        // Проверяем, что метод репозитория был вызван
        verify(clientRepository).getAllClients();
    }
    
    @Test
    void getRandomClient_WhenNoClientsExist_ShouldThrowResponseStatusException() {
        // Настраиваем мок на выброс исключения при отсутствии клиентов
        when(clientRepository.getRandomClient()).thenThrow(new RuntimeException());
        
        // Проверяем, что при отсутствии клиентов выбрасывается исключение
        assertThrows(ResponseStatusException.class, () -> clientService.getRandomClient());
    }
    
    @Test
    void deleteClient_WhenClientNotFound_ShouldThrowResponseStatusException() {
        // Подготавливаем тестового клиента
        Client client = new Client();
        client.setId(999L);
        // Настраиваем мок на выброс исключения при попытке удаления несуществующего клиента
        doThrow(new RuntimeException("Клиент не найден"))
            .when(clientRepository).delete(client);
        
        // Проверяем, что при попытке удаления несуществующего клиента выбрасывается исключение
        assertThrows(ResponseStatusException.class, () -> clientService.deleteClient(client));
    }
    
    @Test
    void setClient_WhenClientHasEmptyName_ShouldThrowIllegalArgumentException() {
        // Подготавливаем клиента с пустым именем
        Client client = new Client();
        client.setName("");
        client.setPhone("+79001234567");
        client.setAge(25);
        client.setSex("M");
        
        // Проверяем, что при пустом имени выбрасывается исключение
        assertThrows(IllegalArgumentException.class, () -> clientService.setClient(client));
    }
    
    @Test
    void setClient_WhenClientHasNullFields_ShouldThrowIllegalArgumentException() {
        // Создаем несколько тестовых случаев с разными null-полями
        Client clientWithNullPhone = new Client();
        clientWithNullPhone.setName("Иван");
        clientWithNullPhone.setAge(25);
        clientWithNullPhone.setSex("M");
        // phone остается null

        Client clientWithNullAge = new Client();
        clientWithNullAge.setName("Иван");
        clientWithNullAge.setPhone("+79001234567");
        clientWithNullAge.setSex("M");
        // age остается null

        Client clientWithNullSex = new Client();
        clientWithNullSex.setName("Иван");
        clientWithNullSex.setPhone("+79001234567");
        clientWithNullSex.setAge(25);
        // sex остается null

        // Проверяем все случаи
        assertAll(
            () -> assertThrows(IllegalArgumentException.class, () -> clientService.setClient(clientWithNullPhone)),
            () -> assertThrows(IllegalArgumentException.class, () -> clientService.setClient(clientWithNullAge)),
            () -> assertThrows(IllegalArgumentException.class, () -> clientService.setClient(clientWithNullSex))
        );
    }
    
    @Test
    void setClient_WhenClientAlreadyExists_ShouldUpdateClient() {
        // Подготавливаем существующего клиента
        Client existingClient = new Client();
        existingClient.setId(1L);
        existingClient.setName("Иван");
        existingClient.setPhone("+79001234567");
        existingClient.setAge(25);
        existingClient.setSex("M");
        
        // Настраиваем мок на возврат ID клиента
        when(clientRepository.save(existingClient)).thenReturn(existingClient.getId());
        
        // Выполняем обновление клиента
        clientService.setClient(existingClient);
        
        // Проверяем, что метод save был вызван
        verify(clientRepository).save(existingClient);
    }
}