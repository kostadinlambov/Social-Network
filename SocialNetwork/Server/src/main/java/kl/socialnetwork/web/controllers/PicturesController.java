package kl.socialnetwork.web.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import kl.socialnetwork.domain.modles.viewModels.picture.PictureAllViewModel;
import kl.socialnetwork.services.CloudinaryService;
import kl.socialnetwork.services.PictureService;
import kl.socialnetwork.utils.constants.ResponseMessageConstants;
import kl.socialnetwork.utils.responseHandler.exceptions.CustomException;
import kl.socialnetwork.utils.responseHandler.successResponse.SuccessResponse;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static kl.socialnetwork.utils.constants.ResponseMessageConstants.SUCCESSFUL_PICTURE_ALL_MESSAGE;

@RestController()
@RequestMapping(value = "/pictures")
public class PicturesController {

    private final PictureService pictureService;
    private final CloudinaryService cloudinaryService;
    private final ModelMapper modelMapper;
    private final ObjectMapper objectMapper;

    @Autowired
    public PicturesController(PictureService pictureService, CloudinaryService cloudinaryService, ModelMapper modelMapper, ObjectMapper objectMapper) {
        this.pictureService = pictureService;
        this.cloudinaryService = cloudinaryService;
        this.modelMapper = modelMapper;
        this.objectMapper = objectMapper;
    }

    @GetMapping(value = "/all/{id}")
    public ResponseEntity<Object> getAllPictures(@PathVariable(value = "id") String userId) throws JsonProcessingException {
        List<PictureAllViewModel> pictureAllViewModels = this.pictureService
                .getAllPicturesByUserId(userId)
                .stream()
                .map(x -> this.modelMapper.map(x, PictureAllViewModel.class))
                .collect(Collectors.toList());

        SuccessResponse successResponse = new SuccessResponse(
                LocalDateTime.now(),
                SUCCESSFUL_PICTURE_ALL_MESSAGE,
                pictureAllViewModels,
                true);

        return new ResponseEntity<>(this.objectMapper.writeValueAsString(successResponse), HttpStatus.OK);

    }

    @PostMapping(value = "/add")
    public ResponseEntity addPicture(
            @RequestParam(name = "loggedInUserId") String loggedInUserId,
            @RequestParam(name = "file") MultipartFile file
    ) throws IOException {

        boolean result = this.pictureService.addPicture(loggedInUserId, file);

        if (result) {
            SuccessResponse successResponse = new SuccessResponse(
                    LocalDateTime.now(),
                    "Successfully uploaded file!",
                    "",
                    true
            );

            return new ResponseEntity<>(this.objectMapper.writeValueAsString(successResponse), HttpStatus.OK);
        }

        throw new CustomException(ResponseMessageConstants.SERVER_ERROR_MESSAGE);
    }

    @PostMapping(value = "/remove")
    public ResponseEntity removePicture(@RequestBody Map<String, Object> body) throws IOException {
       String loggedInUserId = (String) body.get("loggedInUserId");
       String photoToRemoveId = (String) body.get("photoToRemoveId");

        boolean result = this.pictureService.deletePicture(loggedInUserId, photoToRemoveId);

        if (result) {
            SuccessResponse successResponse = new SuccessResponse(
                    LocalDateTime.now(),
                    "Photo successfully deleted!",
                    "",
                    true
            );

            return new ResponseEntity<>(this.objectMapper.writeValueAsString(successResponse), HttpStatus.OK);
        }

        throw new CustomException(ResponseMessageConstants.SERVER_ERROR_MESSAGE);
    }
}
