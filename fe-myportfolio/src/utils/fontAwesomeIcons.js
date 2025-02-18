// src/utils/fontAwesomeIcons.js
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

// Make sure to import specific icons before adding them
import { faGithub, faReact, faVuejs, faNodeJs, } from '@fortawesome/free-brands-svg-icons';
import { faComment, faCode, faDatabase } from '@fortawesome/free-solid-svg-icons';

// Add all solid and brand icons to the library 
library.add(fas, fab);

// Add individual icons
library.add(faGithub, faReact, faVuejs, faNodeJs, faComment, faCode, faDatabase);