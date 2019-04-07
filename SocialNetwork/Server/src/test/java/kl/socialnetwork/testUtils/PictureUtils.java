package kl.socialnetwork.testUtils;

import kl.socialnetwork.domain.entities.Picture;
import kl.socialnetwork.domain.entities.User;
import kl.socialnetwork.domain.models.serviceModels.PictureServiceModel;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

public class PictureUtils {
    public static Picture createPicture(User loggedInUser) {
        LocalDateTime time = LocalDateTime.now();

        return new Picture() {{
            setId("1");
            setDescription("description first picture");
            setUser(loggedInUser);
            setTime(time);
            setImageUrl("imageUrl");
            setCloudinaryPublicId("cloudinaryPublicId");
        }};
    }

    public static List<Picture> getPictures(int count, User loggedInUser) {
        LocalDateTime time = LocalDateTime.now();

        return IntStream.range(0, count)
                .mapToObj(index -> new Picture() {{
                    setId(String.valueOf(index + 1));
                    setDescription("description " + index + " picture");
                    setUser(loggedInUser);
                    setTime(time);
                    setImageUrl("imageUrl " + index);
                    setCloudinaryPublicId("cloudinaryPublicId " + index);
                }})
                .collect(Collectors.toList());
    }

    public static List<PictureServiceModel> getPictureServiceModels(int count, User loggedInUser) {
        LocalDateTime time = LocalDateTime.now();

        return IntStream.range(0, count)
                .mapToObj(index -> new PictureServiceModel() {{
                    setId(String.valueOf(index + 1));
                    setDescription("description " + index + " picture");
                    setUser(loggedInUser);
                    setTime(time);
                    setImageUrl("imageUrl " + index);
                    setCloudinaryPublicId("cloudinaryPublicId " + index);
                }})
                .collect(Collectors.toList());
    }

}
