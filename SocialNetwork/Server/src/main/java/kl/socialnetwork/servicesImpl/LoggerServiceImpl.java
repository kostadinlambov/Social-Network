package kl.socialnetwork.servicesImpl;


import kl.socialnetwork.domain.entities.Logger;
import kl.socialnetwork.domain.entities.User;
import kl.socialnetwork.domain.entities.UserRole;
import kl.socialnetwork.domain.models.serviceModels.LoggerServiceModel;
import kl.socialnetwork.repositories.LoggerRepository;
import kl.socialnetwork.repositories.UserRepository;
import kl.socialnetwork.services.LoggerService;
import kl.socialnetwork.utils.responseHandler.exceptions.CustomException;
import kl.socialnetwork.validations.serviceValidation.services.LoggerValidationService;
import kl.socialnetwork.validations.serviceValidation.services.UserValidationService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import static kl.socialnetwork.utils.constants.ResponseMessageConstants.*;

@Service
//@Transactional
public class LoggerServiceImpl implements LoggerService {
    private final ModelMapper modelMapper;
    private final LoggerRepository loggerRepository;
    private final UserRepository userRepository;
    private final LoggerValidationService loggerValidation;
    private final UserValidationService userValidation;

    @Autowired
    public LoggerServiceImpl(ModelMapper modelMapper, LoggerRepository loggerRepository, UserRepository userRepository, LoggerValidationService loggerValidation, UserValidationService userValidation) {
        this.loggerRepository = loggerRepository;
        this.modelMapper = modelMapper;
        this.userRepository = userRepository;
        this.loggerValidation = loggerValidation;
        this.userValidation = userValidation;
    }

    @Override
    public void saveLog(Logger logger) {
        Logger logger1 = this.loggerRepository.saveAndFlush(logger);
        System.out.println(logger1);
        if(logger1 != null) {
            System.out.println("Log was written successfully");
        }else{
            System.out.println("Failure log saving");
        }
    }

    @Override
    public boolean createLog(String method, String principal, String tableName, String action) {
        if(!loggerValidation.isValid(method, principal, tableName, action)){
            throw new CustomException(FAILURE_LOGS_SAVING_MESSAGE);
        }

        LoggerServiceModel loggerServiceModel = new LoggerServiceModel();
        loggerServiceModel.setMethod(method);
        loggerServiceModel.setUsername(principal);
        loggerServiceModel.setTableName(tableName);
        loggerServiceModel.setAction(action);
        loggerServiceModel.setTime(LocalDateTime.now());

        if(!loggerValidation.isValid(loggerServiceModel)){
            throw new CustomException(FAILURE_LOGS_SAVING_MESSAGE);
        }

        Logger logger = this.modelMapper.map(loggerServiceModel, Logger.class);

        Logger savedLog = this.loggerRepository.save(logger);

        if(savedLog != null){
            return true;
        }

        throw new CustomException(FAILURE_LOGS_SAVING_MESSAGE);
    }

    @Override
    public List<LoggerServiceModel> getAllLogs(Authentication principal) {
        String authority =  getUserAuthority(principal);

        if (!authority.equals("USER")) {
            return this.loggerRepository
                    .findAllByOrderByTimeDesc()
                    .stream()
                    .map(x -> this.modelMapper.map(x, LoggerServiceModel.class))
                    .collect(Collectors.toUnmodifiableList());
        }

        throw new CustomException(UNAUTHORIZED_SERVER_ERROR_MESSAGE);
    }

    @Override
    public List<LoggerServiceModel> getLogsByUsername(String username) {
        List<LoggerServiceModel> logsByUsername = this.loggerRepository
                .findAllByUsernameOrderByTimeDesc(username)
                .stream()
                .map(x -> this.modelMapper.map(x, LoggerServiceModel.class))
                .collect(Collectors.toUnmodifiableList());

        if(logsByUsername.size() == 0){
            throw new CustomException(FAILURE_LOGS_NOT_FOUND_MESSAGE);
        }

        return logsByUsername;
    }

    @Override
    public boolean deleteAll() {
        try{
            this.loggerRepository.deleteAll();

        }catch (Exception e){
            throw new CustomException(FAILURE_LOGS_CLEARING_ERROR_MESSAGE);
        }
        return true;
    }

    @Override
    public boolean deleteByName(String username) {
        List<Logger> loggers = new ArrayList<>();
        try{
            loggers =  this.loggerRepository.deleteAllByUsername(username);

        }catch (Exception e){
            throw new CustomException(FAILURE_LOGS_CLEARING_ERROR_MESSAGE);
        }

        if(loggers.size() == 0){
            throw new CustomException(FAILURE_LOGS_NOT_FOUND_MESSAGE);
        }
        return true;
    }

    private String getUserAuthority(Authentication principal) {
        return principal
                .getAuthorities()
                .stream()
                .findFirst()
                .get()
                .getAuthority();
    }

//    @Scheduled(cron = "* */30 * * * *")
//    public void testSchedule(){
//        System.out.println("Logs deleted successfully");
//        this.deleteAll();
//    }

}


