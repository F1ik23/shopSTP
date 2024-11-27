package com.example.shop.entity;

import lombok.Getter;
import lombok.Setter;

import jakarta.persistence.*;

@Entity
@Table(name = "Item")
@Getter
@Setter
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Double cost;

    private String name;

    private Integer count;

    private Double countUnit;

    @ManyToOne
    @JoinColumn(name = "Order_id")
    private Order order;
}
