package com.example.repository;

import com.example.entity.Client;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

public class ClientRepository {

    @PersistenceContext
    private EntityManager em;

    @Transactional
    public void save(Client client) {
        if (client.getId() == null) em.persist(client);
        else em.merge(client);
    }


}
