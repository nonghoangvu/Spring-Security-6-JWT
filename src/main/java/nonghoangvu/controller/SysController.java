package nonghoangvu.controller;

import lombok.RequiredArgsConstructor;
import nonghoangvu.model.User;
import nonghoangvu.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("${api.prefix}/admin")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://127.0.0.1:5500")
public class SysController {
    final UserRepository userRepository;
    @GetMapping
    ResponseEntity<List<User>> accessSys(){
        return ResponseEntity.ok(this.userRepository.findAll());
    }


}
