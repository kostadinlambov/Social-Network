package kl.socialnetwork.servicesImpl;

import kl.socialnetwork.domain.entities.Picture;
import kl.socialnetwork.domain.entities.User;
import kl.socialnetwork.domain.entities.UserRole;
import kl.socialnetwork.domain.modles.serviceModels.PictureServiceModel;
import kl.socialnetwork.repositories.PictureRepository;
import kl.socialnetwork.repositories.RoleRepository;
import kl.socialnetwork.repositories.UserRepository;
import kl.socialnetwork.services.CloudinaryService;
import kl.socialnetwork.services.PictureService;
import kl.socialnetwork.utils.responseHandler.exceptions.CustomException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Transactional
public class PictureServiceImpl implements PictureService {
    private final PictureRepository pictureRepository;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final CloudinaryService cloudinaryService;
    private final ModelMapper modelMapper;

    @Autowired
    public PictureServiceImpl(PictureRepository pictureRepository, UserRepository userRepository, RoleRepository roleRepository, CloudinaryService cloudinaryService, ModelMapper modelMapper) {
        this.pictureRepository = pictureRepository;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.cloudinaryService = cloudinaryService;
        this.modelMapper = modelMapper;
    }

    @Override
    public boolean addPicture(String loggedInUserId, MultipartFile file) throws IOException {
        User user = this.userRepository.findById(loggedInUserId).orElse(null);

        if (user != null) {
            String cloudinaryPublicId = UUID.randomUUID().toString();
            Map uploadMap = this.cloudinaryService.uploadImage(file, cloudinaryPublicId);

            Picture picture = new Picture();
            picture.setImageUrl(uploadMap.get("url").toString());
            picture.setUser(user);
            picture.setTime(LocalDateTime.now());
            picture.setCloudinaryPublicId(uploadMap.get("public_id").toString());
            picture.setCloudinaryPublicId(cloudinaryPublicId);

            return this.pictureRepository.saveAndFlush(picture) != null;
        }

        return false;
    }

    @Override
    public List<PictureServiceModel> getAllPicturesByUserId(String userId) {
        List<Picture> pictureList = this.pictureRepository.findAllByUserId(userId);

        return pictureList
                .stream()
                .map(picture -> this.modelMapper
                        .map(picture, PictureServiceModel.class))
                .collect(Collectors.toList());
    }

    @Override
    public boolean deletePicture(String loggedInUserId, String photoToRemoveId) {
        User loggedInUser = this.userRepository.findById(loggedInUserId).orElse(null);
        Picture photoToRemove = this.pictureRepository.findById(photoToRemoveId).orElse(null);

        if (loggedInUser != null && photoToRemove != null) {
            UserRole rootRole = this.roleRepository.findByAuthority("ROOT");
            boolean hasRootAuthority = loggedInUser.getAuthorities().contains(rootRole);
            boolean pictureOwnershipCheck = photoToRemove.getUser().getId().equals(loggedInUserId);

            if (hasRootAuthority || pictureOwnershipCheck) {
                try {
                    this.pictureRepository.delete(photoToRemove);

                    String cloudinaryPublicId = photoToRemove.getCloudinaryPublicId();
                    this.cloudinaryService.deleteImage(cloudinaryPublicId);

                    return true;
                } catch (Exception e) {
                    throw new CustomException("Unauthorized!");
                }
            }
        }

        return false;
    }
}
