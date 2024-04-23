package bertrand.oladipo.BudgetTracker.data;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserSavingsRepo extends MongoRepository<UserSavings, String> {
    List<UserSavings> findByUser(String userId); //search repository to find list of a users savings

}


