package kl.socialnetwork.services;

import kl.socialnetwork.domain.modles.serviceModels.PictureServiceModel;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface PictureService {

    boolean addPicture(String loggedInUserId, MultipartFile file) throws IOException;

    List<PictureServiceModel> getAllPicturesByUserId(String userId);

    boolean deletePicture(String loggedInUserId, String photoToRemoveId);
}
