package com.example.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "Item")
@Getter
@Setter
public class Item {

    @ManyToOne
    @JoinColumn(name = "Order_id")
    private Order order;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id")
    private Integer id;

    @Column(name = "Cost")
    private Double cost;

    @Column(name = "Name")
    private String name;

    @Column(name = "Count")
    private Integer count;

    @Column(name = "CountUnit")
    private Double countUnit;
}
