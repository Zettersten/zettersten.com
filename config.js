let config = {
  theme: {
    name: 'classic', // Theme files are located at assets/themes/
  },
  profile: {
    initials: 'SJ',
    name: 'Scott Johnson',
    email: 'scott.johson@scottdev.net',
    profession: 'Web Developer',
    image: 'profile.jpg',
    location: 'New York, USA',
    relocation: true,
    company: 'Atomic Studio',
    for_hire: true,
    focus: 'JS chart library',
    focus_url: 'https://github.com/',
  },
  social: {
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
    // facebook: 'https://',
    // instagram: 'https://',
    // dribbble: 'https://',
    // behance: 'https://',
    // producthunt: 'https://',
    github: 'https://github.com',
  },
  skills: ['JavaScript', 'HTML / CSS', 'Ruby on Rails'],
  tools: ['ReactJS', 'Sublime Text', 'Github'],
  about: 'Bring to the table win-win survival strategies to ensure proactive domination. At the end of the day, going forward, a&nbsp;new normal that has evolved from generation X is on the runway heading towards a streamlined cloud solution.<br><br> User generated content in real-time will have multiple touchpoints for offshoring. Keeping your eye on the ball while performing a deep dive on the start-up mentality to derive convergence on cross-platform integration.',
  budget: {
    currency: '$',
    min: 5,
    max: 30,
    selected: 10,
  },
  projects: [      
    {
      name: 'JS GraphQL library',
      url: 'https://github.com',
      description: 'Override the digital divide with additional clickthroughs from DevOps. User generated content in real-time will have multiple touchpoints for offshoring.',
      status: 'in progress',
      tags: ['JavaScript', 'GraphQL'],
      icon: 'github'
    },
    {
      name: 'Running Lists',
      url: 'https://running-lists.com',
      description: 'Nanotechnology immersion along the information highway will close the loop on focusing solely on the bottom line.',
      status: 'live',
      tags: ['RoR', 'HTML', 'CSS'],
      icon: 'website',
    },
    {
      name: 'Northwest Podcast',
      url: 'https://npodcast.com',
      description: 'Leverage agile frameworks to provide a robust synopsis for high level overviews.',
      status: 'live',
      tags: ['JavaScript', 'HTML'],
      icon: 'website',
      image: 'podcast.jpg'
    },
  ],
  history: [
    {
      company: 'Atomic Studio',
      position: 'Senior Web Developer',
      period: 'January 2017 - present'
    },
    {
      company: 'Atomic Studio',
      position: 'Web Developer',
      period: 'January 2014 - December 2016'
    },
    {
      company: 'WebConnect Agency',
      position: 'Junior Web Developer',
      period: 'November 2010 - December 2013'
    },
    {
      company: 'Freelance',
      position: 'Web Developer',
      period: 'April 2008 - October 2010'
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
config.colors = config.textColors = config.backgroundColors = config.borderColors = require('./assets/themes/'+config.theme.name)
config.width['14'] = config.height['14'] = '3.5rem'
config.width['36'] = config.height['36'] = '9rem'
config.width['56'] = config.height['56'] ='14rem'
config.borderRadius['lg'] = '1rem'
config.plugins = [
  require('tailwindcss/plugins/container')({
    center: true,
    padding: '1rem',
  }),
]
module.exports = config