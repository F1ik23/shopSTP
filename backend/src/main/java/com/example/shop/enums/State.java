package com.example.shop.enums;


import lombok.Getter;

@Getter
public enum State {

    COMPLETED ("Завершено"),
    NOTCOMPLETED ("Не завершено"),
    WAITING ("Ожидает оплаты"),
    PAID ("Оплачено"),
    AWAITINGDEPARTURE ("Ожидает отправки"),
    SENT ("Отправлено"),
    HANDED ("Вручено");

    private String title;

    State(String title) {
        this.title = title;
    }
}
