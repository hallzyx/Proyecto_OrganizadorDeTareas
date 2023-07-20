const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin=require('css-minimizer-webpack-plugin');

const CopyPlugin=require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports={

    mode:'production',
    optimization:{
        //minimize: true,
        minimizer: [
            new CssMinimizerWebpackPlugin()
        ],
    },

    output:{
        filename: 'main.[contenthash].js',
        clean: true,
    },


    module:{
        rules:[
            {
                test: /\.m?js$/i,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
            },

            {
                test:/\.css$/i,
                exclude:/styles\.css$/i,
                exclude:/reset\.css$/i,
                use:[
                    'style-loader',
                    'css-loader'
                ]
                
            
            },
            
            {
                test:/styles\.css$/i,
                use:[
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ],
            },
            {
                test:/reset\.css$/i,
                use:[
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ],
            },

            
            { 
                    /*loader: 'html-loader',
                    options: {
                        attributes: false,
                        minimize: false,
                        sources: false,
                    },
                    */
                   
                test: /\.html$/i,
                use:[
                    {
                        loader:'html-loader',
                        options:{minimize:false},
                        //options:{ attributes: false},
                }
                   
                ]
            },
           
        ]
        
    },

    plugins:[
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            //filename: '[name].[contenthash].css',
            filename: '[name].[contenthash].css',
            ignoreOrder:false,
        }),
        new CopyPlugin({
            patterns:[
                {from:'src/assets', to: 'assets/'},
            ]
           
        }),
              
        new TerserPlugin(),    
        
    
    ]

}