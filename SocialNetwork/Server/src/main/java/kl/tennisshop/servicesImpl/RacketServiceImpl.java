package kl.tennisshop.servicesImpl;

import kl.tennisshop.domain.entities.Category;
import kl.tennisshop.domain.entities.Order;
import kl.tennisshop.domain.entities.Racket;
import kl.tennisshop.domain.models.bindingModels.racket.RacketCreateBindingModel;
import kl.tennisshop.domain.models.serviceModels.RacketServiceModel;
import kl.tennisshop.repositories.OrderRepository;
import kl.tennisshop.repositories.RacketRepository;
import kl.tennisshop.services.CategoryService;
import kl.tennisshop.services.RacketService;
import kl.tennisshop.utils.constants.ResponseMessageConstants;
import kl.tennisshop.utils.responseHandler.exceptions.CustomException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import static kl.tennisshop.utils.constants.ResponseMessageConstants.FAILURE_RACKET_NOT_FOUND_MESSAGE;

@Service
@Transactional
public class RacketServiceImpl implements RacketService {

    private final RacketRepository racketRepository;
    private final OrderRepository orderRepository;
    private final ModelMapper modelMapper;
    private final CategoryService categoryService;

    @Autowired
    public RacketServiceImpl(RacketRepository racketRepository, OrderRepository orderRepository, ModelMapper modelMapper, CategoryService categoryService) {
        this.racketRepository = racketRepository;
        this.orderRepository = orderRepository;
        this.modelMapper = modelMapper;
        this.categoryService = categoryService;
    }

    @Override
    public Racket persist(RacketCreateBindingModel addRacketDto) {
        Racket racket = this.modelMapper.map(addRacketDto, Racket.class);
        return this.racketRepository.saveAndFlush(racket);
    }

    @Override
    public boolean saveRacket(RacketServiceModel racketServiceModel) {

        Category category = this.categoryService.findByName(racketServiceModel.getCategory().getName());
        if (category != null) {
            racketServiceModel.setCategory(category);
            Racket racket = this.modelMapper.map(racketServiceModel, Racket.class);
            Racket savedRacket = this.racketRepository.save(racket);
            return savedRacket != null;
        }

        throw new CustomException(ResponseMessageConstants.INVALID_CATEGORY_ERROR_MESSAGE);
    }

    @Override
    public boolean updateRacket(RacketServiceModel racketServiceModel) {
        Racket racketFromDb = this.racketRepository.findById(racketServiceModel.getId()).orElse(null);
        if (racketFromDb != null) {
//            return this.saveRacket(racketServiceModel);
            Category category = this.categoryService.findByName(racketServiceModel.getCategory().getName());
            if (category != null) {
                racketServiceModel.setCategory(category);
                Racket racket = this.modelMapper.map(racketServiceModel, Racket.class);
                Racket savedRacket = this.racketRepository.saveAndFlush(racket);
                return savedRacket != null;
            }
            throw new CustomException(ResponseMessageConstants.INVALID_CATEGORY_ERROR_MESSAGE);
        }
        return false;
    }


    @Override
    public void persistRacket(Racket racket) {
        this.racketRepository.save(racket);
    }

    @Override
    public List<Racket> findAllRacketsByCategory(Category category) {
        return this.racketRepository.findAllByCategory(category);
    }

    @Override
    public Racket getByName(String name) {
        return this.racketRepository.findByName(name);
    }

    @Override
    public List<RacketServiceModel> getAllRackets() {
        return this.racketRepository
                .findAllByDeletedFalse()
                .stream()
                .map(x -> this.modelMapper.map(x, RacketServiceModel.class))
                .collect(Collectors.toUnmodifiableList());
    }

    @Override
    public RacketServiceModel getById(String id) {
        Racket racket = this.racketRepository.findById(id).orElse(null);

        if (racket != null) {
            return this.modelMapper.map(racket, RacketServiceModel.class);
        }
        return null;
    }

    @Override
    public Racket getFirstRacketByName(String name) {
        return this.racketRepository.findFirstByName(name);
    }


    @Override
    public boolean deleteById(String id) {
        try{
            this.racketRepository.deleteById(id);
        }catch (Exception e){
            throw new CustomException(FAILURE_RACKET_NOT_FOUND_MESSAGE);
        }
        return true;
    }

    @Override
    public boolean disableById(String id) {
            Racket racket = this.racketRepository.findById(id).orElse(null);
            if(racket != null){
                racket.setDeleted(true);
                this.racketRepository.saveAndFlush(racket);
                return true;
            }
            throw new CustomException(FAILURE_RACKET_NOT_FOUND_MESSAGE);
    }

//    @Override
//    public void deleteAllDisabledAndWithoutOrderRackets(){
//
//        try {
//            List<Racket> racketsToDelete = this.racketRepository.findAllByDeletedTrue();
//            List<Order> orders = this.orderRepository.findAll();
//            racketsToDelete.stream()
//                    .forEach(racket -> {
//                        orders.stream().forEach(order -> {
//                            if (racket.getId().equals(order.getRacket().getId())) {
//                                racketsToDelete.remove(racket);
//                            }
//                        });
//                    });
//
//            racketsToDelete.forEach(racket -> this.deleteById(racket.getId()));
//            System.out.println("Rackets deleted successfully!");
//        } catch(Exception ex){
//            throw new CustomException(FAILURE_RACKET_NOT_FOUND_MESSAGE);
//        }
//
//    }



}
