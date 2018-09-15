let config = {
  theme: {
    name: 'dark-blue', // Theme files are located at assets/themes/
  },
  profile: {
    initials: 'EZ',
    name: 'Erik Zettersten',
    email: 'erik@zettersten.com',
    profession: 'Director',
    image: 'profile.jpg',
    location: 'Ashburn, VA',
    relocation: false,
    company: 'US Bank/Elavon',
    for_hire: false,
    focus: 'EMoney Enterprise Suite',
    focus_url: 'https://emoney.com/',
  },
  social: {
    linkedin: 'https://linkedin.com/in/zettersten',
    twitter: 'https://twitter.com/zettersten',
    facebook: 'https://facebook.com/zettersten',
    instagram: 'https://www.instagram.com/zettersten/',
    dribbble: 'https://dribbble.com/zettersten',
    github: 'https://github.com/zettersten',
  },
  skills: [
    'JavaScript / TypeScript / CoffeeScript', 
    'C# / Java / Go', 
    'Istio / Kubernetes / Docker', 
    'Azure / AWS', 
    'React / Vue.js / Angular', 
    'Node.js / PHP / C++',
    'CosmosDb / Firebase / DynamoDb',
    'MSSQL / MySQL / PostgreSQL',
    'Azure: CDN, Storage, App Services, Scheduler, HD Insights',
    'More Azure: Kubernetes, Containers, Logic Apps, Functions',
    'More Azure: Traffic Manager, VM, Key Vault, VPN, Data Lakes',
    'AWS: Route 53, SES, SNS',
    'MongoDB, CouchDB',
    'Swift / Obj-C',
    'Asp.net, .Net Core 2.2, .Net 3.5-4.7'
  ],
  tools: ['Agile w/ Scrum', 'Agile w/ Kanban', 'VSCode', 'Bamboo', 'JIRA', 'Bitbucket', 'Visual Studio', 'Powershell / Bash', 'Photoshop', 'Illustrator', 'Visio', 'EMacs', 'VIM', 'Office 365', 'Outlook', 'Sendgrid', 'Mailchimp', 'Postman', 'Request.bin', 'Charles Debugger', 'Chrome'],
  about: 'Results-oriented software engineering leader expert in leading high-performing and multi-disciplinary teams from product development through successful product launches. Accustomed to managing multiple projects and priorities in fast-paced environments. Delivered and deployed 44+ mobile and web applications.',
  budget: {
    currency: '$',
    min: 5,
    max: 30,
    selected: 10,
  },
  projects: [
    {
      name: 'EMoney® Enterprise',
      url: 'https://emoney.com',
      description: `
        The EMoney® platform makes ETS unique in our industry. Our host based solution controls the entire transaction process from the point of authorization to the point of settlement, providing merchants with a single point of contact for all support requirements. From the front-end POS, to the financial middle-tier, to the back-end consumer engagement tools, we enable merchants to control their accounts without fractionalizing essential parts of their business.
      `,
      status: 'in progress',
      tags: ['C#', 'Angular', 'REST APIs', 'Cosmos DB', 'Micro Services'],
      icon: 'website',
      image: 'emoney.jpg'
    },
    {
      name: 'EMoney® Wallet',
      url: 'https://www.etsms.com/emoney/e-mobile',
      description: `
        Now you can send and receive payments online or from your mobile devices with Emoney®, a digital wallet optimized for mobile living.
      
        Send money and pay bills
        Transfer money to Emoney® accounts using an email or mobile phone number. Funds transferred to or received from other Emoney® accounts can be used almost immediately. Emoney® makes it easy to pay bills and electronic invoices you receive from individuals and businesses as well.

        Receive money and manage invoices
        Send requests to other account holders for payment with Emoney®. Recipients can quickly satisfy payment requests and invoices once received.

        Pay parking fees and transit fares
        Your Emoney® account makes it possible to conveniently pay for metered parking fees and public transportation fares in participating locations.
      `,
      status: 'live',
      tags: ['Ionic', 'Angular 6', 'TypeScript'],
      icon: 'website',
      image: 'mobile.jpg'
    },
    {
      name: 'Hosted Payments',
      url: 'https://etsms.com/docs/hosted-payments',
      description: 'A comprehensive, web-based financial transaction toolset, consisting of a fully loaded and customizable Graphical User Interface (GUI) or jQuery plugin and a secure HTTP based RESTFUL service called the HTTP API.',
      status: 'live',
      tags: ['C++', 'HyperCom L Series', 'Ingenico', 'JavaScript/HTML/CSS'],
      icon: 'website',
      image: 'hp.gif'
    },
  ],
  history: [
    {
      company: 'US Bank/Elavon',
      position: 'Sr. Director Of Technology',
      period: 'October 2018 - present'
    },
    {
      company: 'ETS Corporation',
      position: 'Director Of Technology',
      period: 'September 2014 - October 2018'
    },
    {
      company: 'ETS Corporation',
      position: 'Sr. Product Manager',
      period: 'September 2012 - September 2014'
    },
    {
      company: 'Perfect Sense Digital',
      position: 'Product Manager',
      period: 'August 2012 - September 2012'
    },
    {
      company: 'Perfect Sense Digital',
      position: 'Lead Software Engineer',
      period: 'January 2010 - September 2012'
    },
  ],
  fonts: {
    header: [
      'Source Sans Pro',
      'sans-serif',
    ],
    text: [
      'Roboto',
      'sans-serif',
    ],
  }
}

/* Merge it with custom configuration for Tailwind CSS */

config = Object.assign(require('tailwindcss/defaultConfig')(), config)
config.colors = config.textColors = config.backgroundColors = config.borderColors = require('./assets/themes/' + config.theme.name)
config.width['14'] = config.height['14'] = '3.5rem'
config.width['36'] = config.height['36'] = '9rem'
config.width['56'] = config.height['56'] = '14rem'
config.borderRadius['lg'] = '1rem'
config.plugins = [
  require('tailwindcss/plugins/container')({
    center: true,
    padding: '1rem',
  }),
]
module.exports = config