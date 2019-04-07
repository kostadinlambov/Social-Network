package kl.tennisshop.domain.entities;

import org.hibernate.annotations.GenericGenerator;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.*;

@Entity
@Table(name = "roles")
public class UserRole  extends BaseEntity implements GrantedAuthority {
    private String authority;

//    private Set<User> user;

    public UserRole() {
    }

    @Column(name = "authority", nullable = false)
    public String getAuthority() {
        return this.authority;
    }

    public void setAuthority(String authority) {
//        Pattern pattern = Pattern.compile("^[a-zA-Z]+$");
//        Matcher matcher = pattern.matcher(authority);
//        if (!matcher.find()) {
//            throw new IllegalArgumentException("Roles Name must contain only letters");
//        }
        this.authority = authority;
    }
//
//    @Override
//    public String getAuthority() {
//        return null;
//    }

//    @ManyToMany(targetEntity = )
//    public Set<User> getUser() {
//        return this.user;
//    }
//
//    public void setUser(Set<User> user) {
//        this.user = user;
//    }
}
