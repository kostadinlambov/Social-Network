package kl.socialnetwork.servicesImpl;

import kl.socialnetwork.domain.entities.Picture;
import kl.socialnetwork.domain.entities.User;
import kl.socialnetwork.domain.modles.serviceModels.PictureServiceModel;
import kl.socialnetwork.repositories.PictureRepository;
import kl.socialnetwork.repositories.UserRepository;
import kl.socialnetwork.services.PictureService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class PictureServiceImpl implements PictureService {
    private final PictureRepository pictureRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public PictureServiceImpl(PictureRepository pictureRepository, UserRepository userRepository, ModelMapper modelMapper) {
        this.pictureRepository = pictureRepository;
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public boolean addPicture(String loggedInUserId, String imageUrl) {
        User user = this.userRepository.findById(loggedInUserId).orElse(null);

        if(user != null){
            Picture picture = new Picture();
            picture.setImageUrl(imageUrl);
            picture.setUser(user);
            picture.setTime(LocalDateTime.now());

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
}
