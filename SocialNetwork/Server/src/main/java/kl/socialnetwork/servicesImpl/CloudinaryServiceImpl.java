package kl.socialnetwork.servicesImpl;

import com.cloudinary.Cloudinary;
import kl.socialnetwork.services.CloudinaryService;
import kl.socialnetwork.utils.responseHandler.exceptions.CustomException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@Service
public class CloudinaryServiceImpl implements CloudinaryService {
    private final Cloudinary cloudinary;

    @Autowired
    public CloudinaryServiceImpl(Cloudinary cloudinary) {
        this.cloudinary = cloudinary;
    }

    @Override
    public Map uploadImage(MultipartFile multipartFile, String uuid) throws IOException {
        Map params = new HashMap<String, Object>() {{
            put("public_id", uuid);
            put("overwrite", true);
        }};

        File fileToUpload = File.createTempFile("temp-file", multipartFile.getOriginalFilename());
        multipartFile.transferTo(fileToUpload);

        return this.cloudinary
                .uploader()
                .upload(fileToUpload, params);

    }

    @Override
    public boolean deleteImage(String cloudinaryPublicId) {
        try {
            this.cloudinary.api().deleteResources(Collections.singletonList(cloudinaryPublicId), new HashMap());
            return true;
        } catch (Exception e) {
            throw new CustomException("Server Error!");
        }

    }
}
