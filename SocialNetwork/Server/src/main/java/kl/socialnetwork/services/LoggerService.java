package kl.socialnetwork.services;

import kl.socialnetwork.domain.models.serviceModels.LoggerServiceModel;
import org.springframework.scheduling.annotation.Scheduled;

import java.util.List;

public interface LoggerService {

    List<LoggerServiceModel> getAllLogs();

    List<LoggerServiceModel> getLogsByUsername(String username);

    boolean deleteAll();

    boolean deleteByName(String username);

    boolean createLog(String method, String principal, String tableName, String action);
}
