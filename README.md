# Intro.
> Personal branding theme for developers



## Installation

### Prerequisites

Please be sure you already have [Node.js](https://nodejs.org/) with [npm](https://www.npmjs.com/get-npm) installed.

### Required packages

Navigate to the theme's main folder and run the command:

```sh
npm install
```

It should download all required packages to the `node_modules` folder.



## Configuration

You can configure the website by editing a single `config.js` file. Please open it in your favorite code editor and then fill it with your own profile information.

The file contains sections for customizing:

* Selected theme (color variant),
* Basic information (name, surname, location, position, etc.),
* Social media links,
* 3x TOP skills / tools,
* Your description (short bio),
* Your projects,
* Employment history,
* Budget settings for a slider (in the contact form).



Your profile/projects images should be placed in `images/` directory.



## Building website

Once you're done editing `config.js` file, you need to build the website.

There are 2 commands you can use for development purpose:

#### Build the website in a development environment

```sh
npm run dev
```

#### Watch for file changes and then build the website

```sh
npm run watch
```

In result of both commands, `dist/` directory will be created with `index.html` file and `assets` and `images` directories.

_Generated .js and .css files in development environment aren't minified and shouldn't be deployed to production._



#### Color variants

There are 10 color variants available. Each variant has its own definition in `assets/themes/` directory.

You can create your own variant of use existing one. You can specify a variant to use by setting `config.theme.name` value in `config.js` file - please just use the filename without .js extension.

_Theme previews are available in `previews` directory._



## Customization

For deeper customization of the theme you can:

### Edit CSS

The theme is built with [TailwindCSS](https://tailwindcss.com) - Utility-First CSS Framework.

Custom CSS code is placed in the `assets/intro.css` file. 

### Edit HTML code

The HTML template used by the builder is located in the `builder/template.ejs` file. It uses [Embedded JavaScript template](http://ejs.co) syntax.



## Contact form

Contact form processing is being done by [Formspree](https://formspree.io). When a user fills the form, entered data will be sent via e-mail to address provided in `config.profile.email` field (in `config.js`).

Once receiving the first message, it will be required to confirm your e-mail by clicking a link sent in an activation email.



## Deployment

You can generate the website for production environment by running the command:

```sh
npm run prod
```

Once completed you can copy contents of `dist/` directory to your server.



## License

The license is available in ``License.pdf`` file included with the theme.



## Release History

* 1.0.0
* The first public version of the theme




## About

Intro. is a theme created by [Weeby Studio](https://weeby.studio).

If you have any questions, feel free to contact us at [hello@weebystudio.com](mailto:hello@weebystudio.com)

**We'll be happy to help!**