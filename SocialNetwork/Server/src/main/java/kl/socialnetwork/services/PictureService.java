package kl.socialnetwork.services;

import kl.socialnetwork.domain.modles.serviceModels.PictureServiceModel;

import java.util.List;

public interface PictureService {

    boolean addPicture(String loggedInUserId, String imageUrl);

    List<PictureServiceModel> getAllPicturesByUserId(String userId);
}
