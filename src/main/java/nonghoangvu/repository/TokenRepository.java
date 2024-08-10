package nonghoangvu.repository;

import nonghoangvu.model.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TokenRepository extends JpaRepository<Token, Integer> {

    @Query("FROM Token WHERE username = :username")
    Optional<Token> findByUsername(String username);
}
