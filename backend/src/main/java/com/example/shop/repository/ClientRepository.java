package com.example.shop.repository;

import com.example.shop.entity.Client;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Root;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Random;

@Repository
public class ClientRepository {

    @PersistenceContext
    private EntityManager entityManager;

    public List<Client> getAllClients() {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Client> query = cb.createQuery(Client.class);
        Root<Client> root = query.from(Client.class);
        root.fetch("order", JoinType.LEFT);
        query.select(root);
        return entityManager.createQuery(query).getResultList();
    }

    @Transactional
    public Long save(Client client) {
        if (client.getId() == null) {
            entityManager.persist(client);}
        else entityManager.merge(client);
        return client.getId();
    }

    @Transactional
    public void delete(Client client) {
        Client foundClient = entityManager.find(Client.class, client.getId());
        entityManager.remove(foundClient);
    }

    public Client getRandomClient() {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Client> query = cb.createQuery(Client.class);
        Root<Client> root = query.from(Client.class);
        root.fetch("order", JoinType.LEFT);
        query.select(root);
        List<Client> allClients = entityManager.createQuery(query).getResultList();
        Random rand = new Random();
        return allClients.get(rand.nextInt(allClients.size()));
    }

}
