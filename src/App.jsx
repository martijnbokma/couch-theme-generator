import React, { useState } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

// Template generator functions
const generateIndexPhp = () => {
  return `<?php
    // Template: index.php
    // This is the main template file for your CouchCMS theme
    
    // Include CouchCMS
    require_once( 'couchcms/couch/cms.php' );
    
    // Page title
    <cms:template title="Home Page" />
    
    // Begin template
    <cms:if k_template_name='index.php'>
        <cms:set_flash name='active_nav' value='home' />
    </cms:if>
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><cms:show k_site_name /> | <cms:show k_page_title /></title>
    
    <cms:if k_template_name='index.php'>
        <meta name="description" content="Welcome to <cms:show k_site_name />">
    </cms:if>
    
    <!-- CSS -->
    <link rel="stylesheet" href="<cms:show k_site_link />css/style.css">
</head>
<body>
    <header>
        <div class="container">
            <h1><cms:show k_site_name /></h1>
            <nav>
                <ul>
                    <li class="<cms:if flash_exists 'active_nav' && flash 'active_nav'='home'>active</cms:if>">
                        <a href="<cms:show k_site_link />">Home</a>
                    </li>
                    <cms:if k_folder_name='blog'>
                    <li class="<cms:if flash_exists 'active_nav' && flash 'active_nav'='blog'>active</cms:if>">
                        <a href="<cms:show k_site_link />blog/">Blog</a>
                    </li>
                    </cms:if>
                    <cms:if k_folder_name='contact'>
                    <li class="<cms:if flash_exists 'active_nav' && flash 'active_nav'='contact'>active</cms:if>">
                        <a href="<cms:show k_site_link />contact/">Contact</a>
                    </li>
                    </cms:if>
                </ul>
            </nav>
        </div>
    </header>
    
    <main>
        <div class="container">
            <h2>Welcome to <cms:show k_site_name /></h2>
            <p>This is your new CouchCMS website. Edit this template to customize your home page.</p>
        </div>
    </main>
    
    <footer>
        <div class="container">
            <p>&copy; <cms:date format='Y' /> <cms:show k_site_name />. All rights reserved.</p>
        </div>
    </footer>
</body>
</html>
<?php COUCH::invoke(); ?>`;
};

const generateBlogTemplate = () => {
  return `<?php
    // Template: blog.php
    // This is the blog template file for your CouchCMS theme
    
    // Include CouchCMS
    require_once( '../couchcms/couch/cms.php' );
    
    // Page title
    <cms:template title="Blog" />
    
    // Begin template
    <cms:if k_template_name='blog.php'>
        <cms:set_flash name='active_nav' value='blog' />
    </cms:if>
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><cms:show k_site_name /> | Blog</title>
    
    <!-- CSS -->
    <link rel="stylesheet" href="<cms:show k_site_link />css/style.css">
</head>
<body>
    <header>
        <div class="container">
            <h1><cms:show k_site_name /></h1>
            <nav>
                <ul>
                    <li class="<cms:if flash_exists 'active_nav' && flash 'active_nav'='home'>active</cms:if>">
                        <a href="<cms:show k_site_link />">Home</a>
                    </li>
                    <li class="<cms:if flash_exists 'active_nav' && flash 'active_nav'='blog'>active</cms:if>">
                        <a href="<cms:show k_site_link />blog/">Blog</a>
                    </li>
                    <cms:if k_folder_name='contact'>
                    <li class="<cms:if flash_exists 'active_nav' && flash 'active_nav'='contact'>active</cms:if>">
                        <a href="<cms:show k_site_link ?>contact/">Contact</a>
                    </li>
                    </cms:if>
                </ul>
            </nav>
        </div>
    </header>
    
    <main>
        <div class="container">
            <h2>Blog</h2>
            
            <cms:pages masterpage='blog.php' limit='10'>
                <div class="blog-post">
                    <h3><a href="<cms:show k_page_link />"><cms:show k_page_title /></a></h3>
                    <div class="meta">
                        <span class="date"><cms:date k_page_date format='F j, Y' /></span>
                    </div>
                    <div class="excerpt">
                        <cms:excerpt chars='250'><cms:show k_page_content /></cms:excerpt>
                    </div>
                    <a href="<cms:show k_page_link />" class="read-more">Read More</a>
                </div>
            </cms:pages>
        </div>
    </main>
    
    <footer>
        <div class="container">
            <p>&copy; <cms:date format='Y' /> <cms:show k_site_name />. All rights reserved.</p>
        </div>
    </footer>
</body>
</html>
<?php COUCH::invoke(); ?>`;
};

const generateContactTemplate = () => {
  return `<?php
    // Template: contact.php
    // This is the contact template file for your CouchCMS theme
    
    // Include CouchCMS
    require_once( '../couchcms/couch/cms.php' );
    
    // Page title
    <cms:template title="Contact Us" />
    
    // Begin template
    <cms:if k_template_name='contact.php'>
        <cms:set_flash name='active_nav' value='contact' />
    </cms:if>
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><cms:show k_site_name /> | Contact Us</title>
    
    <!-- CSS -->
    <link rel="stylesheet" href="<cms:show k_site_link />css/style.css">
</head>
<body>
    <header>
        <div class="container">
            <h1><cms:show k_site_name /></h1>
            <nav>
                <ul>
                    <li class="<cms:if flash_exists 'active_nav' && flash 'active_nav'='home'>active</cms:if>">
                        <a href="<cms:show k_site_link />">Home</a>
                    </li>
                    <cms:if k_folder_name='blog'>
                    <li class="<cms:if flash_exists 'active_nav' && flash 'active_nav'='blog'>active</cms:if>">
                        <a href="<cms:show k_site_link />blog/">Blog</a>
                    </li>
                    </cms:if>
                    <li class="<cms:if flash_exists 'active_nav' && flash 'active_nav'='contact'>active</cms:if>">
                        <a href="<cms:show k_site_link ?>contact/">Contact</a>
                    </li>
                </ul>
            </nav>
        </div>
    </header>
    
    <main>
        <div class="container">
            <h2>Contact Us</h2>
            
            <cms:if k_success>
                <div class="success-message">
                    <p>Thank you for your message. We'll get back to you soon!</p>
                </div>
            <cms:else />
                <cms:form method='post' class="contact-form">
                    <div class="form-group">
                        <label for="name">Name:</label>
                        <cms:input name="name" type="text" required='1' />
                    </div>
                    
                    <div class="form-group">
                        <label for="email">Email:</label>
                        <cms:input name="email" type="email" required='1' validator='email' />
                    </div>
                    
                    <div class="form-group">
                        <label for="subject">Subject:</label>
                        <cms:input name="subject" type="text" required='1' />
                    </div>
                    
                    <div class="form-group">
                        <label for="message">Message:</label>
                        <cms:input name="message" type="textarea" required='1' />
                    </div>
                    
                    <div class="form-group">
                        <cms:input name="submit" type="submit" value="Send Message" />
                    </div>
                </cms:form>
            </cms:if>
        </div>
    </main>
    
    <footer>
        <div class="container">
            <p>&copy; <cms:date format='Y' /> <cms:show k_site_name />. All rights reserved.</p>
        </div>
    </footer>
</body>
</html>
<?php COUCH::invoke(); ?>`;
};

const generatePortfolioTemplate = () => {
  return `<?php
    // Template: portfolio.php
    // This is the portfolio template file for your CouchCMS theme
    
    // Include CouchCMS
    require_once( '../couchcms/couch/cms.php' );
    
    // Page title
    <cms:template title="Portfolio" />
    
    // Begin template
    <cms:if k_template_name='portfolio.php'>
        <cms:set_flash name='active_nav' value='portfolio' />
    </cms:if>
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><cms:show k_site_name /> | Portfolio</title>
    
    <!-- CSS -->
    <link rel="stylesheet" href="<cms:show k_site_link />css/style.css">
</head>
<body>
    <header>
        <div class="container">
            <h1><cms:show k_site_name /></h1>
            <nav>
                <ul>
                    <li class="<cms:if flash_exists 'active_nav' && flash 'active_nav'='home'>active</cms:if>">
                        <a href="<cms:show k_site_link />">Home</a>
                    </li>
                    <cms:if k_folder_name='blog'>
                    <li class="<cms:if flash_exists 'active_nav' && flash 'active_nav'='blog'>active</cms:if>">
                        <a href="<cms:show k_site_link />blog/">Blog</a>
                    </li>
                    </cms:if>
                    <li class="<cms:if flash_exists 'active_nav' && flash 'active_nav'='portfolio'>active</cms:if>">
                        <a href="<cms:show k_site_link ?>portfolio/">Portfolio</a>
                    </li>
                </ul>
            </nav>
        </div>
    </header>
    
    <main>
        <div class="container">
            <h2>Portfolio</h2>
            
            <div class="portfolio-grid">
                <cms:pages masterpage='portfolio.php' limit='12'>
                    <div class="portfolio-item">
                        <a href="<cms:show k_page_link />">
                            <cms:if k_page_folderthumbnail>
                                <img src="<cms:show k_page_folderthumbnail />" alt="<cms:show k_page_title />">
                            </cms:if>
                            <h3><cms:show k_page_title /></h3>
                        </a>
                    </div>
                </cms:pages>
            </div>
        </div>
    </main>
    
    <footer>
        <div class="container">
            <p>&copy; <cms:date format='Y' /> <cms:show k_site_name />. All rights reserved.</p>
        </div>
    </footer>
</body>
</html>
<?php COUCH::invoke(); ?>`;
};

const generateGalleryTemplate = () => {
  return `<?php
    // Template: gallery.php
    // This is the gallery template file for your CouchCMS theme
    
    // Include CouchCMS
    require_once( '../couchcms/couch/cms.php' );
    
    // Page title
    <cms:template title="Gallery" />
    
    // Begin template
    <cms:if k_template_name='gallery.php'>
        <cms:set_flash name='active_nav' value='gallery' />
    </cms:if>
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><cms:show k_site_name /> | Gallery</title>
    
    <!-- CSS -->
    <link rel="stylesheet" href="<cms:show k_site_link />css/style.css">
</head>
<body>
    <header>
        <div class="container">
            <h1><cms:show k_site_name /></h1>
            <nav>
                <ul>
                    <li class="<cms:if flash_exists 'active_nav' && flash 'active_nav'='home'>active</cms:if>">
                        <a href="<cms:show k_site_link />">Home</a>
                    </li>
                    <li class="<cms:if flash_exists 'active_nav' && flash 'active_nav'='gallery'>active</cms:if>">
                        <a href="<cms:show k_site_link ?>gallery/">Gallery</a>
                    </li>
                </ul>
            </nav>
        </div>
    </header>
    
    <main>
        <div class="container">
            <h2>Gallery</h2>
            
            <div class="gallery-grid">
                <cms:pages masterpage='gallery.php' limit='20'>
                    <div class="gallery-item">
                        <cms:if k_page_folderthumbnail>
                            <a href="<cms:show k_page_link />">
                                <img src="<cms:show k_page_folderthumbnail />" alt="<cms:show k_page_title />">
                                <div class="caption">
                                    <h3><cms:show k_page_title /></h3>
                                </div>
                            </a>
                        </cms:if>
                    </div>
                </cms:pages>
            </div>
        </div>
    </main>
    
    <footer>
        <div class="container">
            <p>&copy; <cms:date format='Y' /> <cms:show k_site_name />. All rights reserved.</p>
        </div>
    </footer>
</body>
</html>
<?php COUCH::invoke(); ?>`;
};

const generateNewsTemplate = () => {
  return `<?php
    // Template: news.php
    // This is the news template file for your CouchCMS theme
    
    // Include CouchCMS
    require_once( '../couchcms/couch/cms.php' );
    
    // Page title
    <cms:template title="News" />
    
    // Begin template
    <cms:if k_template_name='news.php'>
        <cms:set_flash name='active_nav' value='news' />
    </cms:if>
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><cms:show k_site_name /> | News</title>
    
    <!-- CSS -->
    <link rel="stylesheet" href="<cms:show k_site_link />css/style.css">
</head>
<body>
    <header>
        <div class="container">
            <h1><cms:show k_site_name /></h1>
            <nav>
                <ul>
                    <li class="<cms:if flash_exists 'active_nav' && flash 'active_nav'='home'>active</cms:if>">
                        <a href="<cms:show k_site_link />">Home</a>
                    </li>
                    <li class="<cms:if flash_exists 'active_nav' && flash 'active_nav'='news'>active</cms:if>">
                        <a href="<cms:show k_site_link ?>news/">News</a>
                    </li>
                </ul>
            </nav>
        </div>
    </header>
    
    <main>
        <div class="container">
            <h2>News</h2>
            
            <cms:pages masterpage='news.php' limit='10'>
                <div class="news-item">
                    <h3><a href="<cms:show k_page_link />"><cms:show k_page_title /></a></h3>
                    <div class="meta">
                        <span class="date"><cms:date k_page_date format='F j, Y' /></span>
                    </div>
                    <div class="excerpt">
                        <cms:excerpt chars='250'><cms:show k_page_content /></cms:excerpt>
                    </div>
                    <a href="<cms:show k_page_link />" class="read-more">Read More</a>
                </div>
            </cms:pages>
        </div>
    </main>
    
    <footer>
        <div class="container">
            <p>&copy; <cms:date format='Y' /> <cms:show k_site_name />. All rights reserved.</p>
        </div>
    </footer>
</body>
</html>
<?php COUCH::invoke(); ?>`;
};

const generateEventsTemplate = () => {
  return `<?php
    // Template: events.php
    // This is the events template file for your CouchCMS theme
    
    // Include CouchCMS
    require_once( '../couchcms/couch/cms.php' );
    
    // Page title
    <cms:template title="Events" />
    
    // Begin template
    <cms:if k_template_name='events.php'>
        <cms:set_flash name='active_nav' value='events' />
    </cms:if>
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><cms:show k_site_name /> | Events</title>
    
    <!-- CSS -->
    <link rel="stylesheet" href="<cms:show k_site_link />css/style.css">
</head>
<body>
    <header>
        <div class="container">
            <h1><cms:show k_site_name /></h1>
            <nav>
                <ul>
                    <li class="<cms:if flash_exists 'active_nav' && flash 'active_nav'='home'>active</cms:if>">
                        <a href="<cms:show k_site_link />">Home</a>
                    </li>
                    <li class="<cms:if flash_exists 'active_nav' && flash 'active_nav'='events'>active</cms:if>">
                        <a href="<cms:show k_site_link ?>events/">Events</a>
                    </li>
                </ul>
            </nav>
        </div>
    </header>
    
    <main>
        <div class="container">
            <h2>Upcoming Events</h2>
            
            <cms:pages masterpage='events.php' limit='10'>
                <div class="event-item">
                    <h3><a href="<cms:show k_page_link />"><cms:show k_page_title /></a></h3>
                    <div class="meta">
                        <span class="date"><cms:date k_page_date format='F j, Y' /></span>
                        <cms:if k_page_event_time>
                        <span class="time"><cms:show k_page_event_time /></span>
                        </cms:if>
                        <cms:if k_page_event_location>
                        <span class="location"><cms:show k_page_event_location /></span>
                        </cms:if>
                    </div>
                    <div class="excerpt">
                        <cms:excerpt chars='250'><cms:show k_page_content /></cms:excerpt>
                    </div>
                    <a href="<cms:show k_page_link />" class="read-more">Read More</a>
                </div>
            </cms:pages>
        </div>
    </main>
    
    <footer>
        <div class="container">
            <p>&copy; <cms:date format='Y' /> <cms:show k_site_name />. All rights reserved.</p>
        </div>
    </footer>
</body>
</html>
<?php COUCH::invoke(); ?>`;
};

const generateMasterTemplate = () => {
  return `<?php
    // Template: master.php
    // This is the master template file for your CouchCMS theme with template inheritance
    
    // Include CouchCMS
    require_once( '../couchcms/couch/cms.php' );
    
    // Page title
    <cms:template title="Master Template" clonable='0' />
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><cms:show k_site_name /> | <cms:show k_page_title /></title>
    
    <!-- CSS -->
    <link rel="stylesheet" href="<cms:show k_site_link />css/style.css">
    <cms:block 'head'></cms:block>
</head>
<body>
    <header>
        <div class="container">
            <h1><cms:show k_site_name /></h1>
            <nav>
                <ul>
                    <li class="<cms:if flash_exists 'active_nav' && flash 'active_nav'='home'>active</cms:if>">
                        <a href="<cms:show k_site_link />">Home</a>
                    </li>
                    <cms:if k_folder_name='blog'>
                    <li class="<cms:if flash_exists 'active_nav' && flash 'active_nav'='blog'>active</cms:if>">
                        <a href="<cms:show k_site_link ?>blog/">Blog</a>
                    </li>
                    </cms:if>
                    <cms:if k_folder_name='contact'>
                    <li class="<cms:if flash_exists 'active_nav' && flash 'active_nav'='contact'>active</cms:if>">
                        <a href="<cms:show k_site_link ?>contact/">Contact</a>
                    </li>
                    </cms:if>
                    <cms:block 'nav_items'></cms:block>
                </ul>
            </nav>
        </div>
    </header>
    
    <main>
        <div class="container">
            <cms:block 'main_content'>
                <h2>Default Content</h2>
                <p>This is the default content of the master template.</p>
            </cms:block>
        </div>
    </main>
    
    <footer>
        <div class="container">
            <p>&copy; <cms:date format='Y' /> <cms:show k_site_name />. All rights reserved.</p>
            <cms:block 'footer_content'></cms:block>
        </div>
    </footer>
    
    <cms:block 'scripts'></cms:block>
</body>
</html>
<?php COUCH::invoke(); ?>`;
};

const generateTailwindConfig = () => {
  return `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./**/*.php'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
      },
    },
  },
  plugins: [${formData.useDaisyUI ? 'require("daisyui")' : ''}],
  ${formData.useDaisyUI ? `daisyui: {
    themes: ["light", "dark"],
  },` : ''}
}`;
};

const generatePackageJson = () => {
  return `{
  "name": "${formData.themeName || 'couchcms-theme'}",
  "version": "1.0.0",
  "description": "A CouchCMS theme",
  "scripts": {
    "build": "tailwindcss -i ./css/input.css -o ./css/style.css",
    "watch": "tailwindcss -i ./css/input.css -o ./css/style.css --watch"
  },
  "dependencies": {
    "tailwindcss": "^4.1.7"
  }
}`;
};

const generatePackageJsonWithDaisyUI = () => {
  return `{
  "name": "${formData.themeName || 'couchcms-theme'}",
  "version": "1.0.0",
  "description": "A CouchCMS theme with DaisyUI",
  "scripts": {
    "build": "tailwindcss -i ./css/input.css -o ./css/style.css",
    "watch": "tailwindcss -i ./css/input.css -o ./css/style.css --watch"
  },
  "dependencies": {
    "tailwindcss": "^4.1.7",
    "daisyui": "^5.0.0"
  }
}`;
};

const generateReadme = () => {
  return `# ${formData.themeName || 'CouchCMS Theme'}

## Overview
This is a CouchCMS theme generated with the CouchCMS Theme Generator. It includes all the features and settings you selected in the generator.

## Installation
1. Upload the contents of this ZIP file to your web server
2. Navigate to the 'couchcms' folder in your browser
3. Follow the CouchCMS installation instructions
4. Once installed, your theme will be ready to use

## Features
${formData.features.map(feature => `- ${feature.charAt(0).toUpperCase() + feature.slice(1)}`).join('\n')}

## CSS Framework
${formData.cssFramework === 'tailwind' ? 'Tailwind CSS' + (formData.useDaisyUI ? ' with DaisyUI' : '') : formData.cssFramework === 'bootstrap' ? 'Bootstrap' : 'No CSS framework'}

## Server Requirements
- PHP ${formData.phpVersion}
- MySQL ${formData.mysqlVersion}

## Support
For questions or support, please refer to the CouchCMS documentation or forums.
`;
};

const generateConfigFile = () => {
  return `<?php
// Configuration file for ${formData.themeName || 'CouchCMS Theme'}

// Site settings
$site_name = "${formData.siteTitle || 'My CouchCMS Site'}";
$site_url = "http://localhost/"; // Change this to your actual URL

// Email settings
$primary_email = "${formData.primaryEmail || 'admin@example.com'}";
$contact_email = "${formData.contactEmail || formData.primaryEmail || 'contact@example.com'}";
$sender_email = "${formData.senderEmail || formData.primaryEmail || 'noreply@example.com'}";
${formData.paypalEmail ? `$paypal_email = "${formData.paypalEmail}";
` : ''}
// Directory settings
$template_dir = "${formData.templateDir || 'templates'}";
$uploads_dir = "${formData.uploadsDir || 'uploads'}";

// Features
$features = array(
${formData.features.map(feature => `    "${feature}"`).join(',\n')}
);

// Theme settings
$css_framework = "${formData.cssFramework}";
$color_scheme = "${formData.colorScheme}";
${formData.cssFramework === 'tailwind' && formData.useDaisyUI ? '$use_daisyui = true;' : ''}
${formData.useTemplateInheritance ? '$use_template_inheritance = true;' : ''}
?>`;
};

function App() {
  const [step, setStep] = useState(1)
  const totalSteps = 5
  const [formData, setFormData] = useState({
    projectName: '',
    siteTitle: '',
    themeName: '',
    phpVersion: '8.2',
    mysqlVersion: '8.0',
    templateDir: 'templates',
    uploadsDir: 'uploads',
    cssFramework: 'tailwind',
    useDaisyUI: false,
    useTemplateInheritance: true,
    features: ['blog', 'contact'],
    colorScheme: 'blue',
    primaryEmail: '',
    contactEmail: '',
    senderEmail: '',
    paypalEmail: ''
  })
  
  // Function to generate and download the theme
const generateTheme = async () => {
try {
  console.log('Starting theme generation...');
  
  // Check if we are in a production environment
  const isProduction = window.location.hostname !== 'localhost' && 
                      window.location.hostname !== '127.0.0.1';
    
    // Create configuration data
    const themeName = formData.themeName || 'my-couchcms-theme';
    const configData = {
      projectName: formData.projectName,
      siteTitle: formData.siteTitle,
      themeName: formData.themeName,
      phpVersion: formData.phpVersion,
      mysqlVersion: formData.mysqlVersion,
      templateDir: formData.templateDir,
      uploadsDir: formData.uploadsDir,
      cssFramework: formData.cssFramework,
      useDaisyUI: formData.useDaisyUI,
      useTemplateInheritance: formData.useTemplateInheritance,
      features: formData.features,
      colorScheme: formData.colorScheme,
      primaryEmail: formData.primaryEmail,
      contactEmail: formData.contactEmail,
      senderEmail: formData.senderEmail,
      paypalEmail: formData.paypalEmail,
      tailwindVersion: '4.1.7',
      daisyUIVersion: '5.0.0'
    };
    
    // Als we in een lokale omgeving zijn, download dan alleen de JSON-configuratie
    if (!isProduction) {
      console.log('Lokale omgeving gedetecteerd, JSON-configuratie downloaden...');
      
      // Converteer de configuratie naar een JSON-string
      const jsonString = JSON.stringify(configData, null, 2);
      
      // Maak een data URL
      const dataUrl = `data:text/json;charset=utf-8,${encodeURIComponent(jsonString)}`;
      
      // Maak een download link
      const dummyLink = document.createElement('a');
      dummyLink.href = dataUrl;
      dummyLink.download = `${themeName}-config.json`;
      
      // Klik op de link om het bestand te downloaden
      document.body.appendChild(dummyLink);
      dummyLink.click();
      document.body.removeChild(dummyLink);
      
      console.log('JSON-configuratie gedownload!');
      alert('Je configuratie is gedownload als JSON-bestand. In een productieomgeving zou dit een volledig ZIP-bestand zijn met alle themabestanden.');
      return;
    }
    
    // Als we hier zijn, zijn we in een productieomgeving en kunnen we het ZIP-bestand genereren
    console.log('Productieomgeving gedetecteerd, ZIP-bestand genereren...');
    
    // Create a new ZIP file
    const zip = new JSZip();
    
    // Create a folder for the theme
    const themeFolder = zip.folder(themeName);
    
    // Create CSS folder
    const cssFolder = themeFolder.folder('css');
    cssFolder.file('input.css', `@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom styles */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}
`);
    cssFolder.file('style.css', '/* This file will be generated by Tailwind CSS */');
    
    console.log('Adding index.php...');
    // Add a basic index.php file
    themeFolder.file('index.php', generateIndexPhp());
    
    // Add template files based on selected features
    console.log('Adding feature templates...');
    if (formData.features.includes('blog')) {
      themeFolder.file('blog.php', generateBlogTemplate());
    }
    
    if (formData.features.includes('contact')) {
      themeFolder.file('contact.php', generateContactTemplate());
    }
    
    if (formData.features.includes('portfolio')) {
      themeFolder.file('portfolio.php', generatePortfolioTemplate());
    }
    
    if (formData.features.includes('gallery')) {
      themeFolder.file('gallery.php', generateGalleryTemplate());
    }
    
    if (formData.features.includes('news')) {
      themeFolder.file('news.php', generateNewsTemplate());
    }
    
    if (formData.features.includes('events')) {
      themeFolder.file('events.php', generateEventsTemplate());
    }
    
    // Add template inheritance files if selected
    console.log('Adding template inheritance...');
    if (formData.useTemplateInheritance) {
      themeFolder.file('master.php', generateMasterTemplate());
    }
    
    // Add CSS framework files
    console.log('Adding CSS framework files...');
    if (formData.cssFramework === 'tailwind') {
      themeFolder.file('tailwind.config.js', generateTailwindConfig());
      if (formData.useDaisyUI) {
        themeFolder.file('package.json', generatePackageJsonWithDaisyUI());
      } else {
        themeFolder.file('package.json', generatePackageJson());
      }
    } else if (formData.cssFramework === 'bootstrap') {
      cssFolder.file('bootstrap.min.css', '/* Bootstrap CSS would be here */');
    }
    
    // Add a README file with installation instructions
    console.log('Adding README...');
    themeFolder.file('README.md', generateReadme());
    
    // Add a config file with the user's settings
    console.log('Adding config file...');
    themeFolder.file('config.php', generateConfigFile());
    
    // Add the latest version of CouchCMS (placeholder - in a real app, you would fetch this)
    console.log('Adding CouchCMS files...');
    const couchCmsFolder = zip.folder('couchcms');
    couchCmsFolder.file('README.md', `# CouchCMS

This is the latest version of CouchCMS.`);
    couchCmsFolder.file('index.php', `<?php
// CouchCMS index file
?>`);
    
    // Create a couch folder inside couchcms
    const couchFolder = couchCmsFolder.folder('couch');
    couchFolder.file('cms.php', `<?php
// CouchCMS core file
define('K_COUCH_DIR', str_replace('\\', '/', dirname(__FILE__)) . '/');
?>`);
    
    // Generate the ZIP file
    console.log('Generating ZIP file...');
    try {
      // Use a lower compression level to reduce memory usage
      const content = await zip.generateAsync({
        type: 'blob',
        compression: 'DEFLATE',
        compressionOptions: {
          level: 3 // Lower compression level (1-9)
        }
      });
      
      // Download the ZIP file
      console.log('Downloading ZIP file...');
      
      // Add a small delay before saving to ensure browser is ready
      setTimeout(() => {
        try {
          saveAs(content, `${themeName}-with-couchcms.zip`);
          console.log('Theme generation completed successfully!');
          alert('Your CouchCMS theme has been successfully generated and downloaded as a ZIP file.');
        } catch (saveError) {
          console.error('Error saving ZIP file:', saveError);
          alert('Error downloading the ZIP file. Please try again or check your browser settings.');
        }
      }, 100);
    } catch (zipError) {
      console.error('Error generating ZIP:', zipError);
      throw new Error('Failed to generate ZIP file: ' + zipError.message);
    }
  } catch (error) {
    console.error('Error generating theme:', error);
    alert('An error occurred while generating the theme. Please try again.');
  }
}

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const nextStep = () => {
    setStep(prev => prev + 1)
  }

  const prevStep = () => {
    setStep(prev => Math.max(1, prev - 1))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 py-4">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z" clipRule="evenodd" />
              </svg>
              <h1 className="text-2xl font-bold text-gray-800">CouchCMS Theme Generator</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">Tailwind CSS v4</span>
              <a href="https://github.com/couchcms/theme-generator" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Progress Steps */}
          <div className="bg-white border-b border-gray-200 px-6 py-8">
            <div className="flex justify-between items-center">
              {[1, 2, 3, 4, 5].map((num) => (
                <div key={num} className="flex flex-col items-center relative">
                  {/* Connection line */}
                  {num < 5 && (
                    <div className={`absolute h-0.5 w-full top-5 left-1/2 -z-10 ${step > num ? 'bg-blue-500' : 'bg-gray-300'}`} />
                  )}
                  
                  {/* Circle with number */}
                  <button
                    onClick={() => step >= num && setStep(num)}
                    className={`
                      w-10 h-10 rounded-full flex items-center justify-center font-medium
                      ${step > num ? 'bg-blue-500 text-white' : ''}
                      ${step === num ? 'bg-blue-600 text-white ring-4 ring-blue-100' : ''}
                      ${step < num ? 'bg-gray-200 text-gray-500' : ''}
                      transition-all duration-200
                    `}
                  >
                    {num}
                  </button>
                  
                  {/* Step name */}
                  <span className={`mt-2 text-xs font-medium ${step >= num ? 'text-blue-600' : 'text-gray-500'}`}>
                    {num === 1 && 'Basic Info'}
                    {num === 2 && 'Features'}
                    {num === 3 && 'Styling'}
                    {num === 4 && 'Email'}
                    {num === 5 && 'Generate'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Step 1: Basic Information */}
          {step === 1 && (
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-6 text-gray-800 border-b pb-2">Basic Information</h2>
              <div className="space-y-6">
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                    <h3 className="text-base font-medium text-gray-800">Project Details</h3>
                  </div>
                  <div className="p-4 space-y-4">
                    <div>
                      <label htmlFor="projectName" className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
                      <input
                        type="text"
                        id="projectName"
                        name="projectName"
                        value={formData.projectName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="My CouchCMS Project"
                      />
                      <p className="mt-1 text-xs text-gray-500">The name of your project (used for the folder name)</p>
                    </div>
                    <div>
                      <label htmlFor="siteTitle" className="block text-sm font-medium text-gray-700 mb-1">Site Title</label>
                      <input
                        type="text"
                        id="siteTitle"
                        name="siteTitle"
                        value={formData.siteTitle}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="My Website"
                      />
                      <p className="mt-1 text-xs text-gray-500">The title of your website (shown in the browser tab)</p>
                    </div>
                    <div>
                      <label htmlFor="themeName" className="block text-sm font-medium text-gray-700 mb-1">Theme Name</label>
                      <input
                        type="text"
                        id="themeName"
                        name="themeName"
                        value={formData.themeName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="my-theme"
                      />
                      <p className="mt-1 text-xs text-gray-500">The name of your theme (used for the theme folder)</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                    <h3 className="text-base font-medium text-gray-800">Server Settings</h3>
                  </div>
                  <div className="p-4 space-y-4">
                    {/* PHP Version */}
                    <div>
                      <label htmlFor="phpVersion" className="block text-sm font-medium text-gray-700 mb-1">PHP Version</label>
                      <select
                        id="phpVersion"
                        name="phpVersion"
                        value={formData.phpVersion}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      >
                        <option value="8.2">PHP 8.2 (Recommended)</option>
                        <option value="8.1">PHP 8.1</option>
                        <option value="8.0">PHP 8.0</option>
                        <option value="7.4">PHP 7.4</option>
                        <option value="7.3">PHP 7.3</option>
                        <option value="7.2">PHP 7.2</option>
                      </select>
                      <p className="mt-1 text-xs text-gray-500">Select the PHP version supported by your hosting</p>
                    </div>
                    
                    {/* MySQL Version */}
                    <div>
                      <label htmlFor="mysqlVersion" className="block text-sm font-medium text-gray-700 mb-1">MySQL Version</label>
                      <select
                        id="mysqlVersion"
                        name="mysqlVersion"
                        value={formData.mysqlVersion}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      >
                        <option value="8.0">MySQL 8.0 (Recommended)</option>
                        <option value="5.7">MySQL 5.7</option>
                        <option value="5.6">MySQL 5.6</option>
                        <option value="mariadb10.6">MariaDB 10.6</option>
                        <option value="mariadb10.5">MariaDB 10.5</option>
                        <option value="mariadb10.4">MariaDB 10.4</option>
                      </select>
                      <p className="mt-1 text-xs text-gray-500">Select the MySQL or MariaDB version supported by your hosting</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                    <h3 className="text-base font-medium text-gray-800">Template Settings</h3>
                  </div>
                  <div className="p-4 space-y-4">
                    {/* Template Inheritance */}
                    <div>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          name="useTemplateInheritance"
                          checked={formData.useTemplateInheritance || false}
                          onChange={(e) => {
                            setFormData(prev => ({
                              ...prev,
                              useTemplateInheritance: e.target.checked
                            }))
                          }}
                          className="h-4 w-4 text-blue-500 focus:ring-blue-500 rounded"
                        />
                        <span className="text-sm font-medium text-gray-700">Use template inheritance</span>
                      </label>
                      <p className="mt-1 text-xs text-gray-500 ml-6">Template inheritance makes it easier to manage common elements like headers and footers</p>
                    </div>
                    
                    {/* Template Directory */}
                    <div>
                      <label htmlFor="templateDir" className="block text-sm font-medium text-gray-700 mb-1">Template Directory</label>
                      <input
                        type="text"
                        id="templateDir"
                        name="templateDir"
                        value={formData.templateDir}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="templates"
                      />
                      <p className="mt-1 text-xs text-gray-500">The directory where your templates will be stored</p>
                    </div>
                    
                    {/* Uploads Directory */}
                    <div>
                      <label htmlFor="uploadsDir" className="block text-sm font-medium text-gray-700 mb-1">Uploads Directory</label>
                      <input
                        type="text"
                        id="uploadsDir"
                        name="uploadsDir"
                        value={formData.uploadsDir}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="uploads"
                      />
                      <p className="mt-1 text-xs text-gray-500">The directory where uploaded files will be stored</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Features */}
          {step === 2 && (
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-6 text-gray-800 border-b pb-2">Select Features</h2>
              <div className="space-y-6">
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                    <h3 className="text-base font-medium text-gray-800">Core Features</h3>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {['blog', 'contact', 'portfolio'].map((feature) => (
                        <div key={feature} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-md hover:bg-gray-50 transition-all">
                          <input
                            type="checkbox"
                            id={feature}
                            name="features"
                            value={feature}
                            className="h-5 w-5 text-blue-500 focus:ring-blue-500"
                            checked={formData.features.includes(feature)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setFormData(prev => ({
                                  ...prev,
                                  features: [...prev.features, feature]
                                }))
                              } else {
                                setFormData(prev => ({
                                  ...prev,
                                  features: prev.features.filter(f => f !== feature)
                                }))
                              }
                            }}
                          />
                          <label htmlFor={feature} className="text-sm font-medium text-gray-700 capitalize">
                            {feature}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                    <h3 className="text-base font-medium text-gray-800">Extra Features</h3>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {['gallery', 'news', 'events'].map((feature) => (
                        <div key={feature} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-md hover:bg-gray-50 transition-all">
                          <input
                            type="checkbox"
                            id={feature}
                            name="features"
                            value={feature}
                            className="h-5 w-5 text-blue-500 focus:ring-blue-500"
                            checked={formData.features.includes(feature)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setFormData(prev => ({
                                  ...prev,
                                  features: [...prev.features, feature]
                                }))
                              } else {
                                setFormData(prev => ({
                                  ...prev,
                                  features: prev.features.filter(f => f !== feature)
                                }))
                              }
                            }}
                          />
                          <label htmlFor={feature} className="text-sm font-medium text-gray-700 capitalize">
                            {feature}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Styling */}
          {step === 3 && (
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-6 text-gray-800 border-b pb-2">Styling Options</h2>
              <div className="space-y-6">
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                    <h3 className="text-base font-medium text-gray-800">CSS Framework</h3>
                  </div>
                  <div className="p-4 space-y-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-3">Choose a CSS framework for your theme</p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {['tailwind', 'bootstrap', 'none'].map((framework) => (
                          <div 
                            key={framework}
                            className={`
                              border rounded-md p-4 cursor-pointer transition-all
                              ${formData.cssFramework === framework ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-500' : 'border-gray-200 hover:border-gray-300'}
                            `}
                            onClick={() => setFormData(prev => ({ ...prev, cssFramework: framework }))}
                          >
                            <div className="font-medium capitalize">{framework}</div>
                            <div className="text-xs text-gray-500 mt-1">
                              {framework === 'tailwind' && 'Utility-first CSS framework'}
                              {framework === 'bootstrap' && 'Component-based CSS framework'}
                              {framework === 'none' && 'Basic CSS only'}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* DaisyUI Option - only shown when Tailwind is selected */}
                    {formData.cssFramework === 'tailwind' && (
                      <div className="pt-2 border-t border-gray-100">
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            name="useDaisyUI"
                            checked={formData.useDaisyUI || false}
                            onChange={(e) => {
                              setFormData(prev => ({
                                ...prev,
                                useDaisyUI: e.target.checked
                              }))
                            }}
                            className="h-4 w-4 text-blue-500 focus:ring-blue-500 rounded"
                          />
                          <span className="text-sm font-medium text-gray-700">Use DaisyUI</span>
                        </label>
                        <p className="text-xs text-gray-500 mt-1 ml-6">DaisyUI adds component classes to Tailwind CSS for faster development</p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                    <h3 className="text-base font-medium text-gray-800">Color Scheme</h3>
                  </div>
                  <div className="p-4 space-y-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-3">Choose a primary color for your theme</p>
                      <div className="flex flex-wrap gap-4">
                        {['blue', 'green', 'purple', 'red', 'gray'].map((color) => (
                          <div key={color} className="text-center">
                            <div 
                              className={`
                                w-12 h-12 rounded-full cursor-pointer border-2 transition-all mx-auto
                                ${formData.colorScheme === color ? 'ring-2 ring-offset-2 ring-gray-400' : ''}
                                ${color === 'blue' && 'bg-blue-500'}
                                ${color === 'green' && 'bg-green-500'}
                                ${color === 'purple' && 'bg-purple-500'}
                                ${color === 'red' && 'bg-red-500'}
                                ${color === 'gray' && 'bg-gray-500'}
                              `}
                              onClick={() => setFormData(prev => ({ ...prev, colorScheme: color }))}
                            />
                            <span className="text-xs text-gray-500 mt-1 block capitalize">{color}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Email Settings */}
          {step === 4 && (
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-6 text-gray-800 border-b pb-2">Email Settings</h2>
              <div className="space-y-6">
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                    <h3 className="text-base font-medium text-gray-800">Basic Email Addresses</h3>
                  </div>
                  <div className="p-4 space-y-4">
                    {/* Primary Email */}
                    <div>
                      <label htmlFor="primaryEmail" className="block text-sm font-medium text-gray-700 mb-1">Primary Email Address</label>
                      <input
                        type="email"
                        id="primaryEmail"
                        name="primaryEmail"
                        value={formData.primaryEmail}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="your@email.com"
                      />
                      <p className="mt-1 text-xs text-gray-500">This email address is used as the default for all other email settings</p>
                    </div>
                    
                    {/* Contact Email */}
                    <div>
                      <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-1">Contact Email Address</label>
                      <input
                        type="email"
                        id="contactEmail"
                        name="contactEmail"
                        value={formData.contactEmail}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder={formData.primaryEmail || 'contact@yoursite.com'}
                      />
                      <p className="mt-1 text-xs text-gray-500">Email address where contact forms will be sent</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                    <h3 className="text-base font-medium text-gray-800">Additional Email Addresses</h3>
                  </div>
                  <div className="p-4 space-y-4">
                    {/* Sender Email */}
                    <div>
                      <label htmlFor="senderEmail" className="block text-sm font-medium text-gray-700 mb-1">Sender Email Address</label>
                      <input
                        type="email"
                        id="senderEmail"
                        name="senderEmail"
                        value={formData.senderEmail}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder={formData.primaryEmail || 'noreply@yoursite.com'}
                      />
                      <p className="mt-1 text-xs text-gray-500">Email address used as the sender for automated emails</p>
                    </div>
                    
                    {/* PayPal Email */}
                    <div>
                      <label htmlFor="paypalEmail" className="block text-sm font-medium text-gray-700 mb-1">PayPal Email Address</label>
                      <input
                        type="email"
                        id="paypalEmail"
                        name="paypalEmail"
                        value={formData.paypalEmail}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder={formData.primaryEmail || 'paypal@yoursite.com'}
                      />
                      <p className="mt-1 text-xs text-gray-500">Email address for PayPal payments (if applicable)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Generate */}
          {step === 5 && (
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-6 text-gray-800 border-b pb-2">Generate Your CouchCMS Theme</h2>
              <div className="space-y-6">
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                    <h3 className="text-base font-medium text-gray-800">Summary</h3>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Project Information</h4>
                        <ul className="space-y-2 text-sm">
                          <li><span className="font-medium">Project Name:</span> {formData.projectName || 'Not provided'}</li>
                          <li><span className="font-medium">Site Title:</span> {formData.siteTitle || 'Not provided'}</li>
                          <li><span className="font-medium">Theme Name:</span> {formData.themeName || 'Not provided'}</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Server Settings</h4>
                        <ul className="space-y-2 text-sm">
                          <li><span className="font-medium">PHP Version:</span> {formData.phpVersion}</li>
                          <li><span className="font-medium">MySQL Version:</span> {formData.mysqlVersion}</li>
                          <li><span className="font-medium">Template Directory:</span> {formData.templateDir}</li>
                          <li><span className="font-medium">Uploads Directory:</span> {formData.uploadsDir}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                    <h3 className="text-base font-medium text-gray-800">Selected Features</h3>
                  </div>
                  <div className="p-4">
                    <div className="flex flex-wrap gap-2">
                      {formData.features.length > 0 ? (
                        formData.features.map(feature => (
                          <span key={feature} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-sm capitalize">{feature}</span>
                        ))
                      ) : (
                        <span className="text-gray-500 text-sm">No features selected</span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                    <h3 className="text-base font-medium text-gray-800">Styling</h3>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm"><span className="font-medium">CSS Framework:</span> <span className="capitalize">{formData.cssFramework}</span></p>
                        {formData.cssFramework === 'tailwind' && formData.useDaisyUI && (
                          <p className="text-sm mt-1"><span className="font-medium">Extra:</span> DaisyUI</p>
                        )}
                      </div>
                      <div>
                        <p className="text-sm"><span className="font-medium">Color Scheme:</span> <span className="capitalize">{formData.colorScheme}</span></p>
                        <div 
                          className="w-6 h-6 rounded-full mt-1"
                          style={{
                            backgroundColor: 
                              formData.colorScheme === 'blue' ? 'var(--color-blue-500)' :
                              formData.colorScheme === 'green' ? 'var(--color-green-500)' :
                              formData.colorScheme === 'purple' ? 'var(--color-purple-500)' :
                              formData.colorScheme === 'red' ? 'var(--color-red-500)' :
                              'var(--color-gray-500)'
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-md">
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mt-0.5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <p className="text-sm text-blue-800">Click the button below to generate your CouchCMS theme. This will download a ZIP file with all the necessary files.</p>
                      <p className="text-sm text-blue-800 mt-2">The theme contains the latest version of CouchCMS with all your selected settings and features.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-between">
            <div>
              {step > 1 && (
                <button 
                  onClick={prevStep}
                  className="px-5 py-2.5 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-all shadow-sm flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                  Previous
                </button>
              )}
            </div>
            <div>
              {step < 5 ? (
                <button 
                  onClick={nextStep}
                  className="px-5 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all shadow-sm flex items-center"
                >
                  Next
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              ) : (
                <button 
                  onClick={generateTheme}
                  className="px-5 py-2.5 bg-green-600 text-white rounded-md hover:bg-green-700 transition-all shadow-sm flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  Generate Theme
                </button>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-600 font-medium">CouchCMS Theme Generator</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">© 2025 CouchCMS Theme Generator. Alle rechten voorbehouden.</p>
            </div>
            <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-6">
              <a href="https://docs.couchcms.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                </svg>
                Documentatie
              </a>
              <a href="https://github.com/couchcms/theme-generator" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                GitHub
              </a>
              <a href="https://couchcms.com/contact/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
