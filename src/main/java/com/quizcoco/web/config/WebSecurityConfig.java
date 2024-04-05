package com.quizcoco.web.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class WebSecurityConfig {


    @Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http
			.csrf(csrf->csrf.disable())	
			.authorizeHttpRequests((requests) -> requests
			.requestMatchers("/", "/home").permitAll()
			.anyRequest().permitAll()
			);
			// .formLogin((form) -> form
			// 	.loginPage("/login")
			// 	.permitAll()
			// )
			//.logout((logout) -> logout.permitAll());

		return http.build();
	}

	@Bean
	public UserDetailsService userDetailsService() {
		UserDetails user =
			 User.builder()
				.username("coco")
				.password("{noop}0404")
				.roles("USER","ADMIN")
				.build();

		return new InMemoryUserDetailsManager(user);
	}
    
}
