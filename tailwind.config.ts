import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default <Partial<Config>>{
    content: [],
    theme: {
        extend: {},
        screens: {
            sm: '480px',
            md: '768px',
            lg: '976px',
            xl: '1440px'
        }
    },
    plugins: []
}
