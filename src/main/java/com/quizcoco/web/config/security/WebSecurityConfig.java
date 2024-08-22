package com.quizcoco.web.config.security;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

@Configuration
public class WebSecurityConfig {

	@Autowired
	private DataSource dataSource;

	@Autowired
	private WebOAuth2UserDetailsService oauth2UserDetailsService;

	private AuthenticationSuccessHandler loginSuccessHandler = new LoginSuccessHandler();

	@Bean
	public PasswordEncoder passwordEncoder() {
		
		PasswordEncoder encoder = new BCryptPasswordEncoder();
			return encoder;
	}
 
    @Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http
			.csrf(csrf->csrf.disable())	
			.authorizeHttpRequests((requests) -> requests
			.requestMatchers("/admin/**").hasRole("ADMIN")
			.requestMatchers("/myinfo/**", "/home","/study/userquiz/**").hasAnyRole("MEMBER","ADMIN")
			.anyRequest().permitAll()
			)
			.formLogin((form) -> form
			.loginPage("/user/login")
			.defaultSuccessUrl("/")
			.usernameParameter("username")
			.permitAll()
			.successHandler(loginSuccessHandler)
			)
			//구글 소셜로그인하기
			.oauth2Login(config->config
				.userInfoEndpoint(userInf->userInf
					.userService(oauth2UserDetailsService)).successHandler(loginSuccessHandler))//토큰으로 받기
					
			.logout((logout) -> logout	
			.logoutUrl("/logout")
			.logoutSuccessUrl("/")
			.invalidateHttpSession(true) //로그아웃시 사용자 섹션 삭제
			.permitAll());


		return http.build();
	}

	
	//@Bean
	public UserDetailsService jdbcUserDetailsService() {
		
		String userSql = "select name, pw password from user where name=?";
		String authSql = """
							select
								u.name,
								mr.role_name authority
							from
								user u	
								right join member_role mr
								on u.id = mr.member_id
							where u.name =?	
						""";

		JdbcUserDetailsManager manager = new JdbcUserDetailsManager(dataSource);
		manager.setUsersByUsernameQuery(userSql);
		manager.setAuthoritiesByUsernameQuery(authSql);
		
		return manager;
	}


	//@Bean
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

