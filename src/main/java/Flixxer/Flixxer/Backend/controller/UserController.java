package Flixxer.Flixxer.Backend.controller;

import Flixxer.Flixxer.Backend.models.User;
import Flixxer.Flixxer.Backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {

    @Autowired
    UserRepository userRepository;

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(value="/users")
    public List<User> getUsers(){
        return userRepository.findAll();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(value="/users/save")
    public String saveUser(@RequestBody User user){
        userRepository.save(user);
        return "User saved!";
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping(value="/users/update/{id}")
    public String updateUser(@PathVariable long id,@RequestBody User user){
        User updatedUser = userRepository.findById(id).get();
        updatedUser.setUsername(user.getUsername());
        updatedUser.setFirstName(user.getFirstName());
        updatedUser.setLastName(user.getLastName());
        updatedUser.setEmail(user.getEmail());
        updatedUser.setPassword(user.getPassword());
        updatedUser.setRole(user.getRole());
        updatedUser.setOccupation(user.getOccupation());

        userRepository.save(updatedUser);
        return "User updated!";
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping(value="/users/delete/{id}")
    public String deleteUser(@PathVariable long id){
        User deletedUser = userRepository.findById(id).get();
        userRepository.delete(deletedUser);
        return "Deleted user: " + deletedUser.getFirstName() + " " + deletedUser.getLastName();
    }



}
