package kl.socialnetwork.web.interceptors;

import kl.socialnetwork.services.LoggerService;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
public class LogsInterceptor extends HandlerInterceptorAdapter {
   private final LoggerService loggerService;

    public LogsInterceptor(LoggerService loggerService) {
        this.loggerService = loggerService;
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String authorizationHeader = request.getHeader("Authorization");

        if(authorizationHeader != null){
            String method = request.getMethod();

            if((method.equals("POST")|| method.equals("PUT") || method.equals("DELETE")) && !request.getRequestURI().endsWith("error")){
                String tableName = request.getRequestURI().split("/")[1];
                String action = request.getRequestURI().split("/")[2];
                String principal = request.getUserPrincipal().getName();

                loggerService.createLog(method, principal, tableName, action);
            }
        }

        return true;
    }
}
