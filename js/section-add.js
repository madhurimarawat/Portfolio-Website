/*********************************************************************************************
* File: section-add.js
* Author: Madhurima Rawat
* Date: June 28, 2025
* Description: JavaScript file for Madhurima Rawat's personal portfolio website, providing
*              functionality to dynamically load all major sections from external HTML files.
* Version: 1.2
* GitHub Repository: https://github.com/madhurimarawat/Portfolio-Website
* Issues/Bugs: For any issues or bugs, please visit the GitHub repository issues section.
* Comments: This JS file dynamically loads sections into the main HTML structure based on their
*           class names. It supports modular development and cleaner main HTML files. 🚀
* Dependencies: jQuery must be loaded before this script. ✅
*********************************************************************************************/

// 🌐 Load reusable layout components (Header & Footer)
$('.header-class').load('components/header.html', () => console.log('✅ Loaded: header.html'));
$('.slider-carousel').load('components/slider-carousel.html', () => console.log('✅ Loaded: slider-carousel.html'));
$('.footer').load('components/footer.html', () => console.log('✅ Loaded: footer.html'));

// 🔍 Load SEO meta tags (for head section)
$('head').prepend('<div class="meta-placeholder"></div>');
$('.meta-placeholder').load('seo/meta-tags.html', function () {
    $('.meta-placeholder').children().unwrap(); // 👈 Remove wrapper div after injecting
    console.log('✅ Loaded: meta-tags.html');
});

// 📦 List of all sections and their corresponding HTML paths
const sections = [
    'about-me',
    'education',
    'skills',
    'certifications',
    'experience',
    'projects',
    'social-links',            // 🌀 Requires special animation init
    'blogs-links',
    'hobbies-and-interests',
    'thank-you'
];

// 🧮 Counter to track loaded sections
let loadedCount = 0;
const totalSections = sections.length;

// 🔄 Dynamically load each section from `sections/SECTION_NAME.html`
sections.forEach(section => {
    $(`.${section}`).load(`sections/${section}.html`, function (response, status, xhr) {
        if (status === "error") {
            console.error(`❌ Error loading section: ${section}.html\nDetails: ${xhr.status} - ${xhr.statusText}`);
        } else {
            console.log(`✅ Loaded: ${section}.html`);

            // 🌀 Initialize special animation only for social-links
            if (section === 'social-links') {
                console.log('⚙️ Initializing Social Wheel Animation...');
                if (typeof initSocialWheelAnimation === 'function') {
                    initSocialWheelAnimation();
                    console.log('🎡 Social Wheel Animation Initialized');
                } else {
                    console.warn('🚫 initSocialWheelAnimation() not defined or not loaded yet!');
                }
            }

            // 🧮 Track how many have loaded
            loadedCount++;
            if (loadedCount === totalSections) {
                console.log('🎯 All sections loaded. Now aligning content rows...');
                if (typeof centerAlignContentRows === 'function') {
                    centerAlignContentRows(); // 🧩 Align rows like contentRow_1/2/3
                    console.log('✅ Row alignment completed.');
                } else {
                    console.warn('🚫 centerAlignContentRows() not defined or not loaded yet!');
                }
            }
        }
    });
});