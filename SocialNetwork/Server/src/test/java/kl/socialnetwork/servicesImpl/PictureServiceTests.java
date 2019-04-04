package kl.socialnetwork.servicesImpl;

import kl.socialnetwork.domain.entities.Picture;
import kl.socialnetwork.domain.entities.User;
import kl.socialnetwork.domain.models.serviceModels.PictureServiceModel;
import kl.socialnetwork.repositories.PictureRepository;
import kl.socialnetwork.repositories.UserRepository;
import kl.socialnetwork.services.CloudinaryService;
import kl.socialnetwork.services.PictureService;
import kl.socialnetwork.testUtils.PictureUtils;
import kl.socialnetwork.testUtils.UsersUtils;
import kl.socialnetwork.utils.responseHandler.exceptions.CustomException;
import kl.socialnetwork.validations.serviceValidation.services.CloudinaryValidationService;
import kl.socialnetwork.validations.serviceValidation.services.PictureValidationService;
import kl.socialnetwork.validations.serviceValidation.services.UserValidationService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.mockito.Mockito.verifyNoMoreInteractions;

@RunWith(SpringRunner.class)
@SpringBootTest
public class PictureServiceTests {
    @Autowired
    private PictureService pictureService;

    @MockBean
    private UserRepository mockUserRepository;

    @MockBean
    private PictureRepository mockPictureRepository;

    @MockBean
    private CloudinaryService mockCloudinaryService;

    @MockBean
    private CloudinaryValidationService mockCloudinaryValidationService;

    @MockBean
    private UserValidationService mockUserValidationService;

    @MockBean
    private PictureValidationService mockPictureValidation;

    private List<Picture> pictureList;

    @Before
    public void setUpTest() {
        pictureList = new ArrayList<>();

    }

    @Test
    public void getAllPicturesByUserId_when2Pictures_2Pictures() {
        // Arrange

        when(mockPictureRepository.findAllByUserId("1"))
                .thenReturn(pictureList);

        User user = UsersUtils.createUser();
        List<Picture> pictures = PictureUtils.getPictures(2, user);
        pictureList.addAll(pictures);

        // Act
        List<PictureServiceModel> allPictures = pictureService.getAllPicturesByUserId("1");

        // Assert
        Picture expected = pictures.get(0);
        PictureServiceModel actual = allPictures.get(0);

        assertEquals(2, allPictures.size());
        assertEquals(expected.getCloudinaryPublicId(), actual.getCloudinaryPublicId());
        assertEquals(expected.getDescription(), actual.getDescription());
        assertEquals(expected.getImageUrl(), actual.getImageUrl());
        assertEquals(expected.getId(), actual.getId());
        assertEquals(expected.getUser().getId(), actual.getUser().getId());

        verify(mockPictureRepository).findAllByUserId(any());
        verifyNoMoreInteractions(mockPictureRepository);
    }

    @Test
    public void getAllPicturesByUserId_whenNoPictures_returnEmptyCollection() {
        pictureList.clear();
        List<PictureServiceModel> allPictures = pictureService.getAllPicturesByUserId("1");

        assertTrue(allPictures.isEmpty());
    }

    @Test
    public void addPicture_whenUsersAndCloudinaryUploadMapAreValid_addPicture() throws Exception {
        // Arrange
        Map<String, Object> uploadMap = new HashMap<>();
        uploadMap.put("public_id", "public_id");
        uploadMap.put("url", "url");

        when(mockCloudinaryService.uploadImage(any(MultipartFile.class), anyString()))
                .thenReturn(uploadMap);

        when(mockCloudinaryValidationService.isValid(anyMap()))
                .thenReturn(true);

        when(mockUserValidationService.isValid(any(User.class))).thenReturn(true);

        when(mockUserRepository.findById(any()))
                .thenReturn(java.util.Optional.of(new User()));

        MockMultipartFile pictureFile =
                new MockMultipartFile("data", "filename.txt", "text/plain", "some xml".getBytes());

        // Act
        pictureService.addPicture("1", pictureFile);

        // Assert
        verify(mockPictureRepository).save(any());
        verifyNoMoreInteractions(mockPictureRepository);
    }

    @Test(expected = Exception.class)
    public void addPicture_whenUserIsNotValid_throwException() throws Exception {
        // Arrange
        Map<String, Object> uploadMap = new HashMap<>();
        uploadMap.put("public_id", "public_id");
        uploadMap.put("url", "url");

        when(mockCloudinaryService.uploadImage(any(MultipartFile.class), anyString()))
                .thenReturn(uploadMap);

        when(mockCloudinaryValidationService.isValid(anyMap()))
                .thenReturn(true);

        when(mockUserValidationService.isValid(any(User.class))).thenReturn(false);

        when(mockUserRepository.findById(any()))
                .thenReturn(java.util.Optional.of(new User()));

        MockMultipartFile pictureFile =
                new MockMultipartFile("data", "filename.txt", "text/plain", "some xml".getBytes());

        // Act
        pictureService.addPicture("1", pictureFile);

        // Assert
        verify(mockPictureRepository).save(any());
        verifyNoMoreInteractions(mockPictureRepository);
    }


    @Test(expected = Exception.class)
    public void addPicture_whenCloudinaryUploadMapIsNotValid_throwException() throws Exception {
        // Arrange
        when(mockCloudinaryService.uploadImage(any(MultipartFile.class), anyString()))
                .thenReturn(new HashMap());

        when(mockCloudinaryValidationService.isValid(anyMap()))
                .thenReturn(false);

        when(mockUserValidationService.isValid(any(User.class))).thenReturn(true);

        when(mockUserRepository.findById(any()))
                .thenReturn(java.util.Optional.of(new User()));

        MockMultipartFile pictureFile =
                new MockMultipartFile("data", "filename.txt", "text/plain", "some xml".getBytes());

        // Act
        pictureService.addPicture("1", pictureFile);

        // Assert
        verify(mockPictureRepository).save(any());
        verifyNoMoreInteractions(mockPictureRepository);
    }

    @Test(expected = Exception.class)
    public void addPicture_whenUsersAndCloudinaryUploadMapAreNotValid_throwException() throws Exception {
        // Arrange
        when(mockCloudinaryService.uploadImage(any(MultipartFile.class), anyString()))
                .thenReturn(new HashMap());

        when(mockCloudinaryValidationService.isValid(anyMap()))
                .thenReturn(false);

        when(mockUserValidationService.isValid(any(User.class))).thenReturn(false);

        when(mockUserRepository.findById(any()))
                .thenReturn(java.util.Optional.of(new User()));

        MockMultipartFile pictureFile =
                new MockMultipartFile("data", "filename.txt", "text/plain", "some xml".getBytes());

        // Act
        pictureService.addPicture("1", pictureFile);

        // Assert
        verify(mockPictureRepository).save(any());
        verifyNoMoreInteractions(mockPictureRepository);
    }

    @Test
    public void deletePicture_whenUserAndPictureAreValid_deletePicture() throws Exception {
        // Arrange
        User user = UsersUtils.createUser();
        Picture picture = PictureUtils.createPicture(user);

        when(mockUserRepository.findById(any()))
                .thenReturn(java.util.Optional.of(user));

        when(mockUserValidationService.isValid(any(User.class)))
                .thenReturn(true);

        when(mockPictureRepository.findById(any()))
                .thenReturn(java.util.Optional.of(picture));

        when(mockPictureValidation.isValid(any()))
                .thenReturn(true);

        when(mockCloudinaryService.deleteImage(anyString()))
                .thenReturn(true);

        // Act
        pictureService.deletePicture("1", "1");

        // Assert
        verify(mockPictureRepository).delete(any());
    }

    @Test(expected = Exception.class)
    public void deletePicture_whenUserIsNotValid_throwException() throws Exception {
        // Arrange
        User user = UsersUtils.createUser();
        Picture picture = PictureUtils.createPicture(user);

        when(mockUserRepository.findById(any()))
                .thenReturn(java.util.Optional.of(user));

        when(mockUserValidationService.isValid(any(User.class)))
                .thenReturn(false);

        when(mockPictureRepository.findById(any()))
                .thenReturn(java.util.Optional.of(picture));

        when(mockPictureValidation.isValid(any()))
                .thenReturn(true);

        when(mockCloudinaryService.deleteImage(anyString()))
                .thenReturn(true);

        // Act
        pictureService.deletePicture("1", "1");

        // Assert
        verify(mockPictureRepository).delete(any());
    }

    @Test(expected = Exception.class)
    public void deletePicture_whenPictureIsNotValid_throwException() throws Exception {
        // Arrange
        User user = UsersUtils.createUser();
        Picture picture = PictureUtils.createPicture(user);

        when(mockUserRepository.findById(any()))
                .thenReturn(java.util.Optional.of(user));

        when(mockUserValidationService.isValid(any(User.class)))
                .thenReturn(true);

        when(mockPictureRepository.findById(any()))
                .thenReturn(java.util.Optional.of(picture));

        when(mockPictureValidation.isValid(any()))
                .thenReturn(false);

        when(mockCloudinaryService.deleteImage(anyString()))
                .thenReturn(true);

        // Act
        pictureService.deletePicture("1", "1");

        // Assert
        verify(mockPictureRepository).delete(any());
    }

    @Test(expected = Exception.class)
    public void deletePicture_whenUserAndPictureAreNotValid_throwException() throws Exception {
        // Arrange
        User user = UsersUtils.createUser();
        Picture picture = PictureUtils.createPicture(user);

        when(mockUserRepository.findById(any()))
                .thenReturn(java.util.Optional.of(user));

        when(mockUserValidationService.isValid(any(User.class)))
                .thenReturn(false);

        when(mockPictureRepository.findById(any()))
                .thenReturn(java.util.Optional.of(picture));

        when(mockPictureValidation.isValid(any()))
                .thenReturn(false);

        when(mockCloudinaryService.deleteImage(anyString()))
                .thenReturn(true);

        // Act
        pictureService.deletePicture("1", "1");

        // Assert
        verify(mockPictureRepository).delete(any());
    }

    @Test(expected = CustomException.class)
    public void deletePicture_whenUserIsNotAuthorized_throwException() throws Exception {
        // Arrange
        User user = UsersUtils.createUser();
        Picture picture = PictureUtils.createPicture(user);

        when(mockUserRepository.findById(any()))
                .thenReturn(java.util.Optional.of(user));

        when(mockUserValidationService.isValid(any(User.class)))
                .thenReturn(true);

        when(mockPictureRepository.findById(any()))
                .thenReturn(java.util.Optional.of(picture));

        when(mockPictureValidation.isValid(any()))
                .thenReturn(true);

        when(mockCloudinaryService.deleteImage(anyString()))
                .thenReturn(true);

        // Act
        pictureService.deletePicture("5", "1");

        // Assert
        verify(mockPictureRepository).delete(any());
    }
}
