package kl.socialnetwork.utils.modelMapper;

import org.modelmapper.ModelMapper;

import java.util.ArrayList;
import java.util.List;

public final class DtoMappingUtil {
    private static ModelMapper mapper = new ModelMapper();

    private DtoMappingUtil() { }

    // Custom mapping Method to Dto and From Dto
    public static <S, D> D convert(S source, Class<D> destClass) {
        return mapper.map(source, destClass);
    }

    // Custom mapping Method for Collections to Dto and From Dto
    public static <S, D> List<D> convertCollection (Iterable<S> sources, Class<D> destClass) {
        List<D> resultList = new ArrayList<>();
        for (S source : sources) {
            D d = convert(source, destClass);
            resultList.add(d);
        }
        return resultList;
    }
}
