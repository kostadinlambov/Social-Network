package kl.socialnetwork.servicesImpl;

import com.cloudinary.Api;
import com.cloudinary.Cloudinary;
import kl.socialnetwork.services.CloudinaryService;
import kl.socialnetwork.validations.serviceValidation.services.CloudinaryValidationService;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import static kl.socialnetwork.utils.constants.ResponseMessageConstants.SERVER_ERROR_MESSAGE;

@Service
public class CloudinaryServiceImpl implements CloudinaryService {
    private final Cloudinary cloudinary;
    private final CloudinaryValidationService cloudinaryValidation;

    @Autowired
    public CloudinaryServiceImpl(Cloudinary cloudinary, CloudinaryValidationService cloudinaryValidation) {
        this.cloudinary = cloudinary;
        this.cloudinaryValidation = cloudinaryValidation;
    }

    @Override
    public Map uploadImage(MultipartFile multipartFile, String uuid) throws Exception {
        if (!cloudinaryValidation.isValid(multipartFile, uuid)) {
            throw new Exception(SERVER_ERROR_MESSAGE);
        }

        Map params = new HashMap<String, Object>() {{
            put("public_id", uuid);
            put("overwrite", true);
        }};

        File fileToUpload = File.createTempFile("temp-file", multipartFile.getOriginalFilename());
        multipartFile.transferTo(fileToUpload);

        Map upload = this.cloudinary
                .uploader()
                .upload(fileToUpload, params);

        return upload;
    }

    @Override
    public boolean deleteImage(String cloudinaryPublicId) throws Exception {
        if (!cloudinaryValidation.isValid(cloudinaryPublicId)) {
            throw new Exception(SERVER_ERROR_MESSAGE);
        }

        Api.ApiResponse apiResponse = this.cloudinary.api().deleteResources(Collections.singletonList(cloudinaryPublicId), new HashMap());

        JSONObject deleted = (JSONObject) apiResponse.get("deleted");
        String deletingResult = deleted.get(cloudinaryPublicId).toString();

        return deletingResult.equals("deleted");
    }
}
