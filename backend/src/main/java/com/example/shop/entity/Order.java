package com.example.shop.entity;

import lombok.Getter;
import lombok.Setter;

import jakarta.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "Order")
@Getter
@Setter
public class Order {

    @ManyToOne
    @JoinColumn(name = "Client_id")
    private Client client;

    @OneToMany
    private List<Item> items;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id")
    private Integer id;

    @Column(name = "Date")
    private Date date;

    @Column(name = "State")
    private String state;
}
