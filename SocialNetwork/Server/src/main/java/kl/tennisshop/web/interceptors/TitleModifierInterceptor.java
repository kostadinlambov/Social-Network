package kl.tennisshop.web.interceptors;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component("title_modifier")
public class TitleModifierInterceptor extends HandlerInterceptorAdapter {

    @Override
    public void postHandle(HttpServletRequest request,
                           HttpServletResponse response,
                           Object handler,
                           ModelAndView modelAndView) throws Exception {
        if (modelAndView == null) {
            return;
        }
        String viewName = modelAndView.getViewName();
        if (viewName.startsWith("redirect:")) {
            return;
        }

        Object titleCandidate = modelAndView.getModelMap().get("title");
        if (titleCandidate == null) {
            modelAndView.getModel().put("title", "SoftUni");
        } else {
            String title = titleCandidate.toString();
            modelAndView.getModel().put("title", "SoftUni - " + title);
        }
    }
}
