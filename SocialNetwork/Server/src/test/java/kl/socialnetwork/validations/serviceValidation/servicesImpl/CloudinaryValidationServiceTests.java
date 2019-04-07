package kl.socialnetwork.validations.serviceValidation.servicesImpl;

import kl.socialnetwork.validations.serviceValidation.services.CloudinaryValidationService;
import org.junit.Before;
import org.junit.Test;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

public class CloudinaryValidationServiceTests {
    private CloudinaryValidationService cloudinaryValidationService;

    @Before
    public void setupTest() {
        cloudinaryValidationService = new CloudinaryValidationServiceImpl();
    }

    @Test
    public void isValidWithMap_whenValid_true() {
        Map<String, String> uploadMap = new HashMap<>();
        uploadMap.put("public_id", "valid_id");
        uploadMap.put("url", "valid_url");

        boolean result = cloudinaryValidationService.isValid(uploadMap);
        assertTrue(result);
    }

    @Test
    public void isValidWithMap_whenNull_false() {
        Map<String, String> uploadMap = null;
        boolean result = cloudinaryValidationService.isValid(uploadMap);
        assertFalse(result);
    }

    @Test
    public void isValidWithMap_whenMapDontHavePublicIdProp_false() {
        Map<String, String> uploadMap = new HashMap<>();
        uploadMap.put("url", "valid_url");

        boolean result = cloudinaryValidationService.isValid(uploadMap);
        assertFalse(result);
    }

    @Test
    public void isValidWithMap_whenMapDontHaveUrlProp_false() {
        Map<String, String> uploadMap = new HashMap<>();
        uploadMap.put("public_id", "valid_id");

        boolean result = cloudinaryValidationService.isValid(uploadMap);
        assertFalse(result);
    }

    @Test
    public void isValidWithMultipartFileAndUuid_whenValid_true() {
        String name = "file.png";
        String originalFileName = "softuniLogo.PNG";
        String contentType = "image/png";
        byte[] content = "content".getBytes();
        MultipartFile pictureFile = new MockMultipartFile(name,
                originalFileName, contentType, content);

        String uuid = UUID.randomUUID().toString();

        boolean result = cloudinaryValidationService.isValid(pictureFile, uuid);
        assertTrue(result);
    }

    @Test
    public void isValidWithMultipartFileAndUuid_whenFileIsNull_false() {
        MultipartFile pictureFile = null;
        String uuid = UUID.randomUUID().toString();

        boolean result = cloudinaryValidationService.isValid(pictureFile, uuid);
        assertFalse(result);
    }

    @Test
    public void isValidWithMultipartFileAndUuid_whenUuidIsNull_false() {
        String name = "file.png";
        String originalFileName = "softuniLogo.PNG";
        String contentType = "image/png";
        byte[] content = "content".getBytes();
        MultipartFile pictureFile = new MockMultipartFile(name,
                originalFileName, contentType, content);

        String uuid = null;

        boolean result = cloudinaryValidationService.isValid(pictureFile, uuid);
        assertFalse(result);
    }

    @Test
    public void isValidWithPublicId_whenValid_true() {
        String publicId = "public_id";
        boolean result = cloudinaryValidationService.isValid(publicId);
        assertTrue(result);
    }

    @Test
    public void isValidWithPublicId_whenNull_false() {
        String publicId = null;
        boolean result = cloudinaryValidationService.isValid(publicId);
        assertFalse(result);
    }
}
