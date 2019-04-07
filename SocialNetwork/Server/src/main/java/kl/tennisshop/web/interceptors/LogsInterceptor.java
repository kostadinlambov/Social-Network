package kl.tennisshop.web.interceptors;

import kl.tennisshop.domain.entities.Logger;
import kl.tennisshop.services.LoggerService;
import org.springframework.stereotype.Component;

import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.time.LocalDateTime;

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
                StringBuffer requestURL = request.getRequestURL();
                String requestURI = request.getRequestURI();

                String tableName = request.getRequestURI().split("/")[1];
                String action = request.getRequestURI().split("/")[2];
                String principal = request.getUserPrincipal().getName();

                System.out.println(method);
                System.out.println(principal);
                System.out.println(tableName);

                Logger logger = new Logger();
                logger.setMethod(method);
                logger.setUsername(principal);
                logger.setTableName(tableName);
                logger.setAction(action);
                logger.setTime(LocalDateTime.now());

                this.loggerService.saveLog(logger);
            }
        }
        return super.preHandle(request, response, handler);
    }
}
