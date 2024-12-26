package com.example.shop.repository;

import com.example.shop.entity.ItemOrder;
import com.example.shop.entity.Order;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.criteria.*;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Repository;

import jakarta.persistence.EntityManager;
import java.util.List;

@Repository
public class OrderRepository {

    @PersistenceContext
    private EntityManager entityManager;

    public List<Order> getAllOrders() {
//        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
//        CriteriaQuery<Order> query = cb.createQuery(Order.class);
//        Root<Order> root = query.from(Order.class);
//        root.fetch("items", JoinType.LEFT);
//        query.select(root);
//        return entityManager.createQuery(query).getResultList();
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Order> query = cb.createQuery(Order.class);
        Root<Order> root = query.from(Order.class);
        root.fetch("items", JoinType.LEFT);
        Join<Order, ItemOrder> itemOrdersJoin = root.join("items", JoinType.LEFT);
        itemOrdersJoin.fetch("item", JoinType.LEFT);
        return entityManager.createQuery(query).getResultList();
    }

    @Transactional
    public Long save(Order order) {
        if (order.getId() == null) {
            entityManager.persist(order);
        }
        else {
            CriteriaBuilder cb = entityManager.getCriteriaBuilder();
            CriteriaUpdate<Order> update = cb.createCriteriaUpdate(Order.class);
            Root<Order> root = update.from(Order.class);
            update.set("date", order.getDate());
            update.set("state", order.getState());
            update.where(cb.equal(root.get("id"), order.getId()));
            entityManager.createQuery(update).executeUpdate();
        }
        return order.getId();
    }

    @Transactional
    public void delete(Order order) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaDelete<Order> delete = cb.createCriteriaDelete(Order.class);
        Root<Order> root = delete.from(Order.class);
        delete.where(cb.equal(root.get("id"), order.getId()));
        entityManager.createQuery(delete).executeUpdate();
    }

    @Transactional
    public void save(ItemOrder io) {
        if (io.getId() == null) {
            entityManager.persist(io);
        }
    }

}
