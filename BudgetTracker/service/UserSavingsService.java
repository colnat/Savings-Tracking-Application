package bertrand.oladipo.BudgetTracker.service;
import bertrand.oladipo.BudgetTracker.data.UserSavings;
import bertrand.oladipo.BudgetTracker.data.UserSavingsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public final class UserSavingsService {

    @Autowired
    private UserSavingsRepo userSavingsRepository;

        //find all the savings with a particular user id in the user savings repo
        public List<UserSavings> getAllUserSavings(String id){
            return userSavingsRepository.findByUser(id);
        }

        //save the savings the user provided to the user savings repo
        public UserSavings saveSavings(UserSavings savings){
            return userSavingsRepository.save(savings);
        }

        //delete the selected item by id
        public void deleteItem(String item_id){
            userSavingsRepository.deleteById(item_id);
        }

}
