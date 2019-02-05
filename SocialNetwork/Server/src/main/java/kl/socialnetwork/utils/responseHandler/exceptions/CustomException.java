package kl.socialnetwork.utils.responseHandler.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
public class CustomException extends RuntimeException{

    public CustomException(String exception) {
        super(exception);
    }
}
