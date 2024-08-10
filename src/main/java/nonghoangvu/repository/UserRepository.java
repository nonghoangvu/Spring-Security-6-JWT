package nonghoangvu.repository;

import nonghoangvu.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    @Query("FROM User WHERE username = :username")
    Optional<User> findByUsername(String username);
}
