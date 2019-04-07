package kl.tennisshop;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class TennisShopApplication {

    public static void main(String[] args) {
        SpringApplication.run(TennisShopApplication.class, args);
    }
}
