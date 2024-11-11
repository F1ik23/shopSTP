package com.example.shop;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import javax.persistence.*;

@SpringBootApplication
public class ShopApplication {

	public static void main(String[] args) {

		EntityManagerFactory emf = Persistence.createEntityManagerFactory("H2PersistenceUnit");
		EntityManager em = emf.createEntityManager();


		SpringApplication.run(ShopApplication.class, args);
	}

}
