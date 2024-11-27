package com.example.shop.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import jakarta.persistence.*;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Item")
@Getter
@Setter
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double cost;

    private String name;

    private Integer count;

    private Double countUnit;

    @ManyToOne
    @JoinColumn(name = "Order_id")
    private Order order;

    public Item(Double cost, String name, Integer count, Double countUnit) {
        this.cost = cost;
        this.count = count;
        this.name = name;
        this.countUnit = countUnit;
    }
}