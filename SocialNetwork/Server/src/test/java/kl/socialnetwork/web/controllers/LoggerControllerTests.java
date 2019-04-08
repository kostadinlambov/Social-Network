package kl.socialnetwork.web.controllers;

import kl.socialnetwork.domain.models.serviceModels.LoggerServiceModel;
import kl.socialnetwork.domain.models.viewModels.logger.LoggerViewModel;
import kl.socialnetwork.services.LoggerService;
import kl.socialnetwork.testUtils.*;
import kl.socialnetwork.utils.responseHandler.exceptions.CustomException;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockServletContext;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import javax.servlet.ServletContext;
import java.util.ArrayList;
import java.util.List;

import static kl.socialnetwork.utils.constants.ResponseMessageConstants.*;
import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.mockito.Mockito.*;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration
@WebAppConfiguration
@SpringBootTest
//@AutoConfigureTestDatabase(connection = EmbeddedDatabaseConnection.H2)
public class LoggerControllerTests {
    private MockMvc mvc;

    @Autowired
    private WebApplicationContext context;

    @MockBean
    private LoggerService mockLoggerService;

    @Before
    public void setup() {
        mvc = MockMvcBuilders
                .webAppContextSetup(context)
                .alwaysDo(print())
                .apply(springSecurity())
                .build();
    }

    @Test
    public void givenWac_whenServletContext_thenItProvidesPostController() {
        ServletContext servletContext = context.getServletContext();

        Assert.assertNotNull(servletContext);
        Assert.assertTrue(servletContext instanceof MockServletContext);
        Assert.assertNotNull(context.getBean("loggerController"));
    }

    //allLogs

    @Test()
    public void allLogs_whenUnAuthorized_403Forbidden() throws Exception {
        this.mvc
                .perform(get("/logs/all"))
                .andDo(print())
                .andExpect(status().isForbidden());
    }

    @Test()
    @WithMockUser(authorities = "USER")
    public void allLogs_whenUserWithUserRole_403Forbidden() throws Exception {
        this.mvc
                .perform(get("/logs/all"))
                .andDo(print())
                .andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(authorities = "ADMIN")
    public void allLogs_when2Logs_2Logs() throws Exception {
        // Arrange
        List<LoggerServiceModel> loggerServiceModels = LoggerUtils.getLoggerServiceModels(2);
        List<LoggerViewModel> expected = LoggerUtils.getLoggerViewModels(2);

        when(this.mockLoggerService.getAllLogs())
                .thenReturn(loggerServiceModels);

        // Act
        this.mvc
                .perform(get("/logs/all"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
                .andExpect(content().contentTypeCompatibleWith("application/json"))
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].id", is(expected.get(0).getId())))
                .andExpect(jsonPath("$[0].action", is(expected.get(0).getAction())))
                .andExpect(jsonPath("$[0].method", is(expected.get(0).getMethod())))
                .andExpect(jsonPath("$[0].tableName", is(expected.get(0).getTableName())))
                .andExpect(jsonPath("$[0].username", is(expected.get(0).getUsername())))
                .andExpect(jsonPath("$[1].id", is(expected.get(1).getId())))
                .andExpect(jsonPath("$[1].action", is(expected.get(1).getAction())))
                .andExpect(jsonPath("$[1].method", is(expected.get(1).getMethod())))
                .andExpect(jsonPath("$[1].tableName", is(expected.get(1).getTableName())))
                .andExpect(jsonPath("$[1].username", is(expected.get(1).getUsername())));

        verify(this.mockLoggerService, times(1)).getAllLogs();
        verifyNoMoreInteractions(this.mockLoggerService);
    }

    @Test
    @WithMockUser(authorities = "ADMIN")
    public void allLogs_when0Logs_EmptyCollection() throws Exception {
        // Arrange
        when(this.mockLoggerService.getAllLogs())
                .thenReturn(new ArrayList<>());

        // Act
        this.mvc
                .perform(get("/logs/all"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
                .andExpect(content().contentTypeCompatibleWith("application/json"))
                .andExpect(jsonPath("$", hasSize(0)));

        verify(this.mockLoggerService, times(1)).getAllLogs();
        verifyNoMoreInteractions(this.mockLoggerService);
    }

    //getLogsByUsername

    @Test()
    public void getLogsByUsername_whenUnAuthorized_403Forbidden() throws Exception {
        this.mvc
                .perform(get("/logs/findByUserName/{username}", "username"))
                .andDo(print())
                .andExpect(status().isForbidden());
    }

    @Test()
    @WithMockUser(authorities = "USER")
    public void getLogsByUsername_whenUserWithUserRole_403Forbidden() throws Exception {
        this.mvc
                .perform(get("/logs/findByUserName/{username}", "username"))
                .andDo(print())
                .andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(authorities = "ADMIN")
    public void getLogsByUsername_whenUserHas2Logs_2Logs() throws Exception {
        // Arrange
        List<LoggerServiceModel> loggerServiceModels = LoggerUtils.getLoggerServiceModels(2);
        List<LoggerViewModel> expected = LoggerUtils.getLoggerViewModels(2);

        when(this.mockLoggerService.getLogsByUsername(anyString()))
                .thenReturn(loggerServiceModels);

        // Act
        this.mvc
                .perform(get("/logs/findByUserName/{username}", "username"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
                .andExpect(content().contentTypeCompatibleWith("application/json"))
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].id", is(expected.get(0).getId())))
                .andExpect(jsonPath("$[0].action", is(expected.get(0).getAction())))
                .andExpect(jsonPath("$[0].method", is(expected.get(0).getMethod())))
                .andExpect(jsonPath("$[0].tableName", is(expected.get(0).getTableName())))
                .andExpect(jsonPath("$[0].username", is(expected.get(0).getUsername())))
                .andExpect(jsonPath("$[1].id", is(expected.get(1).getId())))
                .andExpect(jsonPath("$[1].action", is(expected.get(1).getAction())))
                .andExpect(jsonPath("$[1].method", is(expected.get(1).getMethod())))
                .andExpect(jsonPath("$[1].tableName", is(expected.get(1).getTableName())))
                .andExpect(jsonPath("$[1].username", is(expected.get(1).getUsername())));

        verify(this.mockLoggerService, times(1)).getLogsByUsername(anyString());
        verifyNoMoreInteractions(this.mockLoggerService);
    }

    @Test
    @WithMockUser(authorities = "ADMIN")
    public void getLogsByUsername_whenUserHasNoLogs_EmptyCollection() throws Exception {
        // Arrange
        when(this.mockLoggerService.getLogsByUsername(anyString()))
                .thenReturn(new ArrayList<>());

        // Act
        this.mvc
                .perform(get("/logs/findByUserName/{username}", "username"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
                .andExpect(content().contentTypeCompatibleWith("application/json"))
                .andExpect(jsonPath("$", hasSize(0)));

        verify(this.mockLoggerService, times(1)).getLogsByUsername(anyString());
        verifyNoMoreInteractions(this.mockLoggerService);
    }

    //deleteLogs

    @Test()
    public void deleteLogs_whenUnAuthorized_403Forbidden() throws Exception {
        this.mvc
                .perform(delete("/logs/clear"))
                .andDo(print())
                .andExpect(status().isForbidden());
    }

    @Test()
    @WithMockUser(authorities = {"USER", "ADMIN"})
    public void deleteLogs_whenUserNotWithRootRole_403Forbidden() throws Exception {
        this.mvc
                .perform(delete("/logs/clear"))
                .andDo(print())
                .andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(authorities = "ROOT")
    public void deleteLogs_whenDeleteAllReturnsTrue_deleteLogs() throws Exception {
        when(mockLoggerService.deleteAll())
                .thenReturn(true);

        this.mvc
                .perform(delete("/logs/clear"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType(TestUtil.TEXT_PLAIN_UTF8))
                .andExpect(jsonPath("$.success").value("true"))
                .andExpect(jsonPath("$.message").value(SUCCESSFUL_LOGS_DELETING_MESSAGE));

        verify(this.mockLoggerService, times(1)).deleteAll();
        verifyNoMoreInteractions(this.mockLoggerService);
    }

    @Test
    @WithMockUser(authorities = "ROOT")
    public void deleteLogs_whenDeleteAllReturnsFalse_throwCustomException() throws Exception {
        when(mockLoggerService.deleteAll())
                .thenReturn(false);

        Exception resolvedException = this.mvc
                .perform(delete("/logs/clear"))
                .andDo(print())
                .andExpect(status().isInternalServerError())
                .andReturn().getResolvedException();

        Assert.assertEquals(SERVER_ERROR_MESSAGE, resolvedException.getMessage());
        Assert.assertEquals(CustomException.class, resolvedException.getClass());

        verify(this.mockLoggerService, times(1)).deleteAll();
        verifyNoMoreInteractions(this.mockLoggerService);
    }

    //deleteLogsByName

    @Test()
    public void deleteLogsByName_whenUnAuthorized_403Forbidden() throws Exception {
        this.mvc
                .perform(delete("/logs/clearByName/{username}", "username"))
                .andDo(print())
                .andExpect(status().isForbidden());
    }

    @Test()
    @WithMockUser(authorities = {"USER", "ADMIN"})
    public void deleteLogsByName_whenUserNotWithRootRole_403Forbidden() throws Exception {
        this.mvc
                .perform(delete("/logs/clearByName/{username}", "username"))
                .andDo(print())
                .andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(authorities = "ROOT")
    public void deleteLogsByName_whenDeleteByNameReturnsTrue_deleteLogs() throws Exception {
        when(mockLoggerService.deleteByName(anyString()))
                .thenReturn(true);

        this.mvc
                .perform(delete("/logs/clearByName/{username}", "username"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType(TestUtil.TEXT_PLAIN_UTF8))
                .andExpect(jsonPath("$.success").value("true"))
                .andExpect(jsonPath("$.message").value(SUCCESSFUL_USER_LOGS_DELETING_MESSAGE));

        verify(this.mockLoggerService, times(1)).deleteByName(anyString());
        verifyNoMoreInteractions(this.mockLoggerService);
    }

    @Test
    @WithMockUser(authorities = "ROOT")
    public void deleteLogsByName_whenDeleteByNameReturnsFalse_throwCustomException() throws Exception {
        when(mockLoggerService.deleteByName(anyString()))
                .thenReturn(false);

        Exception resolvedException = this.mvc
                .perform(delete("/logs/clearByName/{username}", "username"))
                .andDo(print())
                .andExpect(status().isInternalServerError())
                .andReturn().getResolvedException();

        Assert.assertEquals(SERVER_ERROR_MESSAGE, resolvedException.getMessage());
        Assert.assertEquals(CustomException.class, resolvedException.getClass());

        verify(this.mockLoggerService, times(1)).deleteByName(anyString());
        verifyNoMoreInteractions(this.mockLoggerService);
    }
}
