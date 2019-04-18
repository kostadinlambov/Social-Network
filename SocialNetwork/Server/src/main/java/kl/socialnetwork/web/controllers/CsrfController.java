package kl.socialnetwork.web.controllers;

        import org.springframework.security.web.server.csrf.CsrfToken;
        import org.springframework.web.bind.annotation.RequestMapping;
        import org.springframework.web.bind.annotation.RestController;

@RestController
public class CsrfController {
    @RequestMapping("/csrf")
    public CsrfToken csrf(CsrfToken token) {
        return token;
    }

}
