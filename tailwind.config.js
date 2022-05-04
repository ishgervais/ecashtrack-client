// module.exports = {
//     darkMode: 'class',
//     content: [
//         './src/pages/**/*.{js,ts,jsx,tsx}',
//         './src/components/**/*.{js,ts,jsx,tsx}'
//     ],
//     theme: {
//         extend: {
//             fontFamily: {
//                 primary: ['Inter', 'sans-serif']
//             }
//         }
//     },
//     plugins: [require('@tailwindcss/forms')]
// }
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                main: '#FFFFFF',
                secondary: {
                    300: '#EFEFEF',
                    400: '#B4B4B4',
                    500: '#A3A3A3',
                },
                primary: '#0d6ed3',
                mainYellow:'#F5A623',
                'txt-primary': '#503795',
            },
            minWidth: {
                minimum: '6.25rem',
            },
            backgroundImage: {
                check: "url('./src/public/icons/check.svg')",
            },
            fontFamily: {
                primary: ['Inter', 'sans-serif']
            }
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};