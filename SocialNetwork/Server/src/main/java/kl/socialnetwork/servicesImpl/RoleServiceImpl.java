package kl.socialnetwork.servicesImpl;

import kl.socialnetwork.domain.entities.UserRole;
import kl.socialnetwork.repositories.RoleRepository;
import kl.socialnetwork.services.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class RoleServiceImpl implements RoleService {

    private final RoleRepository roleRepository;

    @Autowired
    public RoleServiceImpl(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }


    @Override
    public void persist(UserRole role) {
        this.roleRepository.save(role);
    }

    @Override
    public UserRole getByName(String name) {
        return this.roleRepository.findByAuthority(name);
    }
}
