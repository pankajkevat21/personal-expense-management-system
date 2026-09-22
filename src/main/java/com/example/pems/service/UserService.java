package com.example.pems.service;

import com.example.pems.entity.User;
import com.example.pems.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User createUser(User user) {

        user.setPassword(
                passwordEncoder.encode(user.getPassword())
        );

        return userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public boolean emailExists(String email) {
        return userRepository.existsByEmail(email);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public Optional<User> updateUser(Long id, User updatedUser) {

        return userRepository.findById(id)
                .map(existingUser -> {

                    existingUser.setName(updatedUser.getName());
                    existingUser.setEmail(updatedUser.getEmail());

                    // Password ko dobara hash karo
                    existingUser.setPassword(
                            passwordEncoder.encode(
                                    updatedUser.getPassword()
                            )
                    );

                    return userRepository.save(existingUser);
                });
    }

    public boolean verifyPassword(String rawPassword,
                                  String encodedPassword) {

        return passwordEncoder.matches(
                rawPassword,
                encodedPassword
        );
    }
}