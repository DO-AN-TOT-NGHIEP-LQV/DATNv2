package com.example.be_eric.security;


import com.example.be_eric.filter.CustomAuthenticationFilter;
import com.example.be_eric.filter.CustomAuthorizationFilter;
import com.example.be_eric.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import static org.springframework.http.HttpMethod.GET;
import static org.springframework.http.HttpMethod.POST;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecutityConfig extends WebSecurityConfigurerAdapter {

    private final UserDetailsService userDetailsService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception{
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(bCryptPasswordEncoder);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        CustomAuthenticationFilter customAuthenticationFilter= new CustomAuthenticationFilter(authenticationManagerBean());
        customAuthenticationFilter.setFilterProcessesUrl("/api/login");
        http.csrf().disable();
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        http.authorizeRequests().antMatchers("/api/login/**", "/api/token/refresh",
                                                        "/api/users/**", "/api/search/**",
                "/api/user/**", "/api/sale/shop/getShop", "/api/user/product/getById"
                ).permitAll();

        http.authorizeRequests().antMatchers( POST, "/api/user/registerShop"   ).hasAnyAuthority("ROLE_USER");
        http.authorizeRequests().antMatchers( POST,   "/api/sale/**").hasAnyAuthority("ROLE_ADMIN", "ROLE_SALER");
        http.authorizeRequests().antMatchers( GET,  "/api/sale/**").hasAnyAuthority("ROLE_ADMIN", "ROLE_SALER");

        http.authorizeRequests().antMatchers( POST, "/api/user/save/**", "/api/sale/**").hasAnyAuthority("ROLE_ADMIN", "ROLE_SALER");

        http.authorizeRequests().antMatchers( POST , "/api/admin/**" ).hasAnyAuthority("ROLE_ADMIN");
        http.authorizeRequests().antMatchers( GET , "/api/admin/**" ).hasAnyAuthority("ROLE_ADMIN");

        //        http.authorizeRequests().antMatchers( GET, "/api/sale/shop/getProduct").hasAnyAuthority("ROLE_ADMIN");
//        http.authorizeRequests().antMatchers( "GET", "/api/user/**").hasAnyAuthority("ROLE_SUPER_ADMIN");
//        http.authorizeRequests().anyRequest().authenticated(); // bat buoc tat cac cac trong deu phai xac thuc
        http.addFilter(customAuthenticationFilter);
        http.addFilterBefore( new CustomAuthorizationFilter(), UsernamePasswordAuthenticationFilter.class);
    }
}
