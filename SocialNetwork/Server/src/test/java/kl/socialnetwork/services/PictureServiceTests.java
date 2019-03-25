//package kl.socialnetwork;
//
//
//import kl.socialnetwork.domain.entities.Picture;
//import kl.socialnetwork.domain.entities.User;
//import kl.socialnetwork.domain.entities.UserRole;
//import kl.socialnetwork.domain.modles.serviceModels.PictureServiceModel;
//import kl.socialnetwork.repositories.PictureRepository;
//import kl.socialnetwork.repositories.RoleRepository;
//import kl.socialnetwork.repositories.UserRepository;
//import kl.socialnetwork.services.CloudinaryService;
//import kl.socialnetwork.services.PictureService;
//import kl.socialnetwork.servicesImpl.PictureServiceImpl;
//import kl.socialnetwork.web.controllers.PicturesController;
//import org.junit.Assert;
//import org.junit.Test;
//import org.junit.runner.RunWith;
//import org.mockito.Mockito;
//import org.modelmapper.ModelMapper;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.jdbc.EmbeddedDatabaseConnection;
//import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
//import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
//import org.springframework.mock.web.MockMultipartFile;
//import org.springframework.test.context.junit4.SpringRunner;
//import org.springframework.web.multipart.MultipartFile;
//
//import javax.management.relation.Role;
//import java.io.IOException;
//import java.time.LocalDateTime;
//import java.util.ArrayList;
//import java.util.Arrays;
//import java.util.HashSet;
//import java.util.List;
//
//import static org.hamcrest.core.Is.is;
//
//@RunWith(SpringRunner.class)
//@DataJpaTest
//@AutoConfigureTestDatabase(connection = EmbeddedDatabaseConnection.H2)
//public class PictureServiceTests {
//    @Autowired
//    private PictureRepository pictureRepository;
//    @Autowired
//    private RoleRepository roleRepository;
//    @Autowired
//    private UserRepository userRepository;
////
//    private PictureService pictureService;
//    private CloudinaryService cloudinaryServiceMock;
//    private MultipartFile multipartFileMock;
//    private ModelMapper modelMapper;
//
//    public void init() {
//        this.modelMapper = new ModelMapper();
//        cloudinaryServiceMock = Mockito.mock(CloudinaryService.class);
//        multipartFileMock = new MockMultipartFile("testFile", "testFile".getBytes());
////        Mockito.when(cloudinaryServiceMock.uploadImage(multipartFileMock,"uuid")).then();
//        pictureService = new PictureServiceImpl(this.pictureRepository, this.userRepository,
//                this.roleRepository, cloudinaryServiceMock, this.modelMapper);
//    }
//
////    @Test
////    public void pictureService_savePicturesWithCorrectValues_ReturnsCorrect() throws IOException {
////        CloudinaryService cloudinaryServiceMock = Mockito.mock(CloudinaryService.class);
////        MultipartFile multipartFileMock = new MockMultipartFile("testFile", "testFile".getBytes());
//////        Mockito.when(cloudinaryServiceMock.uploadImage(multipartFileMock,"uuid")).then();
////
////        PictureService pictureService = new PictureServiceImpl(this.pictureRepository, this.userRepository, this.roleRepository, cloudinaryServiceMock, this.modelMapper);
////
//////        UserRole role = new UserRole();
//////        role.setAuthority("ROOT");
//////
//////        User user = new User();
//////        user.setPassword("password");
//////        user.setAuthorities(new HashSet<>(Arrays.asList(role)));
//////        user.setFirstName("pesho");
//////        user.setLastName("peshov");
//////        user.setUsername("pesho");
//////        user.setEmail("pesho@abv.bg");
//////        user.setCity("Paris");
//////        user.setAddress("SedlmayerSrasse 14");
//////        user.setAccountNonExpired(true);
//////        user.setAccountNonLocked(true);
//////        user.setBackgroundImageUrl("url");
//////        user.setCredentialsNonExpired(true);
//////        user.setEnabled(true);
//////        user.setDeleted(false);
//////        user.setProfilePicUrl("profile_pic");
//////
//////        User savedUser = this.userRepository.saveAndFlush(user);
////
//////        User user = Mockito.mock(User.class);
//////        Mockito.when(user.getId()).thenReturn("userId");
//////
//////        LocalDateTime time = LocalDateTime.now();
//////        Picture picture = new Picture();
//////        picture.setCloudinaryPublicId("public_id");
//////        picture.setTime(time);
//////        picture.setUser(savedUser);
//////        picture.setImageUrl("imageUrl");
//////        picture.setDescription("description");
//////
//////
//////        boolean actual = pictureService.addPicture(savedUser.getId(), multipartFileMock);
//////
//////        Assert.assertTrue(actual);
////
////    }
//
////    @Test
////    public void pictureService_getAllPicturesByUserIdWithCorrectValues_ReturnsCorrect() throws IOException {
////        User user1 = Mockito.mock(User.class);
////        Mockito.when(user1.getId()).thenReturn("userId");
////
////        LocalDateTime time = LocalDateTime.now();
////
//////        List<Picture> pictureList = new ArrayList<>(List.of(
//////                new Picture() {{
//////                    setId("1");
//////                    setCloudinaryPublicId("public_id");
//////                    setTime(time);
//////                    setUser(user1);
//////                    setDescription("");
//////                    setImageUrl("imageUrl");
//////                    setDescription("description");
//////                }}
//////        ));
////
////        Picture picture = new Picture();
////        picture.setId("1");
////        picture.setCloudinaryPublicId("public_id");
////        picture.setTime(time);
////        picture.setUser(user1);
////        picture.setDescription("");
////        picture.setImageUrl("imageUrl");
////        picture.setDescription("description");
////
////        Picture picture1 = this.pictureRepository.saveAndFlush(picture);
////
////        List<PictureServiceModel> allPicturesByUserId = pictureService.getAllPicturesByUserId("1");
////
////        Assert.assertThat(allPicturesByUserId.size(), is(1));
////
////    }
//
//
//    @Test
//    public void pictureService_testMethodWithCorrectValues_ReturnsCorrect() throws IOException {
////        User user1 = Mockito.mock(User.class);
////        Mockito.when(user1.getId()).thenReturn("userId");
////
////        LocalDateTime time = LocalDateTime.now();
////        Picture picture = new Picture();
////        picture.setId("1");
////        picture.setCloudinaryPublicId("public_id");
////        picture.setTime(time);
////        picture.setUser(user1);
////        picture.setDescription("");
////        picture.setImageUrl("imageUrl");
////        picture.setDescription("description");
//
//
//        String actual = this.pictureService.testMethod("test");
//        String expected = "true";
//
//        Assert.assertThat(expected, is(actual));
//
//    }
//
//
//}
