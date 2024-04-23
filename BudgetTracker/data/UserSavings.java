package bertrand.oladipo.BudgetTracker.data;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import java.io.Serializable;


@Valid
@Data //the @Data annotation in Java Spring Boot creates the getters and setters as well as a ToString
public class UserSavings implements Serializable{
    @Id
    private String id;
    @NotBlank
    private String name;
    @NotNull
    private Integer price;
    @NotNull
    private Integer moNeyTowardsItem;
    private String dateStarted;
    @DBRef
    private User user; //here we are using composite design pattern to make a reference to the user
                       //whose item this belongs to
    //no-args constructor
    public UserSavings() {

    }
    //constructor
    public UserSavings(String name, Integer price, Integer moNeyTowardsItem, String dateStarted, User user){
        this.name = name;
        this.price = price;
        this.moNeyTowardsItem = moNeyTowardsItem;
        this.dateStarted = dateStarted;
        this.user = user;
    }
}

