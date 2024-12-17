package com.example.shop.repository;

import com.example.shop.entity.Client;
import com.example.shop.entity.Item;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.criteria.*;
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
        if (item.getId() == null) {
            entityManager.persist(item);}
        else {
            CriteriaBuilder cb = entityManager.getCriteriaBuilder();
            CriteriaUpdate<Item> update = cb.createCriteriaUpdate(Item.class);
            Root<Item> root = update.from(Item.class);
            update.set("cost", item.getCost());
            update.set("name", item.getName());
            update.set("count", item.getCount());
            update.set("countUnit", item.getCountUnit());
            update.where(cb.equal(root.get("id"), item.getId()));
            entityManager.createQuery(update).executeUpdate();
        }
        return item.getId();
    }

    @Transactional
    public void delete(Item item) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaDelete<Item> delete = cb.createCriteriaDelete(Item.class);
        Root<Item> root = delete.from(Item.class);
        delete.where(cb.equal(root.get("id"), item.getId()));
        entityManager.createQuery(delete).executeUpdate();
    }
}
