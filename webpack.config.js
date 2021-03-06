const path = require('path')
// this veriable contains all the plugins we want to use for css
const postCSSPlugins = [
   require('postcss-import'),
   require('postcss-simple-vars'),
   require('postcss-nested'),
   require('autoprefixer')

]

module.exports = {
    // which file we want to bundle
    entry: './app/assets/scripts/App.js',

    output: {
    // where should we we bundle it and what name we want give
    filename: 'bundled.js', // the name of the file
    path: path.resolve(__dirname, 'app') // the location we want save it
},

// css & js updates in the browser without full reloud :>
    devServer: {

        // Webpack reloads the browser fore us when we make save a change to our HTML File.
       before: function(app, server) {
          server._watch('./app/**/*.html')
         },
        contentBase: path.join(__dirname, 'app'),
        //HOT is what's going to allow Web pack to inject our new CSS and JS into the browser's memory
        //on the fly without even needing a reload or refresh
        //Web-pack calls that hot module replacement or hot for short
        hot: true,
        //This would have a value of 80 80 by default but we're setting it to 3000 just because I think //it's
        // a bit easier to remember.
        port: 3000,

        // View our site on any device connected to the same Wifi / Network as the computer were
         //working on.
         host: '0.0.0.0'



    },

    mode: 'development',
    module:{
        rules: [
            {
                //if the file ends .css
                test: /\.css$/,
                // only the w will use the css loader package
                use: [ 'style-loader',
                // we added url=false to mannage our images sepratly
                    'css-loader?url=false',  {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                // this will tell all the plugins we need to use
                                plugins: postCSSPlugins
                            }
                        }
                    }],
            }
        ]
    }
}
