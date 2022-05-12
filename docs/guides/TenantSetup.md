# Setting the OAuth Tenant

The Oauth tenant tells the Microsoft 365 OAuth 2 system which organization to send the requests too and to control who can sign in to the application.
In the program, you should set the tenant to the organization you are using to authenticate the user.

For example, the tenant ID for TTU is: `178a51bf-8b20-49ff-b655-56245d5c173c`

## Changing the Tenant:

You should change the tenant value in your .env file:

```dotfile
TENANT={replace me}
```

To change the tenant id, replace everything to the right of the equal sign with the new id. For more information see: [Microsoft OAuth Docs](https://docs.microsoft.com/en-us/azure/active-directory/develop/active-directory-v2-protocols#endpoints)

## Happy Coding 🎉🙌
