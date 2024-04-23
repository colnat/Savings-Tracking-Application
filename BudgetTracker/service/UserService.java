package bertrand.oladipo.BudgetTracker.service;
import bertrand.oladipo.BudgetTracker.data.User;
import bertrand.oladipo.BudgetTracker.data.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import javax.naming.AuthenticationException;

@Service
public final class UserService {


    @Autowired
    private UserRepository userRepository;

    public User registerUser(User user) {
        User checkIfUserExist = userRepository.findByEmail(user.getEmail()); //search user repo to check if this user
        if(checkIfUserExist != null){                                        //already exists
            throw new RuntimeException("User with this username already exists");//if there is a match this user already has an account
        }

        String hashedPassword = new BCryptPasswordEncoder().encode(user.getPassword()); //encrypt there password in the database
        user.setPassword(hashedPassword); //set password to user
        return userRepository.save(user); //then save the new user to the database
    }

    public User loginUser(String email, String password) {
        User user = userRepository.findByEmail(email); //find the user by the username provided
        if (user != null && new BCryptPasswordEncoder().matches(password, user.getPassword())) {
            return user; //if the username provided matches with the password that was provided then the login is successful
        } else {
            throw new RuntimeException("Username or password is incorrect");//else there is an error
        }
    }



}
