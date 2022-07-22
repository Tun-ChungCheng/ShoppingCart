# shopping-cart
## Introduction
  Develop with ReactJS as front-end framework, and Node.js, MongoDB, Express.js as backend server.

## Graphics Interchange Format

### Part1

### Part2
  
  
## Features
<table>
  <tr>
    <th>Category</th>
    <th>HTTP verb</th>
    <th>Resource</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>Auth</td>
    <td>POST</td>
    <td>/api/auth/register</td>
    <td>Create a new account with inputting email, password</td>
  </tr>
  <tr>
    <td>Auth</td>
    <td>POST</td>
    <td>/api/auth/login</td>
    <td>Log in using registered email</td>
  </tr>
  <tr>
    <td>Auth</td>
    <td>PATCH</td>
    <td>/api/auth/</td>
    <td>Update profile with inputting name, password, and avator</td>
  </tr>
  <tr>
    <td>Auth</td>
    <td>GET</td>
    <td>/api/auth/:id</td>
    <td>Retrieve user data specified by {id}</td>
  </tr>
  <tr>
    <td>Auth</td>
    <td>GET</td>
    <td>/api/auth/logout</td>
    <td>Log out of an account</td>
  </tr>
  <tr>
    <td>Cart</td>
    <td>POST</td>
    <td>/api/cart/</td>
    <td>Add product to cart</td>
  </tr>
  <tr>
    <td>Cart</td>
    <td>GET</td>
    <td>/api/cart/</td>
    <td>Retrieve cart data</td>
  </tr>
  <tr>
    <td>Cart</td>
    <td>DELETE</td>
    <td>/api/cart/:id</td>
    <td>Delete cart item specified by {id}</td>
  </tr>
  <tr>
    <td>Product</td>
    <td>POST</td>
    <td>/api/product</td>
    <td>Create a new product with inputting name, price, description, and image</td>
  </tr>
  <tr>
    <td>Product</td>
    <td>GET</td>
    <td>/api/product</td>
    <td>Retrieve all product data</td>
  </tr>
  <tr>
    <td>Product</td>
    <td>DELETE</td>
    <td>/api/product/:id</td>
    <td>Delete product specified by {id}</td>
  </tr>
  <tr>
    <td>Order</td>
    <td>POST</td>
    <td>/api/order/linePay/createOrder</td>
    <td>Create a new order with cart items and checkout by LINE pay</td>
  </tr>
</table>



