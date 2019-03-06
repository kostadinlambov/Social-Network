package kl.socialnetwork.web.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import kl.socialnetwork.domain.modles.serviceModels.RelationshipServiceModel;
import kl.socialnetwork.domain.modles.viewModels.relationship.FriendsAllViewModel;
import kl.socialnetwork.services.RelationshipService;
import kl.socialnetwork.utils.constants.ResponseMessageConstants;
import kl.socialnetwork.utils.responseHandler.exceptions.CustomException;
import kl.socialnetwork.utils.responseHandler.successResponse.SuccessResponse;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = "/relationship")
public class RelationshipController {

    private final RelationshipService relationshipService;
    private final ModelMapper modelMapper;
    private final ObjectMapper objectMapper;

    @Autowired
    public RelationshipController(RelationshipService relationshipService, ModelMapper modelMapper, ObjectMapper objectMapper) {
        this.relationshipService = relationshipService;
        this.modelMapper = modelMapper;
        this.objectMapper = objectMapper;
    }

    @GetMapping(value = "/friends/{id}", produces = "application/json")
    public List<FriendsAllViewModel> findAllFriends(@PathVariable String id){
        int status = 1;

        List<RelationshipServiceModel> allFriends = this.relationshipService.findAllUserRelationshipsWithStatus(id, status);

        List<FriendsAllViewModel> friendsAllViewModels = allFriends.stream().map(relationshipServiceModel -> {
            if (!relationshipServiceModel.getUserOne().getId().equals(id)) {
                return this.modelMapper.map(relationshipServiceModel.getUserOne(), FriendsAllViewModel.class);
            }
            return this.modelMapper.map(relationshipServiceModel.getUserTwo(), FriendsAllViewModel.class);
        }).collect(Collectors.toList());

        System.out.println();

        return friendsAllViewModels;
    }





    @GetMapping(value = "/findFriends/{id}", produces = "application/json")
    public List<FriendsAllViewModel> findAllNotFriends(@PathVariable String id){
        int status = 3;
        List<FriendsAllViewModel> allNotFriends = this.relationshipService.findAllNotFriends(id, status);

        return allNotFriends;
    }


    @PostMapping(value = "/addFriend")
    public ResponseEntity addFriend(
            @RequestParam(name="loggedInUserId") String loggedInUserId,
            @RequestParam(name= "friendCandidateId") String friendCandidateId) throws JsonProcessingException {

        boolean result = this.relationshipService.createRequestForAddingFriend(loggedInUserId, friendCandidateId);

        if(result){
            SuccessResponse successResponse = new SuccessResponse(
                    LocalDateTime.now(),
                    "Your friend request have been successfully submitted!",
                    "",
                    true
            );

            return new ResponseEntity<>(this.objectMapper.writeValueAsString(successResponse), HttpStatus.OK);
        }

        throw new CustomException(ResponseMessageConstants.SERVER_ERROR_MESSAGE);
    }
}
