package kl.tennisshop.servicesImpl;

import com.cloudinary.Cloudinary;
import kl.tennisshop.services.CloudinaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;

@Service
public class CloudinaryServiceImpl implements CloudinaryService {
    private final Cloudinary cloudinary;

    @Autowired
    public CloudinaryServiceImpl(Cloudinary cloudinary) {
        this.cloudinary = cloudinary;
    }

    @Override
    public String uploadImage(MultipartFile multipartFile) throws IOException {
        File fileToUpload = File.createTempFile("temp-file", multipartFile.getOriginalFilename());
        multipartFile.transferTo(fileToUpload);

        return this.cloudinary
                .uploader()
                .upload(fileToUpload, new HashMap())
                .get("url")
                .toString();
    }

    @Override
    public String deleteImage(String imageId) {
        return null;
    }
}
