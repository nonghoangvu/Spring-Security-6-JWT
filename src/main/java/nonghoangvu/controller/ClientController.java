package nonghoangvu.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("${api.prefix}/user")
public class ClientController {

    @GetMapping
    ResponseEntity<String> accessSys() {
        return ResponseEntity.ok("User accessed!!");
    }
}