package com.store.backend.service;

import com.store.backend.entity.User;
import com.store.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.DefaultCredentialsProvider;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.cognitoidentityprovider.CognitoIdentityProviderClient;
import software.amazon.awssdk.services.cognitoidentityprovider.model.*;

import org.springframework.stereotype.Service;
import software.amazon.awssdk.utils.ImmutableMap;

import java.util.Map;

// AWS Cognito ld5ehom
@Service
public class CognitoService {
    @Value("${aws.cognito.pool-id}")
    private final String userPoolId = "us-west-1_pcXAJ0K9E";

    @Value("${aws.cognito.client-id}")
    private final String clientId = "38qjg8hpr8gch177fe7bq4k402";

    @Value("${aws.cognito.region}")
    private String cognitoRegion = "us-west-1";

    @Autowired
    private UserRepository userRepository;

    private final CognitoIdentityProviderClient cognitoClient;

//    private final CognitoIdentityProviderClient cognitoClient = CognitoIdentityProviderClient.builder().build();

    public CognitoService() {
        this.cognitoClient = CognitoIdentityProviderClient.builder()
                .credentialsProvider(DefaultCredentialsProvider.create())
                .region(Region.of(cognitoRegion))
                .build();
    }

    public SignUpResponse signUp(String username, String password) {
        userRepository.save(new User(username, password));
        SignUpRequest signUpRequest = SignUpRequest.builder()
                .clientId(clientId)
                .username(username)
                .password(password)
                .build();
        SignUpResponse signUpResponse = cognitoClient.signUp(signUpRequest);

        // Admin confirm check
        AdminConfirmSignUpRequest confirmSignUpRequest = AdminConfirmSignUpRequest.builder()
                .userPoolId(userPoolId)
                .username(username)
                .build();
        cognitoClient.adminConfirmSignUp(confirmSignUpRequest);
        return signUpResponse;
    }

    public String login(String username, String password) {
        CognitoIdentityProviderClient cognitoClient = CognitoIdentityProviderClient.builder().build();
        InitiateAuthRequest initiateAuthRequest = InitiateAuthRequest.builder()
                .authFlow(AuthFlowType.USER_PASSWORD_AUTH)
                .clientId(clientId)
                .authParameters(ImmutableMap.of(
                        "USERNAME", username,
                        "PASSWORD", password
                ))
                .build();

        InitiateAuthResponse initiateAuthResponse = cognitoClient.initiateAuth(initiateAuthRequest);

        if (initiateAuthResponse.authenticationResult() != null) {
            AuthenticationResultType authResult = initiateAuthResponse.authenticationResult();
            return authResult.accessToken();
        } else {
            throw new RuntimeException("Authentication failed.");
        }
    }

    public void logout(String accessToken) {
        CognitoIdentityProviderClient cognitoClient = CognitoIdentityProviderClient.builder().build();
        GlobalSignOutRequest globalSignOutRequest = GlobalSignOutRequest.builder()
                .accessToken(accessToken)
                .build();

        GlobalSignOutResponse globalSignOutResponse = cognitoClient.globalSignOut(globalSignOutRequest);

        if (!globalSignOutResponse.sdkHttpResponse().isSuccessful()) {
            throw new RuntimeException("Logout failed.");
        }
    }
}