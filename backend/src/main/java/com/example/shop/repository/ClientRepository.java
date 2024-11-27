package com.example.shop.repository;

import com.example.shop.entity.Client;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

public class ClientRepository {

    @PersistenceContext
    private EntityManager em;

    @Transactional
    public Integer save(Client client) {
        if (client.getId() == null) em.persist(client);
        else em.merge(client);
        return client.getId();
    }


}
