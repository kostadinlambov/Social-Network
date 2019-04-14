package kl.socialnetwork.testUtils;

import kl.socialnetwork.domain.entities.Logger;
import kl.socialnetwork.domain.models.serviceModels.LoggerServiceModel;
import kl.socialnetwork.domain.models.viewModels.logger.LoggerViewModel;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

public class LoggerUtils {
    public static Logger createLog() {
        LocalDateTime time = LocalDateTime.now();

        return new Logger() {{
            setId("1");
            setUsername("username");
            setMethod("POST");
            setTableName("users");
            setAction("create");
            setTime(time);
        }};
    }

    public static List<Logger> getLogs(int count) {
        return IntStream.range(0, count)
                .mapToObj(index -> new Logger() {{
                    setId(String.valueOf(index + 1));
                    setUsername("username " + index);
                    setMethod("POST");
                    setTableName("users");
                    setAction("create");
                    setTime(LocalDateTime.now().plusSeconds((long) index));
                }})
                .collect(Collectors.toList());
    }

    public static List<LoggerServiceModel> getLoggerServiceModels(int count) {

        return IntStream.range(0, count)
                .mapToObj(index -> new LoggerServiceModel() {{
                    setId(String.valueOf(index + 1));
                    setUsername("username " + index);
                    setMethod("POST");
                    setTableName("users");
                    setAction("create");
                    setTime(LocalDateTime.now().plusSeconds((long) index));
                }})
                .collect(Collectors.toList());
    }


    public static List<LoggerViewModel> getLoggerViewModels(int count) {
        return IntStream.range(0, count)
                .mapToObj(index -> new LoggerViewModel() {{
                    setId(String.valueOf(index + 1));
                    setUsername("username " + index);
                    setMethod("POST");
                    setTableName("users");
                    setAction("create");
                    setTime(LocalDateTime.now().plusSeconds((long) index).toString());
                }})
                .collect(Collectors.toList());
    }

}
