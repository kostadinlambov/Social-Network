package kl.socialnetwork.services;

import kl.socialnetwork.domain.entities.Logger;
import kl.socialnetwork.domain.models.serviceModels.LoggerServiceModel;

import java.util.List;

public interface LoggerService {

    void saveLog(Logger logger);

    List<LoggerServiceModel> getAllLogs();

    List<LoggerServiceModel> getLogsByUsername(String username);

    boolean deleteAll();

    boolean deleteByName(String username);
}
