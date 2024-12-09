package com.example.shop.controllers;

import com.example.shop.entity.Client;
import com.example.shop.services.ClientService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/clients")
public class ClientController {

    private ClientService clientService;

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/get")
    public List<Client> getAllClients() {
        return clientService.getAllClients();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/set")
    public void setClient(@RequestBody Client client) {
        clientService.setClient(client);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping("/delete")
    public void deleteClient(@RequestBody Client client) { clientService.deleteClient(client); }
}
