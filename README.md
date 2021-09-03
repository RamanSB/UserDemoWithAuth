# UserDemoWithAuth
A project to demonstrate how to create a sign in screen to register users and use JWT to help with Authorization and accessing protected routes. Multiple users are able to login and the server will return data from the db to the front-end via end points depending on who the requesting user/client is.

# Example
![Demonstrating UserAuthentication & Checking CurrentUSer via JWT](https://github.com/RamanSB/UserDemoWithAuth/blob/master/client/public/user-auth-demo.gif)


# Comments
In order to achieve the above a JWT (jsonwebtoken) was created and returned to the client (front-end) using a cookie. A cookie is returned on the response-header upon signin & is stored on the front-end side. Upon subsequent requests the cookie will be used to identify the user making the requests. 

N.B: I had initially experienced a lot of trouble trying to persist the cookie from the response-header to the front-end, I had to make a separate project just to understand how to resolve this issue, please see: https://github.com/RamanSB/CookieDemo

Middleware functions are created & used to verify the validity of the cookie prior to invoking controller logic. Middlewares are by definition methods that have access to the request & response objects as well as the 'next' method that is to be invoked in the backend by a controller.

Also upon signout the cookie should be cleared, res.clearCookie('jsonwebtoken') & we pass in the key for the item we are storing, in my case I named my JWT 'jsonwebtoken'.
