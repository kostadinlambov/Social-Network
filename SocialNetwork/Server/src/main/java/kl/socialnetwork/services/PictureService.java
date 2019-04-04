package kl.socialnetwork.services;

import kl.socialnetwork.domain.models.serviceModels.PictureServiceModel;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface PictureService {

    boolean addPicture(String loggedInUserId, MultipartFile file) throws Exception;

    List<PictureServiceModel> getAllPicturesByUserId(String userId);

    boolean deletePicture(String loggedInUserId, String photoToRemoveId) throws Exception;

}
