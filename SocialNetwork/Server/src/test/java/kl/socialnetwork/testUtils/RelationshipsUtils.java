package kl.socialnetwork.testUtils;

import kl.socialnetwork.domain.entities.Relationship;
import kl.socialnetwork.domain.entities.User;
import kl.socialnetwork.domain.modles.serviceModels.RelationshipServiceModel;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

public class RelationshipsUtils {
    public static Relationship createRelationship(User userOne, User userTwo, int status, User actionUser) {
        LocalDateTime time = LocalDateTime.now();

        return new Relationship() {{
            setId("1");
            setUserOne(userOne);
            setUserTwo(userTwo);
            setStatus(status);
            setActionUser(actionUser);
            setTime(time);
        }};
    }

    public static List<Relationship> getRelationshipList(int count, User userOne, User userTwo, int status, User actionUser) {
        LocalDateTime time = LocalDateTime.now();

        return IntStream.range(0, count)
                .mapToObj(index -> new Relationship() {{
                    setId(String.valueOf(index + 1));
                    setUserOne(userOne);
                    setUserTwo(userTwo);
                    setStatus(status);
                    setActionUser(actionUser);
                    setTime(time);
                }})
                .collect(Collectors.toList());
    }

    public static RelationshipServiceModel getRelationshipServiceModel( User userOne, User userTwo, int status, User actionUser) {
        LocalDateTime time = LocalDateTime.now();

        return  new RelationshipServiceModel() {{
                    setId(String.valueOf(1));
                    setUserOne(userOne);
                    setUserTwo(userTwo);
                    setStatus(status);
                    setActionUser(actionUser);
                    setTime(time);
                }};

    }
}
