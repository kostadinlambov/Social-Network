package kl.socialnetwork.domain.models.viewModels.relationship;

public class FriendsCandidatesViewModel {
    private String id;
    private String firstName;
    private String lastName;
    private String username;
    private String profilePicUrl;
    private String backgroundImageUrl;
    private Boolean starterOfAction = false;
    private Integer status;

    public FriendsCandidatesViewModel() {
    }

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFirstName() {
        return this.firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return this.lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getProfilePicUrl() {
        return this.profilePicUrl;
    }

    public void setProfilePicUrl(String profilePicUrl) {
        this.profilePicUrl = profilePicUrl;
    }

    public String getBackgroundImageUrl() {
        return this.backgroundImageUrl;
    }

    public void setBackgroundImageUrl(String backgroundImageUrl) {
        this.backgroundImageUrl = backgroundImageUrl;
    }

    public Boolean getStarterOfAction() {
        return this.starterOfAction;
    }

    public void setStarterOfAction(Boolean starterOfAction) {
        this.starterOfAction = starterOfAction;
    }

    public Integer getStatus() {
        return this.status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }
}
