<!-- USAGE EXAMPLES -->
## Web Developpers

<b>Architecture of files</b>


<h1>area_web</h1>


<h2>node_modules</h2>

The `node_modules` folder is the repository of modules/library which you are using inside your project. What ever you are importing in your project that module or library should present inside the node_modules folder. When you do `npm install`, the module or the library install inside the node_module folder and one entry added in package.json file.

<h2>public</h2>

The <b>public</b> folder contains static files such as index.html, javascript library files, images, and other assets, etc. which you don’t want to be processed by webpack. Files in this folder are copied and pasted as they are directly into the build folder. Only files inside the `public` folder can be referenced from the HTML.

<h2>src</h2>

The `src` folder is the heart of React application as it contains JavaScript which needs to be processed by webpack. In this folder, there is a main component App.js, its related styles (App.css), test suite (App.test.js). index.js, and its style (index.css); which provide an entry point into the App.

The following list contains the folders in `src`, what they do and their utility.

<details>
<summary> Assets </summary>

The `assets` folder contains every font, logo, images etc.. The project contains.
</details>

<details>
<summary> Components </summary>

The `components` folder contains folder itself which are big entities of the project :

  * ListAR
  * NavBar 
  * Services


</details>

<details>
<summary> Functions </summary>

The `Functions` folder contains files which are themselves containing useful functions and could be called everywhere in the project.

</details>

<details>
<summary> Pages </summary>

The `pages` folder contains every pages present in the project, the list is just following :

  * About
  * Error
  * Home 
  * Services
  * Settings
  * SignIn
  * SignUp
  * Socials Button
</details>
</details>

<p align="right">(<a href="#top">back to top</a>)</p>

<h1>How to launch AREA</h1>

<h2>With npm</h2>

In the `area_web` folder, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

<h2>With Docker</h2>

In the `area_web` folder, you can run:

### `docker-compose build && docker-compose up`