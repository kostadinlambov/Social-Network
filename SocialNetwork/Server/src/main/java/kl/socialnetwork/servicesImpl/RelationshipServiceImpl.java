package kl.socialnetwork.servicesImpl;

import kl.socialnetwork.repositories.RelationshipRepository;
import kl.socialnetwork.services.RelationshipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class RelationshipServiceImpl implements RelationshipService {
    private final RelationshipRepository relationshipRepository;

    @Autowired
    public RelationshipServiceImpl(RelationshipRepository relationshipRepository) {
        this.relationshipRepository = relationshipRepository;
    }
}
