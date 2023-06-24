import React from 'react'
import { useTheme } from '../hooks/ThemeContext';

const Stepper = ({ children }) => {
    let [step, setStep] = useState(1)
    const { theme } = useTheme()
    const boxShadowCardStyle = theme == 'light' ? {
        'boxShadow': '#c7cdc969 3px 0px 25px 0px'
    } : {}

    return (
        <>
            {children}
        </>
    )
}

export default Stepper

