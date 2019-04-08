package kl.socialnetwork.servicesImpl;

import kl.socialnetwork.domain.entities.*;
import kl.socialnetwork.domain.models.serviceModels.LoggerServiceModel;
import kl.socialnetwork.repositories.LoggerRepository;
import kl.socialnetwork.services.LoggerService;
import kl.socialnetwork.testUtils.*;
import kl.socialnetwork.utils.responseHandler.exceptions.CustomException;
import kl.socialnetwork.validations.serviceValidation.services.LoggerValidationService;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.*;

import static junit.framework.TestCase.assertTrue;
import static kl.socialnetwork.utils.constants.ResponseMessageConstants.*;
import static org.junit.Assert.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@RunWith(SpringRunner.class)
@SpringBootTest
public class LoggerServiceTests {

    @Autowired
    private LoggerService loggerService;

    @MockBean
    private LoggerRepository mockLoggerRepository;

    @MockBean
    private LoggerValidationService mockLoggerValidation;

    @Rule
    public ExpectedException thrown = ExpectedException.none();

    @Before
    public void setUpTest() {

    }

    @Test
    public void createLog_whenInputsAreValid_createLog(){
        // Arrange
        Logger log = LoggerUtils.createLog();

        when(mockLoggerValidation.isValid(anyString(), anyString(), anyString(), anyString()))
                .thenReturn(true);

        when(mockLoggerValidation.isValid(any(LoggerServiceModel.class)))
                .thenReturn(true);


        when(mockLoggerRepository.save(any()))
                .thenReturn(log);

        // Act
        boolean result = loggerService.createLog(log.getMethod(), log.getUsername(), log.getTableName(), log.getAction());

        // Assert
        assertTrue(result);

        verify(mockLoggerRepository).save(any());
        verify(mockLoggerRepository, times(1)).save(any());
        verifyNoMoreInteractions(mockLoggerRepository);
    }

    @Test()
    public void createComment_whenInputsAreNotValid_throwException(){
        // Arrange
        Logger log = LoggerUtils.createLog();

        when(mockLoggerValidation.isValid(anyString(), anyString(), anyString(), anyString()))
                .thenReturn(false);

        when(mockLoggerValidation.isValid(any(LoggerServiceModel.class)))
                .thenReturn(true);

        when(mockLoggerRepository.save(any()))
                .thenReturn(log);

        thrown.expect(CustomException.class);
        thrown.expectMessage(FAILURE_LOGS_SAVING_MESSAGE);
        // Act
       loggerService.createLog(log.getMethod(), log.getUsername(), log.getTableName(), log.getAction());
    }


    @Test()
    public void createComment_whenLoggerServiceModelIsNotValid_throwException(){
        // Arrange
        Logger log = LoggerUtils.createLog();

        when(mockLoggerValidation.isValid(anyString(), anyString(), anyString(), anyString()))
                .thenReturn(true);

        when(mockLoggerValidation.isValid(any(LoggerServiceModel.class)))
                .thenReturn(false);

        when(mockLoggerRepository.save(any()))
                .thenReturn(log);

        thrown.expect(CustomException.class);
        thrown.expectMessage(FAILURE_LOGS_SAVING_MESSAGE);
        // Act
        loggerService.createLog(log.getMethod(), log.getUsername(), log.getTableName(), log.getAction());
    }

    @Test()
    public void createComment_whenLoggerRepositoryDontSaveLog_throwException(){
        // Arrange
        Logger log = LoggerUtils.createLog();

        when(mockLoggerValidation.isValid(anyString(), anyString(), anyString(), anyString()))
                .thenReturn(true);

        when(mockLoggerValidation.isValid(any(LoggerServiceModel.class)))
                .thenReturn(true);

        when(mockLoggerRepository.save(any()))
                .thenReturn(null);

        thrown.expect(CustomException.class);
        thrown.expectMessage(FAILURE_LOGS_SAVING_MESSAGE);
        // Act
        loggerService.createLog(log.getMethod(), log.getUsername(), log.getTableName(), log.getAction());

        verify(mockLoggerRepository).save(any());
        verify(mockLoggerRepository, times(1)).save(any());
        verifyNoMoreInteractions(mockLoggerRepository);
    }

    @Test
    public void getAllLogs_when2Logs_2Logs() {
        // Arrange
        List<Logger> logs = LoggerUtils.getLogs(2);

        when(mockLoggerRepository.findAllByOrderByTimeDesc()).thenReturn(logs);

        // Act
        List<LoggerServiceModel> allLogs = loggerService.getAllLogs();

        // Assert
        Logger expected = logs.get(0);
        LoggerServiceModel actual = allLogs.get(0);

        assertEquals(2, allLogs.size());
        assertEquals(expected.getId(), actual.getId());
        assertEquals(expected.getUsername(), actual.getUsername());
        assertEquals(expected.getAction(), actual.getAction());
        assertEquals(expected.getMethod(), actual.getMethod());
        assertEquals(expected.getTableName(), actual.getTableName());
        assertEquals(expected.getTime(), actual.getTime());

        verify(mockLoggerRepository).findAllByOrderByTimeDesc();
        verify(mockLoggerRepository,times(1)).findAllByOrderByTimeDesc();
        verifyNoMoreInteractions(mockLoggerRepository);
    }

    @Test
    public void getAllLogs_whenNoLogs_returnEmptyPosts() {
        when(mockLoggerRepository.findAllByOrderByTimeDesc()).thenReturn(new ArrayList<>());

        List<LoggerServiceModel> allLogs = loggerService.getAllLogs();

        Assert.assertTrue(allLogs.isEmpty());

        verify(mockLoggerRepository).findAllByOrderByTimeDesc();
        verify(mockLoggerRepository,times(1)).findAllByOrderByTimeDesc();
        verifyNoMoreInteractions(mockLoggerRepository);
    }

    @Test
    public void getLogsByUsername_when2Logs_2Logs() {
        // Arrange
        List<Logger> logs = LoggerUtils.getLogs(2);

        when(mockLoggerValidation.isValid(anyString())).thenReturn(true);

        when(mockLoggerRepository.findAllByUsernameOrderByTimeDesc(anyString())).thenReturn(logs);

        // Act
        List<LoggerServiceModel> allLogs = loggerService.getLogsByUsername("pesho");

        // Assert
        Logger expected = logs.get(0);
        LoggerServiceModel actual = allLogs.get(0);

        assertEquals(2, allLogs.size());
        assertEquals(expected.getId(), actual.getId());
        assertEquals(expected.getUsername(), actual.getUsername());
        assertEquals(expected.getAction(), actual.getAction());
        assertEquals(expected.getMethod(), actual.getMethod());
        assertEquals(expected.getTableName(), actual.getTableName());
        assertEquals(expected.getTime(), actual.getTime());

        verify(mockLoggerRepository).findAllByUsernameOrderByTimeDesc(anyString());
        verify(mockLoggerRepository,times(1)).findAllByUsernameOrderByTimeDesc(anyString());
        verifyNoMoreInteractions(mockLoggerRepository);
    }

    @Test
    public void getLogsByUsername_whenUsernameIsNotValid_throwException() {
        // Arrange
        List<Logger> logs = LoggerUtils.getLogs(2);

        when(mockLoggerValidation.isValid(anyString())).thenReturn(false);

        when(mockLoggerRepository.findAllByUsernameOrderByTimeDesc(anyString())).thenReturn(logs);

        thrown.expect(CustomException.class);
        thrown.expectMessage(SERVER_ERROR_MESSAGE);

        // Act
        loggerService.getLogsByUsername("pesho");

    }

    @Test
    public void getLogsByUsername_whenNoLogs_throwException() {
        // Arrange
        when(mockLoggerValidation.isValid(anyString())).thenReturn(true);

        when(mockLoggerRepository.findAllByUsernameOrderByTimeDesc(anyString())).thenReturn(new ArrayList<>());

        thrown.expect(CustomException.class);
        thrown.expectMessage(FAILURE_LOGS_NOT_FOUND_MESSAGE);

        // Act
        loggerService.getLogsByUsername("pesho");

        // Assert
        verify(mockLoggerRepository).findAllByUsernameOrderByTimeDesc(anyString());
        verify(mockLoggerRepository,times(1)).findAllByUsernameOrderByTimeDesc(anyString());
        verifyNoMoreInteractions(mockLoggerRepository);
    }

    @Test
    public void deleteAll_whenInputIsValid_deleteAll() throws Exception {
        // Act
        boolean result = loggerService.deleteAll();

        // Assert
        assertTrue(result);

        verify(mockLoggerRepository).deleteAll();
        verify(mockLoggerRepository,times(1)).deleteAll();
        verifyNoMoreInteractions(mockLoggerRepository);
    }

    @Test
    public void deleteByName_whenUsernameIsValidAndUserHasAnyNumberLogs_returnTrue() {
        // Arrange
        List<Logger> logs = LoggerUtils.getLogs(2);

        when(mockLoggerValidation.isValid(anyString())).thenReturn(true);

        when(mockLoggerRepository.deleteAllByUsername(anyString())).thenReturn(logs);

        // Act
        boolean result = loggerService.deleteByName("pesho");

        // Assert
        assertTrue(result);

        verify(mockLoggerRepository).deleteAllByUsername(anyString());
        verify(mockLoggerRepository,times(1)).deleteAllByUsername(anyString());
        verifyNoMoreInteractions(mockLoggerRepository);
    }

    @Test
    public void deleteByName_whenUsernameIsNotValid_throwException() {
        // Arrange
        List<Logger> logs = LoggerUtils.getLogs(2);

        when(mockLoggerValidation.isValid(anyString())).thenReturn(false);

        when(mockLoggerRepository.deleteAllByUsername(anyString())).thenReturn(logs);

        thrown.expect(CustomException.class);
        thrown.expectMessage(SERVER_ERROR_MESSAGE);

        // Act
        loggerService.deleteByName("pesho");
    }

    @Test
    public void deleteByName_whenUsernameIsValidAndUserHasNoLogs_throwException() {
        // Arrange
        when(mockLoggerValidation.isValid(anyString())).thenReturn(true);

        when(mockLoggerRepository.deleteAllByUsername(anyString())).thenReturn(new ArrayList<>());

        thrown.expect(CustomException.class);
        thrown.expectMessage(FAILURE_LOGS_NOT_FOUND_MESSAGE);

        // Act
        loggerService.deleteByName("pesho");
    }
}
