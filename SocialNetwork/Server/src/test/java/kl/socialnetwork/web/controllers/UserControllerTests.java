package kl.socialnetwork.web.controllers;

import kl.socialnetwork.domain.entities.User;
import kl.socialnetwork.domain.entities.UserRole;
import kl.socialnetwork.domain.models.bindingModels.user.UserRegisterBindingModel;
import kl.socialnetwork.domain.models.bindingModels.user.UserUpdateBindingModel;
import kl.socialnetwork.domain.models.serviceModels.UserServiceModel;
import kl.socialnetwork.domain.models.viewModels.user.UserCreateViewModel;
import kl.socialnetwork.domain.models.viewModels.user.UserDetailsViewModel;
import kl.socialnetwork.services.UserService;
import kl.socialnetwork.testUtils.RolesUtils;
import kl.socialnetwork.testUtils.TestUtil;
import kl.socialnetwork.testUtils.UsersUtils;
import kl.socialnetwork.utils.responseHandler.exceptions.BadRequestException;
import kl.socialnetwork.utils.responseHandler.exceptions.CustomException;
import kl.socialnetwork.validations.serviceValidation.services.UserValidationService;
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
public class UserControllerTests {
    private MockMvc mvc;

    @Autowired
    private WebApplicationContext context;

    @MockBean
    private UserService mockUserService;

    @MockBean
    private UserValidationService mockUserValidation;

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
        Assert.assertNotNull(context.getBean("userController"));
    }

    @Test
    @WithMockUser(authorities = "ADMIN")
    public void getAllUsers_when2Users_2Users() throws Exception {
        UserRole adminRole = RolesUtils.createAdminRole();
        List<User> users = UsersUtils.getUsers(2);
        List<UserServiceModel> userServiceModels = UsersUtils.getUserServiceModels(2, adminRole);

        when(this.mockUserService.getAllUsers("1"))
                .thenReturn(userServiceModels);

        this.mvc
                .perform(get("/users/all/{id}", "1"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
                .andExpect(content().contentTypeCompatibleWith("application/json"))
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].id", is("1")))
                .andExpect(jsonPath("$[0].username", is("pesho 0")))
                .andExpect(jsonPath("$[0].role", is("ADMIN")))
                .andExpect(jsonPath("$[1].id", is("2")))
                .andExpect(jsonPath("$[1].username", is("pesho 1")))
                .andExpect(jsonPath("$[1].role", is("ADMIN")));

        verify(this.mockUserService, times(1)).getAllUsers("1");
        verifyNoMoreInteractions(this.mockUserService);
    }

    @Test()
    @WithMockUser(authorities = "ADMIN")
    public void getAllUsers_whenGetAllUsersThrowsException_throwCustomException() throws Exception {
        when(this.mockUserService.getAllUsers("1"))
                .thenThrow(new CustomException(SERVER_ERROR_MESSAGE));

        Exception resolvedException = this.mvc
                .perform(get("/users/all/{id}", "1"))
                .andExpect(status().isInternalServerError())
                .andReturn().getResolvedException();

        Assert.assertEquals(SERVER_ERROR_MESSAGE, resolvedException.getMessage());
        Assert.assertEquals(CustomException.class, resolvedException.getClass());

        verify(mockUserService, times(1)).getAllUsers("1");
        verifyNoMoreInteractions(mockUserService);
    }

    @Test()
    public void getAllUsers_whenUnAuthorized_403Forbidden() throws Exception {
        this.mvc
                .perform(get("/users/all/{id}", "1"))
                .andExpect(status().isForbidden());
    }

    @Test()
    @WithMockUser(authorities = "USER")
    public void getAllUsers_whenWrongAuthority_403Forbidden() throws Exception {
        this.mvc
                .perform(get("/users/all/{id}", "1"))
                .andExpect(status().isForbidden());
    }

    @Test
    public void registerUser_whenInputsAreValid_registerUser() throws Exception {
        UserCreateViewModel userCreateViewModel = UsersUtils.getUserCreateViewModel();
        UserRegisterBindingModel userRegisterBindingModel = UsersUtils.getUserRegisterBindingModel();

        when(mockUserValidation.isValid(anyString(), anyString())).thenReturn(true);
        when(mockUserValidation.isValid(any(UserRegisterBindingModel.class))).thenReturn(true);

        when(mockUserService.createUser(any(UserServiceModel.class)))
                .thenReturn(userCreateViewModel);

        this.mvc
                .perform(post("/users/register")
                        .contentType(MediaType.APPLICATION_JSON_UTF8)
                        .content(TestUtil.convertObjectToJsonString(userRegisterBindingModel)))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType(TestUtil.TEXT_PLAIN_UTF8))
                .andExpect(jsonPath("$.success").value("true"))
                .andExpect(jsonPath("$.message").value(SUCCESSFUL_REGISTER_MESSAGE))
                .andExpect(jsonPath("$.payload.id").value(userCreateViewModel.getId()))
                .andExpect(jsonPath("$.payload.username").value(userCreateViewModel.getUsername()))
                .andExpect(jsonPath("$.payload.email").value(userCreateViewModel.getEmail()))
                .andExpect(jsonPath("$.payload.address").value(userCreateViewModel.getAddress()))
                .andExpect(jsonPath("$.payload.firstName").value(userCreateViewModel.getFirstName()))
                .andExpect(jsonPath("$.payload.lastName").value(userCreateViewModel.getLastName()));

        verify(mockUserService).createUser(any(UserServiceModel.class));
        verify(mockUserService, times(1)).createUser(any());
    }

    @Test
    public void registerUser_whenPasswordsDontMatch_throwException() throws Exception {
        UserCreateViewModel userCreateViewModel = UsersUtils.getUserCreateViewModel();
        UserRegisterBindingModel userRegisterBindingModel = UsersUtils.getUserRegisterBindingModel();

        when(mockUserValidation.isValid(anyString(), anyString())).thenReturn(false);

        when(mockUserValidation.isValid(any(UserRegisterBindingModel.class))).thenReturn(true);

        when(mockUserService.createUser(any(UserServiceModel.class)))
                .thenReturn(userCreateViewModel);

        Exception resolvedException = this.mvc
                .perform(post("/users/register")
                        .contentType(MediaType.APPLICATION_JSON_UTF8)
                        .content(TestUtil.convertObjectToJsonString(userRegisterBindingModel)))
                .andDo(print())
                .andExpect(status().isBadRequest())
                .andReturn().getResolvedException();

        Assert.assertEquals(PASSWORDS_MISMATCH_ERROR_MESSAGE, resolvedException.getMessage());
        Assert.assertEquals(BadRequestException.class, resolvedException.getClass());
    }

    @Test
    public void registerUser_whenUserRegisterBindingModelIsNotValid_throwException() throws Exception {
        UserCreateViewModel userCreateViewModel = UsersUtils.getUserCreateViewModel();
        UserRegisterBindingModel userRegisterBindingModel = UsersUtils.getUserRegisterBindingModel();

        when(mockUserValidation.isValid(anyString(), anyString())).thenReturn(true);

        when(mockUserValidation.isValid(any(UserRegisterBindingModel.class))).thenReturn(false);

        when(mockUserService.createUser(any(UserServiceModel.class)))
                .thenReturn(userCreateViewModel);

        Exception resolvedException = this.mvc
                .perform(post("/users/register")
                        .contentType(MediaType.APPLICATION_JSON_UTF8)
                        .content(TestUtil.convertObjectToJsonString(userRegisterBindingModel)))
                .andDo(print())
                .andExpect(status().isInternalServerError())
                .andReturn().getResolvedException();

        Assert.assertEquals(SERVER_ERROR_MESSAGE, resolvedException.getMessage());
        Assert.assertEquals(Exception.class, resolvedException.getClass());
    }

    @Test()
    public void getDetails_whenUnAuthorized_403Forbidden() throws Exception {
        this.mvc
                .perform(post("/users/details/{id}", "1"))
                .andDo(print())
                .andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(authorities = "USER")
    public void getDetails_whenIdIsValid_returnUser() throws Exception {
        UserRole userRole = RolesUtils.createUserRole();
        UserDetailsViewModel userDetailsViewModel = UsersUtils.getUserDetailsViewModel(userRole);

        when(this.mockUserService.getById("1"))
                .thenReturn(userDetailsViewModel);

        this.mvc
                .perform(get("/users/details/{id}", "1"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType(TestUtil.TEXT_PLAIN_UTF8))
                .andExpect(jsonPath("$.id").value(userDetailsViewModel.getId()))
                .andExpect(jsonPath("$.username").value(userDetailsViewModel.getUsername()))
                .andExpect(jsonPath("$.email").value(userDetailsViewModel.getEmail()))
                .andExpect(jsonPath("$.address").value(userDetailsViewModel.getAddress()))
                .andExpect(jsonPath("$.firstName").value(userDetailsViewModel.getFirstName()))
                .andExpect(jsonPath("$.lastName").value(userDetailsViewModel.getLastName()))
                .andExpect(jsonPath("$.profilePicUrl").value(userDetailsViewModel.getProfilePicUrl()))
                .andExpect(jsonPath("$.backgroundImageUrl").value(userDetailsViewModel.getBackgroundImageUrl()))
                .andExpect(jsonPath("$.authorities[0].authority").value(userRole.getAuthority()));

        verify(this.mockUserService, times(1)).getById("1");
        verifyNoMoreInteractions(this.mockUserService);
    }

    @Test
    @WithMockUser(authorities = "USER")
    public void getDetails_whenIdIsNotValid_throwException() throws Exception {
        when(this.mockUserService.getById(anyString()))
                .thenThrow(new Exception());

        this.mvc
                .perform(get("/users/details/{id}", "invalid_Id"))
                .andDo(print())
                .andExpect(status().isInternalServerError());


        verify(this.mockUserService, times(1)).getById(anyString());
        verifyNoMoreInteractions(this.mockUserService);
    }

    @Test()
    public void updateUser_whenUnAuthorized_403Forbidden() throws Exception {
        this.mvc
                .perform(put("/users/update/{id}", "1"))
                .andDo(print())
                .andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(authorities = "USER")
    public void updateUser_whenInputsAreValid_returnUser() throws Exception {
        UserUpdateBindingModel userUpdateBindingModel = UsersUtils.getUserUpdateBindingModel();

        when(mockUserValidation.isValid(any(UserUpdateBindingModel.class))).thenReturn(true);

        when(this.mockUserService.updateUser(any(UserServiceModel.class), anyString()))
                .thenReturn(true);

        this.mvc
                .perform(put("/users/update/{id}", "1")
                        .contentType(MediaType.APPLICATION_JSON_UTF8)
                        .content(TestUtil.convertObjectToJsonString(userUpdateBindingModel)))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType(TestUtil.TEXT_PLAIN_UTF8))
                .andExpect(jsonPath("$.success").value("true"))
                .andExpect(jsonPath("$.message").value(SUCCESSFUL_USER_PROFILE_EDIT_MESSAGE));

        verify(this.mockUserService, times(1)).updateUser(any(UserServiceModel.class), anyString());
        verifyNoMoreInteractions(this.mockUserService);
    }

    @Test
    @WithMockUser(authorities = "USER")
    public void updateUser_whenUserUpdateBindingModelIsNotValid_throwException() throws Exception {
        UserUpdateBindingModel userUpdateBindingModel = UsersUtils.getUserUpdateBindingModel();

        when(mockUserValidation.isValid(any(UserUpdateBindingModel.class))).thenReturn(false);

        when(this.mockUserService.updateUser(any(UserServiceModel.class), anyString()))
                .thenReturn(true);

        Exception resolvedException = this.mvc
                .perform(put("/users/update/{id}", "1")
                        .contentType(MediaType.APPLICATION_JSON_UTF8)
                        .content(TestUtil.convertObjectToJsonString(userUpdateBindingModel)))
                .andDo(print())
                .andExpect(status().isInternalServerError())
                .andReturn().getResolvedException();

        Assert.assertEquals(SERVER_ERROR_MESSAGE, resolvedException.getMessage());
        Assert.assertEquals(Exception.class, resolvedException.getClass());
    }

    @Test
    @WithMockUser(authorities = "USER")
    public void updateUser_whenUpdateUserReturnsFalse_throwException() throws Exception {
        UserUpdateBindingModel userUpdateBindingModel = UsersUtils.getUserUpdateBindingModel();

        when(mockUserValidation.isValid(any(UserUpdateBindingModel.class))).thenReturn(true);

        when(this.mockUserService.updateUser(any(UserServiceModel.class), anyString()))
                .thenReturn(false);

        Exception resolvedException = this.mvc
                .perform(put("/users/update/{id}", "1")
                        .contentType(MediaType.APPLICATION_JSON_UTF8)
                        .content(TestUtil.convertObjectToJsonString(userUpdateBindingModel)))
                .andDo(print())
                .andExpect(status().isInternalServerError())
                .andReturn().getResolvedException();

        Assert.assertEquals(SERVER_ERROR_MESSAGE, resolvedException.getMessage());
        Assert.assertEquals(CustomException.class, resolvedException.getClass());
    }

    @Test()
    public void deleteUser_whenUnAuthorized_403Forbidden() throws Exception {
        this.mvc
                .perform(delete("/users/delete/{id}", "1"))
                .andDo(print())
                .andExpect(status().isForbidden());
    }

    @Test()
    @WithMockUser(authorities = {"USER", "ADMIN"})
    public void deleteUser_whenWrongAuthorities_403Forbidden() throws Exception {
        this.mvc
                .perform(delete("/users/delete/{id}", "1"))
                .andDo(print())
                .andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(authorities = "ROOT")
    public void deleteUser_whenDeleteUserByIdReturnsTrue_deleteUser() throws Exception {
        when(mockUserService.deleteUserById(anyString()))
                .thenReturn(true);

        this.mvc
                .perform(delete("/users/delete/{id}", "1"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType(TestUtil.TEXT_PLAIN_UTF8))
                .andExpect(jsonPath("$.success").value("true"))
                .andExpect(jsonPath("$.message").value(SUCCESSFUL_USER_DELETE_MESSAGE));

        verify(mockUserService, times(1)).deleteUserById(anyString());
        verifyNoMoreInteractions(mockUserService);
    }

    @Test
    @WithMockUser(authorities = "ROOT")
    public void deleteUser_whenDeleteUserByIdReturnsFalse_throwException() throws Exception {
        when(mockUserService.deleteUserById(anyString()))
                .thenReturn(false);

        Exception resolvedException = this.mvc
                .perform(delete("/users/delete/{id}", "1"))
                .andDo(print())
                .andExpect(status().isInternalServerError())
                .andReturn().getResolvedException();

        Assert.assertEquals(SERVER_ERROR_MESSAGE, resolvedException.getMessage());
        Assert.assertEquals(CustomException.class, resolvedException.getClass());

        verify(mockUserService, times(1)).deleteUserById(anyString());
        verifyNoMoreInteractions(mockUserService);
    }

    @Test()
    public void promoteUser_whenUnAuthorized_403Forbidden() throws Exception {
        this.mvc
                .perform(post("/users/promote")
                        .param("id", "1"))
                .andDo(print())
                .andExpect(status().isForbidden());
    }

    @Test()
    @WithMockUser(authorities = "USER")
    public void promoteUser_whenWrongAuthorities_403Forbidden() throws Exception {
        this.mvc
                .perform(post("/users/promote")
                        .param("id", "1"))
                .andDo(print())
                .andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(authorities = "ADMIN")
    public void promoteUser_whenPromoteUserReturnsTrue_promoteUser() throws Exception {
        when(mockUserService.promoteUser(anyString()))
                .thenReturn(true);

        this.mvc
                .perform(post("/users/promote")
                        .param("id", "1"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType(TestUtil.TEXT_PLAIN_UTF8))
                .andExpect(jsonPath("$.success").value("true"))
                .andExpect(jsonPath("$.message").value(SUCCESSFUL_USER_PROMOTED_MESSAGE));

        verify(mockUserService, times(1)).promoteUser(anyString());
        verifyNoMoreInteractions(mockUserService);
    }

    @Test
    @WithMockUser(authorities = "ROOT")
    public void promoteUser_whenPromoteUserReturnsFalse_throwException() throws Exception {
        when(mockUserService.promoteUser(anyString()))
                .thenReturn(false);

        Exception resolvedException = this.mvc
                .perform(post("/users/promote")
                        .param("id", "1"))
                .andDo(print())
                .andExpect(status().isInternalServerError())
                .andReturn().getResolvedException();

        Assert.assertEquals(USER_FAILURE_PROMOTING_MESSAGE, resolvedException.getMessage());
        Assert.assertEquals(CustomException.class, resolvedException.getClass());

        verify(mockUserService, times(1)).promoteUser(anyString());
        verifyNoMoreInteractions(mockUserService);
    }

    @Test()
    public void demoteUser_whenUnAuthorized_403Forbidden() throws Exception {
        this.mvc
                .perform(post("/users/demote")
                        .param("id", "1"))
                .andDo(print())
                .andExpect(status().isForbidden());
    }

    @Test()
    @WithMockUser(authorities = "USER")
    public void demoteUser_whenWrongAuthorities_403Forbidden() throws Exception {
        this.mvc
                .perform(post("/users/demote")
                        .param("id", "1"))
                .andDo(print())
                .andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(authorities = "ADMIN")
    public void demoteUser_whenDemoteUserReturnsTrue_promoteUser() throws Exception {
        when(mockUserService.demoteUser(anyString()))
                .thenReturn(true);

        this.mvc
                .perform(post("/users/demote")
                        .param("id", "1"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType(TestUtil.TEXT_PLAIN_UTF8))
                .andExpect(jsonPath("$.success").value("true"))
                .andExpect(jsonPath("$.message").value(SUCCESSFUL_USER_DEMOTED_MESSAGE));

        verify(mockUserService, times(1)).demoteUser(anyString());
        verifyNoMoreInteractions(mockUserService);
    }

    @Test
    @WithMockUser(authorities = "ROOT")
    public void demoteUser_whenPromoteUserReturnsFalse_throwException() throws Exception {
        when(mockUserService.demoteUser(anyString()))
                .thenReturn(false);

        Exception resolvedException = this.mvc
                .perform(post("/users/demote")
                        .param("id", "1"))
                .andDo(print())
                .andExpect(status().isInternalServerError())
                .andReturn().getResolvedException();

        Assert.assertEquals(USER_FAILURE_DEMOTING_MESSAGE, resolvedException.getMessage());
        Assert.assertEquals(CustomException.class, resolvedException.getClass());

        verify(mockUserService, times(1)).demoteUser(anyString());
        verifyNoMoreInteractions(mockUserService);
    }
}
