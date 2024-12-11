package com.example.shop.repository;

import com.example.shop.entity.Order;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Root;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Repository;

import jakarta.persistence.EntityManager;
import java.util.List;

@Repository
public class OrderRepository {

    @PersistenceContext
    private EntityManager entityManager;

    public List<Order> getAllOrders() {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Order> query = cb.createQuery(Order.class);
        Root<Order> root = query.from(Order.class);
        root.fetch("items", JoinType.LEFT);
        query.select(root);
        return entityManager.createQuery(query).getResultList();
    }

    @Transactional
    public Long save(Order order) {
        if (order.getId() == null) {
            entityManager.persist(order);}
        else entityManager.merge(order);
        return order.getId();
    }

    @Transactional
    public void delete(Order order) {
        Order foundOrder = entityManager.find(Order.class, order.getId());
        entityManager.remove(foundOrder);
    }

}
