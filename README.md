# shopping-cart
## Introduction
開發 SPA 網頁，採 React + Node.js Web Restful API 前後端分離的開發模式<br />
前端：<br />
●  使用 React Router 路由設定<br />
●  使用 axios 與後端 Web API 串接<br />
●  使用 filepond 優化圖片上傳<br />
●  使用 immer 執行 deep copy 更新 state<br />
●  佈署 Netlify<br />
後端：<br />
●  使用 JSON Web Token 實現 stateless 驗證<br />
●  使用 joi 驗證輸入資料及 multer 上傳圖片<br />
●  採用 Repository 設計<br />
●  串接 MongoDB Altas 並使用 ORM<br />
●  串接 LINE Pay 金流並使用 crypto-js 加密<br />
●  佈署 Heroku<br />
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

## <a href="https://buy-or-sell-by-yourself.netlify.app">Live Demo</a>


