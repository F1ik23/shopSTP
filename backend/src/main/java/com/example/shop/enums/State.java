package com.example.shop.enums;


import lombok.Getter;

@Getter
public enum State {

    COMPLETED ("Завершено"),
    NOT_COMPLETED ("Не завершено"),
    WAITING ("Ожидает оплаты"),
    PAID ("Оплачено"),
    AWAITING_DEPARTURE ("Ожидает отправки"),
    SENT ("Отправлено"),
    HANDED ("Вручено");

    private String title;

    State(String title) {
        this.title = title;
    }
}
