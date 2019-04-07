package kl.socialnetwork.testUtils;

import kl.socialnetwork.domain.entities.UserRole;

public class RolesUtils {
    public static UserRole createUserRole() {
        return new UserRole() {{
            setId("1");
            setAuthority("USER");
        }};
    }

    public static UserRole createAdminRole() {
        return new UserRole() {{
            setId("1");
            setAuthority("ADMIN");
        }};
    }

    public static UserRole createRootRole() {
        return new UserRole() {{
            setId("1");
            setAuthority("ROOT");
        }};
    }
}

