package kl.socialnetwork.servicesImpl;

import kl.socialnetwork.domain.entities.Relationship;
import kl.socialnetwork.domain.entities.User;
import kl.socialnetwork.domain.modles.serviceModels.RelationshipServiceModel;
import kl.socialnetwork.domain.modles.viewModels.relationship.FriendsAllViewModel;
import kl.socialnetwork.repositories.RelationshipRepository;
import kl.socialnetwork.repositories.UserRepository;
import kl.socialnetwork.services.RelationshipService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class RelationshipServiceImpl implements RelationshipService {
    private final RelationshipRepository relationshipRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public RelationshipServiceImpl(RelationshipRepository relationshipRepository, UserRepository userRepository, ModelMapper modelMapper) {
        this.relationshipRepository = relationshipRepository;
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public List<RelationshipServiceModel> findAllUserRelationshipsWithStatus(String userId, int status) {
        List<Relationship> relationshipList = this.relationshipRepository
                .findAllByUserOneIdAndStatusOrUserTwoIdAndStatus(userId, status,  userId, status);

        List<RelationshipServiceModel> relationshipServiceModels = relationshipList
                .stream()
                .map(relationship -> this.modelMapper
                        .map(relationship, RelationshipServiceModel.class))
                .collect(Collectors.toList());

        return relationshipServiceModels;

    }

    @Override
    public List<FriendsAllViewModel> findAllNotFriends(String id, int status) {
        List<User> userList = this.userRepository.findAll();
        List<Relationship> relationshipList = this.relationshipRepository.findAllCandidatesForFriends(id);

        List<User> usersWithRelationship = new ArrayList<>();

        relationshipList.forEach(relationship -> {
            if(!relationship.getUserOne().getId().equals(id)){
                usersWithRelationship.add(relationship.getUserOne());
            }else{
                usersWithRelationship.add(relationship.getUserTwo());
            }
        });

        List<FriendsAllViewModel> notFriendsUserList = userList.stream()
                .filter(user -> !usersWithRelationship.contains(user) && !user.getId().equals(id))
                .map(user -> this.modelMapper.map(user, FriendsAllViewModel.class))
                .collect(Collectors.toList());

        return notFriendsUserList;
    }

    @Override
    public boolean createRequestForAddingFriend(String loggedInUserId, String friendCandidateId) {
        User loggedInUser = this.userRepository.findById(loggedInUserId).orElse(null);
        User friendCandidateUser = this.userRepository.findById(friendCandidateId).orElse(null);

        if(loggedInUser != null && friendCandidateUser != null){
            Relationship relationshipFromDb = this.relationshipRepository.findRelationshipByUserOneIdAndUserTwoId(loggedInUserId, friendCandidateId);


            if(relationshipFromDb == null){
                Relationship relationship = new Relationship();
                relationship.setActionUser(loggedInUser);
                relationship.setUserOne(loggedInUser);
                relationship.setUserTwo(friendCandidateUser);
                relationship.setStatus(1);
//                relationship.setStatus(0);
                relationship.setTime(LocalDateTime.now());

               return this.relationshipRepository.saveAndFlush(relationship) != null;
            }else{
                relationshipFromDb.setStatus(1);
                return this.relationshipRepository.saveAndFlush(relationshipFromDb) != null;
            }

        }
        return false;
    }

//    @Override
//    public boolean createRequestForAddingFriend(String loggedInUserId, String friendCandidateId) {
//        User loggedInUser = this.userRepository.findById(loggedInUserId).orElse(null);
//        User friendCandidateUser = this.userRepository.findById(friendCandidateId).orElse(null);
//
//        if(loggedInUser != null && friendCandidateUser != null){
//
//            Relationship firstCheck = this.relationshipRepository
//                    .findByUserOneIdAndUserTwoId(loggedInUserId, friendCandidateId);
//            Relationship secondCheck = this.relationshipRepository
//                    .findByUserOneIdAndUserTwoId(friendCandidateId, loggedInUserId);
//
//            if(firstCheck == null && secondCheck == null){
//                Relationship relationship = new Relationship();
//                relationship.setActionUser(loggedInUser);
//                relationship.setUserOne(loggedInUser);
//                relationship.setUserTwo(friendCandidateUser);
//                relationship.setStatus(1);
////                relationship.setStatus(0);
//                relationship.setTime(LocalDateTime.now());
//
//                return this.relationshipRepository.saveAndFlush(relationship) != null;
//            }
//
//            System.out.println();
//        }
//        return false;
//    }

    @Override
    public boolean removeFriend(String loggedInUserId, String friendToRemoveId) {
        User loggedInUser = this.userRepository.findById(loggedInUserId).orElse(null);
        User friendToRemove = this.userRepository.findById(friendToRemoveId).orElse(null);

        if(loggedInUser != null && friendToRemove != null){

            Relationship relationship = this.relationshipRepository
                    .findRelationshipWithFriendToRemove(
                            loggedInUserId, friendToRemoveId, 1);


            if(relationship != null){
                relationship.setActionUser(loggedInUser);
                relationship.setStatus(2);
                relationship.setTime(LocalDateTime.now());
                return this.relationshipRepository.saveAndFlush(relationship) != null;
            }

            System.out.println();
        }
        return false;
    }
}
