package kl.tennisshop.domain.models.serviceModels;

import kl.tennisshop.domain.entities.Racket;

import java.util.Set;

public class CategoryServiceModel {
    private String id;
    private String name;
    private Set<Racket> rackets;

    public CategoryServiceModel() {
    }

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Racket> getRackets() {
        return this.rackets;
    }

    public void setRackets(Set<Racket> rackets) {
        this.rackets = rackets;
    }
}
