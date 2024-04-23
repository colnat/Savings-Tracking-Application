package bertrand.oladipo.BudgetTracker.controller;
import bertrand.oladipo.BudgetTracker.data.User;
import bertrand.oladipo.BudgetTracker.data.UserSavings;
import bertrand.oladipo.BudgetTracker.service.UserSavingsService;
import bertrand.oladipo.BudgetTracker.service.UserService;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import java.util.List;


@RestController
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true") //CORS, only allow traffic
@RequestMapping("/api")                                                                          //from port 5173 which is what our
public class UserController {                                                                    //frontend is running on
    @Autowired
    private UserService userService;
    @Autowired
    private UserSavingsService userSavingsService;

    @PostMapping("/register")
    public User registerUser(@Valid @RequestBody User user) {
        return userService.registerUser(user);
    }

    @PostMapping("/login")
    public ResponseEntity<User> loginUser(@RequestBody User user, HttpSession session) {
        try {
            User authUser = userService.loginUser(user.getEmail(), user.getPassword()); //authenticate user
            session.setAttribute("loggedInUser", authUser); //if user is authenticated create a cookie for
            return ResponseEntity.ok(authUser);                //for session management

        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }
    @PostMapping("/user/savings")
    public ResponseEntity<UserSavings> saveItem(@Valid @RequestBody UserSavings savings, HttpSession session) {
        try {
            User loggedInUser = (User) session.getAttribute("loggedInUser"); //read session cookie
            if (loggedInUser == null) { //if it is invalid then user is unauthorized to save items
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
            }
            savings.setUser(loggedInUser); //if the session cookie is valid then set the savings to the user
            UserSavings savedItem = userSavingsService.saveSavings(savings);
            return ResponseEntity.ok(savedItem);

        } catch (Exception e) { //if this fails catch error
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/display")
    public ResponseEntity<List<UserSavings>> displaySavings(HttpSession session) {
        User loggedInUser = (User) session.getAttribute("loggedInUser"); //read session cookie
        if (loggedInUser == null) { //if cookie is invalid, user is unauthorized
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
        String userId = loggedInUser.getId(); //using the session cookie to get the id of the user that is logged in
        List<UserSavings> savedItems = userSavingsService.getAllUserSavings(userId);//then find all the items with that
        return ResponseEntity.ok(savedItems);                                       //id in the user savings repo by calling get all savings
    }                                                                               //function in service class

    //allow user to delete an item to undo something
    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable("id") String _id){ //take in the id of the item as an argument
      userSavingsService.deleteItem(_id); //call delete item from the service file to delete that item
    }

}





