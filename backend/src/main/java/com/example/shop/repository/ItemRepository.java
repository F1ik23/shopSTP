package com.example.shop.repository;

import com.example.shop.entity.Item;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ItemRepository {

    @PersistenceContext
    private EntityManager entityManager;


    public List<Item> getAllItems() {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Item> query = cb.createQuery(Item.class);
        Root<Item> root = query.from(Item.class);
        query.select(root);
        return entityManager.createQuery(query).getResultList();
    }

    @Transactional
    public Long save(Item item) {
        if (item.getId() == null) entityManager.persist(item);
        else entityManager.merge(item);
        return item.getId();
    }
}
