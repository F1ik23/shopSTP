package com.example.shop.controllers;

import com.example.shop.entity.Client;
import com.example.shop.services.ClientService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ClientController {
    ClientService client;

    @PostMapping("/new-client")
    public void setClient(@RequestBody Client clientBody) {
        System.out.println(clientBody);
        client.setClient(clientBody);
    }
}
