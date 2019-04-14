package kl.socialnetwork.servicesImpl;

import kl.socialnetwork.services.CloudinaryService;
import org.junit.Test;
import org.junit.runner.RunWith;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Map;

import static kl.socialnetwork.utils.constants.ResponseMessageConstants.SERVER_ERROR_MESSAGE;
import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest
public class CloudinaryServiceTests {
    private static final String TEST_UUID = "test_uuid";

    @Autowired
    private CloudinaryService cloudinaryService;

    @Test
    public void uploadImage_whenMultipartFileAndUuidAreValid_uploadImage() throws Exception {
        String TEST_IMAGE_FILE_PATH = System.getProperty("user.dir") + "\\src\\main\\resources\\static\\img\\softuniLogo.PNG";

        Path path = Paths.get(TEST_IMAGE_FILE_PATH);
        String name = "file.png";
        String originalFileName = "softuniLogo.PNG";
        String contentType = "image/png";
        byte[] content = null;
        try {
            content = Files.readAllBytes(path);
        } catch (final IOException e) {
            throw new Exception(SERVER_ERROR_MESSAGE);
        }

        MultipartFile pictureFile = new MockMultipartFile(name,
                originalFileName, contentType, content);

        // Act
        Map uploadMap = cloudinaryService.uploadImage(pictureFile, TEST_UUID);

        // Assert
        assertNotNull(uploadMap);
        assertNotNull(uploadMap.get("url"));
        assertEquals(TEST_UUID, uploadMap.get("public_id"));
    }

    @Test(expected = Exception.class)
    public void uploadImage_whenMultipartFileIsNotValid_throwException() throws Exception {
        // Act
        Map uploadMap = cloudinaryService.uploadImage(null, TEST_UUID);
    }

    @Test(expected = Exception.class)
    public void uploadImage_whenUuidIsNotValid_throwException() throws Exception {
        String TEST_IMAGE_FILE_PATH = System.getProperty("user.dir") + "\\src\\main\\resources\\static\\img\\softuniLogo.PNG";

        Path path = Paths.get(TEST_IMAGE_FILE_PATH);
        String name = "file.png";
        String originalFileName = "softuniLogo.PNG";
        String contentType = "image/png";
        byte[] content = null;
        try {
            content = Files.readAllBytes(path);
        } catch (final IOException e) {
            throw new Exception(SERVER_ERROR_MESSAGE);
        }

        MultipartFile pictureFile = new MockMultipartFile(name,
                originalFileName, contentType, content);

        // Act
        Map uploadMap = cloudinaryService.uploadImage(pictureFile, null);
    }

    @Test(expected = Exception.class)
    public void uploadImage_whenMultipartFileAndUuidAreNotValid_throwException() throws Exception {
        // Act
        Map uploadMap = cloudinaryService.uploadImage(null, null);
    }

    @Test
    public void deleteImage_whenCloudinaryPublicIdIsNotNullAndValid_deleteImage() throws Exception {
        // Act
        boolean result = cloudinaryService.deleteImage(TEST_UUID);

        // Assert
        assertTrue(result);
    }

    @Test()
    public void deleteImage_whenCloudinaryPublicIdIsNotValidPublicId_throwException() throws Exception {
        // Act
        boolean result = cloudinaryService.deleteImage("not_valid_public_id");

        // Assert
        assertFalse(result);
    }

    @Test(expected = Exception.class)
    public void deleteImage_whenCloudinaryPublicIdIsNull_throwException() throws Exception {
        // Act
        cloudinaryService.deleteImage(null);
    }
}
