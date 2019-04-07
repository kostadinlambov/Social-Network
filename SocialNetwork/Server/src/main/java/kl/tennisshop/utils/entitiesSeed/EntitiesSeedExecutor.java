package kl.tennisshop.utils.entitiesSeed;

import kl.tennisshop.domain.entities.Category;
import kl.tennisshop.domain.entities.Racket;
import kl.tennisshop.domain.entities.UserRole;
import kl.tennisshop.repositories.CategoryRepository;
import kl.tennisshop.repositories.RacketRepository;
import kl.tennisshop.repositories.RoleRepository;
import kl.tennisshop.services.CategoryService;
import kl.tennisshop.services.RacketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.math.BigDecimal;

@Component
public class EntitiesSeedExecutor {

    private final RoleRepository roleRepository;
    private final CategoryRepository categoryRepository;
    private final RacketRepository racketRepository;
    private final RacketService racketService;
    private final CategoryService categoryService;


    @Autowired
    public EntitiesSeedExecutor(RoleRepository roleRepository, CategoryRepository categoryRepository, RacketRepository racketRepository, RacketService racketService, CategoryService categoryService) {
        this.roleRepository = roleRepository;
        this.categoryRepository = categoryRepository;
        this.racketRepository = racketRepository;
        this.racketService = racketService;
        this.categoryService = categoryService;
    }

    @PostConstruct
    public void insertEntities() {

        // Role initialisation
        if(roleRepository.count() == 0L ){
            UserRole role1 = new UserRole();
            UserRole role2 = new UserRole();
            UserRole role3 = new UserRole();
            role1.setAuthority("ADMIN");
            role2.setAuthority("USER");
            role3.setAuthority("ROOT");
            this.roleRepository.save(role1);
            this.roleRepository.save(role2);
            this.roleRepository.save(role3);
        }

        // Category initialisation
        if(this.categoryRepository.count() == 0) {
            Category category1 = new Category("Tour racket");
            Category category2 = new Category("Allround racket");
            Category category3 = new Category("Comfort racket");
            Category category4 = new Category("Junior racket");

            this.categoryRepository.save(category1);
            this.categoryRepository.save(category2);
            this.categoryRepository.save(category3);
            this.categoryRepository.save(category4);
        }

        // Racket initialisation
        if (this.racketRepository.count() == 0) {
            Category category1 = this.categoryService.findByName("Tour racket");
            Category category2 = this.categoryService.findByName("Allround racket");
            Category category3 = this.categoryService.findByName("Comfort racket");

            Racket racket1 = new Racket("HEAD Graphene XT Radical MP Tour Racket (strung)",
                    "New Racket",
                    BigDecimal.valueOf(258.36),
                    BigDecimal.valueOf(630),
                    BigDecimal.valueOf(295),
                    "16/19",
                    "http://res.cloudinary.com/tennis-shop/image/upload/v1536158599/xhtpvptovvdukujvy4ub.jpg",
                    category1);

            Racket racket2 = new Racket("Babolat Pure Aero Decima French Open",
                    "As a tribute to his tenth French Open title, without further ado, Babolat has re-designed Rafael Nadal's Pure Aero racket and called it \"\"La Décima\"\"! The playing characteristics of the Pure Aero combined with the new design will amaze you!",
                    BigDecimal.valueOf(245.72),
                    BigDecimal.valueOf(630),
                    BigDecimal.valueOf(295),
                    "16/19",
                    "http://res.cloudinary.com/tennis-shop/image/upload/v1536177745/hu29zuy1xo3cyal3btts.jpg",
                    category1);

            Racket racket3 = new Racket("Wilson " +
                    "Six.One Team 95 18x20 Allround Racket",
                    "New Racket",
                    BigDecimal.valueOf(189.95),
                    BigDecimal.valueOf(612),
                    BigDecimal.valueOf(280),
                    "18/20",
                    "http://res.cloudinary.com/tennis-shop/image/upload/v1536157224/wrqauz4ncuvjbsjy5ife.jpg",
                    category2);

            Racket racket4 = new Racket("Pro Staff 97 Black Countervail Tour Racket",
                    "The Wilson Pro Staff 97 CV stands for quality at the highest level. This racket gives you the feeling you wish for your match.",
                    BigDecimal.valueOf(212.19),
                    BigDecimal.valueOf(626),
                    BigDecimal.valueOf(315),
                    "16/19",
                    "http://res.cloudinary.com/tennis-shop/image/upload/v1536117753/olcpedcqa24wx6r08uh7.jpg",
                    category2);

            Racket racket5 = new Racket("HEAD MXG 5 Comfort racket",
                    "The Head MXG 5 is part of the new Head racket series. The racket represents a good balance between power and control. This means that the racket is suitable for almost every type of player, especially those seeking to take the next step towards competition tennis.",
                    BigDecimal.valueOf(235.66),
                    BigDecimal.valueOf(630),
                    BigDecimal.valueOf(295),
                    "16/18",
                    "http://res.cloudinary.com/tennis-shop/image/upload/v1536116212/ximr4iebzd3jy7zcifq2.jpg",
                    category3);

            //####################################################################################

            Racket racket6 = new Racket("HEAD Graphene XT Radical MP Tour Racket (strung)",
                    "New Racket",
                    BigDecimal.valueOf(258.36),
                    BigDecimal.valueOf(630),
                    BigDecimal.valueOf(295),
                    "16/19",
                    "http://res.cloudinary.com/tennis-shop/image/upload/v1536072459/p1e8xmunhsktwsdaddkn.jpg",
                    category1);

            Racket racket7 = new Racket("Babolat Pure Aero Decima French Open",
                    "As a tribute to his tenth French Open title, without further ado, Babolat has re-designed Rafael Nadal's Pure Aero racket and called it \"\"La Décima\"\"! The playing characteristics of the Pure Aero combined with the new design will amaze you!",
                    BigDecimal.valueOf(245.72),
                    BigDecimal.valueOf(630),
                    BigDecimal.valueOf(295),
                    "16/19",
                    "http://res.cloudinary.com/tennis-shop/image/upload/v1536023253/pq7wvlk5aaohutjgbdru.jpg",
                    category1);

            Racket racket8 = new Racket("Wilson " +
                    "Six.One Team 95 18x20 Allround Racket",
                    "New Racket",
                    BigDecimal.valueOf(189.95),
                    BigDecimal.valueOf(630),
                    BigDecimal.valueOf(295),
                    "18/20",
                    "http://res.cloudinary.com/tennis-shop/image/upload/v1536010714/qoly7zbtaerioe4migbh.jpg",
                    category2);

            Racket racket9 = new Racket("Pro Staff 97 Black Countervail Tour Racket",
                    "The Wilson Pro Staff 97 CV stands for quality at the highest level. This racket gives you the feeling you wish for your match.",
                    BigDecimal.valueOf(212.19),
                    BigDecimal.valueOf(630),
                    BigDecimal.valueOf(295),
                    "16/19",
                    "http://res.cloudinary.com/tennis-shop/image/upload/v1536023253/pq7wvlk5aaohutjgbdru.jpg",
                    category2);

            Racket racket10 = new Racket("HEAD MXG 5 Comfort racket",
                    "The Head MXG 5 is part of the new Head racket series. The racket represents a good balance between power and control. This means that the racket is suitable for almost every type of player, especially those seeking to take the next step towards competition tennis.",
                    BigDecimal.valueOf(235.66),
                    BigDecimal.valueOf(630),
                    BigDecimal.valueOf(295),
                    "16/18",
                    "http://res.cloudinary.com/tennis-shop/image/upload/v1536072459/p1e8xmunhsktwsdaddkn.jpg",
                    category3);

            this.racketService.persistRacket(racket1);
            this.racketService.persistRacket(racket2);
            this.racketService.persistRacket(racket3);
            this.racketService.persistRacket(racket4);
            this.racketService.persistRacket(racket5);

            this.racketService.persistRacket(racket6);
            this.racketService.persistRacket(racket7);
            this.racketService.persistRacket(racket8);
            this.racketService.persistRacket(racket9);
            this.racketService.persistRacket(racket10);
        }
    }
}
