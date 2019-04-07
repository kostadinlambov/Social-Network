package kl.tennisshop.web.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import kl.tennisshop.domain.models.serviceModels.LoggerServiceModel;
import kl.tennisshop.domain.models.viewModels.logger.LoggerViewModel;
import kl.tennisshop.services.LoggerService;
import kl.tennisshop.utils.constants.ResponseMessageConstants;
import kl.tennisshop.utils.responseHandler.exceptions.CustomException;
import kl.tennisshop.utils.responseHandler.successResponse.SuccessResponse;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;


@RestController
@RequestMapping(value = "/logs")
public class LoggerController {
    private final LoggerService loggerService;
    private final ModelMapper modelMapper;
    private final ObjectMapper objectMapper;

    @Autowired
    public LoggerController(LoggerService loggerService, ModelMapper modelMapper, ObjectMapper objectMapper) {
        this.loggerService = loggerService;
        this.modelMapper = modelMapper;
        this.objectMapper = objectMapper;
    }

    @GetMapping(value = "/all", produces = "application/json")
    public @ResponseBody
    List<LoggerViewModel> allRackets() {
        return this.loggerService
                .getAllLogs()
                .stream()
                .map(this::parseDate)
                .collect(Collectors.toList());
    }

    @GetMapping(value = "/findByUserName/{username}", produces = "application/json")
    public @ResponseBody
    List<LoggerViewModel> getByUsername(@PathVariable String username) {
        return this.loggerService
                .getLogsByUsername(username)
                .stream()
                .map(this::parseDate)
                .collect(Collectors.toList());

    }

    @DeleteMapping(value = "/clear", produces = "application/json")
    public ResponseEntity deleteLogs() throws JsonProcessingException {
        boolean result = this.loggerService.deleteAll();

        if (result) {
            SuccessResponse successResponse = new SuccessResponse(
                    new Date(),
                    "Logs have been successfully deleted.",
                    "",
                    true);
            return new ResponseEntity<>(this.objectMapper.writeValueAsString(successResponse), HttpStatus.OK);
        }
        throw new CustomException(ResponseMessageConstants.SERVER_ERROR_MESSAGE);
    }

    @DeleteMapping(value = "/clearByName/{username}", produces = "application/json")
    public ResponseEntity deleteLogsByName(@PathVariable String username) throws JsonProcessingException {
        boolean result = this.loggerService.deleteByName(username);

        if (result) {
            SuccessResponse successResponse = new SuccessResponse(
                    new Date(),
                    "Logs have been successfully deleted.",
                    "",
                    true);
            return new ResponseEntity<>(this.objectMapper.writeValueAsString(successResponse), HttpStatus.OK);
        }
        throw new CustomException(ResponseMessageConstants.SERVER_ERROR_MESSAGE);
    }


    private LoggerViewModel parseDate(LoggerServiceModel x ) {
        LoggerViewModel loggerViewModel = new LoggerViewModel();
        this.modelMapper.map(x, loggerViewModel);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd MMM yyyy HH:mm:ss");
        String formattedDateTime = x.getTime().format(formatter);
        loggerViewModel.setTime(formattedDateTime);
        return loggerViewModel;
    }
}
