package bertrand.oladipo.BudgetTracker.data;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;
import java.io.Serializable;
@Data //the @Data annotation in Java Spring Boot create the getters and setters as well as a ToString
@Valid
@Document(collection = "users")
public class User implements Serializable{
    @Id
    private String id;
    @Size(min=5)
    @NotBlank
    private String email;
    @NotBlank
    private String firstName;
    @NotBlank
    private String lastName;
    @Size(min=8)
    @NotBlank
    private String password;
    @DBRef
    private List<UserSavings> savings;

    //no-arg constructor
    public User() {

    }
    //constructor
    public User(String email , String firstName, String lastName, String password, List<UserSavings> savings) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.savings = savings;
    }


}

