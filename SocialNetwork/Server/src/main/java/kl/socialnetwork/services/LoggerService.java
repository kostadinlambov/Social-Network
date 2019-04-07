package kl.socialnetwork.services;

import kl.socialnetwork.domain.entities.Logger;
import kl.socialnetwork.domain.models.serviceModels.LoggerServiceModel;
import org.springframework.security.core.Authentication;

import java.util.List;

public interface LoggerService {

    void saveLog(Logger logger);

    List<LoggerServiceModel> getAllLogs(Authentication principal);

    List<LoggerServiceModel> getLogsByUsername(String username);

    boolean deleteAll();

    boolean deleteByName(String username);

    boolean createLog(String method, String principal, String tableName, String action);
}
