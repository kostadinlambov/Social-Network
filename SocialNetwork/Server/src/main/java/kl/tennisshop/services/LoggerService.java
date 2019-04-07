package kl.tennisshop.services;

import kl.tennisshop.domain.entities.Logger;
import kl.tennisshop.domain.models.serviceModels.LoggerServiceModel;

import java.util.List;

public interface LoggerService {

    void saveLog(Logger logger);

    List<LoggerServiceModel> getAllLogs();

    List<LoggerServiceModel> getLogsByUsername(String username);

    boolean deleteAll();

    boolean deleteByName(String username);
}
