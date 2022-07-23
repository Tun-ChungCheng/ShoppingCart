# shopping-cart
## Introduction
  Develop with ReactJS as front-end framework, and Node.js, MongoDB, Express.js as backend server.

## Graphics Interchange Format

### Part1
![錄製_2022_07_23_14_16_26_915_Trim](https://user-images.githubusercontent.com/91156531/180593429-cbd2daea-9863-41a8-a5dc-9cf837f19e99.gif)

### Part2
  
![錄製_2022_07_23_14_58_52_32_Trim_Trim](https://user-images.githubusercontent.com/91156531/180594758-bae785a5-f664-45c6-8894-8795675dc7c3.gif)

## Features

<table>
  <tr>
    <th>Category</th>
    <th>HTTP verb</th>
    <th>Resource</th>
    <th>Description</th>
  </tr>
  <tr>
    <td rowspan="5">Auth</td>
    <td>POST</td>
    <td>/api/auth/register</td>
    <td>Create a new account with inputting email, password</td>
  </tr>
  <tr>
    <td>POST</td>
    <td>/api/auth/login</td>
    <td>Log in using registered email</td>
  </tr>
  <tr>
    <td>PATCH</td>
    <td>/api/auth/</td>
    <td>Update profile with inputting name, password, and avator</td>
  </tr>
  <tr>
    <td>GET</td>
    <td>/api/auth/:id</td>
    <td>Retrieve user data specified by {id}</td>
  </tr>
  <tr>
    <td>GET</td>
    <td>/api/auth/logout</td>
    <td>Log out of an account</td>
  </tr>
  <tr>
    <td rowspan="3">Cart</td>
    <td>POST</td>
    <td>/api/cart/</td>
    <td>Increase new item into the cart or change item quantity in the cart</td>
  </tr>
  <tr>
    <td>GET</td>
    <td>/api/cart/</td>
    <td>Retrieve cart data</td>
  </tr>
  <tr>
    <td>DELETE</td>
    <td>/api/cart/:id</td>
    <td>Delete cart item specified by {id}</td>
  </tr>
  <tr>
    <td rowspan="3">Product</td>
    <td>POST</td>
    <td>/api/product</td>
    <td>Create a new product with inputting name, price, description, and image</td>
  </tr>
  <tr>
    <td>GET</td>
    <td>/api/product</td>
    <td>Retrieve all product data</td>
  </tr>
  <tr>
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



