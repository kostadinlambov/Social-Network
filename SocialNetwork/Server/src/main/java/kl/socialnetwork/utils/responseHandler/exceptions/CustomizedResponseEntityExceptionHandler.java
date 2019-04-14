package kl.socialnetwork.utils.responseHandler.exceptions;

import kl.socialnetwork.utils.constants.ResponseMessageConstants;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.net.URISyntaxException;
import java.util.Date;

@ControllerAdvice
@RestController
public class CustomizedResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {

  @ExceptionHandler(Exception.class)
  public final ResponseEntity<ExceptionResponse> handleAllExceptions(Exception ex, WebRequest request) {
     String message = ex.getMessage();
    ExceptionResponse exceptionResponse = new ExceptionResponse(new Date(), message,
        request.getDescription(false), false);
    return new ResponseEntity<>(exceptionResponse, HttpStatus.INTERNAL_SERVER_ERROR);
  }

  @ExceptionHandler(UserNotFoundException.class)
  public final ResponseEntity<ExceptionResponse> handleUserNotFoundException(UserNotFoundException ex, WebRequest request) {
    ExceptionResponse exceptionResponse = new ExceptionResponse(new Date(), ex.getMessage(),
            request.getDescription(false), false);
    return new ResponseEntity<>(exceptionResponse, HttpStatus.NOT_FOUND);
  }


  @ExceptionHandler({ CustomException.class, BadRequestException.class})
  public ResponseEntity<Object> handleException(MethodArgumentNotValidException ex,
                                                HttpHeaders headers, HttpStatus status, WebRequest request) throws URISyntaxException {
    ExceptionResponse exceptionResponse = new ExceptionResponse(new Date(), ex.getMessage(),
            ex.getBindingResult().toString(), false);
    return new ResponseEntity<>(exceptionResponse, HttpStatus.BAD_REQUEST);
  }

  @Override
  protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
                                                                HttpHeaders headers, HttpStatus status, WebRequest request) {
    String errorMessage = ex.getBindingResult().getAllErrors().stream()
            .map(DefaultMessageSourceResolvable::getDefaultMessage)
            .findFirst()
            .orElse(ResponseMessageConstants.VALIDATION_ERROR_MESSAGE);

    ExceptionResponse exceptionResponse = new ExceptionResponse(new Date(), errorMessage,
            ex.getBindingResult().toString(), false);
    System.out.println();
    return new ResponseEntity<>(exceptionResponse, HttpStatus.BAD_REQUEST);
  }
}