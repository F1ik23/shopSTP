package com.example.shop.services;

import com.example.shop.entity.Client;
import com.example.shop.repository.ClientRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@AllArgsConstructor
@Service
public class ClientService {

    private ClientRepository clientRepository;
    public List<Client> getAllClients() {
        try {
            List<Client> allClients = clientRepository.getAllClients();
            return allClients;
        }
        catch (Exception ex) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Невозможно получить список всех клиентов.");
        }
    }

    public void setClient(Client client) {
        if (client == null) {
            throw new IllegalArgumentException("Клиент не может быть null");
        }
        if (client.getName() == null || client.getName().isEmpty()) {
            throw new IllegalArgumentException("Имя клиента не может быть пустым");
        }
        if (client.getPhone() == null) {
            throw new IllegalArgumentException("Телефон клиента не может быть null");
        }
        if (!client.getPhone().matches("\\+7\\(\\d{3}\\)\\d{3}-\\d{2}-\\d{2}")) {
            throw new IllegalArgumentException("Неверный формат телефона. Номер должен начинаться с + и содержать только цифры");
        }
        if (client.getAge() == null) {
            throw new IllegalArgumentException("Возраст клиента не может быть null");
        }
        if (client.getAge() < 0) {
            throw new IllegalArgumentException("Возраст клиента не может быть отрицательным");
        }
        if (client.getSex() == null) {
            throw new IllegalArgumentException("Пол клиента не может быть null");
        }

        clientRepository.save(client);
    }

    public void deleteClient(Client client) {
        try {
            clientRepository.delete(client);
        }
        catch (Exception ex) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Нельзя удалить этого клиента из базы, так как он совершил заказ.");
        }
    }

    public Client getRandomClient() {
        try {
            return clientRepository.getRandomClient();
        }
        catch (Exception ex) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "В системе не существует ни одного клиента.");
        }
    }
}
