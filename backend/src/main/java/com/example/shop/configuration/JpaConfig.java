package com.example.shop.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.EclipseLinkJpaVendorAdapter;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@EnableTransactionManagement
public class JpaConfig {

//    @Bean
//    public LocalContainerEntityManagerFactoryBean entityManagerFactory() {
//        LocalContainerEntityManagerFactoryBean factoryBean = new LocalContainerEntityManagerFactoryBean();
//        factoryBean.setPersistenceUnitName("default");
//        factoryBean.setJpaVendorAdapter(new EclipseLinkJpaVendorAdapter());
//        return factoryBean;
//    }

//    @Bean
//    public JpaTransactionManager transactionManager() {
//        return new JpaTransactionManager(entityManagerFactory().getObject());
//    }
}
