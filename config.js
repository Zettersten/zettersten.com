let config = {
  theme: {
    name: "warm-red"
  },
  profile: {
    initials: "EZ",
    name: "Erik Zettersten",
    email: "erik@zettersten.com",
    profession: "Head of Technology",
    image: "profile.jpg",
    location: "Ashburn, VA",
    relocation: false,
    company: "VeeFriends",
    for_hire: false,
    focus: "VeeFriends",
    focus_url: "https://veefriends.com/"
  },
  social: {
    linkedin: "https://linkedin.com/in/zettersten",
    twitter: "https://twitter.com/zettersten",
    facebook: "https://facebook.com/zettersten",
    instagram: "https://www.instagram.com/zettersten/",
    dribbble: "https://dribbble.com/zettersten",
    github: "https://github.com/zettersten",
    eth:
      "https://etherscan.io/address/0x1f8672d94b1d0b8d7afb9f4c43d152d8ea85263e",
    calendly: "https://calendly.com/zettersten"
  },
  skills: [
    "JavaScript / TypeScript / CoffeeScript",
    "C# / Java / Go / Rust",
    "Kubernetes / Docker",
    "Azure / AWS",
    "React / Vue.js / Angular / Blazor WASM",
    "Node.js / PHP / C++",
    "CosmosDb / Firebase / DynamoDb / MongoDB / CouchDB",
    "MSSQL / MySQL / PostgreSQL",
    "Swift / Obj-C",
    "Ethers.js / Web3.js",
    ".NET 6 / .NET Standard"
  ],
  tools: [
    "VSCode / Sublime Text",
    "JIRA / Asana",
    "Bitbucket / Github / GitLab",
    "Visual Studio / Rider",
    "Photoshop / Illustrator / After Effects / Premiere Pro",
    "Charles Debugger / Fiddler / WireShark"
  ],
  about:
    "Results-oriented software engineering leader expert in leading high-performing and multi-disciplinary teams from product development through successful product launches. Accustomed to managing multiple projects and priorities in fast-paced environments. Delivered and deployed 100+ mobile and web applications.",
  budget: {
    currency: "$",
    min: 100,
    max: 1000,
    selected: 10
  },
  projects: [
    {
      name: "VeeFriends",
      url: "https://veefriends.com",
      description: `
        A Gary Vaynerchuk NFT project around meaningful intellectual property and an extraordinary community.
      `,
      status: "live",
      tags: [
        "C#",
        "Blazor WASM",
        "Azure Cognitive Search",
        "Web3.js",
        "Nethereum"
      ],
      icon: "website",
      image: "veefriends.png"
    },
    {
      name: "The Picasos",
      url: "https://thepicasos.com",
      description: `
        Coming soon...
      `,
      status: "in progress",
      tags: [
        "C#",
        "Razor Pages",
        "Azure Cognitive Search",
        "Web3.js",
        "Nethereum"
      ],
      icon: "website",
      image: "thepicasos.png"
    },
    {
      name: "FlyFish Club",
      url: "https://www.flyfishclub.com/",
      description: `
        Flyfish Club (FFC) is the world's first member's only private dining club where membership is purchased on the blockchain as a Non-Fungible-Token (NFT) and owned by the token-holder to gain access to our restaurant and various culinary, cultural and social experiences.
      `,
      status: "live",
      tags: [
        "React.js",
        "Vercel",
        "Azure Cognitive Search",
        "Web3.js",
        "Onboard.js"
      ],
      icon: "website",
      image: "flyfish.png"
    },
    {
      name: "US Open Collectibles",
      url: "https://nft.usopen.org/",
      description: `
      One-of-one cards, featuring a once in a lifetime opportunity for tennis fans. Each Golden Ace card includes player-specific benefits plus: 
        - 1-hour backstage tour of the US Open Grounds
        - 30 minutes of play in Arthur Ashe Stadium
        - Photo Opportunity with the US Open Trophies
        - Your name engraved on the USTA BJK National Tennis Center Grounds
        - Swag Bag from the 2021 US Open
        - And more...
      `,
      status: "live",
      tags: ["React.js", "Web3.js"],
      icon: "website",
      image: "usopen.png"
    },
    {
      name: "ArtOfficial",
      url: "https://www.artofficial.com/",
      description: `
        ArtOfficial is a cutting edge online platform created to exhibit and sell original works by leading and emerging artists exploring new mediums, including digital artwork and NFTs.
      `,
      status: "live",
      tags: ["React.js", "PHP", "AWS", "Web3.js"],
      icon: "website",
      image: "artofficial.png"
    },
    {
      name: "EMoney® Enterprise",
      url: "https://emoney.com",
      description: `
        The EMoney® platform makes ETS unique in our industry. Our host based solution controls the entire transaction process from the point of authorization to the point of settlement, providing merchants with a single point of contact for all support requirements. From the front-end POS, to the financial middle-tier, to the back-end consumer engagement tools, we enable merchants to control their accounts without fractionalizing essential parts of their business.
      `,
      status: "live",
      tags: ["C#", "Angular", "REST APIs", "Cosmos DB", "Micro Services"],
      icon: "website",
      image: "emoney.jpg"
    },
    {
      name: "EMoney® Wallet",
      url: "https://www.etsms.com/emoney/e-mobile",
      description: `
        Now you can send and receive payments online or from your mobile devices with Emoney®, a digital wallet optimized for mobile living.
      
        Send money and pay bills
        Transfer money to Emoney® accounts using an email or mobile phone number. Funds transferred to or received from other Emoney® accounts can be used almost immediately. Emoney® makes it easy to pay bills and electronic invoices you receive from individuals and businesses as well.

        Receive money and manage invoices
        Send requests to other account holders for payment with Emoney®. Recipients can quickly satisfy payment requests and invoices once received.

        Pay parking fees and transit fares
        Your Emoney® account makes it possible to conveniently pay for metered parking fees and public transportation fares in participating locations.
      `,
      status: "live",
      tags: ["Ionic", "Angular 6", "TypeScript"],
      icon: "website",
      image: "mobile.jpg"
    },
    {
      name: "Hosted Payments",
      url: "https://etsms.com/docs/hosted-payments",
      description:
        "A comprehensive, web-based financial transaction toolset, consisting of a fully loaded and customizable Graphical User Interface (GUI) or jQuery plugin and a secure HTTP based RESTFUL service called the HTTP API.",
      status: "live",
      tags: ["C++", "HyperCom L Series", "Ingenico", "JavaScript/HTML/CSS"],
      icon: "website",
      image: "hp.gif"
    }
  ],
  history: [
    {
      company: "VeeFriends",
      position: "Head of Technology",
      period: "May 2021 - present"
    },
    {
      company: "US Bank/Elavon",
      position: "Sr. Director Of Technology",
      period: "October 2018 - May 2021"
    },
    {
      company: "ETS Corporation",
      position: "Director Of Technology",
      period: "September 2014 - October 2018"
    },
    {
      company: "ETS Corporation",
      position: "Sr. Product Manager",
      period: "September 2012 - September 2014"
    },
    {
      company: "Perfect Sense Digital",
      position: "Product Manager",
      period: "August 2012 - September 2012"
    },
    {
      company: "Perfect Sense Digital",
      position: "Lead Software Engineer",
      period: "January 2010 - September 2012"
    }
  ],
  fonts: {
    header: ["Source Sans Pro", "sans-serif"],
    text: ["Roboto", "sans-serif"]
  }
};

/* Merge it with custom configuration for Tailwind CSS */

config = Object.assign(require("tailwindcss/defaultConfig")(), config);
config.colors = config.textColors = config.backgroundColors = config.borderColors = require("./assets/themes/" +
  config.theme.name);
config.width["14"] = config.height["14"] = "3.5rem";
config.width["36"] = config.height["36"] = "9rem";
config.width["56"] = config.height["56"] = "14rem";
config.borderRadius["lg"] = "1rem";
config.plugins = [
  require("tailwindcss/plugins/container")({
    center: true,
    padding: "1rem"
  })
];
module.exports = config;
