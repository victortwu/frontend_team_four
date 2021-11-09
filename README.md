[GREEN SCAN](http://greenscan.app/)

A single page mobile web application for broad accessibility

Technologies used: ( M.E.R.N. stack )


MONGODB :

    Mongo data base for flexibility

EXPRESS.JS :

    Javascript library to build a server in Node.js runtime environment

    Axios was utilized as a dependency to fetch https resources on the server side

    Mongoose ODM for javascript mongoDB commands

REACT.JS :

    Utilized React.js javascript library and common configurations with Webpack and Babel as per a Create React App

    This javascript library was used for building user interface components

    Client side/React dependencies:

        Axios again utilized for connecting to Express server and minimally used for 3rd party https requests

        Tailwind css library was used very sparingly, as our design required many specific customizations / regular vanilla css was written for the vast majority of the styling, utilizing React css modules for encapsulation and organization

        Leaflet.js library was used for the map components.  NOTE: version 1.6.0 had to be used in conjunction with react-leaflet version 2.8.0

        React-leaflet dependency to bind Leaflet to React.js (again, version 2.8.0)

        React-text-loop component used to render a looping array of text

        React Router to organize navigating from fake page to fake page


NODE.JS :

    Javascript runtime environment that makes this all possible.  And it's the "N" in MERN stack.


API resources consumed:

      api.earth911.com
      api.upcitemdb.com
      api.cloudmersive.com

Deployed on Vercel and Heroku
