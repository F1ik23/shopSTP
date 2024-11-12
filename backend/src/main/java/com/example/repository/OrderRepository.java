package com.example.repository;

import com.example.entity.Order;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import java.util.List;

@Repository
public class OrderRepository {

    private static final EntityManagerFactory emf = Persistence.createEntityManagerFactory("H2PersistenceUnit");

    public List<Order> findByClientId(Integer id) {
        EntityManager em = emf.createEntityManager();
        List<Order> orders = em.createQuery("select * from Order o where o.client_id = :id", Order.class).getResultList();
        return orders;
    }

    public List<Order> findAllOrders() {
        EntityManager em = emf.createEntityManager();
        //List<Order> orders = em.createQuery("select * from Order", Order.class).getResultList();
        List<Order> orders = em.createNamedQuery("Order.findAll").getResultList();
        return orders;
    }

    public Order findOneOrder(Integer id) {
        EntityManager em = emf.createEntityManager();
        Order order = em.find(Order.class, id);
        return order;
    }

}
