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
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage());
        }
    }

    public void setClient(Client client) {
        clientRepository.save(client);
    }

    public void deleteClient(Client client) {
        try {
            clientRepository.delete(client);
        }
        catch (Exception ex) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage());
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
