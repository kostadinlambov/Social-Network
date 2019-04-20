package kl.socialnetwork.servicesImpl;

import kl.socialnetwork.domain.entities.Logger;
import kl.socialnetwork.domain.models.serviceModels.LoggerServiceModel;
import kl.socialnetwork.repositories.LoggerRepository;
import kl.socialnetwork.services.LoggerService;
import kl.socialnetwork.utils.responseHandler.exceptions.CustomException;
import kl.socialnetwork.validations.serviceValidation.services.LoggerValidationService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import static kl.socialnetwork.utils.constants.ResponseMessageConstants.*;

@Service
public class LoggerServiceImpl implements LoggerService {
    private final ModelMapper modelMapper;
    private final LoggerRepository loggerRepository;
    private final LoggerValidationService loggerValidation;

    @Autowired
    public LoggerServiceImpl(ModelMapper modelMapper, LoggerRepository loggerRepository, LoggerValidationService loggerValidation) {
        this.loggerRepository = loggerRepository;
        this.modelMapper = modelMapper;
        this.loggerValidation = loggerValidation;
    }

    @Override
    public boolean createLog(String method, String principal, String tableName, String action) {
        if (!loggerValidation.isValid(method, principal, tableName, action)) {
            throw new CustomException(FAILURE_LOGS_SAVING_MESSAGE);
        }

        LoggerServiceModel loggerServiceModel = new LoggerServiceModel();
        loggerServiceModel.setMethod(method);
        loggerServiceModel.setUsername(principal);
        loggerServiceModel.setTableName(tableName);
        loggerServiceModel.setAction(action);
        loggerServiceModel.setTime(LocalDateTime.now());

        if (!loggerValidation.isValid(loggerServiceModel)) {
            throw new CustomException(FAILURE_LOGS_SAVING_MESSAGE);
        }

        Logger logger = this.modelMapper.map(loggerServiceModel, Logger.class);

        Logger savedLog = this.loggerRepository.save(logger);

        if (savedLog != null) {
            return true;
        }

        throw new CustomException(FAILURE_LOGS_SAVING_MESSAGE);
    }

    @Override
    public List<LoggerServiceModel> getAllLogs() {
        return this.loggerRepository
                .findAllByOrderByTimeDesc()
                .stream()
                .map(x -> this.modelMapper.map(x, LoggerServiceModel.class))
                .collect(Collectors.toUnmodifiableList());
    }

    @Override
    public List<LoggerServiceModel> getLogsByUsername(String username) {
        if (!loggerValidation.isValid(username)) {
            throw new CustomException(SERVER_ERROR_MESSAGE);
        }

        List<LoggerServiceModel> logsByUsername = this.loggerRepository
                .findAllByUsernameOrderByTimeDesc(username)
                .stream()
                .map(x -> this.modelMapper.map(x, LoggerServiceModel.class))
                .collect(Collectors.toUnmodifiableList());

        if (logsByUsername.size() == 0) {
            throw new CustomException(FAILURE_LOGS_NOT_FOUND_MESSAGE);
        }

        return logsByUsername;
    }

    @Override
    public boolean deleteAll() {
        try {
            this.loggerRepository.deleteAll();
            return true;
        } catch (Exception e) {
            throw new CustomException(FAILURE_LOGS_CLEARING_ERROR_MESSAGE);
        }
    }

    @Override
    public boolean deleteByName(String username) {
        if (!loggerValidation.isValid(username)) {
            throw new CustomException(SERVER_ERROR_MESSAGE);
        }

        List<Logger> loggers = this.loggerRepository.deleteAllByUsername(username);

        if (loggers.size() == 0) {
            throw new CustomException(FAILURE_LOGS_NOT_FOUND_MESSAGE);
        }
        return true;
    }

////    @Scheduled(cron = "* */30 * * * *")
//    @Scheduled(cron = "0 0 2 * * * ")
//    public void testSchedule(){
//        this.deleteAll();
//        System.out.println("Logs deleted successfully!");
//    }
}


