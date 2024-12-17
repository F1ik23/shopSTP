package com.example.shop.repository;

import com.example.shop.entity.Client;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.criteria.*;
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
        query.select(root);
        return entityManager.createQuery(query).getResultList();
    }

    @Transactional
    public Long save(Client client) {
        if (client.getId() == null) {
            entityManager.persist(client);}
        else {
            CriteriaBuilder cb = entityManager.getCriteriaBuilder();
            CriteriaUpdate<Client> update = cb.createCriteriaUpdate(Client.class);
            Root<Client> root = update.from(Client.class);
            update.set("name", client.getName());
            update.set("phone", client.getPhone());
            update.set("age", client.getAge());
            update.set("sex", client.getPhone());
            update.where(cb.equal(root.get("id"), client.getId()));
            entityManager.createQuery(update).executeUpdate();
        }
        return client.getId();
    }

    @Transactional
    public void delete(Client client) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaDelete<Client> delete = cb.createCriteriaDelete(Client.class);
        Root<Client> root = delete.from(Client.class);
        delete.where(cb.equal(root.get("id"), client.getId()));
        entityManager.createQuery(delete).executeUpdate();

    }

    public Client getRandomClient() {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Client> query = cb.createQuery(Client.class);
        Root<Client> root = query.from(Client.class);
        query.select(root);
        List<Client> allClients = entityManager.createQuery(query).getResultList();
        Random rand = new Random();
        return allClients.get(rand.nextInt(allClients.size()));
    }

}
