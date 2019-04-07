package kl.tennisshop.utils.responseHandler.successResponse;

import java.io.Serializable;
import java.util.Date;

public class SuccessResponse implements Serializable {
  private Date timestamp;
  private String message;
  private Object payload;
  private boolean success;


  public SuccessResponse(Date timestamp, String message, Object payload, boolean success) {
    this.timestamp = timestamp;
    this.message = message;
    this.payload = payload;
    this.success = success;
  }


  public Date getTimestamp() {
    return this.timestamp;
  }

  public void setTimestamp(Date timestamp) {
    this.timestamp = timestamp;
  }

  public String getMessage() {
    return this.message;
  }

  public void setMessage(String message) {
    this.message = message;
  }

  public Object getPayload() {
    return this.payload;
  }

  public void setPayload(Object payload) {
    this.payload = payload;
  }

  public boolean isSuccess() {
    return this.success;
  }

  public void setSuccess(boolean success) {
    this.success = success;
  }
}