package kl.socialnetwork.services;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

public interface CloudinaryService {
    Map uploadImage(MultipartFile multipartFile, String uuid) throws IOException;

    boolean deleteImage(String cloudinaryPublicId) throws Exception;
}